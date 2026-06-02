"use client"

import { useState } from "react"
import { SiteHeader } from "./site-header"
import { SiteFooter } from "./site-footer"
import { LiveFeed } from "./live-feed"
import { UpgradeSection } from "./upgrade-section"
import { SupportBubble } from "./support-bubble"
import { useStore } from "@/lib/store"

export function HomeClient() {
  const { ready } = useStore()
  const [sidebarTargetId, setSidebarTargetId] = useState<string | null>(null)

  if (!ready) {
    return <div className="min-h-screen bg-transparent" />
  }

  return (
    <div className="min-h-screen bg-transparent text-foreground flex flex-col">
      <SiteHeader />
      <div className="flex flex-1 flex-col lg:flex-row pt-[3.25rem] md:pt-[4.25rem]">
        {/* Mobile: Top Live Feed */}
        <div className="lg:hidden border-b border-border/40">
          <LiveFeed selectedId={sidebarTargetId} onSelect={setSidebarTargetId} isMobile={true} />
        </div>
        
        {/* Desktop: Sidebar Live Feed — sticky, full viewport height */}
        <div
          className="hidden lg:block w-[12.5rem] shrink-0 border-r border-[#232325] mt-2 rounded-tr-xl overflow-hidden"
          style={{ position: "sticky", top: "calc(4.25rem + 0.5rem)", height: "calc(100vh - 4.25rem - 0.5rem)", overflowY: "hidden" }}
        >
          <LiveFeed selectedId={sidebarTargetId} onSelect={setSidebarTargetId} isMobile={false} />
        </div>

        <div className="min-w-0 flex-1 flex flex-col">
          <main className="flex-1 px-4 pt-8 pb-3 md:px-6 flex flex-col">
            <UpgradeSection sidebarTargetId={sidebarTargetId} />
          </main>
          <SiteFooter />
        </div>
      </div>
      <SupportBubble />
    </div>
  )
}
