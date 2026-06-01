"use client"

import { useState } from "react"
import { MessageCircle, X } from "lucide-react"

export function SupportBubble() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-4 z-50 w-[320px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
          <div className="bg-primary p-4 text-primary-foreground">
            <p className="font-bold">Вопросы? Напишите нам в чат!</p>
            <p className="text-sm opacity-90">Наша команда поможет вам с Upgrader</p>
          </div>
          <div className="space-y-3 p-4 text-sm">
            <div className="rounded-lg bg-secondary px-3 py-2">Как мы можем помочь вам с Upgrader?</div>
            <input
              placeholder="Отправьте сообщение..."
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Поддержка"
        className="fixed bottom-5 right-5 z-50 flex h-[54px] w-[54px] items-center justify-center rounded-full bg-[#E1AE01] text-white shadow-lg transition-transform hover:scale-105"
      >
        {open ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <svg width="26" height="26" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="chatGrad" x1="12" y1="3" x2="12" y2="21" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#f0f0f0" />
              </linearGradient>
            </defs>
            <path fill="url(#chatGrad)" d="M21 15C21 16.1046 20.1046 17 19 17H14.5L12 21L9.5 17H5C3.89543 17 3 16.1046 3 15V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V15Z" />
          </svg>
        )}
      </button>
    </>
  )
}
