import { useState, useCallback } from 'react'

export const useCommandHistory = (maxHistory = 100) => {
  const [history, setHistory] = useState<string[]>([])
  const [index, setIndex] = useState(-1)

  const addToHistory = useCallback((command: string) => {
    if (!command.trim()) return
    setHistory((prev) => {
      const newHistory = [command, ...prev.filter((c) => c !== command)].slice(
        0,
        maxHistory
      )
      return newHistory
    })
    setIndex(-1)
  }, [maxHistory])

  const getPrevious = useCallback(() => {
    if (history.length === 0) return null
    const nextIndex = Math.min(index + 1, history.length - 1)
    setIndex(nextIndex)
    return history[nextIndex]
  }, [history, index])

  const getNext = useCallback(() => {
    if (index <= 0) {
      setIndex(-1)
      return ''
    }
    const nextIndex = index - 1
    setIndex(nextIndex)
    return history[nextIndex]
  }, [history, index])

  const resetIndex = useCallback(() => {
    setIndex(-1)
  }, [])

  return { addToHistory, getPrevious, getNext, resetIndex, history }
}
