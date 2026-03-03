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
      const rootElement = appRef.current?.querySelector("main") as HTMLElement

      const wrapper = appRef.current?.querySelector(
        ".sections-wrapper"
      ) as HTMLElement
      const container = appRef.current?.querySelector(
        ".sections-container"
      ) as HTMLElement

      const aboutElement = document.querySelector(".about") as HTMLElement
      const mcElement = document.querySelector(".about-mc") as HTMLElement
      const houseElement = document.querySelector(".house") as HTMLElement
      const lightWindowElement = document.querySelector(
        ".light-window"
      ) as HTMLElement
      if (!wrapper || !container || !rootElement) return

      // 定義一個內部函式，專門用來抓取最新的距離
      const getDistance = () => {
        const dist =
          wrapper.scrollWidth -
          rootElement.offsetWidth +
          parseFloat(getComputedStyle(aboutElement).paddingLeft)
        console.log({ dist })

        return dist <= 0 ? 0 : dist
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          id: "sectionScroll",
          trigger: wrapper,
          // markers: true,
          start: "top top",
          end: () => `+=${getDistance()}`,
          scrub: true,
          pin: true,
          invalidateOnRefresh: true, // <--- 關鍵！這會讓 GSAP 在 resize 時重新計算
          onUpdate(self) {
            // console.log(self.progress, "pin")
          },
          refreshPriority: 1, //  確保 Pin 的 ScrollTrigger 優先級高於 Footer
        },
      })

      tl.to(container, {
        x: () => {
          return (
            -1 *
            (houseElement.offsetLeft -
              window.innerWidth / 2 +
              houseElement.offsetWidth / 2)
          )
        },
      })
      tl.to(
        mcElement,
        {
          x: () =>
            houseElement.offsetLeft -
            mcElement.offsetLeft -
            -(houseElement.offsetWidth / 2),
        },
        ">-=0.1"
      )
      tl.to(mcElement, {
        alpha: 0,
        duration: 0.2,
      })

      tl.to(lightWindowElement, {
        background: "yellow",
        duration: 0.1,
      })

      tl.to(container, {
        x: () => -getDistance(),
        duration: 1,
      })
    },
    { scope: appRef }
  )

  return (
    <div id="app" ref={appRef}>
      <Header className="header fixed z-10 h-(--header-height) w-full" />

      <main ref={containerRef}>
        <HeroSection className="hero h-screen w-full" />
        <div className="sections-wrapper relative h-screen w-full overflow-hidden">
          <div className="sections-container relative bottom-[18.5%] flex h-full">
            <RestSections containerWidth={containerWidth} />
          </div>
          {/* <img
            className="absolute bottom-[18.5%] left-0 h-4 w-full"
            src={groundSrc}
          /> */}
          <div className="bg-white-ground absolute bottom-[18.2%] left-0 h-3 w-full" />
        </div>
      </main>

      <Footer />

      <StarBackground />
    </div>
  )
}

export default App
