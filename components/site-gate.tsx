"use client"

import { useState, useEffect, type ReactNode } from "react"
import { useStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Lock } from "lucide-react"
import { Logo } from "@/components/logo"

export function SiteGate({ children }: { children: ReactNode }) {
  const { state, ready } = useStore()
  const [authed, setAuthed] = useState(false)
  const [value, setValue] = useState("")
  const [error, setError] = useState(false)

  useEffect(() => {
    if (ready) {
      if (!state.adminPassword) {
        setAuthed(true)
        return
      }

      const lastAuthStr = window.localStorage.getItem("site_auth_time")
      if (lastAuthStr) {
        const lastAuth = parseInt(lastAuthStr, 10)
        if (Date.now() - lastAuth < 24 * 60 * 60 * 1000) {
          setAuthed(true)
        } else {
          setAuthed(false)
        }
      } else {
        setAuthed(false)
      }
    }
  }, [ready, state.adminPassword])

  if (!ready) return <div className="min-h-screen bg-background" />

  if (authed || !state.adminPassword) return <>{children}</>

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (value === state.adminPassword) {
      window.localStorage.setItem("site_auth_time", Date.now().toString())
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
            <span className="font-tektur font-extrabold tracking-wide">UPGRADER</span>
          </div>
          <p className="text-sm text-muted-foreground">Введите пароль для доступа к сайту</p>
        </div>
        <Input
          type="password"
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            setError(false)
          }}
          placeholder="Пароль"
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
