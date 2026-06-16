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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = normalizeCode(searchParams.get("key"))
  const auth = await authorize(code, request)
  if (!auth.ok) return NextResponse.json({ error: auth.reason }, { status: auth.status })

  const account = await getAccount(code)
  return NextResponse.json({ account, key: auth.meta })
}

export async function PATCH(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = normalizeCode(searchParams.get("key"))
  const auth = await authorize(code, request)
  if (!auth.ok) return NextResponse.json({ error: auth.reason }, { status: auth.status })

  try {
    const body = await request.json()
    const account = await patchAccount(code, body)
    return NextResponse.json({ success: true, account })
  } catch {
    return NextResponse.json({ error: "bad request" }, { status: 400 })
  }
}
