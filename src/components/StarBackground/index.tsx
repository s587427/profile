import StarSvg1 from "@/assets/star-1.svg?react"
import StarSvg2 from "@/assets/star-2.svg?react"
import StarSvg3 from "@/assets/star-3.svg?react"
import StarSvg4 from "@/assets/star-4.svg?react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useRef } from "react"
import "./index.css"

export function StarBackground() {
  const starsRef = useRef<HTMLDivElement | null>(null)

  // stars stay fixed, but lag briefly while scrolling
  useGSAP(() => {
    const items = gsap.utils.toArray(".star-wrapper") as HTMLElement[]
    let lastScroll = window.scrollY
    const lagDurations = [0.4, 0.58, 0.76, 0.92]
    const lagStrengths = [0.85, 1.05, 1.25, 1.45]
    const lagLimits = [80, 100, 120, 140]

    const lagSetters = items.map((star, i) =>
      gsap.quickTo(star, "y", {
        duration: lagDurations[i % lagDurations.length],
        ease: "none",
      })
    )

    const settleBack = gsap
      .delayedCall(0.08, () => {
        lagSetters.forEach((setY) => setY(0))
      })
      .pause()

    ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        const currentScroll = self.scroll()
        const delta = currentScroll - lastScroll
        lastScroll = currentScroll

        lagSetters.forEach((setY, i) => {
          const strength = lagStrengths[i % lagStrengths.length]
          const limit = lagLimits[i % lagLimits.length]
          const lagOffset = gsap.utils.clamp(-limit, limit, delta * strength)
          setY(lagOffset)
        })

        settleBack.restart(true)
      },
    })
  })

  return (
    <div ref={starsRef} className="stars fixed top-0 -z-10 h-full w-full">
      <div className="star-wrapper bg-item absolute top-[63.05%] left-[5%]">
        <StarSvg1 className="star h-39.75 w-43.5" />
      </div>

      <div className="star-wrapper bg-item absolute top-[13%] left-[18.5%]">
        <StarSvg2 className="star h-29.5 w-34.75" />
      </div>
      <div className="star-wrapper bg-item absolute top-[70.45%] left-[68%]">
        <StarSvg3 className="star h-17.5 w-24.25" />
      </div>
      <div className="star-wrapper bg-item absolute top-[18.4%] right-[11%]">
        <StarSvg4 className="star h-45.75 w-48" />
      </div>
    </div>
  )
}
