import { useState, useCallback, useRef, useEffect } from 'react'
import { OutputEntry } from '../types'

export const useTerminal = () => {
  const [history, setHistory] = useState<OutputEntry[]>([])
  const terminalEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [history, scrollToBottom])

  const addEntry = useCallback((entry: Omit<OutputEntry, 'id' | 'timestamp'>) => {
    const newEntry: OutputEntry = {
      ...entry,
      id: Math.random().toString(36).substring(2, 9),
      timestamp: new Date(),
    }
    setHistory((prev) => [...prev, newEntry])
  }, [])

  const clearHistory = useCallback(() => {
    setHistory([])
  }, [])

  return {
    history,
    addEntry,
    clearHistory,
    terminalEndRef,
    scrollToBottom,
  }
}
