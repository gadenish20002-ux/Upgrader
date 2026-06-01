"use client"

import { useState } from "react"
import { useStore, getSkin, formatPrice } from "@/lib/store"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Backpack, Plus, Trash2 } from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"

export function InventoryControl() {
  const { state, addToInventory, removeFromInventory } = useStore()
  const [pick, setPick] = useState<string>("")

  function add() {
    if (!pick) {
      toast.error("Выберите скин")
      return
    }
    addToInventory(pick)
    toast.success("Добавлено в инвентарь игрока")
  }

  return (
    <section className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center gap-2">
        <Backpack className="h-5 w-5 text-primary" />
        <h2 className="font-semibold">Инвентарь игрока ({state.inventory.length})</h2>
      </div>

      <div className="mb-4 flex flex-col gap-2 sm:flex-row">
        <Select value={pick} onValueChange={setPick}>
          <SelectTrigger className="flex-1">
            <SelectValue placeholder="Выберите скин для выдачи" />
          </SelectTrigger>
          <SelectContent>
            {state.skins.map((s) => (
              <SelectItem key={s.id} value={s.id}>
                {s.weapon} | {s.name} — {formatPrice(s.price)} ₽
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={add}>
          <Plus className="mr-1 h-4 w-4" />
          Выдать
        </Button>
      </div>

      {state.inventory.length === 0 ? (
        <p className="py-6 text-center text-sm text-muted-foreground">Инвентарь пуст</p>
      ) : (
        <div className="custom-scroll grid max-h-[300px] grid-cols-2 gap-2 overflow-y-auto sm:grid-cols-3">
          {state.inventory.map((item) => {
            const skin = getSkin(state.skins, item.skinId)
            if (!skin) return null
            return (
              <div key={item.uid} className="relative rounded-lg border border-border bg-secondary/40 p-2">
                <button
                  onClick={() => removeFromInventory([item.uid])}
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
            )
          })}
        </div>
      )}
    </section>
  )
}
