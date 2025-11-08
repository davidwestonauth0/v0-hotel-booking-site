import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const baseUrl = process.env.AUTH0_BASE_URL || "http://localhost:3000"
  const clientId = process.env.AUTH0_CLIENT_ID
  const issuerBaseUrl = process.env.AUTH0_ISSUER_BASE_URL
  const screenHint = request.nextUrl.searchParams.get("screen_hint") || ""
  const loginHint = request.nextUrl.searchParams.get("login_hint") || ""

  if (!clientId || !issuerBaseUrl) {
    return NextResponse.json({ error: "Auth0 configuration missing" }, { status: 500 })
  }

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: `${baseUrl}/api/auth/callback`,
    response_type: "code",
    scope: "openid profile email",
    ...(screenHint && { screen_hint: screenHint }),
    ...(loginHint && { login_hint: loginHint }),
  })

  const loginUrl = `${issuerBaseUrl}/authorize?${params.toString()}`
  return NextResponse.redirect(loginUrl)
}
