import { useState, useEffect } from 'react'

export const useTypingLines = (lines: string[], speed: number = 30) => {
  const [visibleCount, setVisibleCount] = useState(0)

  useEffect(() => {
    if (visibleCount < lines.length) {
      const timer = setTimeout(() => {
        setVisibleCount((prev) => prev + 1)
      }, speed)
      return () => clearTimeout(timer)
    }
  }, [visibleCount, lines.length, speed])

  return { visibleCount }
}
