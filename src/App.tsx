import starAnimation from "@/assets/a.lottie"
import { useGSAP } from "@gsap/react"
import { DotLottieReact } from "@lottiefiles/dotlottie-react"
import gsap from "gsap"
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { TextPlugin } from "gsap/TextPlugin"
import { useRef } from "react"
import { AboutSection } from "./AboutSection"
import "./App.css"
import { Header } from "./components/Header"
import { StarBackground } from "./components/StarBackground"
import { ExperienceSection } from "./ExperienceSection"
import { HeroSection } from "./HeroSection"
import { ProjectSection } from "./ProjectSection"

gsap.registerPlugin(useGSAP, TextPlugin, DrawSVGPlugin, ScrollTrigger)

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
        text: "Thinking Deeply",
        ease: "none",
      })
        .to(".paragraph-2", {
          duration: 0.8,
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
        // .to(
        //   ".star",
        //   {
        //     scale: () => gsap.utils.random(0.8, 1.5),
        //     rotation: () => gsap.utils.random(-45, 45),
        //     duration: 1,
        //     repeat: -1,
        //     repeatRefresh: true, // 每次重複都重新計算函式
        //     ease: "none",
        //     stagger: {
        //       each: 1,
        //     },
        //   },
        //   "<"
        // )
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

  return (
    <div id="app" ref={appRef}>
      <Header className="header fixed z-10 h-(--header-height) w-full" />

      {/* <div className="h-[79.4px] w-60">
        <DotLottieReact src={starAnimation} loop autoplay />
      </div> */}
      <main>
        <div className="container mx-auto flex flex-col">
          <HeroSection className="h-screen w-full" />
          <div className="z-10 flex h-screen overflow-hidden">
            <AboutSection />
            <ExperienceSection />
            <ProjectSection />
          </div>
        </div>
      </main>
      <StarBackground />
    </div>
  )
}

export default App
