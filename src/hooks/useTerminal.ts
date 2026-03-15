import { useState, useCallback, useRef, useEffect } from 'react'
import { OutputEntry } from '../types'

export const useTerminal = () => {
  const [history, setHistory] = useState<OutputEntry[]>([])
  const terminalEndRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [history, scrollToBottom])

  const addEntry = useCallback(
    (entry: Omit<OutputEntry, 'id' | 'timestamp'>) => {
      const newEntry: OutputEntry = {
        ...entry,
        id: crypto.randomUUID(),
        timestamp: new Date(),
      }
      setHistory((prev) => {
        const updated = [...prev, newEntry]
        return updated.length > 500
          ? updated.slice(updated.length - 500)
          : updated
      })
    },
    []
  )

  const clearHistory = useCallback(() => {
    setHistory([])
  }, [])

  return {
    history,
    addEntry,
    clearHistory,
    terminalEndRef,
    containerRef,
    scrollToBottom,
  }
}
