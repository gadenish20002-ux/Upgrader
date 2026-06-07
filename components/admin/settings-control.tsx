"use client"

import { useState } from "react"
import { useStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Settings, Save } from "lucide-react"
import { toast } from "sonner"

export function SettingsControl() {
  const { state, setState, setBalance } = useStore()
  const [password, setPassword] = useState(state.adminPassword)
  const [balanceInput, setBalanceInput] = useState(state.balance.toString())

  function handleSave() {
    setState((p) => ({ ...p, adminPassword: password }))
    const parsedBalance = parseFloat(balanceInput)
    if (!isNaN(parsedBalance)) {
      setBalance(parsedBalance)
    }
    toast.success("Настройки успешно сохранены")
  }

  return (
    <section className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center gap-2">
        <Settings className="h-5 w-5 text-primary" />
        <h2 className="font-semibold">Настройки сайта</h2>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            Пароль для доступа к сайту
          </label>
          <Input 
            type="text" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Оставьте пустым для отключения пароля" 
          />
          <p className="text-xs text-muted-foreground">
            Установка пароля защитит весь сайт. Ввод пароля будет запрашиваться раз в сутки с одного устройства.
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            Баланс игрока
          </label>
          <Input 
            type="number" 
            value={balanceInput} 
            onChange={(e) => setBalanceInput(e.target.value)} 
            placeholder="0" 
          />
        </div>

        <Button onClick={handleSave} className="w-full sm:w-auto">
          <Save className="mr-2 h-4 w-4" />
          Сохранить настройки
        </Button>
      </div>
    </section>
  )
}
