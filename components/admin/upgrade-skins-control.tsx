"use client"

import { useState } from "react"
import { useStore, formatPrice } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Target, Plus, Trash2 } from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"
import type { Skin } from "@/lib/types"

export function UpgradeSkinsControl() {
  const { state, setState } = useStore()
  const [pick, setPick] = useState<string>("")
  const [customPrice, setCustomPrice] = useState<string>("")

  function add() {
    if (!pick) {
      toast.error("Выберите скин")
      return
    }
    if (!customPrice || isNaN(Number(customPrice))) {
      toast.error("Укажите корректную цену")
      return
    }
    
    const baseSkin = state.skins.find(s => s.id === pick)
    if (!baseSkin) return

    const newSkin: Skin = {
      ...baseSkin,
      id: `upgrade-skin-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      price: Number(customPrice)
    }

    setState(p => ({ ...p, upgradeSkins: [newSkin, ...p.upgradeSkins] }))
    toast.success("Добавлено в скины для апгрейда")
    setPick("")
    setCustomPrice("")
  }

  function removeSkin(id: string) {
    setState((p) => ({ ...p, upgradeSkins: p.upgradeSkins.filter((s) => s.id !== id) }))
    toast.success("Скин удалён из апгрейда")
  }

  return (
    <section className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center gap-2">
        <Target className="h-5 w-5 text-primary" />
        <h2 className="font-semibold">Скины для апгрейда ({state.upgradeSkins.length})</h2>
      </div>

      <div className="mb-4 flex flex-col gap-2 sm:flex-row">
        <Select value={pick} onValueChange={(val) => {
            setPick(val)
            const s = state.skins.find(skin => skin.id === val)
            if (s) setCustomPrice(s.price.toString())
        }}>
          <SelectTrigger className="flex-[2]">
            <SelectValue placeholder="Выберите базовый скин" />
          </SelectTrigger>
          <SelectContent>
            {state.skins.map((s) => (
              <SelectItem key={s.id} value={s.id}>
                {s.weapon} | {s.name} — {formatPrice(s.price)} ₽
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Input 
          value={customPrice} 
          onChange={(e) => setCustomPrice(e.target.value.replace(/\D/g, ""))} 
          placeholder="Цена (₽)" 
          className="flex-1"
        />

        <Button onClick={add}>
          <Plus className="mr-1 h-4 w-4" />
          Добавить
        </Button>
      </div>

      {state.upgradeSkins.length === 0 ? (
        <p className="py-6 text-center text-sm text-muted-foreground">Список пуст</p>
      ) : (
        <div className="custom-scroll grid max-h-[300px] grid-cols-2 gap-2 overflow-y-auto sm:grid-cols-3 md:grid-cols-4">
          {state.upgradeSkins.map((skin) => (
            <div key={skin.id} className="relative rounded-lg border border-border bg-secondary/40 p-2">
              <button
                onClick={() => removeSkin(skin.id)}
                aria-label="Удалить"
                className="absolute right-1 top-1 z-10 rounded-md bg-background/70 p-1 text-destructive hover:bg-destructive hover:text-destructive-foreground"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
              <div className="relative mx-auto h-12 w-full">
                <Image src={skin.image || "/placeholder.svg"} alt={skin.name} fill className="object-contain" sizes="100px" />
              </div>
              <div className="truncate text-[10px] text-muted-foreground">{skin.weapon}</div>
              <div className="truncate text-xs font-semibold">{skin.name}</div>
              <div className="text-xs font-bold text-primary">{formatPrice(skin.price)} ₽</div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
