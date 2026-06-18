import { NextResponse } from "next/server"
import { kv } from "@/lib/kv"

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function GET() {
  try {
    const globalStateExists = await kv.exists("upgrader_global_state")
    return NextResponse.json({
      ok: globalStateExists === 1,
      redis: "ok",
      globalState: globalStateExists === 1 ? "present" : "missing",
    }, { status: globalStateExists === 1 ? 200 : 503 })
  } catch {
    return NextResponse.json({ ok: false, redis: "error" }, { status: 503 })
  }
}
