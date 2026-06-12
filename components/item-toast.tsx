"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"

// Standalone toast system used ONLY for item sold/withdrawn notifications.
// Intentionally independent from sonner so no other app toasts (wins, admin,
// etc.) appear. Markup/styles mirror the reference site's .toast-item.

type ToastType = "success"

interface ToastEntry {
  id: number
  message: string
  type: ToastType
  visible: boolean
  leaving: boolean
}

let toasts: ToastEntry[] = []
let listeners: Array<(t: ToastEntry[]) => void> = []
let counter = 0
const removeTimers = new Map<number, ReturnType<typeof setTimeout>>()

const AUTO_DISMISS_MS = 2500
const LEAVE_MS = 300 // must match the .3s CSS transition

function emit() {
  const snapshot = [...toasts]
  listeners.forEach((l) => l(snapshot))
}

function dismiss(id: number) {
  toasts = toasts.map((t) =>
    t.id === id ? { ...t, leaving: true, visible: false } : t
  )
  emit()
  const existing = removeTimers.get(id)
  if (existing) clearTimeout(existing)
  removeTimers.set(
    id,
    setTimeout(() => {
      toasts = toasts.filter((t) => t.id !== id)
      removeTimers.delete(id)
      emit()
    }, LEAVE_MS)
  )
}

function push(message: string) {
  const id = ++counter
  toasts = [...toasts, { id, message, type: "success", visible: false, leaving: false }]
  emit()
  // Two RAFs so the element mounts hidden (translateX 100%) then slides in.
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      toasts = toasts.map((t) => (t.id === id ? { ...t, visible: true } : t))
      emit()
    })
  })
  setTimeout(() => dismiss(id), AUTO_DISMISS_MS)
}

export function notifyItemSold() {
  push("Предмет продан")
}

export function notifyItemsSold() {
  push("Предметы проданы")
}

export function notifyItemWithdrawn() {
  push("Предмет выведен")
}

export function ItemToaster() {
  const [items, setItems] = useState<ToastEntry[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const listener = (t: ToastEntry[]) => setItems(t)
    listeners.push(listener)
    setItems([...toasts])
    return () => {
      listeners = listeners.filter((l) => l !== listener)
    }
  }, [])

  if (!mounted || items.length === 0) return null

  // Portal to <body> so the fixed container always anchors to the viewport
  // (top-right corner), independent of any transformed/positioned ancestor.
  return createPortal(
    <div className="toast-container">
      {items.map((t) => (
        <div
          key={t.id}
          className={`toast-item toast-${t.type}${t.visible ? " toast-visible" : ""}${
            t.leaving ? " toast-leaving" : ""
          }`}
        >
          <div className="toast-content">
            <div className="toast-icon">
              <svg fill="currentColor" viewBox="0 0 20 20" className="h-5 w-5">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="toast-message">{t.message}</div>
            <button type="button" className="toast-close" onClick={() => dismiss(t.id)}>
              <svg fill="currentColor" viewBox="0 0 20 20" className="h-4 w-4">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>,
    document.body
  )
}
