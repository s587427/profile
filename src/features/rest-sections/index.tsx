import ballonSrc from "@/assets/ballon.svg"
import catSrc from "@/assets/cat.svg"
import houseSrc from "@/assets/house.svg"
import mcSrc from "@/assets/mc2.svg"
import treeSrc from "@/assets/tree.svg"
import { ExperienceSignBoard } from "@/components/ExperienceSignBoard"
import { ProjectSignBoard } from "@/components/ProjectSignBoard"
import { experiences, projects } from "@/data"
import { useLayoutEffect, useRef, useState } from "react"
import "./index.css"

type RestSectionsProps = {
  containerWidth: number
}

export function RestSections({ containerWidth }: RestSectionsProps) {
  const [dialogBoxWidth, setDialogBoxWidth] = useState<number>(0)
  const dialogBoxRef = useRef<HTMLDivElement | null>(null)
  const aboutPaddingLeft = containerWidth / 2 - dialogBoxWidth / 2

  useLayoutEffect(() => {
    if (dialogBoxRef.current)
      setDialogBoxWidth(dialogBoxRef.current.offsetWidth)
  }, [])

  return (
    <div className="sections-container__inner relative mb-[18.5%] flex shrink-0 items-end">
      <section
        id="about"
        className="about"
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

      <section className="relative w-118.25 pl-24.5">
        <img className="h-[207.853px] w-[118.111px]" src={catSrc} alt="cat" />
        <img
          className="absolute right-6.25 bottom-[222.64px] h-[465.365px] w-49.75"
          src={ballonSrc}
          alt="ballon"
        />
      </section>
    </div>
  )
}
