import { NextResponse } from "next/server"
import { getSession } from "@auth0/nextjs-auth0"

export async function GET() {
  try {
    const session = await getSession()

    if (!session || !session.user) {
      return NextResponse.json(null, { status: 401 })
    }

    return NextResponse.json(session.user)
  } catch (error) {
    console.error("[v0] Error fetching user session:", error)
    return NextResponse.json(null, { status: 500 })
  }
}
