"use client"

import { useStore } from "@/lib/store"

export function LoginButton({ className, withIcon }: { className?: string, withIcon?: boolean }) {
  const { login } = useStore()
  return (
    <button
      onClick={() => {
        try {
          const key = window.localStorage.getItem("upgrader_account_key") || "none"
          window.localStorage.setItem(`upgrader_public_logged_in:${key}`, "1")
        } catch {}
        login()
      }}
      className={`inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none leading-[1.25] select-none bg-[#FBD506] text-[#1C1C20] rounded-md px-3 lg:px-4 py-2 lg:py-3 shadow-[0px_4px_10px_0px_rgba(0,0,0,0.1)] hover:shadow-[0_0_20px_0_rgba(255,171,27,0.80)] min-h-[41px] text-xs lg:text-base cursor-pointer ${className || ''}`}
    >
      <span className="pointer-events-none select-none flex items-center gap-2">
        Войти через Steam
        {withIcon && <img src="/assets/icons/steam-dark.svg" alt="Steam" className="w-5 h-5" />}
      </span>
    </button>
  )
}
