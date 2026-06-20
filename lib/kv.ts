import net from "node:net"
import tls from "node:tls"
import { hasDatabase, query, withTransaction } from "./db"

type RedisValue = string | number | null | RedisValue[]
type ParsedReply = { value: RedisValue; offset: number }
type RawRedisValue = Buffer | string | number | null | RawRedisValue[]
type ParsedRawReply = { value: RawRedisValue; offset: number }

const REST_CHUNK_BYTES = 8 * 1024

function encodeCommand(parts: Array<string | number>): string {
  return `*${parts.length}\r\n${parts
    .map((part) => {
      const value = String(part)
      return `$${Buffer.byteLength(value)}\r\n${value}\r\n`
    })
    .join("")}`
}

function parseReply(input: Buffer, offset = 0): ParsedReply | null {
  const lineEnd = input.indexOf("\r\n", offset)
  if (lineEnd === -1) return null
  const type = String.fromCharCode(input[offset])
  const line = input.toString("utf8", offset + 1, lineEnd)

  if (type === "$") {
    const length = Number(line)
    if (length === -1) return { value: null, offset: lineEnd + 2 }
    if (!Number.isFinite(length) || length < 0) throw new Error("Invalid Redis bulk length")
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
    if (length === -1) return { value: null, offset: lineEnd + 2 }
    const values: RedisValue[] = []
    let nextOffset = lineEnd + 2
    for (let index = 0; index < length; index += 1) {
      const parsed = parseReply(input, nextOffset)
      if (!parsed) return null
      values.push(parsed.value)
      nextOffset = parsed.offset
    }
    return { value: values, offset: nextOffset }
  }

  throw new Error("Unsupported Redis reply")
}

function parseRawReply(input: Buffer, offset = 0): ParsedRawReply | null {
  const lineEnd = input.indexOf("\r\n", offset)
  if (lineEnd === -1) return null
  const type = String.fromCharCode(input[offset])
  const line = input.toString("utf8", offset + 1, lineEnd)

  if (type === "$") {
    const length = Number(line)
    if (length === -1) return { value: null, offset: lineEnd + 2 }
    if (!Number.isFinite(length) || length < 0) throw new Error("Invalid Redis bulk length")
    const start = lineEnd + 2
    const end = start + length
    if (input.length < end + 2) return null
    return { value: input.subarray(start, end), offset: end + 2 }
  }

  if (type === "+") return { value: line, offset: lineEnd + 2 }
  if (type === ":") return { value: Number(line), offset: lineEnd + 2 }
  if (type === "-") throw new Error(line)

  if (type === "*") {
    const length = Number(line)
    if (length === -1) return { value: null, offset: lineEnd + 2 }
    const values: RawRedisValue[] = []
    let nextOffset = lineEnd + 2
    for (let index = 0; index < length; index += 1) {
      const parsed = parseRawReply(input, nextOffset)
      if (!parsed) return null
      values.push(parsed.value)
      nextOffset = parsed.offset
    }
    return { value: values, offset: nextOffset }
  }

  throw new Error("Unsupported Redis reply")
}

function deserialize<T>(value: RedisValue): T | null {
  if (typeof value !== "string") return value as T | null
  try {
    return JSON.parse(value) as T
  } catch {
    return value as T
  }
}

function redisConnection() {
  const rawUrl = process.env.REDIS_URL
  if (!rawUrl) throw new Error("REDIS_URL is not configured")

  const url = new URL(rawUrl)
  const port = Number(url.port || 6379)
  const secure = url.protocol === "rediss:"
  const username = url.username ? decodeURIComponent(url.username) : ""
  const password = url.password ? decodeURIComponent(url.password) : ""
  return { url, port, secure, username, password }
}

function authCommand(username: string, password: string): string {
  if (!password) return ""
  return username ? encodeCommand(["AUTH", username, password]) : encodeCommand(["AUTH", password])
}

async function redisCommand(parts: Array<string | number>): Promise<RedisValue> {
  const { url, port, secure, username, password } = redisConnection()

  return await new Promise((resolve, reject) => {
    const socket = secure
      ? tls.connect({ host: url.hostname, port, servername: url.hostname, timeout: 15_000 })
      : net.connect({ host: url.hostname, port, timeout: 15_000 })
    let data = Buffer.alloc(0)
    let settled = false

    function settle(callback: () => void) {
      if (settled) return
      settled = true
      callback()
    }

    socket.on(secure ? "secureConnect" : "connect", () => {
      socket.write(`${authCommand(username, password)}${encodeCommand(parts)}`)
    })
    socket.on("data", (chunk: Buffer) => {
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
    socket.on("error", (error: Error) => settle(() => reject(error)))
  })
}

async function redisRawCommand(parts: Array<string | number>): Promise<RawRedisValue> {
  const { url, port, secure, username, password } = redisConnection()

  return await new Promise((resolve, reject) => {
    const socket = secure
      ? tls.connect({ host: url.hostname, port, servername: url.hostname, timeout: 15_000 })
      : net.connect({ host: url.hostname, port, timeout: 15_000 })
    let data = Buffer.alloc(0)
    let settled = false

    function settle(callback: () => void) {
      if (settled) return
      settled = true
      callback()
    }

    socket.on(secure ? "secureConnect" : "connect", () => {
      socket.write(`${authCommand(username, password)}${encodeCommand(parts)}`)
    })
    socket.on("data", (chunk: Buffer) => {
      data = Buffer.concat([data, chunk])
      const first = password ? parseRawReply(data) : { value: "OK", offset: 0 }
      if (!first) return
      const reply = parseRawReply(data, first.offset)
      if (!reply) return
      socket.end()
      settle(() => resolve(reply.value))
    })
    socket.on("timeout", () => {
      socket.destroy()
      settle(() => reject(new Error("Redis command timed out")))
    })
    socket.on("error", (error: Error) => settle(() => reject(error)))
  })
}

async function restCommand(parts: Array<string | number>): Promise<RedisValue> {
  const endpoint = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN
  if (!endpoint || !token) throw new Error("REDIS_URL or Upstash REST variables are not configured")

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
      connection: "close",
    },
    body: JSON.stringify(parts),
    signal: AbortSignal.timeout(15_000),
  })
  const payload = (await response.json()) as { result?: RedisValue; error?: string }
  if (!response.ok || payload.error) throw new Error(payload.error || `Redis REST returned HTTP ${response.status}`)
  return payload.result ?? null
}

async function command(parts: Array<string | number>): Promise<RedisValue> {
  if (process.env.REDIS_URL) return redisCommand(parts)
  return restCommand(parts)
}

async function getString(key: string): Promise<RedisValue> {
  const useRest = !process.env.REDIS_URL && (process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL)
  if (useRest) {
    const size = await restCommand(["STRLEN", key])
    if (typeof size === "number" && size > REST_CHUNK_BYTES && process.env.REDIS_URL) {
      const chunks: Buffer[] = []
      for (let start = 0; start < size; start += REST_CHUNK_BYTES) {
        const chunk = await redisRawCommand(["GETRANGE", key, start, Math.min(size - 1, start + REST_CHUNK_BYTES - 1)])
        if (!Buffer.isBuffer(chunk)) throw new Error(`Unexpected Redis chunk type for ${key}`)
        chunks.push(chunk)
      }
      return Buffer.concat(chunks).toString("utf8")
    }
  }
  return command(["GET", key])
}

function serialize(value: unknown): string {
  return typeof value === "string" ? value : JSON.stringify(value)
}

const KEYS_KV = "upgrader_access_keys"
const GLOBAL_KV = "upgrader_global_state"
const ADMIN_PASSWORD_KV = "upgrader_admin_password"
const ACCOUNT_PREFIX = "upgrader_account:"
const KEY_LAST_SEEN_PREFIX = "upgrader_access_key_last_seen:"

type AccessKeyRow = {
  code: string
  label: string
  days: number | string
  created_at: number | string
  expires_at: number | string
  revoked: boolean
  last_seen: number | string | null
}

function dbValue<T>(value: unknown): T {
  return value as T
}

function jsonbParam(value: unknown): string {
  return JSON.stringify(value)
}

function accountCode(key: string): string | null {
  return key.startsWith(ACCOUNT_PREFIX) ? key.slice(ACCOUNT_PREFIX.length) : null
}

function lastSeenCode(key: string): string | null {
  return key.startsWith(KEY_LAST_SEEN_PREFIX) ? key.slice(KEY_LAST_SEEN_PREFIX.length) : null
}

function settingTable(key: string): boolean {
  return key === GLOBAL_KV || key === ADMIN_PASSWORD_KV
}

async function dbGet<T = unknown>(key: string): Promise<T | null> {
  const code = accountCode(key)
  if (code) {
    const result = await query<{ data: unknown }>("SELECT data FROM accounts WHERE code = $1", [code])
    return result.rows.length ? dbValue<T>(result.rows[0].data) : null
  }

  const seenCode = lastSeenCode(key)
  if (seenCode) {
    const result = await query<{ last_seen: number | string | null }>("SELECT last_seen FROM access_keys WHERE code = $1", [seenCode])
    const value = result.rows[0]?.last_seen
    return value === null || value === undefined ? null : (Number(value) as T)
  }

  if (key === KEYS_KV) {
    const result = await query<AccessKeyRow>("SELECT code, label, days, created_at, expires_at, revoked, last_seen FROM access_keys")
    const map: Record<string, unknown> = {}
    for (const row of result.rows) {
      map[row.code] = {
        code: row.code,
        label: row.label,
        days: Number(row.days),
        createdAt: Number(row.created_at),
        expiresAt: Number(row.expires_at),
        revoked: row.revoked,
        lastSeen: row.last_seen === null ? null : Number(row.last_seen),
      }
    }
    return map as T
  }

  const table = settingTable(key) ? "app_settings" : "app_kv"
  const result = await query<{ value: unknown }>(`SELECT value FROM ${table} WHERE key = $1`, [key])
  return result.rows.length ? dbValue<T>(result.rows[0].value) : null
}

async function dbSet(key: string, value: unknown): Promise<unknown> {
  const code = accountCode(key)
  if (code) {
    await query(
      `INSERT INTO accounts (code, data, updated_at)
       VALUES ($1, $2::jsonb, now())
       ON CONFLICT (code) DO UPDATE SET data = EXCLUDED.data, updated_at = now()`,
      [code, jsonbParam(value)],
    )
    return "OK"
  }

  const seenCode = lastSeenCode(key)
  if (seenCode) {
    await query("UPDATE access_keys SET last_seen = $2 WHERE code = $1", [seenCode, Number(value)])
    return "OK"
  }

  if (key === KEYS_KV) {
    const map = value && typeof value === "object" ? (value as Record<string, any>) : {}
    const codes = Object.keys(map)
    await withTransaction(async (client) => {
      if (codes.length) {
        await client.query("DELETE FROM access_keys WHERE NOT (code = ANY($1::text[]))", [codes])
      } else {
        await client.query("DELETE FROM access_keys")
      }

      for (const code of codes) {
        const item = map[code]
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
            item.lastSeen === null || item.lastSeen === undefined ? null : Number(item.lastSeen),
          ],
        )
      }
    })
    return "OK"
  }

  const table = settingTable(key) ? "app_settings" : "app_kv"
  await query(
    `INSERT INTO ${table} (key, value, updated_at)
     VALUES ($1, $2::jsonb, now())
     ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now()`,
    [key, jsonbParam(value)],
  )
  return "OK"
}

async function dbDel(key: string): Promise<unknown> {
  const code = accountCode(key)
  if (code) {
    const result = await query("DELETE FROM accounts WHERE code = $1", [code])
    return result.rowCount || 0
  }

  const seenCode = lastSeenCode(key)
  if (seenCode) {
    await query("UPDATE access_keys SET last_seen = NULL WHERE code = $1", [seenCode])
    return 1
  }

  if (key === KEYS_KV) {
    const result = await query("DELETE FROM access_keys")
    return result.rowCount || 0
  }

  const table = settingTable(key) ? "app_settings" : "app_kv"
  const result = await query(`DELETE FROM ${table} WHERE key = $1`, [key])
  return result.rowCount || 0
}

async function dbExists(key: string): Promise<number> {
  const code = accountCode(key)
  if (code) {
    const result = await query<{ exists: boolean }>("SELECT EXISTS (SELECT 1 FROM accounts WHERE code = $1)", [code])
    return result.rows[0]?.exists ? 1 : 0
  }

  const seenCode = lastSeenCode(key)
  if (seenCode) {
    const result = await query<{ exists: boolean }>("SELECT EXISTS (SELECT 1 FROM access_keys WHERE code = $1 AND last_seen IS NOT NULL)", [seenCode])
    return result.rows[0]?.exists ? 1 : 0
  }

  if (key === KEYS_KV) {
    const result = await query<{ exists: boolean }>("SELECT EXISTS (SELECT 1 FROM access_keys LIMIT 1)")
    return result.rows[0]?.exists ? 1 : 0
  }

  const table = settingTable(key) ? "app_settings" : "app_kv"
  const result = await query<{ exists: boolean }>(`SELECT EXISTS (SELECT 1 FROM ${table} WHERE key = $1)`, [key])
  return result.rows[0]?.exists ? 1 : 0
}

export const kv = {
  async get<T = unknown>(key: string): Promise<T | null> {
    if (hasDatabase()) return dbGet<T>(key)
    return deserialize<T>(await getString(key))
  },

  async set(key: string, value: unknown): Promise<unknown> {
    if (hasDatabase()) return dbSet(key, value)
    return command(["SET", key, serialize(value)])
  },

  async del(key: string): Promise<unknown> {
    if (hasDatabase()) return dbDel(key)
    return command(["DEL", key])
  },

  async exists(key: string): Promise<number> {
    if (hasDatabase()) return dbExists(key)
    const result = await command(["EXISTS", key])
    return typeof result === "number" ? result : 0
  },
}
