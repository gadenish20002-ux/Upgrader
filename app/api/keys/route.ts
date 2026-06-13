import { NextResponse } from "next/server"
import {
  getAllKeys,
  saveAllKeys,
  generateCode,
  isAdmin,
  keyStatus,
  daysLeft,
  resetAccount,
  resetAccountHistory,
  type AccessKey,
} from "@/lib/keys"
import { kv } from "@vercel/kv"
import { accountKvKey } from "@/lib/keys"

export const dynamic = "force-dynamic"
export const revalidate = 0

function adminPwd(request: Request): string | null {
  return request.headers.get("x-admin-password")
}

async function requireAdmin(request: Request): Promise<NextResponse | null> {
  if (!(await isAdmin(adminPwd(request)))) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 })
  }
  return null
}

function decorate(map: Record<string, AccessKey>) {
  return Object.values(map)
    .sort((a, b) => b.createdAt - a.createdAt)
    .map((k) => ({ ...k, status: keyStatus(k), daysLeft: daysLeft(k) }))
}

// List all keys (admin only)
export async function GET(request: Request) {
  const deny = await requireAdmin(request)
  if (deny) return deny
  const map = await getAllKeys()
  return NextResponse.json({ keys: decorate(map) })
}

// Create a key (admin only). body: { label, days }
export async function POST(request: Request) {
  const deny = await requireAdmin(request)
  if (deny) return deny
  try {
    const body = await request.json()
    const label = String(body.label || "").trim()
    const days = Math.max(1, Math.floor(Number(body.days) || 0))
    if (!days) return NextResponse.json({ error: "days must be >= 1" }, { status: 400 })

    const map = await getAllKeys()
    let code = generateCode()
    while (map[code]) code = generateCode()

    const now = Date.now()
    const key: AccessKey = {
      code,
      label: label || "Без названия",
      days,
      createdAt: now,
      expiresAt: now + days * 86_400_000,
      revoked: false,
      lastSeen: null,
    }
    map[code] = key
    await saveAllKeys(map)
    return NextResponse.json({ key: { ...key, status: keyStatus(key), daysLeft: daysLeft(key) } })
  } catch (e) {
    return NextResponse.json({ error: "bad request" }, { status: 400 })
  }
}

// Mutate a key (admin only). body: { code, action: "revoke"|"restore"|"extend"|"reset"|"reset-history", days? }
export async function PATCH(request: Request) {
  const deny = await requireAdmin(request)
  if (deny) return deny
  try {
    const body = await request.json()
    const code = String(body.code || "").toUpperCase()
    const action = String(body.action || "")
    const map = await getAllKeys()
    const key = map[code]
    if (!key) return NextResponse.json({ error: "not found" }, { status: 404 })

    if (action === "revoke") key.revoked = true
    else if (action === "restore") key.revoked = false
    else if (action === "extend") {
      const days = Math.max(1, Math.floor(Number(body.days) || 0))
      // extend from now if already expired, otherwise from current expiry
      const base = Math.max(Date.now(), key.expiresAt)
      key.expiresAt = base + days * 86_400_000
      key.days += days
    } else if (action === "reset") {
      await resetAccount(code)
    } else if (action === "reset-history") {
      await resetAccountHistory(code)
    } else {
      return NextResponse.json({ error: "unknown action" }, { status: 400 })
    }

    await saveAllKeys(map)
    return NextResponse.json({ key: { ...key, status: keyStatus(key), daysLeft: daysLeft(key) } })
  } catch (e) {
    return NextResponse.json({ error: "bad request" }, { status: 400 })
  }
}

// Delete a key + its account (admin only). body: { code }
export async function DELETE(request: Request) {
  const deny = await requireAdmin(request)
  if (deny) return deny
  try {
    const body = await request.json()
    const code = String(body.code || "").toUpperCase()
    const map = await getAllKeys()
    if (map[code]) {
      delete map[code]
      await saveAllKeys(map)
      try {
        await kv.del(accountKvKey(code))
      } catch {}
    }
    return NextResponse.json({ success: true })
  } catch (e) {
    return NextResponse.json({ error: "bad request" }, { status: 400 })
  }
}
