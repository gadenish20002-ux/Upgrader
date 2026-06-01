"use client"

import { useStore } from "@/lib/store"
import type { PredictOutcome, PredictHint } from "@/lib/types"
import { Target, Check, X, Shuffle, ExternalLink } from "lucide-react"

const HINT_OPTIONS: { value: PredictHint; label: string }[] = [
  { value: "x2",  label: "×2" },
  { value: "x4",  label: "×4" },
  { value: "x8",  label: "×8" },
  { value: "35%", label: "35%" },
  { value: "55%", label: "55%" },
  { value: "75%", label: "75%" },
]

export function PredictControl() {
  const { state, setState } = useStore()

  function setOutcome(outcome: PredictOutcome) {
    setState((p) => ({ ...p, predict: { ...p.predict, outcome } }))
  }

  function setHint(hint: PredictHint) {
    setState((p) => ({ ...p, predict: { ...p.predict, hint } }))
  }

  const options: { value: PredictOutcome; label: string; desc: string; icon: typeof Check; tone: string }[] = [
    { value: "off",  label: "Авто (честно)",        desc: "Результат по реальному шансу",    icon: Shuffle, tone: "border-border" },
    { value: "win",  label: "Всегда победа",         desc: "Следующий апгрейд выигрывает",   icon: Check,   tone: "border-green-500/60" },
    { value: "lose", label: "Всегда поражение",      desc: "Следующий апгрейд проигрывает",  icon: X,       tone: "border-destructive/60" },
  ]

  const outcome = state.predict.outcome
  const hint = state.predict.hint

  return (
    <section className="rounded-xl border border-border bg-card p-5">
      <div className="mb-1 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          <h2 className="font-semibold">Предикт — управление исходом</h2>
        </div>
        <a
          href="/admin/predict"
          target="_blank"
          className="flex items-center gap-1 rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/20"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          Открыть предикт-окно
        </a>
      </div>
      <p className="mb-4 text-sm text-muted-foreground">
        Подсказка видна только здесь. Игрок на сайте видит лишь результат вращения.
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {options.map((opt) => {
          const active = outcome === opt.value
          const Icon = opt.icon
          return (
            <button
              key={opt.value}
              onClick={() => setOutcome(opt.value)}
              className={`rounded-lg border-2 bg-secondary/40 p-4 text-left transition-all ${
                active ? `${opt.tone} ring-2 ring-primary/30` : "border-border/50 hover:border-border"
              }`}
            >
              <div className="mb-1 flex items-center gap-2">
                <Icon className="h-4 w-4" />
                <span className="font-semibold">{opt.label}</span>
              </div>
              <p className="text-xs text-muted-foreground">{opt.desc}</p>
            </button>
          )
        })}
      </div>

      {/* Hint selector — shown only when win/lose */}
      {outcome !== "off" && (
        <div className="mt-4">
          <p className="mb-2 text-xs text-muted-foreground font-medium">
            Подсказка игроку: на что ставить ({outcome === "win" ? "→ победа" : "→ проигрыш"})
          </p>
          <div className="flex flex-wrap gap-2">
            {HINT_OPTIONS.map((opt) => {
              const active = hint === opt.value
              return (
                <button
                  key={opt.value}
                  onClick={() => setHint(opt.value)}
                  className={`rounded-lg border-2 px-4 py-2 text-sm font-bold transition-all ${
                    active
                      ? "border-primary bg-primary/20 text-primary ring-2 ring-primary/20"
                      : "border-border/50 bg-secondary/40 text-muted-foreground hover:border-border hover:text-foreground"
                  }`}
                >
                  {opt.label}
                </button>
              )
            })}
          </div>
        </div>
      )}

      <div className="mt-4 rounded-lg bg-secondary/60 px-4 py-3 text-sm">
        Текущий режим:{" "}
        <span className="font-bold text-primary">
          {outcome === "off"
            ? "Честный (по шансу)"
            : outcome === "win"
              ? `Победа · подсказка: ${hint}`
              : `Поражение · подсказка: ${hint}`}
        </span>
      </div>
    </section>
  )
}
