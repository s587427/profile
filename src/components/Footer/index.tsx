import githubIconSrc from "@/assets/github-icon.svg"
import igIconSrc from "@/assets/ig-icon.svg"
export function Footer() {
  return (
    <footer className="container mx-auto p-8">
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
