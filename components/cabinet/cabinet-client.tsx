"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { PredictControl } from "@/components/admin/predict-control"
import { CabinetSettingsControl } from "./cabinet-settings-control"
import { Logo } from "@/components/logo"
import { ArrowLeft, KeyRound } from "lucide-react"

const ACCOUNT_KEY_STORAGE = "upgrader_account_key"
const ADMIN_ACCOUNT = "__default__"

// Personal admin panel for one access key. Access is the player's own key (read
// from localStorage after the AccountGate login) — no super-admin password. The
// store scopes every read/write to that key's account, so this panel only ever
// touches the holder's own account. Key creation / management lives in the
// super-admin (/admin) and is intentionally NOT exposed here.
export function CabinetClient() {
  const [code, setCode] = useState<string | null>(null)
  const [label, setLabel] = useState<string>("")
  const [daysLeft, setDaysLeft] = useState<number | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem(ACCOUNT_KEY_STORAGE) : null
    setCode(stored)
    setReady(true)
    if (!stored || stored === ADMIN_ACCOUNT) return
    fetch(`/api/auth?key=${encodeURIComponent(stored)}&t=${Date.now()}`, { cache: "no-store" })
      .then((r) => r.json())
      .then((j) => {
        if (j && j.valid) {
          setLabel(j.label || "")
          setDaysLeft(typeof j.daysLeft === "number" ? j.daysLeft : null)
        }
      })
      .catch(() => {})
  }, [])

  if (!ready) return <div className="min-h-screen bg-background" />

  // No key in this browser → AccountGate normally prevents this, but guard anyway.
  if (!code) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/15">
            <KeyRound className="h-7 w-7 text-primary" />
          </div>
          <p className="mb-4 text-sm text-muted-foreground">Войдите по ключу доступа, чтобы открыть личную админку.</p>
          <Link href="/" className="text-sm font-semibold text-primary hover:underline">
            На сайт
          </Link>
        </div>
      </div>
    )
  }

  const isAdminAccount = code === ADMIN_ACCOUNT

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border/60 bg-background/95 px-4 backdrop-blur md:px-6">
        <div className="flex items-center gap-2">
          <Logo className="h-7 w-7 text-primary" />
          <span className="font-tektur text-lg font-extrabold tracking-wide">UPGRADER</span>
          <span className="font-tektur ml-2 rounded-md bg-primary px-2 py-0.5 text-xs font-bold text-primary-foreground">
            ЛИЧНАЯ АДМИНКА
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4" />
            На сайт
          </Link>
          <button 
            onClick={() => {
              if (typeof window !== "undefined") {
                window.localStorage.removeItem(ACCOUNT_KEY_STORAGE)
                window.location.reload()
              }
            }}
            className="flex items-center gap-1 text-sm text-red-500 hover:text-red-400 font-semibold"
          >
            Выйти
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-5 px-4 py-6 md:px-6">
        <section className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15">
              <KeyRound className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold">
                {isAdminAccount ? "Аккаунт администратора" : (label || "Ваш аккаунт")}
              </p>
              <p className="font-mono text-xs text-muted-foreground">
                {isAdminAccount ? "—" : code}
              </p>
            </div>
          </div>
          {!isAdminAccount && daysLeft !== null && (
            <span className="rounded-lg bg-secondary/60 px-3 py-1.5 text-sm">
              Доступ активен ещё <span className="font-bold text-primary">{daysLeft}</span> дн.
            </span>
          )}
        </section>

        <PredictControl predictWindowHref="/cabinet/predict" />
        <CabinetSettingsControl />
      </main>
    </div>
  )
}
