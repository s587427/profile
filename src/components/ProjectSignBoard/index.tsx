import clsx from "clsx"
import fallbackImageSrc from "./fallback.png"
import "./index.css"

type ProjectSignBoardProps = {
  className?: string
  imgSrc?: string
  title: string
  mainContents: string[]
  secondaryContents: string[]
}

export function ProjectSignBoard({
  className,
  title,
  imgSrc,
  mainContents = [],
  secondaryContents = [],
}: ProjectSignBoardProps) {
  return (
    <div className={clsx("project-signboard", className)}>
      <h2 className="project-signboard__title">{title}</h2>
      <img
        className="project-signboard__img"
        src={imgSrc ?? fallbackImageSrc}
        alt="projectImage"
      />
      <div className="project-signboard__content">
        {mainContents.map((content, index) => (
          <p key={index}>{content}</p>
        ))}
      </div>
      <div className="project-signboard__content">
        {secondaryContents.map((content, index) => (
          <p key={index}>{content}</p>
        ))}
      </div>
    </div>
  )
}
