import { useState, useEffect } from 'react'

const BOOT_LINES = [
  '[    0.000000] Initializing portfolio environment...',
  '[    0.041823] Loading identity module... OK',
  '[    0.089234] Mounting C++ toolchain... OK',
  '[    0.134522] Loading Python research stack... OK',
  '[    0.198847] Connecting to market feeds... OK',
  '[    0.267341] Compiling ambitions... OK',
  '[    0.334102] All systems operational.',
]

export const useBootSequence = (onComplete: () => void) => {
  const [lines, setLines] = useState<string[]>([])
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    let currentLine = 0
    const timeouts: number[] = []

    const addLine = () => {
      if (currentLine < BOOT_LINES.length) {
        setLines((prev) => [...prev, BOOT_LINES[currentLine]])
        currentLine++
        const delay = Math.floor(Math.random() * (100 - 60 + 1) + 60)
        timeouts.push(setTimeout(addLine, delay))
      } else {
        timeouts.push(
          setTimeout(() => {
            setIsComplete(true)
            onComplete()
          }, 400)
        )
      }
    }

    addLine()

    return () => {
      timeouts.forEach(clearTimeout)
    }
  }, [onComplete])

  return { lines, isComplete }
}
