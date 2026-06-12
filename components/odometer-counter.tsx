"use client"

import { useEffect, useRef } from "react"

interface OdometerCounterProps {
  value: number
  className?: string
  format?: string
}

export function OdometerCounter({ value, className = "", format = "( ddd)" }: OdometerCounterProps) {
  const elRef = useRef<HTMLDivElement>(null)
  const instanceRef = useRef<unknown>(null)

  useEffect(() => {
    if (!elRef.current) return

    // dynamically import odometer (client-only)
    import("odometer").then((mod) => {
      const OdometerClass = mod.default ?? mod

      if (!instanceRef.current) {
        instanceRef.current = new (OdometerClass as new (opts: object) => { update: (v: number) => void })({
          el: elRef.current,
          value, // seed with the initial value so only live changes roll
          format,
          theme: "default",
          animation: "count",
        })
        // First render is already at `value`; nothing else to do this tick.
        return
      }

      ;(instanceRef.current as { update: (v: number) => void }).update(value)
    })
  }, [value, format])

  return (
    <div
      ref={elRef}
      className={`odometer odometer-theme-default ${className}`}
    />
  )
}
