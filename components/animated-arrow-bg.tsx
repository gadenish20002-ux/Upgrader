"use client"

import React, { useRef, useEffect } from 'react'
import Lottie from 'lottie-react'
import arrowAnimIdle from '@/public/assets/lottie/arrow-anim-hover.json'

export function AnimatedArrowBg({ color, className }: { color: string, className?: string }) {
  const lottieRef = useRef<any>(null)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    
    // Exact same animation logic as live-feed
    const playPeriodically = () => {
      if (lottieRef.current) {
        lottieRef.current.play()
        setTimeout(() => {
          if (lottieRef.current) {
            lottieRef.current.stop()
          }
        }, 2000)
      }
      timeoutId = setTimeout(playPeriodically, 8000)
    }

    timeoutId = setTimeout(playPeriodically, 8000)
    return () => clearTimeout(timeoutId)
  }, [])

  return (
    <div 
      className={`[&_path]:!fill-current pointer-events-none ${className || ''}`}
      style={{ color }}
    >
      <Lottie
        lottieRef={lottieRef}
        autoplay={false}
        animationData={arrowAnimIdle}
        loop={true}
        className="w-full h-full"
      />
    </div>
  )
}
