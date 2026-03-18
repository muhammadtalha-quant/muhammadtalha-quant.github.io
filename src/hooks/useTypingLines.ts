import { useState, useEffect, useCallback } from 'react'

export const useTypingLines = (lines: string[], speed: number = 30) => {
  const [visibleCount, setVisibleCount] = useState(0)

  const linesDeps = JSON.stringify(lines)
  useEffect(() => {
    setVisibleCount(0)
  }, [linesDeps])

  const isComplete = visibleCount === lines.length

  const skip = useCallback(() => {
    setVisibleCount(lines.length)
  }, [lines.length])

  useEffect(() => {
    if (visibleCount < lines.length) {
      const timer = setTimeout(() => {
        setVisibleCount((prev) => prev + 1)
      }, speed)
      return () => clearTimeout(timer)
    }
  }, [visibleCount, lines.length, speed])

  useEffect(() => {
    const handleKeyDown = () => {
      if (visibleCount < lines.length) {
        skip()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [visibleCount, lines.length, skip])

  return { visibleCount, isComplete, skip }
}
