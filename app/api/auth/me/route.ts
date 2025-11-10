import { NextResponse } from "next/server"
import auth0 from "@/lib/auth0"

export async function GET(request: Request) {
  try {
    const session = await auth0.getSession(request)

    if (!session) {
      return NextResponse.json(null, { status: 401 })
    }

    return NextResponse.json(session.user)
  } catch (error) {
    console.error("Error fetching user session:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
