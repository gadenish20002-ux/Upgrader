#!/usr/bin/env node
import crypto from "node:crypto"
import fs from "node:fs"
import path from "node:path"

const envFile = process.argv[2] || process.env.UPGRADER_ENV_FILE || "/etc/upgrader/upgrader.env"
const outDir = process.argv[3] || process.env.UPGRADER_BACKUP_DIR || "/var/backups/upgrader"

function loadEnv(file) {
  const env = {}
  for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    if (!line || line.trimStart().startsWith("#")) continue
    const index = line.indexOf("=")
    if (index < 0) continue
    let value = line.slice(index + 1).trim()
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }
    env[line.slice(0, index).trim()] = value
  }
  return env
}

const env = { ...process.env, ...loadEnv(envFile) }
const endpoint = (env.KV_REST_API_URL || env.UPSTASH_REDIS_REST_URL || "").replace(/\/$/, "")
const token = env.KV_REST_API_READ_ONLY_TOKEN || env.KV_REST_API_TOKEN || env.UPSTASH_REDIS_REST_TOKEN

if (!endpoint || !token) {
  console.error("Missing Upstash REST URL/token")
  process.exit(1)
}

async function redis(command) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(command),
  })
  const payload = await response.json()
  if (!response.ok || payload.error) throw new Error(payload.error || `Redis HTTP ${response.status}`)
  return payload.result
}

async function scanAll(pattern) {
  let cursor = "0"
  const keys = []
  do {
    const result = await redis(["SCAN", cursor, "MATCH", pattern, "COUNT", "500"])
    cursor = String(result[0])
    keys.push(...(result[1] || []))
  } while (cursor !== "0")
  return keys.sort()
}

async function dumpValue(key, type) {
  if (type === "string") return { encoding: "json-or-string", value: await redis(["GET", key]) }
  if (type === "hash") return { encoding: "array", value: await redis(["HGETALL", key]) }
  if (type === "list") return { encoding: "array", value: await redis(["LRANGE", key, "0", "-1"]) }
  if (type === "set") return { encoding: "array", value: await redis(["SMEMBERS", key]) }
  if (type === "zset") return { encoding: "array-with-scores", value: await redis(["ZRANGE", key, "0", "-1", "WITHSCORES"]) }
  return { encoding: "unsupported", value: null }
}

function parseMaybe(value) {
  if (typeof value !== "string") return value
  try {
    return JSON.parse(value)
  } catch {
    return value
  }
}

fs.mkdirSync(outDir, { recursive: true, mode: 0o700 })

const createdAt = new Date().toISOString()
const safeTimestamp = createdAt.replace(/[:.]/g, "-")
const keys = await scanAll("upgrader_*")
const records = []

for (const key of keys) {
  const type = await redis(["TYPE", key])
  const pttl = await redis(["PTTL", key]).catch(() => null)
  records.push({ key, type, pttl, ...(await dumpValue(key, type)) })
}

const values = Object.fromEntries(records.map((record) => [record.key, parseMaybe(record.value)]))
const meta = values.upgrader_catalog_prices_meta_v1 || null
const prices = values.upgrader_catalog_prices_v1 || null
const accessKeys = values.upgrader_access_keys || null

const backup = {
  format: "upgrader-upstash-backup-v1",
  createdAt,
  source: {
    endpointHostSha256Prefix: crypto.createHash("sha256").update(new URL(endpoint).host).digest("hex").slice(0, 12),
    keyPattern: "upgrader_*",
  },
  summary: {
    totalKeys: records.length,
    accessKeyCount: accessKeys && typeof accessKeys === "object" ? Object.keys(accessKeys).length : 0,
    accountCount: records.filter((record) => record.key.startsWith("upgrader_account:")).length,
    lastSeenCount: records.filter((record) => record.key.startsWith("upgrader_access_key_last_seen:")).length,
    catalogPriceCount: prices && typeof prices === "object" ? Object.keys(prices).length : 0,
    catalogMetaTotal: meta?.total,
    catalogMetaChunks: meta?.chunks,
    catalogAdditionChunks: records.filter((record) => record.key.startsWith("upgrader_catalog_additions_v1:")).length,
    globalStatePresent: Object.hasOwn(values, "upgrader_global_state"),
    adminPasswordPresent:
      values.upgrader_global_state &&
      typeof values.upgrader_global_state === "object" &&
      typeof values.upgrader_global_state.adminPassword === "string",
  },
  records,
}

const output = path.join(outDir, `upgrader-redis-backup-${safeTimestamp}.json`)
fs.writeFileSync(output, JSON.stringify(backup, null, 2), { mode: 0o600 })
fs.chmodSync(output, 0o600)

const buffer = fs.readFileSync(output)
const sha256 = crypto.createHash("sha256").update(buffer).digest("hex")
const verify = JSON.parse(buffer.toString("utf8"))
if (!Array.isArray(verify.records) || verify.records.length !== records.length) {
  throw new Error("Backup verification failed")
}

console.log(JSON.stringify({ path: output, sha256, bytes: buffer.length, summary: backup.summary }, null, 2))
