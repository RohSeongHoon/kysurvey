"use client"

import { useEffect, useState } from "react"

interface IntroAnimationProps {
  onComplete: () => void
}

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [phase, setPhase] = useState<"fadeIn" | "hold" | "slideOut" | "complete">("fadeIn")

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase("hold"), 1000) // 1초 후 hold
    const timer2 = setTimeout(() => setPhase("slideOut"), 1000) // 3초 후 slideOut
    const timer3 = setTimeout(() => {
      setPhase("complete")
      onComplete()
    }, 2000) // 3.8초 후 완료

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [onComplete])

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div
        className={`text-4xl md:text-6xl font-bold text-black transition-all duration-1000 ease-in-out ${
          phase === "fadeIn"
            ? "opacity-100 transform translate-y-0"
            : phase === "hold"
              ? "opacity-100 transform translate-y-0"
              : phase === "slideOut"
                ? "opacity-0 transform -translate-y-8"
                : "opacity-0"
        }`}
      >
        Ky Dev Studio
      </div>
    </div>
  )
}
