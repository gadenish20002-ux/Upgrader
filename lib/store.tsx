"use client"

import { createContext, useContext, useEffect, useState, useCallback, useRef, type ReactNode } from "react"
import type { AppState, Skin, InventoryItem } from "./types"
import { DEFAULT_STATE } from "./default-data"

const STORAGE_KEY = "upgrader_state_v3"

interface StoreContextValue {
  state: AppState
  ready: boolean
  setState: (updater: (prev: AppState) => AppState) => void
  // helpers
  login: () => void
  logout: () => void
  addToInventory: (skinId: string) => string
  removeFromInventory: (uids: string[]) => void
  setBalance: (value: number) => void
  resetAll: () => void
}

const StoreContext = createContext<StoreContextValue | null>(null)

function loadState(): AppState {
  if (typeof window === "undefined") return DEFAULT_STATE
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_STATE
    const parsed = JSON.parse(raw)
    // Always use fresh skins from DEFAULT_STATE — never cache skin data
    // (image paths, prices, etc. may change between deployments)
    return {
      ...DEFAULT_STATE,
      ...parsed,
      skins: DEFAULT_STATE.skins,  // always use latest skins list
      upgradeSkins: DEFAULT_STATE.skins, // DO NOT cache upgrade skins
    }
  } catch {
    return DEFAULT_STATE
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setInternal] = useState<AppState>(DEFAULT_STATE)
  const [ready, setReady] = useState(false)
  const lastSyncTime = useRef<number>(0)

  useEffect(() => {
    // Clean up old cache keys from previous versions
    try {
      window.localStorage.removeItem("upgrader_state_v1")
      window.localStorage.removeItem("upgrader_state_v2")
    } catch {}
    setInternal(loadState())

    // Fetch global state from server
    async function fetchState() {
      if (Date.now() < syncManager.suppressUntil) return
      if (Date.now() - lastSyncTime.current < 1500) return
      
      try {
        const res = await fetch(`/api/state?t=${Date.now()}`)
        if (res.ok) {
          const serverState = await res.json()
          setInternal((prev) => {
            const next = { 
              ...DEFAULT_STATE, 
              ...serverState, 
              skins: DEFAULT_STATE.skins, 
              upgradeSkins: DEFAULT_STATE.skins 
            }
            try {
              window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
            } catch {}
            return next
          })
        }
      } catch (err) {
        console.error("Failed to fetch state", err)
      }
    }

    let interval: NodeJS.Timeout
    async function init() {
      await fetchState()
      setReady(true)
      interval = setInterval(fetchState, 2000)
    }

    init()
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [])


  // persist + broadcast across tabs and sync to server
  const setState = useCallback((updater: (prev: AppState) => AppState) => {
    setInternal((prev) => {
      const next = updater(prev)
      
      const { skins, upgradeSkins, ...strippedNext } = next
      
      const changes: Partial<AppState> = {}
      let hasChanges = false
      for (const key in strippedNext) {
        if (JSON.stringify(strippedNext[key as keyof typeof strippedNext]) !== JSON.stringify(prev[key as keyof AppState])) {
          changes[key as keyof AppState] = strippedNext[key as keyof typeof strippedNext] as any
          hasChanges = true
        }
      }

      // Read latest local state to avoid overwriting with stale background tab state
      let currentLocal = prev
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY)
        if (raw) {
          const parsed = JSON.parse(raw)
          const merged = { 
            ...DEFAULT_STATE, 
            ...parsed,
            skins: DEFAULT_STATE.skins,
            upgradeSkins: DEFAULT_STATE.skins
          }
          
          const optimizedLocal: any = { ...prev }
          for (const key in merged) {
            if (JSON.stringify(merged[key as keyof AppState]) !== JSON.stringify(prev[key as keyof AppState])) {
              optimizedLocal[key] = merged[key as keyof AppState]
            }
          }
          currentLocal = optimizedLocal
        }
      } catch {}

      const trueNext = { ...currentLocal, ...changes }

      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(trueNext))
      } catch {}
      
      if (hasChanges) {
        lastSyncTime.current = Date.now()
        fetch(`/api/state?t=${Date.now()}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(changes)
        }).catch(err => console.error("Failed to sync state", err))
      }
      
      return trueNext
    })
  }, [])

  // listen for changes from other tabs (the "two users" share the same browser storage)
  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue)
          setInternal({ 
            ...DEFAULT_STATE, 
            ...parsed,
            skins: DEFAULT_STATE.skins,
            upgradeSkins: DEFAULT_STATE.skins
          })
        } catch {}
      }
    }
    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [])

  const login = useCallback(() => {
    setState((p) => ({ ...p, loggedIn: true }))
  }, [setState])

  const logout = useCallback(() => {
    setState((p) => ({ ...p, loggedIn: false }))
  }, [setState])

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

  return (
    <StoreContext.Provider
      value={{ state, ready, setState, login, logout, addToInventory, removeFromInventory, setBalance, resetAll }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error("useStore must be used within StoreProvider")
  return ctx
}

export function getSkin(skins: Skin[], id: string): Skin | undefined {
  return skins.find((s) => s.id === id)
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
  }
}
