import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export function Header({ className }: { className: string }) {
  function navTo(targetSelector: string) {
    const scrollTrigger = ScrollTrigger.getById("sectionScroll")
    const target = document.querySelector(targetSelector) as HTMLElement

    if (scrollTrigger && target) {
      const scrollToValue = scrollTrigger.start + target.offsetLeft
      gsap.to(window, {
        scrollTo: scrollToValue,
        duration: 1.5,
        ease: "power2.inOut",
      })
    }
  }

  return (
    <header className={className}>
      <nav className="py-4">
        <ul className="flex justify-center gap-26.75">
          <li onClick={() => navTo("#about")}>
            <a className="text-[32px] font-bold" href="#About">
              About
            </a>
          </li>
          <li onClick={() => navTo("#experience")}>
            <a className="text-[32px] font-bold" href="#Experience">
              Experience
            </a>
          </li>
          <li onClick={() => navTo("#projects")}>
            <a className="text-[32px] font-bold" href="#Projects">
              Projects
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
