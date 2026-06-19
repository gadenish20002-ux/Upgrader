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

function stripPerAccountPredict(value: any) {
  if (!value || typeof value !== "object") return value
  const { predict, ...rest } = value
  return rest
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const code = normalizeCode(searchParams.get("key"))
    const auth = await authorize(code, request)
    if (!auth.ok) return NextResponse.json({ error: auth.reason }, { status: auth.status })

    const account = stripPerAccountPredict(await getAccount(code))
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

    const body = stripPerAccountPredict(await request.json())
    const account = stripPerAccountPredict(await patchAccount(code, pickAccountFields(body)))
    return NextResponse.json({ success: true, account })
  } catch {
    return NextResponse.json({ error: "storage unavailable" }, { status: 503 })
  }
}
