import net from "node:net"
import tls from "node:tls"
import { kv as vercelKv } from "@vercel/kv"

type RedisValue = string | number | null | RedisValue[]
type ParsedReply = { value: RedisValue; offset: number }
type RawRedisValue = Buffer | string | number | null | RawRedisValue[]
type ParsedRawReply = { value: RawRedisValue; offset: number }

const REST_CHUNK_BYTES = 8 * 1024

function shouldUseDirectKv(): boolean {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN)
}

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

async function redisCommand(parts: Array<string | number>): Promise<RedisValue> {
  const rawUrl = process.env.REDIS_URL
  if (!rawUrl) throw new Error("REDIS_URL is not configured")

  const url = new URL(rawUrl)
  const password = decodeURIComponent(url.password)
  const username = url.username ? decodeURIComponent(url.username) : "default"
  const port = Number(url.port || 6379)
  const secure = url.protocol === "rediss:"

  return await new Promise((resolve, reject) => {
    const socket = (secure ? tls : net).connect({
      host: url.hostname,
      port,
      servername: secure ? url.hostname : undefined,
      timeout: 15_000,
    })
    let data = Buffer.alloc(0)
    let settled = false

    function settle(callback: () => void) {
      if (settled) return
      settled = true
      callback()
    }

    socket.on(secure ? "secureConnect" : "connect", () => {
      socket.write(`${encodeCommand(["AUTH", username, password])}${encodeCommand(parts)}`)
    })
    socket.on("data", (chunk) => {
      data = Buffer.concat([data, chunk])
      const auth = parseReply(data)
      if (auth) {
        const reply = parseReply(data, auth.offset)
        if (!reply) return
        socket.end()
        settle(() => resolve(reply.value))
      }
    })
    socket.on("timeout", () => {
      socket.destroy()
      settle(() => reject(new Error("Redis command timed out")))
    })
    socket.on("error", (error) => settle(() => reject(error)))
  })
}

async function redisRawCommand(parts: Array<string | number>): Promise<RawRedisValue> {
  const rawUrl = process.env.REDIS_URL
  if (!rawUrl) throw new Error("REDIS_URL is not configured")

  const url = new URL(rawUrl)
  const password = decodeURIComponent(url.password)
  const username = url.username ? decodeURIComponent(url.username) : "default"
  const port = Number(url.port || 6379)
  const secure = url.protocol === "rediss:"

  return await new Promise((resolve, reject) => {
    const socket = (secure ? tls : net).connect({
      host: url.hostname,
      port,
      servername: secure ? url.hostname : undefined,
      timeout: 15_000,
    })
    let data = Buffer.alloc(0)
    let settled = false

    function settle(callback: () => void) {
      if (settled) return
      settled = true
      callback()
    }

    socket.on(secure ? "secureConnect" : "connect", () => {
      socket.write(`${encodeCommand(["AUTH", username, password])}${encodeCommand(parts)}`)
    })
    socket.on("data", (chunk) => {
      data = Buffer.concat([data, chunk])
      const auth = parseRawReply(data)
      if (auth) {
        const reply = parseRawReply(data, auth.offset)
        if (!reply) return
        socket.end()
        settle(() => resolve(reply.value))
      }
    })
    socket.on("timeout", () => {
      socket.destroy()
      settle(() => reject(new Error("Redis command timed out")))
    })
    socket.on("error", (error) => settle(() => reject(error)))
  })
}

async function restCommand(parts: Array<string | number>): Promise<RedisValue> {
  const endpoint = process.env.KV_REST_API_URL
  const token = process.env.KV_REST_API_TOKEN
  if (!endpoint || !token) throw new Error("KV_REST_API_URL or KV_REST_API_TOKEN is not configured")

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
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) return restCommand(parts)
  return redisCommand(parts)
}

async function getString(key: string): Promise<RedisValue> {
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
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

export const kv = {
  async get<T = unknown>(key: string): Promise<T | null> {
    if (!shouldUseDirectKv()) return vercelKv.get<T>(key)
    return deserialize<T>(await getString(key))
  },

  async set(key: string, value: unknown): Promise<unknown> {
    if (!shouldUseDirectKv()) return vercelKv.set(key, value)
    return command(["SET", key, serialize(value)])
  },

  async del(key: string): Promise<unknown> {
    if (!shouldUseDirectKv()) return vercelKv.del(key)
    return command(["DEL", key])
  },

  async exists(key: string): Promise<number> {
    if (!shouldUseDirectKv()) return (vercelKv as unknown as { exists: (key: string) => Promise<number> }).exists(key)
    const result = await command(["EXISTS", key])
    return typeof result === "number" ? result : 0
  },
}
