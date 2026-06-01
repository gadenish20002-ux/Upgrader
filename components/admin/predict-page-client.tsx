"use client"

import { useState } from "react"
import { useStore } from "@/lib/store"
import { AdminGate } from "./admin-gate"
import type { PredictOutcome, PredictHint } from "@/lib/types"
import { ArrowLeft, Target, Check, X, Shuffle, Eye, TrendingUp } from "lucide-react"

const HINT_OPTIONS: { value: PredictHint; label: string; sub: string; color: string; glow: string }[] = [
  { value: "x2",  label: "×2",  sub: "~50% шанс",  color: "#f0c000", glow: "rgba(240,192,0,0.35)" },
  { value: "x4",  label: "×4",  sub: "~25% шанс",  color: "#f07a00", glow: "rgba(240,122,0,0.35)" },
  { value: "x8",  label: "×8",  sub: "~12% шанс",  color: "#eb4b4b", glow: "rgba(235,75,75,0.35)" },
  { value: "35%", label: "35%", sub: "35% шанс",   color: "#4b9fff", glow: "rgba(75,159,255,0.35)" },
  { value: "55%", label: "55%", sub: "55% шанс",   color: "#8847ff", glow: "rgba(136,71,255,0.35)" },
  { value: "75%", label: "75%", sub: "75% шанс",   color: "#4beba4", glow: "rgba(75,235,164,0.35)" },
]

const OUTCOME_OPTIONS: { value: PredictOutcome; label: string; icon: typeof Check; tone: string; bg: string }[] = [
  { value: "off",  label: "Авто (честно)",      icon: Shuffle, tone: "#a7a7a7", bg: "rgba(167,167,167,0.08)" },
  { value: "win",  label: "Гарантированная победа", icon: Check,   tone: "#4beba4", bg: "rgba(75,235,164,0.10)" },
  { value: "lose", label: "Гарантированное поражение", icon: X,   tone: "#eb4b4b", bg: "rgba(235,75,75,0.10)" },
]

function PredictContent() {
  const { state, setState } = useStore()
  const [showHints, setShowHints] = useState(true)

  const outcome = state.predict.outcome
  const hint = state.predict.hint

  function setOutcome(o: PredictOutcome) {
    setState((p) => ({ ...p, predict: { ...p.predict, outcome: o } }))
  }

  function setHint(h: PredictHint) {
    setState((p) => ({ ...p, predict: { ...p.predict, hint: h } }))
  }

  const activeHint = HINT_OPTIONS.find((h) => h.value === hint) ?? HINT_OPTIONS[0]
  const currentOutcome = OUTCOME_OPTIONS.find((o) => o.value === outcome)!

  return (
    <div className="min-h-screen" style={{ background: "#0f1013" }}>
      {/* Header */}
      <header
        className="sticky top-0 z-40 flex h-14 items-center justify-between px-5"
        style={{ background: "#17181c", borderBottom: "1px solid #232325" }}
      >
        <div className="flex items-center gap-3">
          <img src="/assets/images/header/logo.svg" alt="Logo" className="h-7 w-7" />
          <span className="font-extrabold tracking-wide text-white">UPGRADER</span>
          <span
            className="rounded px-2 py-0.5 text-xs font-bold"
            style={{ background: "#f0c000", color: "#111" }}
          >
            PREDICT
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="/admin"
            className="flex items-center gap-1.5 text-sm transition-colors"
            style={{ color: "#a7a7a7" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#f0c000")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#a7a7a7")}
          >
            <ArrowLeft className="h-4 w-4" />
            Админка
          </a>
          <a
            href="/"
            className="flex items-center gap-1.5 text-sm transition-colors"
            style={{ color: "#a7a7a7" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#f0c000")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#a7a7a7")}
          >
            На сайт
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-8">

        {/* Big Predict Card */}
        <div
          className="relative mb-6 overflow-hidden rounded-2xl p-8"
          style={{
            background: "linear-gradient(135deg, #1a1b20 0%, #16171b 100%)",
            border: "1px solid #2a2b30",
            boxShadow: `0 0 60px ${outcome === "win" ? "rgba(75,235,164,0.12)" : outcome === "lose" ? "rgba(235,75,75,0.12)" : "rgba(0,0,0,0)"}`,
          }}
        >
          {/* Decorative glow blob */}
          <div
            className="pointer-events-none absolute -top-16 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full opacity-30 blur-3xl"
            style={{ background: outcome === "off" ? "transparent" : activeHint.glow }}
          />

          <div className="relative">
            {/* Icon + title */}
            <div className="mb-6 flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl"
                style={{ background: "rgba(240,192,0,0.12)", border: "1px solid rgba(240,192,0,0.2)" }}
              >
                <Target className="h-5 w-5" style={{ color: "#f0c000" }} />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">Предикт-окно</h1>
                <p className="text-xs" style={{ color: "#6b6b6b" }}>Только для администратора</p>
              </div>
            </div>

            {/* Current state display */}
            <div
              className="mb-6 rounded-xl p-5 text-center"
              style={{ background: currentOutcome.bg, border: `1px solid ${currentOutcome.tone}30` }}
            >
              {outcome === "off" ? (
                <>
                  <Shuffle className="mx-auto mb-2 h-8 w-8" style={{ color: "#a7a7a7" }} />
                  <div className="text-base font-semibold text-white">Честный режим</div>
                  <div className="mt-1 text-sm" style={{ color: "#6b6b6b" }}>
                    Результат определяется случайно по шансу игрока
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-2 flex items-center justify-center gap-3">
                    {outcome === "win" ? (
                      <Check className="h-8 w-8" style={{ color: "#4beba4" }} />
                    ) : (
                      <X className="h-8 w-8" style={{ color: "#eb4b4b" }} />
                    )}
                    <div
                      className="text-5xl font-black tracking-tight"
                      style={{
                        color: activeHint.color,
                        textShadow: `0 0 30px ${activeHint.glow}`,
                      }}
                    >
                      {activeHint.label}
                    </div>
                  </div>
                  <div className="mt-1 text-sm font-semibold text-white">
                    {outcome === "win"
                      ? `Ставить на ${activeHint.label} → ПОБЕДА`
                      : `Ставить на ${activeHint.label} → ПРОИГРЫШ`}
                  </div>
                  <div className="mt-0.5 text-xs" style={{ color: "#6b6b6b" }}>
                    {activeHint.sub} · следующий апгрейд{" "}
                    <span style={{ color: outcome === "win" ? "#4beba4" : "#eb4b4b" }}>
                      {outcome === "win" ? "выиграет" : "проиграет"}
                    </span>{" "}
                    вне зависимости от реального шанса
                  </div>
                </>
              )}
            </div>

            {/* Outcome Mode Selector */}
            <div className="mb-6">
              <div className="mb-3 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" style={{ color: "#6b6b6b" }} />
                <span className="text-sm font-semibold text-white">Режим исхода</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {OUTCOME_OPTIONS.map((opt) => {
                  const Icon = opt.icon
                  const active = outcome === opt.value
                  return (
                    <button
                      key={opt.value}
                      onClick={() => setOutcome(opt.value)}
                      className="rounded-xl p-3 text-center transition-all duration-200"
                      style={{
                        background: active ? opt.bg : "rgba(255,255,255,0.03)",
                        border: active ? `1px solid ${opt.tone}50` : "1px solid #2a2b30",
                        boxShadow: active ? `0 0 16px ${opt.tone}20` : "none",
                        transform: active ? "scale(1.02)" : "scale(1)",
                      }}
                    >
                      <Icon
                        className="mx-auto mb-1.5 h-5 w-5"
                        style={{ color: active ? opt.tone : "#6b6b6b" }}
                      />
                      <div
                        className="text-xs font-semibold leading-snug"
                        style={{ color: active ? opt.tone : "#a7a7a7" }}
                      >
                        {opt.label}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Hint Selector — only visible when not "off" */}
            {outcome !== "off" && (
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4" style={{ color: "#6b6b6b" }} />
                    <span className="text-sm font-semibold text-white">На что ставить</span>
                  </div>
                  <span className="text-xs" style={{ color: "#6b6b6b" }}>
                    {outcome === "win" ? "→ победа" : "→ проигрыш"}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                  {HINT_OPTIONS.map((opt) => {
                    const active = hint === opt.value
                    return (
                      <button
                        key={opt.value}
                        onClick={() => setHint(opt.value)}
                        className="rounded-xl py-4 text-center transition-all duration-200"
                        style={{
                          background: active
                            ? `linear-gradient(135deg, ${opt.glow.replace("0.35", "0.18")}, ${opt.glow.replace("0.35", "0.08")})`
                            : "rgba(255,255,255,0.03)",
                          border: active ? `1px solid ${opt.color}50` : "1px solid #2a2b30",
                          boxShadow: active ? `0 0 20px ${opt.glow}` : "none",
                          transform: active ? "scale(1.05)" : "scale(1)",
                        }}
                      >
                        <div
                          className="text-xl font-black"
                          style={{ color: active ? opt.color : "#6b6b6b" }}
                        >
                          {opt.label}
                        </div>
                        <div
                          className="mt-0.5 text-[10px]"
                          style={{ color: active ? opt.color + "cc" : "#4a4a4a" }}
                        >
                          {opt.sub}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Info note */}
        <div
          className="rounded-xl px-4 py-3 text-sm"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid #2a2b30", color: "#6b6b6b" }}
        >
          <span style={{ color: "#f0c000" }}>⚠ Только для администратора.</span> Игрок видит лишь
          результат вращения. Настройки мгновенно синхронизируются между вкладками.
        </div>
      </main>
    </div>
  )
}

export function PredictPageClient() {
  return (
    <AdminGate>
      <PredictContent />
    </AdminGate>
  )
}
