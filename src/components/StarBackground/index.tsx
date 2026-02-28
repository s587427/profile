import StarSvg1 from "@/assets/star-1.svg?react"
import StarSvg2 from "@/assets/star-2.svg?react"
import StarSvg3 from "@/assets/star-3.svg?react"
import StarSvg4 from "@/assets/star-4.svg?react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useRef } from "react"
import "./index.css"

export function StarBackground() {
  const starsRef = useRef<HTMLDivElement | null>(null)

  // star track hook
  useGSAP(() => {
    gsap.to(starsRef.current, {
      y: "100vh",
      scrollTrigger: {
        trigger: document.body,
        scrub: 1.5,
        start: "top top",
        end: "bottom bottom",
        // onUpdate(self) {},
      },
    })
  })
  return (
    <div ref={starsRef} className="stars absolute top-0 h-full w-full">
      <StarSvg1 className="star bg-item absolute top-[63.05%] left-[5%] h-39.75 w-43.5" />
      <StarSvg2 className="star bg-item absolute top-[13%] left-[18.5%] h-29.5 w-34.75" />
      <StarSvg3 className="star bg-item absolute top-[63.45%] left-[55%] h-17.5 w-24.25" />
      <StarSvg4 className="star bg-item absolute top-[18.4%] right-[11%] h-45.75 w-48" />
    </div>
  )
}

// quickTo, // quickSet
// <STAR
//           key={index}
//           className="star"
//           style={{ "--delay": -${index * 0.18}s } as React.CSSProperties}
//         />
