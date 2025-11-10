import type { NextRequest } from "next/server"
import { auth0 } from "@/lib/auth0"

// Handle all Auth0 routes: /api/auth/login, /api/auth/logout, /api/auth/callback, /api/auth/me
export async function GET(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Extract the auth action from the URL
  const authAction = pathname.split("/api/auth/")[1]

  switch (authAction) {
    case "login":
      return auth0.handleLogin(request, {
        returnTo: request.nextUrl.searchParams.get("returnTo") || "/",
        authorizationParams: {
          login_hint: request.nextUrl.searchParams.get("login_hint") || undefined,
          screen_hint: request.nextUrl.searchParams.get("screen_hint") || undefined,
        },
      })

    case "logout":
      return auth0.handleLogout(request)

    case "callback":
      try {
        return await auth0.handleCallback(request)
      } catch (error: any) {
        return Response.redirect(
          new URL(`/error?error=${encodeURIComponent(error.message || "Authentication failed")}`, request.url),
        )
      }

    case "me":
      try {
        const session = await auth0.getSession(request)
        if (session) {
          return Response.json(session.user)
        }
        return Response.json(null)
      } catch (error) {
        return Response.json(null)
      }

    default:
      return new Response("Not Found", { status: 404 })
  }
}
