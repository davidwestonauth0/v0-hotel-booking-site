import { NextResponse } from "next/server"
import { auth0 } from "@/lib/auth0"

export async function GET() {
  try {
    const session = await auth0.getSession()

    if (!session || !session.user) {
      return NextResponse.json(null, { status: 401 })
    }

    return NextResponse.json(session.user)
  } catch (error) {
    console.error("[v0] Error fetching user session:", error)
    return NextResponse.json(null, { status: 500 })
  }
}
