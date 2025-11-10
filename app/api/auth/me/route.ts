import { NextResponse } from "next/server"
import { getSession } from "@auth0/nextjs-auth0"

export async function GET(request: Request) {
  try {
    const response = new NextResponse()
    const session = await getSession(request, response)

    if (!session) {
      return NextResponse.json(null, { status: 401 })
    }

    return NextResponse.json(session.user)
  } catch (error) {
    console.error("Error fetching user session:", error)
    return NextResponse.json(null, { status: 401 })
  }
}
