export function Header({ className }: { className: string }) {
  return (
    <header className={className}>
      <nav className="py-4">
        <ul className="flex justify-center gap-26.75">
          <li>
            <a className="text-[32px] font-bold" href="#About">
              About
            </a>
          </li>
          <li>
            <a className="text-[32px] font-bold" href="#Experience">
              Experience
            </a>
          </li>
          <li>
            <a className="text-[32px] font-bold" href="#Projects">
              Projects
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
