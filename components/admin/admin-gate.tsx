"use client"

import { useState, useEffect, type ReactNode } from "react"
import { useStore } from "@/lib/store"
import { Logo } from "@/components/logo"
import { Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const ADMIN_PWD_STORAGE = "upgrader_admin_pwd"

// Password gate for every /admin route. The site itself is gated by access keys
// (AccountGate), which intentionally bypasses /admin — so admin pages must guard
// themselves here.
export function AdminGate({ children }: { children: ReactNode }) {
  const { state, ready } = useStore()
  const [authed, setAuthed] = useState(false)
  const [value, setValue] = useState("")
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!ready) return
    if (!state.adminPassword) {
      try {
        window.localStorage.setItem(ADMIN_PWD_STORAGE, "")
      } catch {}
      setAuthed(true)
      return
    }
    const saved = window.localStorage.getItem(ADMIN_PWD_STORAGE)
    if (saved && saved === state.adminPassword) setAuthed(true)
  }, [ready, state.adminPassword])

  if (!ready) return <div className="min-h-screen bg-background" />
  if (authed) return <>{children}</>

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (value === state.adminPassword) {
      try {
        window.localStorage.setItem(ADMIN_PWD_STORAGE, value)
      } catch {}
      setAuthed(true)
      setError(false)
    } else {
      setError(true)
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
            setError(false)
          }}
          placeholder="Пароль администратора"
          autoFocus
          className={error ? "border-destructive" : ""}
        />
        {error && <p className="mt-2 text-sm text-destructive">Неверный пароль</p>}
        <Button type="submit" className="mt-4 w-full font-bold">
          Войти
        </Button>
      </form>
    </div>
  )
}
