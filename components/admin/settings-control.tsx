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
  const [withdrawnItemsInput, setWithdrawnItemsInput] = useState<string[]>(state.withdrawnItems || [])

  useEffect(() => {
    if (ready) {
      setPassword(state.adminPassword)
      setBalanceInput(state.balance.toString())
      setUsernameInput(state.username)
      setUserIdInput(state.userId)
      setAvatarInput(state.avatar || "")
      setWithdrawnItemsInput(state.withdrawnItems || [])
    }
  }, [ready])

  function handleSave() {
    setState((p) => ({ 
      ...p, 
      adminPassword: password,
      username: usernameInput,
      userId: userIdInput,
      avatar: avatarInput || null,
      withdrawnItems: withdrawnItemsInput
    }))
    const parsedBalance = parseFloat(balanceInput)
    if (!isNaN(parsedBalance)) {
      setBalance(parsedBalance)
    }
    toast.success("Настройки успешно сохранены")
  }

  function addWithdrawnItem(skinId: string) {
    setWithdrawnItemsInput([...withdrawnItemsInput, skinId])
  }

  function removeWithdrawnItem(index: number) {
    setWithdrawnItemsInput(withdrawnItemsInput.filter((_, i) => i !== index))
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
          <label className="text-sm font-medium text-muted-foreground">Выведенные предметы</label>
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
            <Button onClick={() => {
              const select = document.getElementById('skin-select') as HTMLSelectElement
              if (select && select.value) {
                addWithdrawnItem(select.value)
              }
            }} variant="secondary">Добавить</Button>
          </div>
          <div className="mt-2 flex flex-col gap-2 max-h-[150px] overflow-y-auto rounded-md border p-2">
            {withdrawnItemsInput.length === 0 && <span className="text-xs text-muted-foreground p-1">Нет выведенных предметов</span>}
            {withdrawnItemsInput.map((skinId, idx) => {
              const skin = state.skins.find(s => s.id === skinId)
              return (
                <div key={idx} className="flex items-center justify-between bg-secondary/30 px-2 py-1.5 rounded-md text-sm">
                  <span>{skin ? skin.name : skinId}</span>
                  <button onClick={() => removeWithdrawnItem(idx)} className="text-destructive hover:text-destructive/80 font-bold text-xs">Удалить</button>
                </div>
              )
            })}
          </div>
        </div>

        <Button onClick={handleSave} className="w-full sm:w-auto">
          <Save className="mr-2 h-4 w-4" />
          Сохранить настройки
        </Button>
      </div>
    </section>
  )
}
