import { useGSAP } from "@gsap/react"
import gsap from "gsap"

export function useHeroTimeLine(ref: React.RefObject<HTMLDivElement | null>) {
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
        duration: 1,
        ease: "none",
      })
        .to(".paragraph-2", {
          duration: 1,
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
    },
    { scope: ref }
  )

  // extend line
  useGSAP(
    () => {
      gsap.set(".line-scroll-down", {
        transformOrigin: "bottom",
        height: () => {
          const lineScrollDownElement =
            ref.current?.querySelector(".line-scroll-down")
          const lineScrollDownStopElement =
            ref.current?.querySelector(".dialog-box")

          const { height: lineScrollDownHeight, top: lineScrollDownTop } =
            lineScrollDownElement!.getBoundingClientRect()

          const lineScrollDownExtendHegiht =
            lineScrollDownStopElement!.getBoundingClientRect().top -
            lineScrollDownTop

          const magnification =
            lineScrollDownExtendHegiht / lineScrollDownHeight

          // console.log("magnification", magnification)

          return lineScrollDownExtendHegiht
        },
      })

      gsap.to(".line-scroll-down", {
        scaleY: 0,
        scrollTrigger: {
          trigger: ".dialog-box",
          start: "top bottom",
          onUpdate(self) {
            // console.log("update", self.progress)
          },
        },
      })
    },
    { scope: ref }
  )
}
