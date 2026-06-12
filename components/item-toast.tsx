"use client"

import { toast } from "sonner"
import { Check } from "lucide-react"

/**
 * Green success "plashka" that pops in the top-right corner, matching the
 * reference site: slide-in from the right (translateX 100% -> 0) + fade,
 * 0.3s ease-in-out, success green #53DB42.
 */
function showItemToast(message: string) {
  toast.custom(
    () => (
      <div
        className="item-toast-badge flex items-center gap-2.5 rounded-[10px] px-4 py-3 font-exo2 shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
        style={{
          background: "linear-gradient(135deg, #53DB42 0%, #3FB233 100%)",
          minWidth: "13.75rem",
        }}
      >
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/25">
          <Check className="h-4 w-4 text-white" strokeWidth={3} />
        </span>
        <span className="text-sm font-semibold text-white">{message}</span>
      </div>
    ),
    { duration: 2500 }
  )
}

export function notifyItemSold() {
  showItemToast("Предмет продан")
}

export function notifyItemsSold() {
  showItemToast("Предметы проданы")
}

export function notifyItemWithdrawn() {
  showItemToast("Предмет выведен")
}
