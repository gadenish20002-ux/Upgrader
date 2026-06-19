"use client"

import { createContext, useContext, useEffect, useState, useCallback, useRef, type ReactNode } from "react"
import { usePathname } from "next/navigation"
import type { AppState, Skin, InventoryItem } from "./types"
import { DEFAULT_STATE, currentGlobalUpgrades } from "./default-data"

let syncTimeout: NodeJS.Timeout | null = null
const pendingAccountChanges: Record<string, any> = {}
const pendingGlobalChanges: Record<string, any> = {}
// Account fields that were written locally (optimistically) but not yet confirmed
// by the server. While a field is "dirty" the background poll must NOT overwrite it
// with stale server data — otherwise a just-consumed skin reappears after a loss
// (the "через раз" bug). field -> JSON of the value we last wrote locally.
const dirtyAccountFields: Record<string, string> = {}

// Per-account fields (synced to /api/account?key=). Everything else is global
// site state (synced to /api/state). KEEP IN SYNC with ACCOUNT_FIELDS in lib/keys.ts.
const ACCOUNT_FIELDS = new Set<string>([
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
])

const ADMIN_ACCOUNT = "__default__"
const ACCOUNT_KEY_STORAGE = "upgrader_account_key" // player's key
const ADMIN_ACTIVE_KEY_STORAGE = "upgrader_admin_active_key" // account the admin is managing
const ADMIN_PWD_STORAGE = "upgrader_admin_pwd"
const ACCOUNT_KEY_TS_STORAGE = "upgrader_account_key_ts"
const SESSION_TTL_MS = 24 * 60 * 60 * 1000

function isAdminPath(pathname: string | null): boolean {
  return !!pathname && pathname.startsWith("/admin")
}

function resolveAccountKey(adminScope: boolean): string | null {
  if (typeof window === "undefined") return null
  if (adminScope) {
    return window.localStorage.getItem(ADMIN_ACTIVE_KEY_STORAGE) || ADMIN_ACCOUNT
  }
  return window.localStorage.getItem(ACCOUNT_KEY_STORAGE)
}

function accountSessionExpired(): boolean {
  if (typeof window === "undefined") return false
  const raw = window.localStorage.getItem(ACCOUNT_KEY_TS_STORAGE)
  const ts = raw ? parseInt(raw, 10) : 0
  return !Number.isFinite(ts) || !ts || Date.now() - ts >= SESSION_TTL_MS
}

function activeAccountKey(fallback: string | null): string | null {
  if (typeof window === "undefined") return fallback
  const fromStorage = window.localStorage.getItem(ACCOUNT_KEY_STORAGE)
  return fromStorage || fallback
}

// Attach the admin password when we are on an admin page OR when the active
// account is the admin's own account (admin "logged in as administrator" on the
// public site). Both cases require x-admin-password on /api/account & /api/state.
function authHeaders(accountKey: string | null): Record<string, string> {
  const h: Record<string, string> = { "Content-Type": "application/json" }
  if (typeof window !== "undefined") {
    const onAdminPath = isAdminPath(window.location.pathname)
    if (onAdminPath || accountKey === ADMIN_ACCOUNT) {
      const pwd = window.localStorage.getItem(ADMIN_PWD_STORAGE)
      if (pwd) h["x-admin-password"] = pwd
    }
  }
  return h
}

interface StoreContextValue {
  state: AppState
  ready: boolean
  accountKey: string | null
  setState: (updater: (prev: AppState) => AppState) => void
  // helpers
  login: () => void
  logout: () => void
  addToInventory: (skinId: string) => string
  removeFromInventory: (uids: string[]) => void
  setBalance: (value: number) => void
  resetAll: () => void
  addGameHistory: (entry: import("./types").GameHistoryEntry) => void
  addItemHistory: (entries: import("./types").ItemHistoryEntry[]) => void
}

const StoreContext = createContext<StoreContextValue | null>(null)

function storageKeyFor(accountKey: string | null): string {
  return `upgrader_state_v4:${accountKey || "none"}`
}

function loadState(storageKey: string, catalogSkins: Skin[] = DEFAULT_STATE.skins): AppState {
  if (typeof window === "undefined") return { ...DEFAULT_STATE, skins: catalogSkins, upgradeSkins: catalogSkins }
  try {
    const raw = window.localStorage.getItem(storageKey)
    if (!raw) return { ...DEFAULT_STATE, skins: catalogSkins, upgradeSkins: catalogSkins }
    const parsed = JSON.parse(raw)
    return {
      ...DEFAULT_STATE,
      ...parsed,
      skins: catalogSkins,
      upgradeSkins: catalogSkins,
      upgrades: currentGlobalUpgrades(),
    }
  } catch {
    return { ...DEFAULT_STATE, skins: catalogSkins, upgradeSkins: catalogSkins }
  }
}

function applyCatalogPriceMap(prices: Record<string, unknown>): Skin[] {
  if (!prices || typeof prices !== "object") return DEFAULT_STATE.skins
  return DEFAULT_STATE.skins.map((skin) => {
    const price = prices[skin.id]
    return typeof price === "number" && Number.isFinite(price) && price > 0
      ? { ...skin, price }
      : skin
  })
}

function isSkin(value: unknown): value is Skin {
  if (!value || typeof value !== "object") return false
  const skin = value as Partial<Skin>
  return (
    typeof skin.id === "string" &&
    typeof skin.name === "string" &&
    typeof skin.weapon === "string" &&
    typeof skin.wear === "string" &&
    typeof skin.price === "number" &&
    Number.isFinite(skin.price) &&
    skin.price > 0 &&
    typeof skin.image === "string" &&
    typeof skin.rarity === "string"
  )
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const adminScope = isAdminPath(pathname)

  const [accountKey, setAccountKey] = useState<string | null>(null)
  const [state, setInternal] = useState<AppState>(DEFAULT_STATE)
  const [ready, setReady] = useState(false)
  const lastSyncTime = useRef<number>(0)
  const fetchInFlight = useRef(false)
  const accountKeyRef = useRef<string | null>(null)
  const catalogSkinsRef = useRef<Skin[]>(DEFAULT_STATE.skins)
  accountKeyRef.current = accountKey

  // Prices are a compact, daily-updated overlay. Existing IDs remain stable;
  // newly released Steam skins are appended with their own deterministic IDs.
  useEffect(() => {
    let cancelled = false
    fetch(`/api/v1/skin-prices?t=${Date.now()}`, { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((payload) => {
        if (cancelled || !payload || !payload.prices) return
        const additions: Skin[] = Array.isArray(payload.skins) ? payload.skins.filter(isSkin) : []
        const catalogSkins = [...applyCatalogPriceMap(payload.prices), ...additions]
        catalogSkinsRef.current = catalogSkins
        setInternal((prev) => ({ ...prev, skins: catalogSkins, upgradeSkins: catalogSkins }))
      })
      .catch(() => {
        // Keep the bundled catalog when Steam/KV is temporarily unavailable.
      })
    return () => {
      cancelled = true
    }
  }, [])

  // Resolve the active account key for this scope (and react to changes made by
  // the gate / admin account selector in other parts of the app).
  useEffect(() => {
    function refresh() {
      setAccountKey(resolveAccountKey(adminScope))
    }
    refresh()
    window.addEventListener("storage", refresh)
    window.addEventListener("upgrader-account-key-changed", refresh as EventListener)
    return () => {
      window.removeEventListener("storage", refresh)
      window.removeEventListener("upgrader-account-key-changed", refresh as EventListener)
    }
  }, [adminScope])

  useEffect(() => {
    const storageKey = storageKeyFor(accountKey)
    setReady(false)
    setInternal(loadState(storageKey, catalogSkinsRef.current))

    // Switching accounts → drop any un-acked optimistic state from the previous one
    // so it can't leak into / block the freshly loaded account.
    for (const k in dirtyAccountFields) delete dirtyAccountFields[k]
    for (const k in pendingAccountChanges) delete pendingAccountChanges[k]

    let cancelled = false

    async function fetchState() {
      if (Date.now() < syncManager.suppressUntil) return
      if (Date.now() - lastSyncTime.current < 1500) return
      if (fetchInFlight.current) return
      fetchInFlight.current = true

      try {
        const wantAccount = adminScope || !!accountKey
        const [globalRes, accountRes] = await Promise.all([
          fetch(`/api/state?t=${Date.now()}`, { cache: "no-store" }),
          wantAccount && accountKey
            ? fetch(`/api/account?key=${encodeURIComponent(accountKey)}&t=${Date.now()}`, {
                cache: "no-store",
                headers: authHeaders(accountKey),
              })
            : Promise.resolve(null as any),
        ])

        if (cancelled) return

        // Player key no longer valid → kick back to the gate. A stale response
        // for an old key must not clear a newer session selected in this tab.
        if (
          !adminScope &&
          accountKey &&
          accountRes &&
          (accountRes.status === 403 || accountRes.status === 401) &&
          activeAccountKey(null) === accountKey
        ) {
          try {
            window.localStorage.removeItem(ACCOUNT_KEY_STORAGE)
            window.localStorage.removeItem(ACCOUNT_KEY_TS_STORAGE)
          } catch {}
          window.dispatchEvent(new CustomEvent("upgrader-account-invalid"))
          return
        }

        const globalState = globalRes.ok ? await globalRes.json() : {}
        let accountState: Record<string, unknown> = {}
        if (accountRes && accountRes.ok) {
          const j = await accountRes.json()
          accountState = j.account || {}
        }

        setInternal((prev) => {
          const next: AppState = {
            ...DEFAULT_STATE,
            ...globalState,
            ...accountState,
            skins: catalogSkinsRef.current,
            upgradeSkins: catalogSkinsRef.current,
            upgrades: currentGlobalUpgrades(),
          }
          // Keep optimistic, not-yet-confirmed local account changes (e.g. the
          // inventory after a spin) instead of clobbering them with stale server data.
          for (const k in dirtyAccountFields) {
            ;(next as any)[k] = (prev as any)[k]
          }
          try {
            window.localStorage.setItem(storageKey, JSON.stringify(next))
          } catch {}
          return next
        })
      } catch (err) {
        console.error("Failed to fetch state", err)
      } finally {
        fetchInFlight.current = false
      }
    }

    let interval: NodeJS.Timeout
    async function init() {
      await fetchState()
      if (cancelled) return
      setReady(true)
      interval = setInterval(fetchState, 10_000)
    }

    init()
    return () => {
      cancelled = true
      if (interval) clearInterval(interval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountKey, adminScope])

  // persist + route changes to the correct backend (account vs global)
  const setState = useCallback(
    (updater: (prev: AppState) => AppState) => {
      setInternal((prev) => {
        const next = updater(prev)
        const { skins, upgradeSkins, ...strippedNext } = next

        const changes: Partial<AppState> = {}
        let hasChanges = false
        for (const key in strippedNext) {
          if (
            JSON.stringify(strippedNext[key as keyof typeof strippedNext]) !==
            JSON.stringify(prev[key as keyof AppState])
          ) {
            changes[key as keyof AppState] = strippedNext[key as keyof typeof strippedNext] as any
            hasChanges = true
          }
        }

        if (!hasChanges) return prev

        const finalState = { ...prev, ...changes }
        const storageKey = storageKeyFor(accountKeyRef.current)
        try {
          window.localStorage.setItem(storageKey, JSON.stringify(finalState))
        } catch {}

        lastSyncTime.current = Date.now()

        // split changes into account vs global buckets
        for (const key in changes) {
          if (ACCOUNT_FIELDS.has(key)) {
            pendingAccountChanges[key] = (changes as any)[key]
            // mark as un-acked so the poll won't overwrite it until the server confirms
            dirtyAccountFields[key] = JSON.stringify((changes as any)[key])
          } else {
            pendingGlobalChanges[key] = (changes as any)[key]
          }
        }

        if (syncTimeout) clearTimeout(syncTimeout)
        syncTimeout = setTimeout(() => {
          const admin = isAdminPath(window.location.pathname)
          const key = admin ? accountKeyRef.current : activeAccountKey(accountKeyRef.current)

          const accountToSend = { ...pendingAccountChanges }
          const globalToSend = { ...pendingGlobalChanges }
          for (const k in pendingGlobalChanges) delete pendingGlobalChanges[k]

          if (key && Object.keys(accountToSend).length > 0 && (admin || !accountSessionExpired())) {
            for (const k in pendingAccountChanges) delete pendingAccountChanges[k]
            fetch(`/api/account?key=${encodeURIComponent(key)}&t=${Date.now()}`, {
              method: "PATCH",
              headers: authHeaders(key),
              body: JSON.stringify(accountToSend),
              cache: "no-store",
            })
              .then((res) => {
                if (!res || !res.ok) return
                // Server confirmed these values → stop protecting them from the poll,
                // but only if they haven't been re-written locally in the meantime.
                for (const k in accountToSend) {
                  if (dirtyAccountFields[k] === JSON.stringify((accountToSend as any)[k])) {
                    delete dirtyAccountFields[k]
                  }
                }
              })
              .catch((err) => console.error("Failed to sync account", err))
          }

          // Only the admin scope may mutate global/site state.
          if (admin && Object.keys(globalToSend).length > 0) {
            fetch(`/api/state?t=${Date.now()}`, {
              method: "PATCH",
              headers: authHeaders(ADMIN_ACCOUNT),
              body: JSON.stringify(globalToSend),
              cache: "no-store",
            }).catch((err) => console.error("Failed to sync global state", err))
          }
        }, 200)

        return finalState
      })
    },
    [],
  )

  const persistAccountPatch = useCallback((patch: Partial<AppState>) => {
    const key = activeAccountKey(accountKeyRef.current)
    if (!key || accountSessionExpired()) return

    fetch(`/api/account?key=${encodeURIComponent(key)}&t=${Date.now()}`, {
      method: "PATCH",
      headers: authHeaders(key),
      body: JSON.stringify(patch),
      cache: "no-store",
    })
      .then((res) => {
        if (!res || !res.ok) return
        for (const k in patch) {
          if (dirtyAccountFields[k] === JSON.stringify((patch as any)[k])) {
            delete dirtyAccountFields[k]
          }
        }
      })
      .catch((err) => console.error("Failed to sync account", err))
  }, [])

  // cross-tab sync
  useEffect(() => {
    const storageKey = storageKeyFor(accountKey)
    function onStorage(e: StorageEvent) {
      if (e.key === storageKey && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue)
          setInternal({
            ...DEFAULT_STATE,
            ...parsed,
            skins: catalogSkinsRef.current,
            upgradeSkins: catalogSkinsRef.current,
            upgrades: currentGlobalUpgrades(),
          })
        } catch {}
      }
    }
    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [accountKey])

  const login = useCallback(() => {
    setState((p) => ({ ...p, loggedIn: true }))
    persistAccountPatch({ loggedIn: true })
  }, [setState, persistAccountPatch])

  const logout = useCallback(() => {
    setState((p) => ({ ...p, loggedIn: false }))
    persistAccountPatch({ loggedIn: false })
  }, [setState, persistAccountPatch])

  const addToInventory = useCallback(
    (skinId: string) => {
      const uid = `inv-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
      setState((p) => {
        const item: InventoryItem = { uid, skinId }
        return { ...p, inventory: [item, ...p.inventory], upgrades: p.upgrades + 1, userUpgrades: p.userUpgrades + 1 }
      })
      return uid
    },
    [setState],
  )

  const removeFromInventory = useCallback(
    (uids: string[]) => {
      setState((p) => ({ ...p, inventory: p.inventory.filter((i) => !uids.includes(i.uid)) }))
    },
    [setState],
  )

  const setBalance = useCallback(
    (value: number) => {
      setState((p) => ({ ...p, balance: Math.max(0, value) }))
    },
    [setState],
  )

  const resetAll = useCallback(() => {
    setState(() => DEFAULT_STATE)
  }, [setState])

  const addGameHistory = useCallback(
    (entry: import("./types").GameHistoryEntry) => {
      setState((p) => ({ ...p, gameHistory: [entry, ...(p.gameHistory || [])] }))
    },
    [setState],
  )

  const addItemHistory = useCallback(
    (entries: import("./types").ItemHistoryEntry[]) => {
      setState((prev) => ({
        ...prev,
        itemHistory: [...entries, ...prev.itemHistory].slice(0, 500),
      }))
    },
    [setState],
  )

  const contextValue: StoreContextValue = {
    state,
    ready,
    accountKey,
    setState,
    login,
    logout,
    addToInventory,
    removeFromInventory,
    setBalance,
    resetAll,
    addGameHistory,
    addItemHistory,
  }

  return <StoreContext.Provider value={contextValue}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error("useStore must be used within StoreProvider")
  return ctx
}

export function getSkin(skins: Skin[], id: string): Skin | undefined {
  let skin = skins.find((s) => s.id === id)
  if (!skin) {
    const { COMPENSATION_BONUS_ITEMS } = require("./default-data")
    skin = COMPENSATION_BONUS_ITEMS.find((s: Skin) => s.id === id)
  }
  return skin
}

export function formatPrice(value: number): string {
  return value.toLocaleString("ru-RU", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export function formatNumber(value: number): string {
  return value.toLocaleString("ru-RU")
}

export const syncManager = {
  suppressUntil: 0,
  suppress(ms: number) {
    this.suppressUntil = Date.now() + ms
  },
}
