import clsx from "clsx"
import { useRef } from "react"
import MCSvg from "./assets/mc.svg?react" // Vite

type HeroSectionProps = {
  className?: string
}

export function HeroSection({ className }: HeroSectionProps) {
  const mcSvgRef = useRef<SVGSVGElement>(null)

  return (
    <section className={clsx("relative w-416 shrink-0", className)}>
      <div className="absolute top-1/2 left-1/2 w-full max-w-295.75 -translate-1/2 text-center">
        <p className="paragraph-1 text-[120px] tracking-[5%]"></p>
        <p className="paragraph-2 text-[120px] tracking-[5%]"></p>
      </div>

      <MCSvg
        ref={mcSvgRef}
        className="hero-mc bg-item absolute top-[47%] right-8"
      />
      <div className="absolute bottom-0 left-0 z-20 flex w-full flex-col items-center justify-center">
        <div className="text-scroll-down mb-12 text-[32px] font-bold">
          Scroll Down
        </div>
        <div className="relative flex h-37 w-full justify-center">
          <div className="line-scroll-down absolute top-0 h-37.5 w-px bg-white" />
        </div>
      </div>
    </section>
  )
}
