"use client"

import { useState } from "react"
import { useStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Settings, RotateCcw } from "lucide-react"
import { toast } from "sonner"

export function SettingsControl() {
  const { state, setState, resetAll } = useStore()
  const [pw, setPw] = useState("")

  function savePassword() {
    if (pw.length < 3) {
      toast.error("Пароль слишком короткий")
      return
    }
    setState((p) => ({ ...p, adminPassword: pw }))
    setPw("")
    toast.success("Пароль обновлён")
  }

  return (
    <section className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center gap-2">
        <Settings className="h-5 w-5 text-primary" />
        <h2 className="font-semibold">Настройки</h2>
      </div>

      <div className="space-y-2">
        <Label className="text-xs">Пароль администратора</Label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Input
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            type="text"
            placeholder="Новый пароль"
          />
          <Button onClick={savePassword}>Сохранить</Button>
        </div>
        <p className="text-xs text-muted-foreground">Текущий пароль действует до сохранения нового.</p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-lg bg-secondary/40 px-4 py-3">
          <div className="text-xs text-muted-foreground">Онлайн</div>
          <Input
            className="mt-1 h-8"
            value={state.online}
            onChange={(e) => setState((p) => ({ ...p, online: Number(e.target.value.replace(/\D/g, "")) || 0 }))}
            inputMode="numeric"
          />
        </div>
        <div className="rounded-lg bg-secondary/40 px-4 py-3">
          <div className="text-xs text-muted-foreground">Счётчик апгрейдов</div>
          <Input
            className="mt-1 h-8"
            value={state.upgrades}
            onChange={(e) => setState((p) => ({ ...p, upgrades: Number(e.target.value.replace(/\D/g, "")) || 0 }))}
            inputMode="numeric"
          />
        </div>
        <div className="rounded-lg bg-secondary/40 px-4 py-3 col-span-1 sm:col-span-2">
          <div className="text-xs text-muted-foreground mb-1">Множители (x2, x4, x8)</div>
          <div className="flex gap-2">
            {[0, 1, 2].map((idx) => (
              <Input
                key={`mult-${idx}`}
                className="h-8"
                value={state.fastMultipliers[idx]}
                onChange={(e) => {
                  const val = Number(e.target.value.replace(/\D/g, "")) || 0;
                  setState((p) => {
                    const newMults = [...p.fastMultipliers] as [number, number, number];
                    newMults[idx] = val;
                    return { ...p, fastMultipliers: newMults };
                  });
                }}
                inputMode="numeric"
              />
            ))}
          </div>
        </div>
        <div className="rounded-lg bg-secondary/40 px-4 py-3 col-span-1 sm:col-span-2">
          <div className="text-xs text-muted-foreground mb-1">Проценты (25%, 55%, 75%)</div>
          <div className="flex gap-2">
            {[0, 1, 2].map((idx) => (
              <Input
                key={`perc-${idx}`}
                className="h-8"
                value={state.fastPercentages[idx]}
                onChange={(e) => {
                  const val = Number(e.target.value.replace(/\D/g, "")) || 0;
                  setState((p) => {
                    const newPercs = [...p.fastPercentages] as [number, number, number];
                    newPercs[idx] = val;
                    return { ...p, fastPercentages: newPercs };
                  });
                }}
                inputMode="numeric"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 border-t border-border pt-4">
        <Button
          variant="destructive"
          onClick={() => {
            resetAll()
            toast.success("Все данные сброшены к значениям по умолчанию")
          }}
        >
          <RotateCcw className="mr-1 h-4 w-4" />
          Сбросить всё
        </Button>
      </div>
    </section>
  )
}
