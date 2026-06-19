import { NextResponse } from "next/server"
import { isAdmin } from "@/lib/keys"

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function GET(request: Request) {
  try {
    const ok = await isAdmin(request.headers.get("x-admin-password"))
    if (!ok) return NextResponse.json({ valid: false }, { status: 401 })
    return NextResponse.json({ valid: true })
  } catch {
    return NextResponse.json({ error: "storage unavailable" }, { status: 503 })
  }
}
