import { NextResponse } from "next/server"
import {
  getKey,
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

// Resolve which account a request may touch.
//   - ADMIN_ACCOUNT (__default__): only the admin (valid x-admin-password) may read/write.
//   - any other code: must be a valid, active access key.
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
    // admins may still operate on any account (manage/rig) via x-admin-password
    const admin = await isAdmin(request.headers.get("x-admin-password"))
    if (!admin || !key) return { ok: false, status: 403, reason: status }
    return { ok: true, meta: { label: key.label, expiresAt: key.expiresAt, daysLeft: daysLeft(key), status } }
  }
  return { ok: true, meta: { label: key!.label, expiresAt: key!.expiresAt, daysLeft: daysLeft(key!), status } }
}

// GET /api/account?key=CODE → { account, key }
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = (searchParams.get("key") || "").toUpperCase().trim()
  const auth = await authorize(code, request)
  if (!auth.ok) return NextResponse.json({ error: auth.reason }, { status: auth.status })

  if (code !== ADMIN_ACCOUNT) await touchKey(code)
  const account = await getAccount(code)
  return NextResponse.json({ account, key: auth.meta })
}

// PATCH /api/account?key=CODE  body: partial account fields → merge
export async function PATCH(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = (searchParams.get("key") || "").toUpperCase().trim()
  const auth = await authorize(code, request)
  if (!auth.ok) return NextResponse.json({ error: auth.reason }, { status: auth.status })

  try {
    const body = await request.json()
    const patch = pickAccountFields(body)
    const account = await patchAccount(code, patch)
    return NextResponse.json({ success: true, account })
  } catch (e) {
    return NextResponse.json({ error: "bad request" }, { status: 400 })
  }
}
