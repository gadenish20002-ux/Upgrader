import net from "node:net"
import tls from "node:tls"
import { Pool } from "pg"

const REDIS_URL = process.env.REDIS_URL || "redis://redis:6379"
const DATABASE_URL = process.env.DATABASE_URL

if (!DATABASE_URL) {
  console.error("DATABASE_URL is required")
  process.exit(1)
}

function encodeCommand(parts) {
  return `*${parts.length}\r\n${parts
    .map((part) => {
      const value = String(part)
      return `$${Buffer.byteLength(value)}\r\n${value}\r\n`
    })
    .join("")}`
}

function parseReply(input, offset = 0) {
  const lineEnd = input.indexOf("\r\n", offset)
  if (lineEnd === -1) return null
  const type = String.fromCharCode(input[offset])
  const line = input.toString("utf8", offset + 1, lineEnd)

  if (type === "$") {
    const length = Number(line)
    if (length === -1) return { value: null, offset: lineEnd + 2 }
    const start = lineEnd + 2
    const end = start + length
    if (input.length < end + 2) return null
    return { value: input.toString("utf8", start, end), offset: end + 2 }
  }

  if (type === "+") return { value: line, offset: lineEnd + 2 }
  if (type === ":") return { value: Number(line), offset: lineEnd + 2 }
  if (type === "-") throw new Error(line)

  if (type === "*") {
    const length = Number(line)
    const values = []
    let nextOffset = lineEnd + 2
    for (let index = 0; index < length; index += 1) {
      const parsed = parseReply(input, nextOffset)
      if (!parsed) return null
      values.push(parsed.value)
      nextOffset = parsed.offset
    }
    return { value: values, offset: nextOffset }
  }

  throw new Error(`Unsupported Redis reply: ${type}`)
}

function redisConnection() {
  const url = new URL(REDIS_URL)
  return {
    url,
    port: Number(url.port || 6379),
    secure: url.protocol === "rediss:",
    username: url.username ? decodeURIComponent(url.username) : "",
    password: url.password ? decodeURIComponent(url.password) : "",
  }
}

function authCommand(username, password) {
  if (!password) return ""
  return username ? encodeCommand(["AUTH", username, password]) : encodeCommand(["AUTH", password])
}

async function redisCommand(parts) {
  const { url, port, secure, username, password } = redisConnection()
  return await new Promise((resolve, reject) => {
    const socket = (secure ? tls : net).connect({
      host: url.hostname,
      port,
      servername: secure ? url.hostname : undefined,
      timeout: 15_000,
    })
    let data = Buffer.alloc(0)
    let settled = false
    const settle = (callback) => {
      if (settled) return
      settled = true
      callback()
    }

    socket.on(secure ? "secureConnect" : "connect", () => {
      socket.write(`${authCommand(username, password)}${encodeCommand(parts)}`)
    })
    socket.on("data", (chunk) => {
      data = Buffer.concat([data, chunk])
      const first = password ? parseReply(data) : { value: "OK", offset: 0 }
      if (!first) return
      const reply = parseReply(data, first.offset)
      if (!reply) return
      socket.end()
      settle(() => resolve(reply.value))
    })
    socket.on("timeout", () => {
      socket.destroy()
      settle(() => reject(new Error("Redis command timed out")))
    })
    socket.on("error", (error) => settle(() => reject(error)))
  })
}

function parseJson(value) {
  if (value === null || value === undefined) return null
  if (typeof value !== "string") return value
  try {
    return JSON.parse(value)
  } catch {
    return value
  }
}

async function getJson(key) {
  return parseJson(await redisCommand(["GET", key]))
}

async function createSchema(client) {
  await client.query(`
    CREATE TABLE IF NOT EXISTS access_keys (
      code text PRIMARY KEY,
      label text NOT NULL,
      days integer NOT NULL,
      created_at bigint NOT NULL,
      expires_at bigint NOT NULL,
      revoked boolean NOT NULL DEFAULT false,
      last_seen bigint
    );

    CREATE TABLE IF NOT EXISTS accounts (
      code text PRIMARY KEY,
      data jsonb NOT NULL DEFAULT '{}'::jsonb,
      updated_at timestamptz NOT NULL DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS app_settings (
      key text PRIMARY KEY,
      value jsonb NOT NULL,
      updated_at timestamptz NOT NULL DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS app_kv (
      key text PRIMARY KEY,
      value jsonb NOT NULL,
      updated_at timestamptz NOT NULL DEFAULT now()
    );
  `)
}

const pool = new Pool({ connectionString: DATABASE_URL })
const client = await pool.connect()

try {
  await createSchema(client)
  await client.query("BEGIN")

  let settings = 0
  for (const key of ["upgrader_global_state", "upgrader_admin_password"]) {
    const value = await getJson(key)
    if (value === null) continue
    await client.query(
      `INSERT INTO app_settings (key, value, updated_at)
       VALUES ($1, $2::jsonb, now())
       ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now()`,
      [key, JSON.stringify(value)],
    )
    settings += 1
  }

  let accessKeys = 0
  const keyMap = (await getJson("upgrader_access_keys")) || {}
  for (const [code, item] of Object.entries(keyMap)) {
    const lastSeen = await getJson(`upgrader_access_key_last_seen:${code}`)
    await client.query(
      `INSERT INTO access_keys (code, label, days, created_at, expires_at, revoked, last_seen)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       ON CONFLICT (code) DO UPDATE SET
         label = EXCLUDED.label,
         days = EXCLUDED.days,
         created_at = EXCLUDED.created_at,
         expires_at = EXCLUDED.expires_at,
         revoked = EXCLUDED.revoked,
         last_seen = EXCLUDED.last_seen`,
      [
        item.code || code,
        item.label || "Без названия",
        Number(item.days || 1),
        Number(item.createdAt || Date.now()),
        Number(item.expiresAt || Date.now()),
        Boolean(item.revoked),
        lastSeen ?? item.lastSeen ?? null,
      ],
    )
    accessKeys += 1
  }

  let accounts = 0
  const accountKeys = (await redisCommand(["KEYS", "upgrader_account:*"])).filter((key) => typeof key === "string")
  for (const redisKey of accountKeys) {
    const code = redisKey.slice("upgrader_account:".length)
    const data = await getJson(redisKey)
    if (data === null) continue
    await client.query(
      `INSERT INTO accounts (code, data, updated_at)
       VALUES ($1, $2::jsonb, now())
       ON CONFLICT (code) DO UPDATE SET data = EXCLUDED.data, updated_at = now()`,
      [code, JSON.stringify(data)],
    )
    accounts += 1
  }

  await client.query("COMMIT")
  console.log(JSON.stringify({ ok: true, settings, accessKeys, accounts }))
} catch (error) {
  await client.query("ROLLBACK")
  console.error(error)
  process.exitCode = 1
} finally {
  client.release()
  await pool.end()
}
