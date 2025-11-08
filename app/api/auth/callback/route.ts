import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get("code")
  const state = searchParams.get("state")
  const error = searchParams.get("error")
  const errorDescription = searchParams.get("error_description")

  console.log("[v0] Auth0 callback - code:", code ? "present" : "missing", "state:", state ? "present" : "missing")

  if (error) {
    console.log("[v0] Auth0 error:", error)
    return NextResponse.redirect(
      new URL(
        `/error?error=${error}&error_description=${encodeURIComponent(errorDescription || "An error occurred")}`,
        request.url,
      ),
    )
  }

  if (!code) {
    return NextResponse.redirect(new URL("/error?error=no_code", request.url))
  }

  const baseUrl = process.env.AUTH0_BASE_URL || "http://localhost:3000"
  const issuerBaseUrl = process.env.AUTH0_ISSUER_BASE_URL
  const clientId = process.env.AUTH0_CLIENT_ID
  const clientSecret = process.env.AUTH0_CLIENT_SECRET

  if (!issuerBaseUrl || !clientId || !clientSecret) {
    return NextResponse.json({ error: "Auth0 configuration missing" }, { status: 500 })
  }

  try {
    const tokenResponse = await fetch(`${issuerBaseUrl}/oauth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        audience: `${issuerBaseUrl}/api/v2/`,
        grant_type: "authorization_code",
        redirect_uri: `${baseUrl}/api/auth/callback`,
        code,
      }),
    })

    const tokens = await tokenResponse.json()

    if (tokens.error) {
      console.log("[v0] Auth0 token exchange error:", tokens.error)
      return NextResponse.redirect(
        new URL(
          `/error?error=${tokens.error}&error_description=${encodeURIComponent(tokens.error_description || "Token exchange failed")}`,
          request.url,
        ),
      )
    }

    const response = NextResponse.redirect(new URL("/", request.url))
    response.cookies.set("appSession", tokens.id_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  } catch (error) {
    console.error("Token exchange error:", error)
    return NextResponse.redirect(
      new URL(
        "/error?error=token_exchange_failed&error_description=An error occurred during authentication",
        request.url,
      ),
    )
  }
}
