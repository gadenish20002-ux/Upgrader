"use client"

import { AdminGate } from "./admin-gate"
import { PredictControl } from "./predict-control"
import { BalanceControl } from "./balance-control"
import { InventoryControl } from "./inventory-control"
import { SkinsControl } from "./skins-control"
import { UpgradeSkinsControl } from "./upgrade-skins-control"
import { SettingsControl } from "./settings-control"
import { Logo } from "@/components/logo"
import { ArrowLeft } from "lucide-react"

export function AdminClient() {
  return (
    <AdminGate>
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border/60 bg-background/95 px-4 backdrop-blur md:px-6">
          <div className="flex items-center gap-2">
            <Logo className="h-7 w-7 text-primary" />
            <span className="text-lg font-extrabold tracking-wide">UPGRADER</span>
            <span className="ml-2 rounded-md bg-primary px-2 py-0.5 text-xs font-bold text-primary-foreground">
              ADMIN
            </span>
          </div>
          <a href="/" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4" />
            На сайт
          </a>
        </header>

        <main className="mx-auto max-w-5xl space-y-5 px-4 py-6 md:px-6">
          <PredictControl />
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <BalanceControl />
            <SettingsControl />
          </div>
          <InventoryControl />
          <UpgradeSkinsControl />
          <SkinsControl />
        </main>
      </div>
    </AdminGate>
  )
}

