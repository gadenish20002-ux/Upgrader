"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { KeyRound, Plus, Copy, Check, Trash2, RotateCcw, Eraser, Ban, Play, CalendarPlus } from "lucide-react"
import { toast } from "sonner"
import { copyToClipboard } from "@/lib/utils"

const ADMIN_PWD_STORAGE = "upgrader_admin_pwd"
const ACCOUNT_KEY_STORAGE = "upgrader_account_key"
const ADMIN_ACCOUNT = "__default__"

interface KeyRow {
  code: string
  label: string
  days: number
  createdAt: number
  expiresAt: number
  revoked: boolean
  lastSeen: number | null
  status: "active" | "expired" | "revoked" | "missing"
  daysLeft: number
}

function fmtDate(ts: number | null): string {
  if (!ts) return "—"
  return new Date(ts).toLocaleString("ru-RU", { day: "2-digit", month: "2-digit", year: "2-digit", hour: "2-digit", minute: "2-digit" })
}

const STATUS_LABEL: Record<string, string> = { active: "Активен", expired: "Истёк", revoked: "Отозван", missing: "—" }
const STATUS_COLOR: Record<string, string> = {
  active: "bg-green-500/15 text-green-400",
  expired: "bg-amber-500/15 text-amber-400",
  revoked: "bg-destructive/15 text-destructive",
  missing: "bg-muted text-muted-foreground",
}

export function KeysControl() {
  const [keys, setKeys] = useState<KeyRow[]>([])
  const [loading, setLoading] = useState(true)
  const [label, setLabel] = useState("")
  const [days, setDays] = useState("30")
  const [copied, setCopied] = useState<string | null>(null)
  const [activeKey, setActiveKey] = useState<string>(ADMIN_ACCOUNT)

  const pwd = typeof window !== "undefined" ? window.localStorage.getItem(ADMIN_PWD_STORAGE) || "" : ""
  const headers = { "Content-Type": "application/json", "x-admin-password": pwd }

  const load = useCallback(async () => {
    try {
      const res = await fetch(`/api/keys?t=${Date.now()}`, { cache: "no-store", headers })
      if (!res.ok) {
        setLoading(false)
        return
      }
      const j = await res.json()
      setKeys(j.keys || [])
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pwd])

  useEffect(() => {
    setActiveKey(window.localStorage.getItem(ACCOUNT_KEY_STORAGE) || ADMIN_ACCOUNT)
    load()
  }, [load])

  async function createKey() {
    const d = parseInt(days, 10)
    if (!d || d < 1) {
      toast.error("Укажите количество дней (>= 1)")
      return
    }
    const res = await fetch("/api/keys", { method: "POST", headers, body: JSON.stringify({ label, days: d }) })
    if (res.ok) {
      const j = await res.json()
      setLabel("")
      const copiedOk = await copyToClipboard(j.key.code)
      toast.success(copiedOk ? `Ключ создан и скопирован: ${j.key.code}` : `Ключ создан: ${j.key.code}`)
      load()
    } else {
      toast.error("Не удалось создать ключ")
    }
  }

  async function mutate(code: string, action: string, extraDays?: number) {
    const res = await fetch("/api/keys", {
      method: "PATCH",
      headers,
      body: JSON.stringify({ code, action, days: extraDays }),
    })
    if (res.ok) {
      load()
      if (action === "reset-history") toast.success("История аккаунта сброшена")
      else if (action === "reset") toast.success("Аккаунт сброшен")
    } else toast.error("Ошибка операции")
  }

  async function remove(code: string) {
    if (!window.confirm(`Удалить ключ ${code} и его аккаунт? Действие необратимо.`)) return
    const res = await fetch("/api/keys", { method: "DELETE", headers, body: JSON.stringify({ code }) })
    if (res.ok) {
      if (activeKey === code) selectActive(ADMIN_ACCOUNT)
      toast.success("Ключ удалён")
      load()
    }
  }

  function selectActive(code: string) {
    window.localStorage.setItem(ACCOUNT_KEY_STORAGE, code)
    window.localStorage.removeItem("upgrader_admin_active_key")
    setActiveKey(code)
    window.dispatchEvent(new CustomEvent("upgrader-account-key-changed"))
    const label = code === ADMIN_ACCOUNT ? "Шаблон по умолчанию" : code
    toast.success(`Управление переключено на: ${label}`)
  }

  async function copy(code: string) {
    const ok = await copyToClipboard(code)
    if (ok) {
      setCopied(code)
      setTimeout(() => setCopied(null), 1500)
      toast.success(`Ключ скопирован: ${code}`)
    } else {
      toast.error("Не удалось скопировать ключ")
    }
  }

  const activeLabel =
    activeKey === ADMIN_ACCOUNT
      ? "Шаблон по умолчанию"
      : `${keys.find((k) => k.code === activeKey)?.label || ""} (${activeKey})`

  return (
    <section className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center gap-2">
        <KeyRound className="h-5 w-5 text-primary" />
        <h2 className="font-semibold">Ключи доступа и аккаунты</h2>
      </div>

      {/* Active account banner */}
      <div className="mb-4 rounded-lg border border-primary/30 bg-primary/10 p-3 text-sm">
        <span className="text-muted-foreground">Сейчас вы управляете аккаунтом: </span>
        <span className="font-semibold text-primary">{activeLabel}</span>
        <p className="mt-1 text-xs text-muted-foreground">
          Баланс, предикт, инвентарь и история ниже применяются к этому аккаунту. Выберите ключ кнопкой «Управлять»,
          чтобы настраивать конкретного игрока.
        </p>
        {activeKey !== ADMIN_ACCOUNT && (
          <Button size="sm" variant="outline" className="mt-2" onClick={() => selectActive(ADMIN_ACCOUNT)}>
            Вернуться к шаблону
          </Button>
        )}
      </div>

      {/* Create */}
      <div className="mb-5 grid grid-cols-1 gap-2 sm:grid-cols-[1fr_120px_auto]">
        <Input value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Имя/метка (например, Иван)" />
        <Input type="number" min={1} value={days} onChange={(e) => setDays(e.target.value)} placeholder="Дней" />
        <Button onClick={createKey}>
          <Plus className="mr-1 h-4 w-4" /> Создать ключ
        </Button>
      </div>

      {/* List */}
      {loading ? (
        <p className="text-sm text-muted-foreground">Загрузка...</p>
      ) : keys.length === 0 ? (
        <p className="text-sm text-muted-foreground">Ключей пока нет. Создайте первый выше.</p>
      ) : (
        <div className="space-y-2">
          {keys.map((k) => (
            <div
              key={k.code}
              className={`rounded-lg border p-3 ${activeKey === k.code ? "border-primary/60 bg-primary/5" : "border-border bg-background/40"}`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => copy(k.code)}
                    className="inline-flex items-center gap-1 rounded bg-secondary/40 px-2 py-1 font-mono text-sm hover:bg-secondary"
                    title="Скопировать"
                  >
                    {k.code}
                    {copied === k.code ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5 text-muted-foreground" />}
                  </button>
                  <span className="text-sm font-medium">{k.label}</span>
                  <span className={`rounded px-2 py-0.5 text-xs font-semibold ${STATUS_COLOR[k.status]}`}>
                    {STATUS_LABEL[k.status]}
                    {k.status === "active" && ` · ${k.daysLeft} дн.`}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-1">
                  <Button size="sm" variant={activeKey === k.code ? "default" : "outline"} onClick={() => selectActive(k.code)}>
                    <Play className="mr-1 h-3.5 w-3.5" /> Управлять
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      const d = window.prompt("На сколько дней продлить?", "30")
                      const n = parseInt(d || "", 10)
                      if (n > 0) mutate(k.code, "extend", n)
                    }}
                  >
                    <CalendarPlus className="mr-1 h-3.5 w-3.5" /> Продлить
                  </Button>
                  {k.revoked ? (
                    <Button size="sm" variant="outline" onClick={() => mutate(k.code, "restore")}>
                      Восстановить
                    </Button>
                  ) : (
                    <Button size="sm" variant="outline" onClick={() => mutate(k.code, "revoke")}>
                      <Ban className="mr-1 h-3.5 w-3.5" /> Отозвать
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      if (
                        window.confirm(
                          `Сбросить историю аккаунта ${k.code}? Очистятся: инвентарь, история игр, история предметов, выведенные предметы и счётчик апгрейдов. Баланс сохранится.`,
                        )
                      )
                        mutate(k.code, "reset-history")
                    }}
                    title="Сбросить историю (баланс сохраняется)"
                  >
                    <Eraser className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      if (window.confirm(`Сбросить аккаунт ключа ${k.code} полностью к стартовому состоянию (включая баланс)?`)) mutate(k.code, "reset")
                    }}
                    title="Полный сброс аккаунта (включая баланс)"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => remove(k.code)} title="Удалить">
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                <span>Создан: {fmtDate(k.createdAt)}</span>
                <span>Истекает: {fmtDate(k.expiresAt)}</span>
                <span>Последний вход: {fmtDate(k.lastSeen)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
