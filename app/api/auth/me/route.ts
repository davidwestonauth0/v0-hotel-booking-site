import { NextResponse } from "next/server"
import { getSession } from "@auth0/nextjs-auth0/server"

export async function GET() {
  try {
    const session = await getSession()

    if (!session) {
      return NextResponse.json(null, { status: 401 })
    }

    return NextResponse.json(session.user)
  } catch (error) {
    console.error("Error fetching user session:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
