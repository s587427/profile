import { useEffect, useState } from "react"

// contentRect.width/height	content only
// clientWidth/Height	content + padding
// offsetWidth/Height	content + padding + border
// getBoundingClientRect()content + padding + border（物理尺寸，浮點數，可能小數點）

export function useResizeObserver<T extends HTMLElement>(
  ref: React.RefObject<T | null>
) {
  const [size, setSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    if (!ref.current) return

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setSize({ width, height })
    })

    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [ref])

  return size
}
