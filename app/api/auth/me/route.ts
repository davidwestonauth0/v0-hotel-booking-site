import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const cookieHeader = request.headers.get("cookie") || ""
    const hasAuthCookie = cookieHeader.includes("appSession")

    if (!hasAuthCookie) {
      return NextResponse.json({ user: null })
    }

    // Return a response indicating user might be authenticated
    // The actual session will be managed by Auth0's built-in handlers
    return NextResponse.json({ user: { isAuthenticated: true } })
  } catch (error) {
    console.error("Error fetching session:", error)
    return NextResponse.json({ user: null })
  }
}
