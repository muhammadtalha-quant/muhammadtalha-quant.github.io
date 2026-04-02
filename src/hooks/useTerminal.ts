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
        isFaded: false
      }
      setHistory((prev) => {
        const updated = [...prev, newEntry]
        // Keep 20 recent, fade older ones to reduce cognitive load
        return updated.map((item, idx) => {
          if (idx < updated.length - 20) {
            return { ...item, isFaded: true }
          }
          return item
        }).slice(-500)
      })
    },
    []
  )

  const clearHistory = useCallback(() => {
    setHistory([])
  }, [])

  const clearSoft = useCallback(() => {
    setHistory(prev => prev.map(item => ({ ...item, isFaded: true })))
  }, [])

  return {
    history,
    addEntry,
    clearHistory,
    clearSoft,
    terminalEndRef,
    containerRef,
    scrollToBottom,
  }
}
