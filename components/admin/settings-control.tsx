"use client"

import { useState, useEffect } from "react"
import { useStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Settings, Save } from "lucide-react"
import { toast } from "sonner"

export function SettingsControl() {
  const { state, setState, setBalance, ready } = useStore()
  const [password, setPassword] = useState(state.adminPassword)
  const [balanceInput, setBalanceInput] = useState(state.balance.toString())
  const [usernameInput, setUsernameInput] = useState(state.username)
  const [userIdInput, setUserIdInput] = useState(state.userId)
  const [avatarInput, setAvatarInput] = useState(state.avatar || "")
  const [itemHistoryInput, setItemHistoryInput] = useState<import("@/lib/types").ItemHistoryEntry[]>(state.itemHistory || [])

  useEffect(() => {
    if (ready) {
      setPassword(state.adminPassword)
      setBalanceInput(state.balance.toString())
      setUsernameInput(state.username)
      setUserIdInput(state.userId)
      setAvatarInput(state.avatar || "")
      setItemHistoryInput(state.itemHistory || [])
    }
  }, [ready])

  function handleSave() {
    setState((p) => ({ 
      ...p, 
      adminPassword: password,
      username: usernameInput,
      userId: userIdInput,
      avatar: avatarInput || null,
      itemHistory: itemHistoryInput,
      withdrawnItems: undefined // clear old field
    }))
    const parsedBalance = parseFloat(balanceInput)
    if (!isNaN(parsedBalance)) {
      setBalance(parsedBalance)
    }
    toast.success("Настройки успешно сохранены")
  }

  function addItemHistoryEntry(skinId: string, action: import("@/lib/types").ItemHistoryAction) {
    setItemHistoryInput([...itemHistoryInput, {
      id: `ih-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      skinId,
      action,
      date: Date.now()
    }])
  }

  function removeItemHistoryEntry(index: number) {
    setItemHistoryInput(itemHistoryInput.filter((_, i) => i !== index))
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
            Пароль администратора
          </label>
          <Input 
            type="text" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Оставьте пустым для отключения пароля" 
          />
          <p className="text-xs text-muted-foreground">
            Защищает доступ к админ-панели. Сам сайт открывается по ключам доступа (см. блок «Ключи доступа» выше).
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

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Имя пользователя</label>
            <Input 
              type="text" 
              value={usernameInput} 
              onChange={(e) => setUsernameInput(e.target.value)} 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">ID пользователя</label>
            <Input 
              type="text" 
              value={userIdInput} 
              onChange={(e) => setUserIdInput(e.target.value)} 
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">URL Аватарки</label>
          <Input 
            type="text" 
            value={avatarInput} 
            onChange={(e) => setAvatarInput(e.target.value)} 
            placeholder="https://... или пусто для стандартной" 
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">История предметов</label>
          <div className="flex gap-2">
            <select 
              id="skin-select"
              className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            >
              {state.skins.map((skin) => (
                <option key={skin.id} value={skin.id} className="bg-background text-foreground">
                  {skin.name} - ${skin.price}
                </option>
              ))}
            </select>
            <select 
              id="action-select"
              className="flex h-9 w-32 items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="sold" className="bg-background text-foreground">Продано</option>
              <option value="withdrawn" className="bg-background text-foreground">Выведено</option>
              <option value="compensation" className="bg-background text-foreground">Компенсация</option>
              <option value="upgrade" className="bg-background text-foreground">Апгрейд</option>
              <option value="bought" className="bg-background text-foreground">Куплено</option>
            </select>
            <Button onClick={() => {
              const skinSelect = document.getElementById('skin-select') as HTMLSelectElement
              const actionSelect = document.getElementById('action-select') as HTMLSelectElement
              if (skinSelect && skinSelect.value && actionSelect && actionSelect.value) {
                addItemHistoryEntry(skinSelect.value, actionSelect.value as any)
              }
            }} variant="secondary">Добавить</Button>
          </div>
          <div className="mt-2 flex flex-col gap-2 max-h-[150px] overflow-y-auto rounded-md border p-2">
            {itemHistoryInput.length === 0 && <span className="text-xs text-muted-foreground p-1">Нет истории предметов</span>}
            {itemHistoryInput.map((entry, idx) => {
              const skin = state.skins.find(s => s.id === entry.skinId)
              const actionLabels: Record<string, string> = {
                sold: "Продано",
                withdrawn: "Выведено",
                compensation: "Компенсация",
                upgrade: "Апгрейд",
                bought: "Куплено"
              }
              return (
                <div key={idx} className="flex items-center justify-between bg-secondary/30 px-2 py-1.5 rounded-md text-sm">
                  <span>{skin ? skin.name : entry.skinId} <span className="text-muted-foreground ml-2">({actionLabels[entry.action] || entry.action})</span></span>
                  <button onClick={() => removeItemHistoryEntry(idx)} className="text-destructive hover:text-destructive/80 font-bold text-xs">Удалить</button>
                </div>
              )
            })}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Button onClick={handleSave} className="w-full sm:w-auto">
            <Save className="mr-2 h-4 w-4" />
            Сохранить настройки
          </Button>
          <Button onClick={() => {
            if (!window.confirm("Сбросить ВСЮ историю аккаунта к нулю? Будут очищены: инвентарь, история игр, история предметов и счётчик апгрейдов пользователя. Это действие необратимо.")) return
            setState(p => ({
              ...p,
              inventory: [],
              gameHistory: [],
              itemHistory: [],
              withdrawnItems: undefined,
              userUpgrades: 0,
            }))
            setItemHistoryInput([])
            toast.success("История аккаунта полностью сброшена к нулю")
          }} variant="destructive" className="w-full sm:w-auto">
            Сбросить историю аккаунта
          </Button>
        </div>
      </div>
    </section>
  )
}
