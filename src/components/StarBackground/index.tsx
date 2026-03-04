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

  // star track hook
  useGSAP(() => {
    const items = gsap.utils.toArray(".star-wrapper") as HTMLElement[]

    // 為每個星星建立一個「追蹤器」
    // duration 就是你說的 CSS transition 的延遲時間
    const trackers = items.map((star, i) => {
      return gsap.quickTo(star as HTMLElement, "y", {
        duration: 1.2, // 數值越大，追回原位的「延遲感」越重
        // ease: "power2.out", // 決定吸附回來的曲線，power2.out 很有磁吸感
      })
    })

    // useGSAP 會自動清理內部的 ScrollTrigger 和 delayedCall
    const stopCheck = gsap
      .delayedCall(0.4, () => {
        trackers.forEach((updateY) => updateY(0))
      })
      .pause()

    // 2. 監聽滾動速度
    ScrollTrigger.create({
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      onUpdate: (self) => {
        // 獲取當前滾動的瞬時速度
        const velocity = self.getVelocity()
        // 每次滾動時都重新計時
        stopCheck.restart(true)

        trackers.forEach((updateY, i) => {
          const targetY = velocity * -0.05 * (i + 1) // 目標位移 = 速度 * 係數
          // 讓追蹤器去「追」這個目標值
          // 即使滾動停止了，trackers 內建的 duration 也會讓它慢慢追回 0
          updateY(targetY)
        })
      },
      onLeave: () => {
        gsap.to(".stars", { opacity: 0, ease: "power2.inOut" })
      },
      onEnterBack: () => {
        gsap.to(".stars", { opacity: 1, ease: "power2.inOut" })
      },
      // hook for resize
      onRefresh: () => {
        // console.log("onRefresh")
      },
      // hook for resize
      onRefreshInit: () => {
        // console.log("onRefreshInit")
      },
      // onToggle: () => {},
    })

    // items.forEach((star, i) => {
    //   // 讓每個星星的「吸附速度」與「移動距離」根據 index 不同
    //   // 這樣滾動時，星星之間也會有相對速度，視覺深度更強
    //   // const depth = (i + 1) * 50

    //   gsap.fromTo(
    //     star as HTMLElement,
    //     {
    //       y: -40, // 初始位置（在上方）
    //     },
    //     {
    //       y: 0, // 目標位置（CSS 定義的位置）
    //       opacity: 0,
    //       scrollTrigger: {
    //         trigger: ".hero",
    //         start: "top top",
    //         end: "bottom top",
    //         scrub: 3,
    //       },
    //     }
    //   )
    // })
  })

  return (
    <div ref={starsRef} className="stars fixed top-0 -z-10 h-full w-full">
      <div className="star-wrapper bg-item absolute top-[63.05%] left-[5%]">
        <StarSvg1 className="star h-39.75 w-43.5" />
      </div>

      <div className="star-wrapper bg-item absolute top-[13%] left-[18.5%]">
        <StarSvg2 className="star h-29.5 w-34.75" />
      </div>
      <div className="star-wrapper bg-item absolute top-[63.45%] left-[55%]">
        <StarSvg3 className="star h-17.5 w-24.25" />
      </div>
      <div className="star-wrapper bg-item absolute top-[18.4%] right-[11%]">
        <StarSvg4 className="star h-45.75 w-48" />
      </div>
    </div>
  )
}

// quickTo, // quickSet
