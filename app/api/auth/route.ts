import { NextResponse } from "next/server"
import { getKey, keyStatus, daysLeft, touchKey } from "@/lib/keys"

export const dynamic = "force-dynamic"
export const revalidate = 0

// Lightweight key validation for the player gate. GET /api/auth?key=CODE
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = (searchParams.get("key") || "").toUpperCase().trim()
  if (!code) return NextResponse.json({ valid: false, reason: "empty" }, { status: 200 })

  const key = await getKey(code)
  const status = keyStatus(key)
  if (status !== "active") {
    return NextResponse.json({ valid: false, reason: status }, { status: 200 })
  }
  await touchKey(code)
  return NextResponse.json({
    valid: true,
    label: key!.label,
    expiresAt: key!.expiresAt,
    daysLeft: daysLeft(key!),
  })
}
