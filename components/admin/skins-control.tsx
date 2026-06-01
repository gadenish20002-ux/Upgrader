"use client"

import { useState } from "react"
import { useStore, formatPrice } from "@/lib/store"
import type { Skin, Rarity } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RARITY_COLORS, DEFAULT_SKINS } from "@/lib/default-data"
import { Package, Plus, Trash2, RotateCcw } from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"

const RARITIES: Rarity[] = ["common", "uncommon", "rare", "mythical", "legendary", "ancient"]
const IMAGE_OPTIONS = Array.from(new Set(DEFAULT_SKINS.map((s) => s.image)))

const EMPTY = {
  weapon: "",
  name: "",
  wear: "FN",
  price: "",
  rarity: "rare" as Rarity,
  image: IMAGE_OPTIONS[0],
}

export function SkinsControl() {
  const { state, setState } = useStore()
  const [form, setForm] = useState(EMPTY)

  function addSkin() {
    if (!form.weapon || !form.name || !form.price) {
      toast.error("Заполните оружие, название и цену")
      return
    }
    const skin: Skin = {
      id: `skin-${Date.now()}`,
      weapon: form.weapon,
      name: form.name,
      wear: form.wear,
      price: Number(form.price),
      rarity: form.rarity,
      image: form.image,
    }
    setState((p) => ({ ...p, skins: [skin, ...p.skins] }))
    setForm(EMPTY)
    toast.success("Скин добавлен в каталог")
  }

  function removeSkin(id: string) {
    setState((p) => ({ ...p, skins: p.skins.filter((s) => s.id !== id) }))
    toast.success("Скин удалён")
  }

  function resetCatalog() {
    setState((p) => ({ ...p, skins: DEFAULT_SKINS }))
    toast.success("Каталог сброшен")
  }

  return (
    <section className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Package className="h-5 w-5 text-primary" />
          <h2 className="font-semibold">Каталог скинов ({state.skins.length})</h2>
        </div>
        <Button variant="ghost" size="sm" onClick={resetCatalog}>
          <RotateCcw className="mr-1 h-4 w-4" />
          Сбросить
        </Button>
      </div>

      {/* add form */}
      <div className="mb-5 grid grid-cols-1 gap-3 rounded-lg bg-secondary/40 p-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-1">
          <Label className="text-xs">Оружие</Label>
          <Input value={form.weapon} onChange={(e) => setForm({ ...form, weapon: e.target.value })} placeholder="AK-47" />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Название</Label>
          <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Redline" />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Цена (₽)</Label>
          <Input
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value.replace(/\D/g, "") })}
            placeholder="4850"
            inputMode="numeric"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Износ</Label>
          <Select value={form.wear} onValueChange={(v) => setForm({ ...form, wear: v })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {["FN", "MW", "FT", "WW", "BS"].map((w) => (
                <SelectItem key={w} value={w}>{w}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Редкость</Label>
          <Select value={form.rarity} onValueChange={(v) => setForm({ ...form, rarity: v as Rarity })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {RARITIES.map((r) => (
                <SelectItem key={r} value={r}>{r}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Изображение</Label>
          <Select value={form.image} onValueChange={(v) => setForm({ ...form, image: v })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {IMAGE_OPTIONS.map((img) => (
                <SelectItem key={img} value={img}>{img.split("/").pop()}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="sm:col-span-2 lg:col-span-3">
          <Button onClick={addSkin} className="w-full">
            <Plus className="mr-1 h-4 w-4" />
            Добавить скин
          </Button>
        </div>
      </div>

      {/* list */}
      <div className="custom-scroll grid max-h-[360px] grid-cols-2 gap-2 overflow-y-auto sm:grid-cols-3 lg:grid-cols-4">
        {state.skins.map((skin) => (
          <div key={skin.id} className="relative rounded-lg border border-border bg-secondary/40 p-2">
            <span className="absolute left-0 top-0 h-1 w-full" style={{ background: RARITY_COLORS[skin.rarity] }} />
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
    </section>
  )
}
