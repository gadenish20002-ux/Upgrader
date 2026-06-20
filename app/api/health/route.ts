import { NextResponse } from "next/server"
import { kv } from "@/lib/kv"
import { hasDatabase } from "@/lib/db"

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function GET() {
  try {
    const globalStateExists = await kv.exists("upgrader_global_state")
    return NextResponse.json({
      ok: globalStateExists === 1,
      storage: hasDatabase() ? "postgres" : "redis",
      globalState: globalStateExists === 1 ? "present" : "missing",
    }, { status: globalStateExists === 1 ? 200 : 503 })
  } catch {
    return NextResponse.json({ ok: false, storage: hasDatabase() ? "postgres" : "redis", error: "storage error" }, { status: 503 })
  }
}
