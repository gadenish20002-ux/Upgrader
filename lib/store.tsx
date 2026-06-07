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
    setReady(true)

    // Fetch global state from server
    async function fetchState() {
      // Prevent fetching if we just updated the state locally
      if (Date.now() - lastSyncTime.current < 1500) return
      
      try {
        const res = await fetch("/api/state")
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

    fetchState()
    const interval = setInterval(fetchState, 2000)
    return () => clearInterval(interval)
  }, [])


  // persist + broadcast across tabs and sync to server
  const setState = useCallback((updater: (prev: AppState) => AppState) => {
    setInternal((prev) => {
      const next = updater(prev)
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch {}
      
      // Update the server state (strip large skin arrays)
      const { skins, upgradeSkins, ...strippedNext } = next
      lastSyncTime.current = Date.now()
      
      fetch("/api/state", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(strippedNext)
      }).catch(err => console.error("Failed to sync state", err))
      
      return next
    })
  }, [])

  // listen for changes from other tabs (the "two users" share the same browser storage)
  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          setInternal({ ...DEFAULT_STATE, ...JSON.parse(e.newValue) })
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
        return { ...p, inventory: [item, ...p.inventory], upgrades: p.upgrades + 1 }
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
