#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-/opt/upgrader}"
cd "$APP_DIR"

docker compose exec -T app node - <<'NODE'
const secret = process.env.CRON_SECRET
if (!secret) {
  console.error("CRON_SECRET is not configured")
  process.exit(1)
}

const response = await fetch("http://127.0.0.1:3000/api/cron/catalog", {
  headers: { Authorization: `Bearer ${secret}` },
})

let body = null
try {
  body = await response.json()
} catch {}

if (!response.ok) {
  console.error(JSON.stringify({
    ok: false,
    status: response.status,
    error: body && body.error ? body.error : "catalog sync failed",
  }))
  process.exit(1)
}

console.log(JSON.stringify({
  ok: true,
  status: response.status,
  skipped: body ? Boolean(body.skipped) : null,
  updatedAt: body && body.meta ? body.meta.updatedAt : null,
  finishedAt: new Date().toISOString(),
}))
NODE
