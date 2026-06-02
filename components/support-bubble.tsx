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
          <span className="cc-2gk6o flex items-center justify-center w-full h-full" data-id="chat_closed" data-prefer-search="false">
            <span 
              className="cc-1er0q cc-nch8a block w-[32px] h-[28px] bg-white" 
              data-partial-pending="false"
              style={{
                maskImage: 'url("/assets/Без названия.svg")',
                WebkitMaskImage: 'url("/assets/Без названия.svg")',
                maskSize: 'contain',
                WebkitMaskSize: 'contain',
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat',
                maskPosition: 'center',
                WebkitMaskPosition: 'center',
              }}
            ></span>
          </span>
        )}
      </button>
    </>
  )
}
