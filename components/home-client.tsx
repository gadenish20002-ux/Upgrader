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
        
        {/* Desktop: Sidebar Live Feed */}
        <div className="hidden lg:block shrink-0">
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
