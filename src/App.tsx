import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { TextPlugin } from "gsap/TextPlugin"
import { useRef } from "react"
import "./App.css"
import { Footer } from "./components/Footer"
import { Header } from "./components/Header"
import { StarBackground } from "./components/StarBackground"
import { HeroSection } from "./features/hero-section"
import { RestSections } from "./features/rest-sections"
import { useHeroTimeLine } from "./hooks/useHeroTimeLine"
import { useResizeObserver } from "./hooks/useResizeObserver"

gsap.registerPlugin(
  useGSAP,
  TextPlugin,
  DrawSVGPlugin,
  ScrollToPlugin,
  ScrollTrigger
)

function App() {
  const appRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const { width: containerWidth } =
    useResizeObserver<HTMLDivElement>(containerRef)
  useHeroTimeLine(appRef)

  // pin
  useGSAP(
    () => {
      const tailwindContainer = appRef.current?.querySelector(
        ".container"
      ) as HTMLElement

      const wrapper = appRef.current?.querySelector(
        ".sections-wrapper"
      ) as HTMLElement
      const container = appRef.current?.querySelector(
        ".sections-container"
      ) as HTMLElement

      if (!wrapper || !container || !tailwindContainer) return

      // 定義一個內部函式，專門用來抓取最新的距離
      const getDistance = () => {
        const dist = wrapper.scrollWidth - tailwindContainer.offsetWidth
        console.log({ dist })
        return dist <= 0 ? 0 : dist
      }

      ScrollTrigger.create({
        id: "sectionScroll",
        markers: true,
        trigger: wrapper,
        start: "top top",
        end: () => `+=${getDistance()}`,
        scrub: true,
        pin: true,
        invalidateOnRefresh: true, // <--- 關鍵！這會讓 GSAP 在 resize 時重新計算
        onUpdate(self) {
          console.log(self.progress, "pin")
        },
        animation: gsap.to(container, {
          x: () => -getDistance(),
          ease: "none",
        }),
      })
    },
    { scope: appRef }
  )

  return (
    <div id="app" ref={appRef}>
      <Header className="header fixed z-10 h-(--header-height) w-full" />

      <main>
        <div ref={containerRef} className="container mx-auto">
          <HeroSection className="hero h-screen w-full" />
          <div className="sections-wrapper relative h-screen w-full overflow-hidden">
            <div className="sections-container relative flex h-full">
              <RestSections containerWidth={containerWidth} />
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <StarBackground />
    </div>
  )
}

export default App
