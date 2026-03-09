import clsx from "clsx"
import "./index.css"

type ExperienceSignBoardProps = {
  className?: string
  title: string
  contentHTML: string
}

export function ExperienceSignBoard({
  className,
  title,
  contentHTML,
}: ExperienceSignBoardProps) {
  return (
    <div className={clsx("experience-signboard", className)}>
      <h2 className="experience-signboard__title">{title}</h2>
      <div
        className="experience-signboard__content"
        dangerouslySetInnerHTML={{ __html: contentHTML }}
      ></div>
    </div>
  )
}
