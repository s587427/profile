import githubIconSrc from "@/assets/github-icon.svg"
import igIconSrc from "@/assets/ig-icon.svg"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useRef } from "react"
export function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  useGSAP(() => {
    // trigger elemet top when encounter viewport bottom
    gsap.fromTo(
      footerRef.current,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 1.2,
        scrollTrigger: {
          id: "footerRef",
          trigger: footerRef.current,
          start: "top bottom", //  Footer 頂部碰到視窗底部
          end: "bottom bottom", //  Footer 底部碰到視窗底部
          toggleActions: "play none reverse none",
          // onUpdate(self) {
          //   console.log("footer progress: ", self.progress)
          // },
        },
      }
    )
  })

  return (
    // container
    <footer ref={footerRef} className="mx-auto p-8">
      <div className="flex items-end justify-between">
        <small className="text-2xl leading-9 font-bold tracking-[1.2px]">
          2026 Designed by HR
        </small>
        <nav>
          <ul>
            <li className="p-1">
              <a
                className="flex items-center gap-x-2"
                href="https://www.instagram.com/sh3ng_y/"
                target="_blank"
              >
                <img className="size-8" src={igIconSrc} alt="Instagram" />
                <span className="text-2xl leading-9 font-bold tracking-[1.2px]">
                  sh3ng_y
                </span>
              </a>
            </li>
            <li className="p-1">
              <a
                className="flex items-center gap-x-2"
                href="https://github.com/s587427"
                target="_blank"
              >
                <img className="size-8" src={githubIconSrc} alt="GitHub" />
                <span className="text-2xl leading-9 font-bold tracking-[1.2px]">
                  s587427
                </span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}
