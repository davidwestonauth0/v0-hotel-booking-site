import { NextResponse } from "next/server"

export async function GET() {
  const baseUrl = process.env.AUTH0_BASE_URL || "http://localhost:3000"
  const issuerBaseUrl = process.env.AUTH0_ISSUER_BASE_URL

  if (!issuerBaseUrl) {
    return NextResponse.json({ error: "Auth0 configuration missing" }, { status: 500 })
  }

  const logoutUrl = new URL(`${issuerBaseUrl}/v2/logout`)
  logoutUrl.searchParams.set("client_id", process.env.AUTH0_CLIENT_ID || "")
  logoutUrl.searchParams.set("returnTo", baseUrl)

  const response = NextResponse.redirect(logoutUrl.toString())
  response.cookies.set("appSession", "", { maxAge: 0 })
  return response
}
