import { NextResponse } from "next/server"
import {
  getKey,
  normalizeCode,
  keyStatus,
  daysLeft,
  getAccount,
  patchAccount,
  touchKey,
  isAdmin,
  pickAccountFields,
  ADMIN_ACCOUNT,
} from "@/lib/keys"

export const dynamic = "force-dynamic"
export const revalidate = 0

async function authorize(
  code: string,
  request: Request,
): Promise<{ ok: true; meta: any } | { ok: false; status: number; reason: string }> {
  if (!code) return { ok: false, status: 400, reason: "empty" }

  if (code === ADMIN_ACCOUNT) {
    const admin = await isAdmin(request.headers.get("x-admin-password"))
    if (!admin) return { ok: false, status: 401, reason: "unauthorized" }
    return { ok: true, meta: { template: true } }
  }

  const key = await getKey(code)
  const status = keyStatus(key)
  if (status !== "active") {
    const admin = await isAdmin(request.headers.get("x-admin-password"))
    if (!admin || !key) return { ok: false, status: 403, reason: status }
    return { ok: true, meta: { label: key.label, expiresAt: key.expiresAt, daysLeft: daysLeft(key), status } }
  }

  return { ok: true, meta: { label: key!.label, expiresAt: key!.expiresAt, daysLeft: daysLeft(key!), status } }
}

// predict (the forced-outcome "режим") is now a per-account field: each key owns
// its own mode, set from /cabinet (the key holder) or the /admin panel. It flows
// through GET/PATCH like every other account field — it is NOT stripped anymore.
// (Previously it was removed here to keep predict a single global site setting,
//  which is exactly what caused the "все ключи побеждают одновременно" bug.)

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const code = normalizeCode(searchParams.get("key"))
    const auth = await authorize(code, request)
    if (!auth.ok) return NextResponse.json({ error: auth.reason }, { status: auth.status })

    const account = await getAccount(code)
    return NextResponse.json({ account, key: auth.meta })
  } catch {
    return NextResponse.json({ error: "storage unavailable" }, { status: 503 })
  }
}

export async function PATCH(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const code = normalizeCode(searchParams.get("key"))
    const auth = await authorize(code, request)
    if (!auth.ok) return NextResponse.json({ error: auth.reason }, { status: auth.status })

    const body = await request.json()
    const account = await patchAccount(code, pickAccountFields(body))
    return NextResponse.json({ success: true, account })
  } catch {
    return NextResponse.json({ error: "storage unavailable" }, { status: 503 })
  }
}
