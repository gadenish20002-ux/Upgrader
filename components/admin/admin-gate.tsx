"use client"

import { useState, useEffect, type ReactNode } from "react"
import { Logo } from "@/components/logo"
import { Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const ADMIN_PWD_STORAGE = "upgrader_admin_pwd"
const ADMIN_ACCOUNT = "__default__"
const SERVICE_UNAVAILABLE_MESSAGE = "Сервис временно недоступен. Пароль не изменён — попробуйте ещё раз позже."

type AuthCheck = "valid" | "invalid" | "unavailable"

async function checkAdmin(password: string): Promise<AuthCheck> {
  try {
    const response = await fetch(`/api/account?key=${ADMIN_ACCOUNT}&t=${Date.now()}`, {
      cache: "no-store",
      headers: { "x-admin-password": password },
    })
    if (response.ok) return "valid"
    if (response.status === 401 || response.status === 403) return "invalid"
    return "unavailable"
  } catch {
    return "unavailable"
  }
}

// Password gate for every /admin route. Authentication is checked against the
// server/KV source of truth instead of a client-side fallback copy of the state.
export function AdminGate({ children }: { children: ReactNode }) {
  const [authed, setAuthed] = useState(false)
  const [checked, setChecked] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [value, setValue] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    let cancelled = false
    const saved = window.localStorage.getItem(ADMIN_PWD_STORAGE)
    if (!saved) {
      setChecked(true)
      return
    }

    checkAdmin(saved).then((result) => {
      if (cancelled) return
      if (result === "valid") {
        setAuthed(true)
      } else if (result === "invalid") {
        window.localStorage.removeItem(ADMIN_PWD_STORAGE)
      } else {
        setError(SERVICE_UNAVAILABLE_MESSAGE)
      }
      setChecked(true)
    })

    return () => {
      cancelled = true
    }
  }, [])

  if (!checked) return <div className="min-h-screen bg-background" />
  if (authed) return <>{children}</>

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!value) return

    setSubmitting(true)
    setError("")
    const result = await checkAdmin(value)
    setSubmitting(false)

    if (result === "valid") {
      try {
        window.localStorage.setItem(ADMIN_PWD_STORAGE, value)
      } catch {}
      window.dispatchEvent(new CustomEvent("upgrader-account-key-changed"))
      setAuthed(true)
    } else if (result === "invalid") {
      setError("Неверный пароль")
    } else {
      setError(SERVICE_UNAVAILABLE_MESSAGE)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <form onSubmit={submit} className="w-full max-w-sm rounded-2xl border border-border bg-card p-8">
        <div className="mb-6 flex flex-col items-center gap-3 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/15">
            <Lock className="h-7 w-7 text-primary" />
          </div>
          <div className="flex items-center gap-2">
            <Logo className="h-6 w-6 text-primary" />
            <span className="font-tektur font-extrabold tracking-wide">UPGRADER ADMIN</span>
          </div>
          <p className="text-sm text-muted-foreground">Введите пароль администратора</p>
        </div>
        <Input
          type="password"
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            setError("")
          }}
          placeholder="Пароль администратора"
          autoFocus
          className={error ? "border-destructive" : ""}
        />
        {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
        <Button type="submit" disabled={submitting} className="mt-4 w-full font-bold">
          {submitting ? "Проверка..." : "Войти"}
        </Button>
      </form>
    </div>
  )
}
