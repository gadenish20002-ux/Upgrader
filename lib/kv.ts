import net from "node:net"
import tls from "node:tls"
import { kv as vercelKv } from "@vercel/kv"

type RedisValue = string | number | null | RedisValue[]
type ParsedReply = { value: RedisValue; offset: number }

function shouldUseRedisUrl(): boolean {
  return Boolean(process.env.REDIS_URL)
}

function encodeCommand(parts: Array<string | number>): string {
  return `*${parts.length}\r\n${parts
    .map((part) => {
      const value = String(part)
      return `$${Buffer.byteLength(value)}\r\n${value}\r\n`
    })
    .join("")}`
}

function parseReply(input: string, offset = 0): ParsedReply | null {
  const lineEnd = input.indexOf("\r\n", offset)
  if (lineEnd === -1) return null
  const type = input[offset]
  const line = input.slice(offset + 1, lineEnd)

  if (type === "$") {
    const length = Number(line)
    if (length === -1) return { value: null, offset: lineEnd + 2 }
    if (!Number.isFinite(length) || length < 0) throw new Error("Invalid Redis bulk length")
    const start = lineEnd + 2
    const end = start + length
    if (input.length < end + 2) return null
    return { value: input.slice(start, end), offset: end + 2 }
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
    let data = ""

    socket.on(secure ? "secureConnect" : "connect", () => {
      socket.write(`${encodeCommand(["AUTH", username, password])}${encodeCommand(parts)}`)
    })
    socket.on("data", (chunk) => {
      data += chunk.toString("utf8")
      const auth = parseReply(data)
      if (auth) {
        const reply = parseReply(data, auth.offset)
        if (!reply) return
        socket.end()
        resolve(reply.value)
      }
    })
    socket.on("timeout", () => {
      socket.destroy()
      reject(new Error("Redis command timed out"))
    })
    socket.on("error", reject)
  })
}

function serialize(value: unknown): string {
  return typeof value === "string" ? value : JSON.stringify(value)
}

export const kv = {
  async get<T = unknown>(key: string): Promise<T | null> {
    if (!shouldUseRedisUrl()) return vercelKv.get<T>(key)
    return deserialize<T>(await redisCommand(["GET", key]))
  },

  async set(key: string, value: unknown): Promise<unknown> {
    if (!shouldUseRedisUrl()) return vercelKv.set(key, value)
    return redisCommand(["SET", key, serialize(value)])
  },

  async del(key: string): Promise<unknown> {
    if (!shouldUseRedisUrl()) return vercelKv.del(key)
    return redisCommand(["DEL", key])
  },
}
