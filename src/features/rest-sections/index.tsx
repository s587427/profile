import ballonSrc from "@/assets/ballon.svg"
import catSrc from "@/assets/cat.svg"
import houseSrc from "@/assets/house.svg"
import mcSrc from "@/assets/mc2.svg"
import treeSrc from "@/assets/tree.svg"
import { ExperienceSignBoard } from "@/components/ExperienceSignBoard"
import { ProjectSignBoard } from "@/components/ProjectSignBoard"
import { experiences, projects } from "@/data"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useLayoutEffect, useRef, useState } from "react"
import "./index.css"

type RestSectionsProps = {
  containerWidth: number
}

export function RestSections({ containerWidth }: RestSectionsProps) {
  const [dialogBoxWidth, setDialogBoxWidth] = useState<number>(0)
  const dialogBoxRef = useRef<HTMLDivElement | null>(null)
  const aboutPaddingLeft = containerWidth / 2 - dialogBoxWidth / 2

  //typewriter effect
  useGSAP(
    () => {
      const pElements = gsap.utils.toArray("p") as HTMLElement[]

      if (pElements.length > 0) {
        const tl = gsap.timeline({
          delay: 0.3,
          scrollTrigger: {
            trigger: dialogBoxRef.current,
            start: "top bottom",
            // * `play`：播放。
            // * `pause`：暫停。
            // * `resume`：恢復播放。
            // * `reverse`：反向播放（倒帶）。
            // * `restart`：重新開始。
            // * `reset`：重設回初始狀態（但不播）。
            // * `complete`：直接跳到動畫結束。
            toggleActions: "play none none none", // onEnter onLeave onEnterBack onLeaveBack
          },
          onComplete: () => {
            // console.log("打字效果全部播完了！")
          },
        })

        tl.from("h2", {
          text: "", // 從空字串開始
          ease: "none",
        })

        pElements.forEach((p) => {
          // 先獲取文字並存在變數中，確保不會因為重新渲染丟失
          const originalText = p.innerText
          // console.log("originalText.length: ", originalText.length)
          tl.from(
            p,
            {
              duration: Math.max(0.5, originalText.length * 0.05), // 動態時間
              text: "", // 從空字串開始
              ease: "none",
            },
            "+=0" // 每個段落之間間隔{x}s
          )
        })
      }
    },
    { scope: dialogBoxRef }
  )

  useLayoutEffect(() => {
    if (dialogBoxRef.current)
      setDialogBoxWidth(dialogBoxRef.current.offsetWidth)
  }, [])

  return (
    <div className="sections-container__inner relative flex shrink-0 items-end">
      <section
        id="about"
        className="about relative"
        style={{
          paddingLeft: `${aboutPaddingLeft}px`,
        }}
      >
        <div className="flex flex-col">
          <div className="dialog-box" ref={dialogBoxRef}>
            <h2 className="dialog-box__title">Who is Ethan?</h2>
            <div className="dialog-box__content">
              <p>eifhrkjclkdjfl</p>
              <p>jkfjdfkdskfpjeoi</p>
              <p>ojckjmlc lkflkewpofjweqoi</p>
            </div>
            <div className="dialog-box__content">
              <p>rkrokfpoq</p>
              <p>efkpofqmrfgremg</p>
            </div>
          </div>
          <img className="about-mc h-56 w-35.75" src={mcSrc} alt="mainChar" />
        </div>
        <img
          className="house h-[767.5px] w-[863.5px]"
          src={houseSrc}
          alt="house"
        />
        {/* test 發光 */}
        <div className="light-window absolute right-[431.75px] bottom-25 size-25" />
      </section>

      <section id="experience" className="mr-29.25 flex">
        <ExperienceSignBoard {...experiences[0]} />
      </section>

      <img src={treeSrc} alt="tree" className="mr-16.75 h-196.75 w-131.75" />

      <section id="projects" className="flex gap-x-13.5">
        {projects.map((project, index) => (
          <ProjectSignBoard key={index} {...project} />
        ))}
      </section>

      <section className="svgs relative w-118.25 pl-24.5">
        <img className="h-[207.853px] w-[118.111px]" src={catSrc} alt="cat" />
        <img
          className="img-ballon absolute right-6.25 bottom-[222.64px] h-[465.365px] w-49.75"
          src={ballonSrc}
          alt="ballon"
        />
      </section>
    </div>
  )
}
