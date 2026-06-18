"use client"

import { useState, useEffect, useCallback, type ReactNode } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { KeyRound } from "lucide-react"
import { Logo } from "@/components/logo"

const ACCOUNT_KEY_STORAGE = "upgrader_account_key"
const ACCOUNT_KEY_TS_STORAGE = "upgrader_account_key_ts" // when the key/password was last entered
const ADMIN_PWD_STORAGE = "upgrader_admin_pwd"
const ADMIN_PWD_TS_STORAGE = "upgrader_admin_pwd_ts"
const ADMIN_ACCOUNT = "__default__"

// Both player-key and administrator logins last 24h in this browser.
const SESSION_TTL_MS = 24 * 60 * 60 * 1000
const SERVICE_UNAVAILABLE_MESSAGE = "Сервис временно недоступен. Пароль и ключ не изменены — попробуйте ещё раз позже."

type AuthCheck = "valid" | "invalid" | "unavailable"

function readKeyTs(): number {
  try {
    const raw = window.localStorage.getItem(ACCOUNT_KEY_TS_STORAGE)
    const n = raw ? parseInt(raw, 10) : 0
    return Number.isFinite(n) ? n : 0
  } catch {
    return 0
  }
}

function writeKeyTs(ts: number): void {
  try {
    window.localStorage.setItem(ACCOUNT_KEY_TS_STORAGE, String(ts))
  } catch {}
}

function writeAdminTs(ts: number): void {
  try {
    window.localStorage.setItem(ADMIN_PWD_TS_STORAGE, String(ts))
  } catch {}
}

function clearKeySession(): void {
  try {
    const stored = window.localStorage.getItem(ACCOUNT_KEY_STORAGE)
    window.localStorage.removeItem(ACCOUNT_KEY_STORAGE)
    window.localStorage.removeItem(ACCOUNT_KEY_TS_STORAGE)
    if (stored === ADMIN_ACCOUNT) {
      window.localStorage.removeItem(ADMIN_PWD_STORAGE)
      window.localStorage.removeItem(ADMIN_PWD_TS_STORAGE)
    }
  } catch {}
}

// Missing timestamp is treated as an expired session. This keeps old sessions
// created before timestamp support from remaining authorized indefinitely.
function keySessionExpired(): boolean {
  return Date.now() - readKeyTs() >= SESSION_TTL_MS
}

// Verify the admin password against the admin account endpoint. A platform/KV
// outage is deliberately different from an invalid password: it must not erase
// a valid stored session or claim that the password changed.
async function checkAdmin(pwd: string): Promise<AuthCheck> {
  try {
    const res = await fetch(`/api/account?key=${ADMIN_ACCOUNT}&t=${Date.now()}`, {
      cache: "no-store",
      headers: { "x-admin-password": pwd },
    })
    if (res.ok) return "valid"
    if (res.status === 401 || res.status === 403) return "invalid"
    return "unavailable"
  } catch {
    return "unavailable"
  }
}

export function AccountGate({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isAdmin = !!pathname && pathname.startsWith("/admin")

  const [checked, setChecked] = useState(false)
  const [authed, setAuthed] = useState(false)
  const [value, setValue] = useState("")
  const [error, setError] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [daysLeft, setDaysLeft] = useState<number | null>(null)

  const validate = useCallback(async (code: string): Promise<AuthCheck> => {
    try {
      const res = await fetch(`/api/auth?key=${encodeURIComponent(code)}&t=${Date.now()}`, { cache: "no-store" })
      if (!res.ok) return "unavailable"

      const j = await res.json()
      if (j.valid) {
        setDaysLeft(typeof j.daysLeft === "number" ? j.daysLeft : null)
        return "valid"
      }
      return "invalid"
    } catch {
      return "unavailable"
    }
  }, [])

  // Initial check of a stored player/admin session.
  useEffect(() => {
    if (isAdmin) {
      setChecked(true)
      setAuthed(true)
      return
    }

    let cancelled = false
    const stored = typeof window !== "undefined" ? window.localStorage.getItem(ACCOUNT_KEY_STORAGE) : null
    if (!stored) {
      setChecked(true)
      setAuthed(false)
      return
    }

    // The same 24h window applies to both key and administrator logins.
    if (!readKeyTs()) writeKeyTs(Date.now())
    if (keySessionExpired()) {
      clearKeySession()
      setAuthed(false)
      setChecked(true)
      return
    }

    setAuthed(true)
    setChecked(true)

    // Admin "logged in as administrator" on the public site — verify the stored
    // password instead of the access-key endpoint.
    if (stored === ADMIN_ACCOUNT) {
      const pwd = window.localStorage.getItem(ADMIN_PWD_STORAGE) || ""
      checkAdmin(pwd).then((result) => {
        if (cancelled) return
        if (result === "invalid") {
          clearKeySession()
          setAuthed(false)
        }
      })
      return () => {
        cancelled = true
      }
    }

    validate(stored).then((result) => {
      if (cancelled) return
      if (result === "invalid") {
        clearKeySession()
        setAuthed(false)
        setError("Срок действия ключа истёк. Введите новый ключ.")
      }
    })
    return () => {
      cancelled = true
    }
  }, [isAdmin, validate])

  // While the tab stays open, show the gate when the 24h window elapses.
  useEffect(() => {
    if (isAdmin || !authed) return
    function check() {
      if (keySessionExpired()) {
        clearKeySession()
        setAuthed(false)
        setError("Прошли сутки — войдите снова.")
      }
    }
    const id = window.setInterval(check, 60_000)
    return () => window.clearInterval(id)
  }, [isAdmin, authed])

  // React to mid-session expiry / revocation dispatched by the store.
  useEffect(() => {
    function onInvalid() {
      setAuthed(false)
      setError("Срок действия ключа истёк. Введите новый ключ.")
    }
    window.addEventListener("upgrader-account-invalid", onInvalid)
    return () => window.removeEventListener("upgrader-account-invalid", onInvalid)
  }, [])

  if (isAdmin) return <>{children}</>
  if (!checked) return <div className="min-h-screen bg-background" />
  if (authed) return <>{children}</>

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    const code = value.trim().toUpperCase()
    if (!code) return
    setSubmitting(true)
    setError("")
    const result = await validate(code)
    setSubmitting(false)
    if (result === "valid") {
      try {
        window.localStorage.setItem(ACCOUNT_KEY_STORAGE, code)
      } catch {}
      writeKeyTs(Date.now())
      window.dispatchEvent(new CustomEvent("upgrader-account-key-changed"))
      setAuthed(true)
    } else if (result === "invalid") {
      setError("Неверный, отозванный или просроченный ключ")
    } else {
      setError(SERVICE_UNAVAILABLE_MESSAGE)
    }
  }

  async function loginAsAdmin() {
    const pwd = window.prompt("Пароль администратора")
    if (pwd === null) return
    setSubmitting(true)
    setError("")
    const result = await checkAdmin(pwd)
    setSubmitting(false)
    if (result === "valid") {
      try {
        window.localStorage.setItem(ADMIN_PWD_STORAGE, pwd)
        window.localStorage.setItem(ACCOUNT_KEY_STORAGE, ADMIN_ACCOUNT)
      } catch {}
      const now = Date.now()
      writeKeyTs(now)
      writeAdminTs(now)
      window.dispatchEvent(new CustomEvent("upgrader-account-key-changed"))
      setAuthed(true)
    } else if (result === "invalid") {
      setError("Неверный пароль администратора")
    } else {
      setError(SERVICE_UNAVAILABLE_MESSAGE)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <form onSubmit={submit} className="w-full max-w-sm rounded-2xl border border-border bg-card p-8">
        <div className="mb-6 flex flex-col items-center gap-3 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/15">
            <KeyRound className="h-7 w-7 text-primary" />
          </div>
          <div className="flex items-center gap-2">
            <Logo className="h-6 w-6 text-primary" />
            <span className="font-tektur font-extrabold tracking-wide">UPGRADER</span>
          </div>
          <p className="text-sm text-muted-foreground">Введите ключ доступа для входа в аккаунт</p>
        </div>
        <Input
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value.toUpperCase())
            setError("")
          }}
          placeholder="XXXX-XXXX"
          autoFocus
          autoCapitalize="characters"
          className={`text-center tracking-widest font-mono ${error ? "border-destructive" : ""}`}
        />
        {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
        <Button type="submit" disabled={submitting} className="mt-4 w-full font-bold">
          {submitting ? "Проверка..." : "Войти"}
        </Button>
        <div className="mt-4 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground">или</span>
          <div className="h-px flex-1 bg-border" />
        </div>
        <button
          type="button"
          onClick={loginAsAdmin}
          disabled={submitting}
          className="mt-3 w-full text-center text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline disabled:opacity-50"
        >
          Войти как администратор
        </button>
        {daysLeft !== null && authed && (
          <p className="mt-3 text-center text-xs text-muted-foreground">Доступ активен ещё {daysLeft} дн.</p>
        )}
      </form>
    </div>
  )
}
