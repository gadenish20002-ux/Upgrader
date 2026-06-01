"use client"

import { useState } from "react"
import { useStore, formatPrice } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Wallet } from "lucide-react"
import { toast } from "sonner"

export function BalanceControl() {
  const { state, setBalance, setState } = useStore()
  const [value, setValue] = useState("")

  function apply(mode: "set" | "add") {
    const num = Number(value)
    if (!value || Number.isNaN(num)) {
      toast.error("Введите сумму")
      return
    }
    if (mode === "set") setBalance(num)
    else setBalance(state.balance + num)
    setValue("")
    toast.success("Баланс обновлён")
  }

  return (
    <section className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center gap-2">
        <Wallet className="h-5 w-5 text-primary" />
        <h2 className="font-semibold">Баланс</h2>
      </div>

      <div className="mb-4 rounded-lg bg-secondary/60 px-4 py-3">
        <div className="text-xs text-muted-foreground">Текущий баланс</div>
        <div className="text-2xl font-bold text-primary">{formatPrice(state.balance)} ₽</div>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value.replace(/[^\d.]/g, ""))}
          placeholder="Сумма"
          inputMode="numeric"
        />
        <Button variant="secondary" onClick={() => apply("add")}>
          Добавить
        </Button>
        <Button onClick={() => apply("set")}>Установить</Button>
      </div>

      <div className="mt-4 flex items-center justify-between rounded-lg bg-secondary/40 px-4 py-2 text-sm">
        <span className="text-muted-foreground">Статус авторизации игрока</span>
        <Button
          size="sm"
          variant={state.loggedIn ? "default" : "secondary"}
          onClick={() => setState((p) => ({ ...p, loggedIn: !p.loggedIn }))}
        >
          {state.loggedIn ? "Авторизован" : "Не авторизован"}
        </Button>
      </div>
    </section>
  )
}
