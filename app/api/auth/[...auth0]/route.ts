import type { NextRequest } from "next/server"

// Handle all Auth0 routes: /api/auth/login, /api/auth/logout, /api/auth/callback, /api/auth/me
export async function GET(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const searchParams = request.nextUrl.searchParams

  // Extract the auth action from the URL
  const authAction = pathname.split("/api/auth/")[1]?.split("/")[0]

  try {
    switch (authAction) {
      case "login": {
        // Build authorization URL manually
        const returnTo = searchParams.get("returnTo") || "/"
        const loginHint = searchParams.get("login_hint") || undefined
        const screenHint = searchParams.get("screen_hint") || undefined

        const authUrl = new URL(`https://${process.env.AUTH0_DOMAIN}/authorize`)
        authUrl.searchParams.set("client_id", process.env.AUTH0_CLIENT_ID!)
        authUrl.searchParams.set("response_type", "code")
        authUrl.searchParams.set("redirect_uri", `${process.env.APP_BASE_URL}/api/auth/callback`)
        authUrl.searchParams.set("scope", "openid profile email")
        authUrl.searchParams.set("state", Buffer.from(JSON.stringify({ returnTo })).toString("base64"))

        if (loginHint) {
          authUrl.searchParams.set("login_hint", loginHint)
        }
        if (screenHint) {
          authUrl.searchParams.set("screen_hint", screenHint)
        }

        return Response.redirect(authUrl.toString())
      }

      case "logout": {
        const logoutUrl = new URL(`https://${process.env.AUTH0_DOMAIN}/v2/logout`)
        logoutUrl.searchParams.set("client_id", process.env.AUTH0_CLIENT_ID!)
        logoutUrl.searchParams.set("returnTo", process.env.APP_BASE_URL!)

        // Clear the session cookie
        const response = Response.redirect(logoutUrl.toString())
        response.headers.set(
          "Set-Cookie",
          "appSession=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Lax",
        )
        return response
      }

      case "callback": {
        // Get the authorization code from the callback
        const code = searchParams.get("code")
        const state = searchParams.get("state")
        const error = searchParams.get("error")

        if (error) {
          return Response.redirect(new URL(`/error?error=${encodeURIComponent(error)}`, request.url))
        }

        if (!code) {
          return Response.redirect(new URL("/error?error=No authorization code received", request.url))
        }

        // Exchange code for tokens
        const tokenResponse = await fetch(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            grant_type: "authorization_code",
            client_id: process.env.AUTH0_CLIENT_ID!,
            client_secret: process.env.AUTH0_CLIENT_SECRET!,
            code,
            redirect_uri: `${process.env.APP_BASE_URL}/api/auth/callback`,
          }),
        })

        if (!tokenResponse.ok) {
          return Response.redirect(new URL("/error?error=Failed to exchange authorization code", request.url))
        }

        const tokens = await tokenResponse.json()

        // Get user info
        const userResponse = await fetch(`https://${process.env.AUTH0_DOMAIN}/userinfo`, {
          headers: { Authorization: `Bearer ${tokens.access_token}` },
        })

        if (!userResponse.ok) {
          return Response.redirect(new URL("/error?error=Failed to get user info", request.url))
        }

        const user = await userResponse.json()

        // Create a simple session cookie (in production, encrypt this)
        const session = {
          user: {
            sub: user.sub,
            name: user.name,
            email: user.email,
            picture: user.picture,
          },
          accessToken: tokens.access_token,
          idToken: tokens.id_token,
        }

        const returnTo = state ? JSON.parse(Buffer.from(state, "base64").toString()).returnTo : "/"
        const response = Response.redirect(new URL(returnTo, request.url))

        response.headers.set(
          "Set-Cookie",
          `appSession=${Buffer.from(JSON.stringify(session)).toString("base64")}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=604800`,
        )

        return response
      }

      case "me": {
        // Read session from cookie
        const cookie = request.cookies.get("appSession")
        if (!cookie) {
          return Response.json(null)
        }

        try {
          const session = JSON.parse(Buffer.from(cookie.value, "base64").toString())
          return Response.json(session.user)
        } catch {
          return Response.json(null)
        }
      }

      default:
        return new Response("Not Found", { status: 404 })
    }
  } catch (error: any) {
    console.error("[v0] Auth error:", error)
    return Response.redirect(
      new URL(`/error?error=${encodeURIComponent(error.message || "Authentication failed")}`, request.url),
    )
  }
}
