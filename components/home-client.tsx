"use client"

import { useState, useEffect } from "react"
import { SiteHeader } from "./site-header"
import { SiteFooter } from "./site-footer"
import { LiveFeed } from "./live-feed"
import { UpgradeSection } from "./upgrade-section"
import { SupportBubble } from "./support-bubble"
import { useStore } from "@/lib/store"
import { preloadWinAnimationFrames } from "./win-animation-overlay"
import { UserProfile } from "./user-profile"

function publicLoginKey() {
  try {
    const key = window.localStorage.getItem("upgrader_account_key") || "none"
    return `upgrader_public_logged_in:${key}`
  } catch {
    return "upgrader_public_logged_in:none"
  }
}

function publicLoginEnabled() {
  try {
    return window.localStorage.getItem(publicLoginKey()) === "1"
  } catch {
    return false
  }
}

function markPublicLogin() {
  try {
    window.localStorage.setItem(publicLoginKey(), "1")
    window.dispatchEvent(new CustomEvent("upgrader-public-login-changed"))
  } catch {}
}

export function HomeClient() {
  const { ready, state, login } = useStore()
  const [sidebarTargetId, setSidebarTargetId] = useState<string | null>(null)
  const [showProfile, setShowProfile] = useState(false)

  useEffect(() => {
    preloadWinAnimationFrames()
  }, [])

  const restoreLogin = publicLoginEnabled() && !state.loggedIn

  useEffect(() => {
    if (restoreLogin) login()
  }, [restoreLogin, login])

  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null
      const action = target?.closest("button,a") as HTMLElement | null
      if (!action) return
      if (!action.textContent?.includes("Войти через Steam")) return
      event.preventDefault()
      event.stopPropagation()
      markPublicLogin()
      login()
    }
    document.addEventListener("click", onClick, true)
    return () => document.removeEventListener("click", onClick, true)
  }, [login])

  const hideMultiplierXs = state.predict.showMultipliers === false

  if (!ready || restoreLogin) {
    return <div className="min-h-screen bg-transparent" />
  }

  return (
    <div className={`min-h-screen bg-transparent text-foreground flex flex-col${hideMultiplierXs ? " hide-multiplier-xs" : ""}`}>
      <SiteHeader onProfileClick={() => setShowProfile((prev) => !prev)} onLogoClick={() => setShowProfile(false)} />
      <div className="flex flex-1 flex-col lg:flex-row pt-[3.25rem] md:pt-[4.25rem]">
        <div className="lg:hidden border-b border-border/40 lose-anim-blur-target">
          <LiveFeed selectedId={sidebarTargetId} onSelect={setSidebarTargetId} isMobile={true} />
        </div>
        <div className="hidden lg:block shrink-0 lose-anim-blur-target">
          <LiveFeed selectedId={sidebarTargetId} onSelect={setSidebarTargetId} isMobile={false} />
        </div>
        <div className="min-w-0 flex-1 flex flex-col">
          <main className="flex-1 px-4 pt-8 pb-3 md:px-6 flex flex-col">
            {showProfile ? <UserProfile onClose={() => setShowProfile(false)} /> : <UpgradeSection sidebarTargetId={sidebarTargetId} />}
          </main>
          <SiteFooter />
        </div>
      </div>
      <SupportBubble />
    </div>
  )
}
