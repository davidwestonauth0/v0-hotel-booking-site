import { NextResponse } from "next/server"
import { auth0 } from "@/lib/auth0"

export async function GET() {
  try {
    const session = await auth0.getSession()

    if (!session) {
      return NextResponse.json({ user: null })
    }

    return NextResponse.json({ user: session.user })
  } catch (error) {
    console.error("[v0] Error fetching session:", error)
    return NextResponse.json({ user: null })
  }
}
