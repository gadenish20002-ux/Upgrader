import { kv } from "@vercel/kv"
import { DEFAULT_STATE } from "./default-data"
import type { AppState } from "./types"

// ─────────────────────────────────────────────────────────────────────────────
// Access-key + per-account storage layer (Vercel KV)
//
//   upgrader_access_keys        → Record<code, AccessKey>   (map of all keys)
//   upgrader_account:{code}     → Partial<AppState>         (one account per key)
//   upgrader_global_state       → global/site fields (existing key, см. /api/state)
//
// A "key" is both the login credential and the account id. Entering a valid,
// non-revoked, non-expired key logs the player into the account stored under it.
// ─────────────────────────────────────────────────────────────────────────────

export const KEYS_KV = "upgrader_access_keys"
export const GLOBAL_KV = "upgrader_global_state"
export const ADMIN_ACCOUNT = "__default__" // template account the admin edits with no key selected
const KEY_LAST_SEEN_PREFIX = "upgrader_access_key_last_seen:"

// Normalize an incoming key/account code. Real keys are upper-case (A-Z2-9);
// the ADMIN_ACCOUNT sentinel must be preserved verbatim (it contains lowercase).
export function normalizeCode(raw: string | null | undefined): string {
  const c = (raw || "").trim()
  return c === ADMIN_ACCOUNT ? ADMIN_ACCOUNT : c.toUpperCase()
}

export interface AccessKey {
  code: string
  label: string
  days: number
  createdAt: number
  expiresAt: number
  revoked: boolean
  lastSeen: number | null
}

// Fields that belong to an individual account (per key). Everything else in
// AppState is global/site-wide (online, upgrades counter…).
// NOTE: fastMultipliers/fastPercentages/soundMode/fastMode are per-user
// preferences (set via the upgrade settings modal / header toggles). They must
// be account-scoped — otherwise a non-admin player can't persist them and the
// 2s /api/state poll resets them back to the global defaults after ~2s.
export const ACCOUNT_FIELDS = [
  "balance",
  "inventory",
  "loggedIn",
  "username",
  "userId",
  "avatar",
  "userUpgrades",
  "itemHistory",
  "withdrawnItems",
  "predict",
  "gameHistory",
  "fastMultipliers",
  "fastPercentages",
  "soundMode",
  "fastMode",
] as const

export type AccountState = Pick<AppState, (typeof ACCOUNT_FIELDS)[number]>

export function accountKvKey(code: string): string {
  return `upgrader_account:${code}`
}

function keyLastSeenKvKey(code: string): string {
  return `${KEY_LAST_SEEN_PREFIX}${code}`
}

export function defaultAccount(): AccountState {
  const out: any = {}
  for (const f of ACCOUNT_FIELDS) out[f] = (DEFAULT_STATE as any)[f]
  return out as AccountState
}

export function pickAccountFields(obj: any): Partial<AccountState> {
  const out: any = {}
  if (!obj || typeof obj !== "object") return out
  for (const f of ACCOUNT_FIELDS) {
    if (f in obj) out[f] = obj[f]
  }
  return out
}

// Unambiguous alphabet (no 0/O/1/I) → format AAAA-AAAA
const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
export function generateCode(): string {
  let s = ""
  for (let i = 0; i < 8; i++) {
    if (i === 4) s += "-"
    s += ALPHABET[Math.floor(Math.random() * ALPHABET.length)]
  }
  return s
}

export async function getAllKeys(): Promise<Record<string, AccessKey>> {
  const data = (await kv.get<Record<string, AccessKey>>(KEYS_KV)) || {}
  const codes = Object.keys(data)
  if (codes.length === 0) return data

  // lastSeen is stored separately so a login cannot overwrite the whole key map
  // with a stale snapshot while an administrator creates/revokes/extends a key.
  const lastSeenValues = await Promise.all(
    codes.map(async (code) => {
      try {
        return await kv.get<number>(keyLastSeenKvKey(code))
      } catch {
        return null
      }
    }),
  )

  const result: Record<string, AccessKey> = {}
  codes.forEach((code, index) => {
    const key = data[code]
    const separateLastSeen = lastSeenValues[index]
    result[code] = {
      ...key,
      lastSeen: typeof separateLastSeen === "number" ? separateLastSeen : key.lastSeen,
    }
  })
  return result
}

export async function saveAllKeys(map: Record<string, AccessKey>): Promise<void> {
  await kv.set(KEYS_KV, map)
}

export async function getKey(code: string): Promise<AccessKey | null> {
  if (!code) return null
  const map = await getAllKeys()
  return map[code.toUpperCase()] || null
}

export type KeyStatus = "active" | "expired" | "revoked" | "missing"

export function keyStatus(key: AccessKey | null): KeyStatus {
  if (!key) return "missing"
  if (key.revoked) return "revoked"
  if (Date.now() >= key.expiresAt) return "expired"
  return "active"
}

export function daysLeft(key: AccessKey): number {
  return Math.max(0, Math.ceil((key.expiresAt - Date.now()) / 86_400_000))
}

export async function getAdminPassword(): Promise<string> {
  try {
    const g = await kv.get<any>(GLOBAL_KV)
    if (g && typeof g.adminPassword === "string") return g.adminPassword
  } catch {}
  return DEFAULT_STATE.adminPassword
}

// Admin auth: empty stored password means admin is open (matches site behaviour
// where an empty adminPassword disables the gate).
export async function isAdmin(provided: string | null): Promise<boolean> {
  const real = await getAdminPassword()
  if (!real) return true
  return provided === real
}

export async function getAccount(code: string): Promise<AccountState> {
  const stored = await kv.get<Partial<AccountState>>(accountKvKey(code))
  return { ...defaultAccount(), ...(stored || {}) }
}

export async function patchAccount(code: string, patch: Partial<AccountState>): Promise<AccountState> {
  const current = await kv.get<Partial<AccountState>>(accountKvKey(code))
  const base = current || defaultAccount()
  const next = { ...base, ...pickAccountFields(patch) }
  await kv.set(accountKvKey(code), next)
  return next as AccountState
}

export async function resetAccount(code: string): Promise<void> {
  await kv.set(accountKvKey(code), defaultAccount())
}

// Fields cleared by a "reset history" — same set the old single account wiped:
// inventory, game/item history, withdrawn items and the user's upgrade counter.
// Balance, username and predict settings are kept.
export const HISTORY_FIELDS = [
  "inventory",
  "userUpgrades",
  "itemHistory",
  "withdrawnItems",
  "gameHistory",
] as const

export async function resetAccountHistory(code: string): Promise<void> {
  const def = defaultAccount() as any
  const patch: any = {}
  for (const f of HISTORY_FIELDS) patch[f] = def[f]
  await patchAccount(code, patch)
}

export async function touchKey(code: string): Promise<void> {
  const normalized = normalizeCode(code)
  if (!normalized || normalized === ADMIN_ACCOUNT) return

  // Keep this as an independent write. Updating the entire KEYS_KV map here
  // caused concurrent account polling/login requests to restore stale key maps,
  // which intermittently made valid keys disappear and forced another login.
  await kv.set(keyLastSeenKvKey(normalized), Date.now())
}
