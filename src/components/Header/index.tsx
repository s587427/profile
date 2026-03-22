import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { DotLottieReact } from "@lottiefiles/dotlottie-react"
import { useState } from "react"
import hoverEffect from "@/assets/hover-effect.lottie"

export function Header({ className }: { className: string }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [playIteration, setPlayIteration] = useState(0)

  function navTo(targetSelector: string) {
    const scrollTrigger = ScrollTrigger.getById("sectionScroll")
    const target = document.querySelector(targetSelector) as HTMLElement

    if (scrollTrigger && target) {
      const scrollToValue = scrollTrigger.start + target.offsetLeft
      gsap.to(window, {
        scrollTo: scrollToValue,
        duration: 1.5,
        ease: "power2.inOut",
      })
    }
  }

  const navItems = [
    { label: "About", target: "#about", href: "#About" },
    { label: "Experience", target: "#experience", href: "#Experience" },
    { label: "Projects", target: "#projects", href: "#Projects" },
  ]

  return (
    <header className={className}>
      <nav className="py-4">
        <ul className="flex justify-center gap-26.75">
          {navItems.map((item, index) => (
            <li
              className="relative"
              key={item.label}
              onClick={() => navTo(item.target)}
              onMouseEnter={() => {
                setHoveredIndex(index)
                setPlayIteration((value) => value + 1)
              }}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {hoveredIndex === index && (
                <div className="pointer-events-none absolute inset-0 scale-170">
                  <DotLottieReact
                    autoplay
                    key={`${item.label}-${playIteration}`}
                    loop={false}
                    speed={2}
                    src={hoverEffect}
                  />
                </div>
              )}
              <a
                className="relative z-10 px-8 py-4 text-[32px] font-bold"
                href={item.href}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
