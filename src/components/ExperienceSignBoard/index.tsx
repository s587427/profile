import clsx from "clsx"
import "./index.css"

type ExperienceSignBoardProps = {
  className?: string
  title: string
  mainContents: string[]
  secondaryContents: string[]
}

export function ExperienceSignBoard({
  className,
  title,
  mainContents = [],
  secondaryContents = [],
}: ExperienceSignBoardProps) {
  return (
    <div className={clsx("experience-signboard", className)}>
      <h2 className="experience-signboard__title">{title}</h2>
      <div className="experience-signboard__content">
        {mainContents.map((content, index) => (
          <p key={index}>{content}</p>
        ))}
      </div>
      <div className="experience-signboard__content">
        {secondaryContents.map((content, index) => (
          <p key={index}>{content}</p>
        ))}
      </div>
    </div>
  )
}
