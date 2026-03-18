import React, { useEffect, useState } from 'react'
import { profile } from '../data/profile'
import { useTypingLines } from '../hooks/useTypingLines'

const injectVariables = (text: string) => {
  return text.replace(/\{\{([^}]+)\}\}/g, (match, key) => {
    const validKey = key.trim() as keyof typeof profile
    const val = profile[validKey]
    return val !== undefined ? String(val) : match
  })
}

export const DynamicMarkdownHandler: React.FC<{ url: string; speed?: number }> = ({
  url,
  speed = 40,
}) => {
  const [lines, setLines] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMd = async () => {
      try {
        const res = await fetch(url)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const text = await res.text()
        const injected = injectVariables(text)
        setLines(injected.split('\n'))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }
    fetchMd()
  }, [url])

  const { visibleCount } = useTypingLines(lines, speed)

  if (loading)
    return <div className="text-text-dim italic my-4 px-2">Fetching payload...</div>
  if (error)
    return <div className="text-accent-red my-4 px-2">Error: {error}</div>

  return (
    <div className="my-4 font-terminal max-w-3xl">
      {lines.slice(0, visibleCount).map((line, i) => {
        const trimmed = line.trim()
        
        if (trimmed === '') {
          return <div key={i} className="min-h-[1.6em]" />
        }
        if (trimmed === '---') {
          return <div key={i} className="my-4 border-t border-border opacity-30" />
        }
        if (line.startsWith('# ')) {
          return (
            <div key={i} className="text-accent-amber font-bold text-lg my-1">
              {line.slice(2)}
            </div>
          )
        }
        if (line.startsWith('## ')) {
          return (
            <div
              key={i}
              className="text-text-dim uppercase text-[11px] font-bold tracking-widest mb-3 mt-6 flex items-center gap-2"
            >
              <span className="text-accent-amber">●</span> {line.slice(3)}
            </div>
          )
        }
        if (line.startsWith('> ')) {
          return (
            <div
              key={i}
              className="mt-4 pt-4 border-t border-border/30 text-text-secondary italic"
            >
              "{line.slice(2).trim()}"
            </div>
          )
        }
        if (line.startsWith('- ')) {
          return (
            <div key={i} className="pl-4 text-accent-green my-1">
              ◆ {line.slice(2)}
            </div>
          )
        }

        const codeMatch = line.match(/^`(.*?)`\s+(.*)$/)
        if (codeMatch) {
          return (
            <div key={i} className="flex gap-4 group my-1">
              <span className="text-accent-amber font-mono shrink-0 w-32">
                {codeMatch[1]}
              </span>
              <span className="text-text-secondary group-hover:text-text-primary transition-colors">
                {codeMatch[2]}
              </span>
            </div>
          )
        }

        const kvMatch = line.match(/^\*\*(.*?)\*\*(.*)$/)
        if (kvMatch) {
          return (
            <div key={i} className="flex gap-4 px-4 my-1">
              <span className="text-text-secondary w-24 shrink-0">
                {kvMatch[1]}
              </span>
              <span className="text-text-primary">{kvMatch[2]}</span>
            </div>
          )
        }

        return (
          <p key={i} className="text-text-primary min-h-[1.6em] leading-relaxed">
            {line}
          </p>
        )
      })}
    </div>
  )
}
