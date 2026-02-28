import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { TextPlugin } from "gsap/TextPlugin"
import { useRef } from "react"
import { AboutSection } from "./AboutSection"
import "./App.css"
import StarSvg1 from "./assets/star-1.svg?react"
import StarSvg2 from "./assets/star-2.svg?react"
import StarSvg3 from "./assets/star-3.svg?react"
import StarSvg4 from "./assets/star-4.svg?react"
import { Header } from "./components/Header"
import { ExperienceSection } from "./ExperienceSection"
import { HeroSection } from "./HeroSection"
import { ProjectSection } from "./ProjectSection"

gsap.registerPlugin(useGSAP, TextPlugin, DrawSVGPlugin, ScrollTrigger)

// todo star scale rotate infinite
// todo hero vertical scroll -> about -> pin -> horizion scroll -> exp -> horizion scroll -> project

function App() {
  const appRef = useRef<HTMLDivElement | null>(null)

  // time line hook
  useGSAP(
    () => {
      // todo time line
      // topic-typewriter effect x
      // header-opacity 1 x
      // background items-opacity1 x
      // scrolldown-move up+opacity1 x
      // scrolldownline-extend up to down x

      //  GSAP 預設的 duration 是 0.5 秒
      const t1 = gsap.timeline()

      t1.to(".paragraph-1", {
        duration: 0.3,
        text: "Thinking Deeply",
        ease: "none",
      })
        .to(".paragraph-2", {
          duration: 0.4,
          text: "Executing Clearly.",
          ease: "none",
        })
        .fromTo(".header", { opacity: 0 }, { opacity: 1 })
        .to(
          ".header",
          {
            scrollTrigger: {
              trigger: document.body,
              start: "top top",
              end: "bottom bottom",
              onUpdate: (self) => {
                const direction = self.direction
                gsap.to(".header", {
                  opacity: direction === 1 ? 0 : 1,
                  duration: 0.2,
                })
              },
            },
          },
          "<"
        )
        .fromTo(".bg-item", { opacity: 0 }, { opacity: 1, duration: 0.3 })
        .addLabel("bgItemOpacityDone")
        .to(
          ".hero-mc",
          {
            y: -20,
            duration: 2,
            repeat: -1, // 無限循環
            yoyo: true, // 必須配合 repeat 使用, 平滑地來回運動
            ease: "sine.inOut",
          },
          "<"
        )
        .to(
          ".hero-mc",
          {
            x: 10,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 0.5,
          },
          "<"
        )
        .to(
          ".hero-mc",
          {
            rotation: 5,
            duration: 2.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          },
          "<"
        )
        .to(
          ".star",
          {
            scale: 1.3, // 輕柔呼吸
            rotation: "+=360", // 一圈優雅旋轉
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut", // 自然波浪
            stagger: {
              each: 0.1, // 順序錯開
              from: "edges", // 從邊緣開始
            },
          },
          "<"
        )
        .from(
          ".text-scroll-down",
          {
            y: 100,
            opacity: 0,
          },
          "bgItemOpacityDone"
        )
        .to(".line-scroll-down", {
          height: () => {
            const lineScrollDownElement =
              appRef.current?.querySelector(".line-scroll-down")
            const lineScrollDownStopElement =
              appRef.current?.querySelector(".square")

            const lineScrollDownExtendHegiht =
              lineScrollDownStopElement!.getBoundingClientRect().top +
              window.scrollY -
              (lineScrollDownElement!.getBoundingClientRect().top +
                window.scrollY)
            return lineScrollDownExtendHegiht
          },
          scrollTrigger: {
            trigger: ".line-scroll-down",
            start: "top bottom",
            end: "top 90%",
            endTrigger: ".square",
            scrub: 1, // 讓動畫的 progress 跟 scroll 的 progress 同步
          },
        })
    },
    { scope: appRef }
  )

  // star track hook
  useGSAP(
    () => {
      gsap.to(".stars", {
        y: "100vh",
        scrollTrigger: {
          trigger: document.body,
          scrub: 1.5,
          start: "top top",
          end: "bottom bottom",
          // onUpdate(self) {},
        },
      })
    },
    { scope: appRef }
  )

  return (
    <div id="app" ref={appRef}>
      <Header className="header fixed z-10 h-(--header-height) w-full" />
      <main>
        <div className="container mx-auto flex flex-col">
          <HeroSection className="h-screen" />
          <div className="z-10 flex h-screen overflow-x-auto">
            <AboutSection />
            <ExperienceSection />
            <ProjectSection />
          </div>
        </div>
      </main>
      <div className="stars absolute top-0 h-full w-full">
        <StarSvg1 className="star bg-item absolute top-[63.05%] left-[5%] h-39.75 w-43.5" />
        <StarSvg2 className="star bg-item absolute top-[13%] left-[18.5%] h-29.5 w-34.75" />
        <StarSvg3 className="star bg-item absolute top-[63.45%] left-[55%] h-17.5 w-24.25" />
        <StarSvg4 className="star bg-item absolute top-[18.4%] right-[11%] h-45.75 w-48" />
      </div>
    </div>
  )
}

export default App
