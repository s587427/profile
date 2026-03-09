import type { ProjectItemType } from "@/data"
import clsx from "clsx"
import fallbackImageSrc from "./fallback.png"
import "./index.css"

type ProjectSignBoardProps = {
  className?: string
} & ProjectItemType

export function ProjectSignBoard({
  className,
  title,
  imgSrc,
  contentHTML,
  link,
}: ProjectSignBoardProps) {
  return (
    <div className={clsx("project-signboard", className)}>
      <h2 className="project-signboard__title">{title}</h2>
      <a
        href={link}
        target="_blank"
        onClick={(e) => {
          if (!link) e.preventDefault()
        }}
      >
        <img
          className="project-signboard__img"
          src={imgSrc ?? fallbackImageSrc}
          alt="projectImage"
        />
      </a>
      <div
        className="project-signboard__content"
        dangerouslySetInnerHTML={{ __html: contentHTML }}
      ></div>
    </div>
  )
}
