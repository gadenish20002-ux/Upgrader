"use client"

import { useState, useEffect, useCallback, type ReactNode } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { KeyRound } from "lucide-react"
import { Logo } from "@/components/logo"

const ACCOUNT_KEY_STORAGE = "upgrader_account_key"

export function AccountGate({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isAdmin = !!pathname && pathname.startsWith("/admin")

  const [checked, setChecked] = useState(false)
  const [authed, setAuthed] = useState(false)
  const [value, setValue] = useState("")
  const [error, setError] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [daysLeft, setDaysLeft] = useState<number | null>(null)

  const validate = useCallback(async (code: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/auth?key=${encodeURIComponent(code)}&t=${Date.now()}`, { cache: "no-store" })
      const j = await res.json()
      if (j.valid) {
        setDaysLeft(typeof j.daysLeft === "number" ? j.daysLeft : null)
        return true
      }
      return false
    } catch {
      return false
    }
  }, [])

  // initial check of a stored key
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
    validate(stored).then((ok) => {
      if (cancelled) return
      if (!ok) {
        try {
          window.localStorage.removeItem(ACCOUNT_KEY_STORAGE)
        } catch {}
      }
      setAuthed(ok)
      setChecked(true)
    })
    return () => {
      cancelled = true
    }
  }, [isAdmin, validate])

  // react to mid-session expiry / revocation dispatched by the store
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
    const ok = await validate(code)
    setSubmitting(false)
    if (ok) {
      try {
        window.localStorage.setItem(ACCOUNT_KEY_STORAGE, code)
      } catch {}
      window.dispatchEvent(new CustomEvent("upgrader-account-key-changed"))
      setAuthed(true)
    } else {
      setError("Неверный, отозванный или просроченный ключ")
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
        {daysLeft !== null && authed && (
          <p className="mt-3 text-center text-xs text-muted-foreground">Доступ активен ещё {daysLeft} дн.</p>
        )}
      </form>
    </div>
  )
}
