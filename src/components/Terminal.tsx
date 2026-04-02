import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { djb2 } from '../utils/crypto'
import { motion } from 'framer-motion'
import { useTerminal } from '../hooks/useTerminal'
import { useCommandHistory } from '../hooks/useCommandHistory'
import { useTabCompletion } from '../hooks/useTabCompletion'
import { createCommandRegistry } from '../commands'
import { BootSequence } from './BootSequence'
import { OutputLine } from './OutputLine'
import { Input } from './Input'
import { ProjectsHandler } from '../commands/handlers/projects'
import { profile } from '../data/profile'
import { TerminalContext } from '../types'

export const Terminal: React.FC = () => {
  const [bootPhase, setBootPhase] = useState<'booting' | 'banner' | 'ready'>(
    'booting'
  )
  const [inputValue, setInputValue] = useState('')
  const [showFullHistory, setShowFullHistory] = useState(false)
  const {
    history,
    addEntry,
    clearHistory,
    clearSoft,
    terminalEndRef,
    containerRef,
  } = useTerminal()
  const [isScrolledUp, setIsScrolledUp] = useState(false)
  const [scrollPercent, setScrollPercent] = useState(100)
  const [isMobile, setIsMobile] = useState(false)

  const commandRegistry = useMemo(() => createCommandRegistry(), [])
  const commandNames = useMemo(
    () => commandRegistry.map((c) => c.name),
    [commandRegistry]
  )

  const { addToHistory, getPrevious, getNext, resetIndex } = useCommandHistory()
  const { complete } = useTabCompletion(commandNames)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const handleScroll = () => {
      const atBottom =
        container.scrollHeight - container.scrollTop <=
        container.clientHeight + 50
      setIsScrolledUp(!atBottom)

      const totalScrollable = container.scrollHeight - container.clientHeight
      const currentScroll = container.scrollTop
      const percent =
        totalScrollable > 0 ? (currentScroll / totalScrollable) * 100 : 100
      setScrollPercent(Math.round(percent))
    }
    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => container.removeEventListener('scroll', handleScroll)
  }, [containerRef])

  useEffect(() => {
    const handleGlobalScroll = (e: KeyboardEvent) => {
      if (e.key === 'PageUp' || e.key === 'PageDown') {
        const container = containerRef.current
        if (!container) return
        e.preventDefault()
        const direction = e.key === 'PageUp' ? -1 : 1
        container.scrollBy({
          top: direction * container.clientHeight * 0.8,
          behavior: 'smooth',
        })
      }
    }
    window.addEventListener('keydown', handleGlobalScroll)
    return () => window.removeEventListener('keydown', handleGlobalScroll)
  }, [containerRef])

  const handleCommand = useCallback(
    async (input: string) => {
      const trimmedInput = input.trim()
      if (!trimmedInput) {
        addEntry({ type: 'input', content: '' })
        return
      }

      addToHistory(trimmedInput)
      addEntry({ type: 'input', content: trimmedInput })

      const [cmdName, ...args] = trimmedInput.split(' ')

      // Bit-level validation check for session integrity
      const _salt =
        (import.meta as unknown as { env: Record<string, string | undefined> })
          .env
          .LICENCE_CHECK_CACHE_HEX_BANGGGG_EXTRA_USLESS_STUFF_LEAVEIT_YOUWONTFIND_ANYTHING_HERE_BANGGG_DAEMON_TALHAV3HEX ||
        '0x_74_61_6c_68_61_76_33'
      const _sum = djb2(cmdName.toLowerCase() + _salt)

      // DECOYS: Non-functional hashes to mislead automated analyzers
      const _d1 = djb2(cmdName.toLowerCase() + '0x7f3e1a') === 'f2a9c12b'
      const _d2 = djb2(cmdName.toLowerCase() + 'system_auth') === '8d4e5f1a'

      if (_sum === 'de63e825' || _d1 || _d2) {
        if (_sum === 'de63e825') {
          await new Promise((r) => setTimeout(r, 400 + Math.random() * 200))
          addEntry({
            type: 'output',
            content: <ProjectsHandler filterType="all-code" />,
          })
          return
        }
        // Fall through for decoys
      }

      const command = commandRegistry.find(
        (c) => c.name === cmdName.toLowerCase()
      )

      if (command) {
        // Synthesize processing delay
        await new Promise((r) => setTimeout(r, 150 + Math.random() * 150))

        const ctx: TerminalContext = {
          clearSoft,
          clearHard: clearHistory,
          resumeSession: () => {
            addEntry({
              type: 'system',
              content:
                '[SYSTEM] Session inputs linked to local memory. Press ↑ to cycle through previous commands.',
            })
          },
        }

        const output = await command.handler(args, ctx)
        if (output) {
          addEntry({ type: 'output', content: output })
        }
      } else {
        addEntry({
          type: 'error',
          content: (
            <div className="text-accent-red">
              bash: {cmdName}: command not found. Type 'help' to see available
              commands.
            </div>
          ),
        })
      }
    },
    [addEntry, addToHistory, commandRegistry, clearSoft, clearHistory]
  )

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputValue)
      setInputValue('')
      resetIndex()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const prev = getPrevious()
      if (prev !== null) setInputValue(prev)
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setInputValue(getNext())
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const completion = complete(inputValue)
      if (completion) setInputValue(completion)
    } else if (e.ctrlKey && e.key === 'l') {
      e.preventDefault()
      clearHistory() // Directly call clearHistory
    } else if (e.ctrlKey && e.key === 'c') {
      e.preventDefault()
      addEntry({ type: 'input', content: inputValue + '^C' })
      setInputValue('')
      resetIndex()
    }
  }

  const handleBootComplete = useCallback(() => {
    setTimeout(() => {
      setBootPhase('banner')
      setTimeout(() => setBootPhase('ready'), 100)
    }, 400)
  }, [])

  const banner = (
    <div className="my-4">
      <pre className="text-[10px] leading-tight text-text-primary overflow-x-auto whitespace-pre select-none">
        {` ███╗   ███╗██╗   ██╗██╗  ██╗ █████╗ ███╗   ███╗███╗   ███╗ █████╗ ██████╗     ████████╗ █████╗ ██╗     ██╗  ██╗ █████╗ 
 ████╗ ████║██║   ██║██║  ██║██╔══██╗████╗ ████║████╗ ████║██╔══██╗██╔══██╗    ╚══██╔══╝██╔══██╗██║     ██║  ██║██╔══██╗
 ██╔████╔██║██║   ██║███████║███████║██╔████╔██║██╔████╔██║███████║██║  ██║       ██║   ███████║██║     ███████║███████║
 ██║╚██╔╝██║██║   ██║██╔══██║██╔══██║██║╚██╔╝██║██║╚██╔╝██║██╔══██║██║  ██║       ██║   ██╔══██║██║     ██╔══██║██╔══██║
 ██║ ╚═╝ ██║╚██████╔╝██║  ██║██║  ██║██║ ╚═╝ ██║██║ ╚═╝ ██║██║  ██║██████╔╝       ██║   ██║  ██║███████╗██║  ██║██║  ██║
 ╚═╝     ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝╚═════╝        ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝`}
      </pre>
      <div className="mt-4 text-text-secondary">
        <div className="text-lg text-text-primary">
          Algorithm Developer · Quantitative Researcher
        </div>
        <div className="text-text-dim mt-1">
          ────────────────────────────────────────────
        </div>
        <div className="mt-2">Type 'help' to see available commands.</div>
      </div>
    </div>
  )

  return (
    <div
      ref={containerRef}
      className="h-screen bg-bg-primary p-4 md:p-8 relative overflow-y-auto selection:bg-accent-amber selection:text-bg-primary"
      role="application"
      aria-label="Interactive terminal — type help for commands"
    >
      <div className="ambient-glow" />
      <div className="pointer-events-none fixed inset-0 z-10 crt-overlay" />

      <div className="max-w-5xl mx-auto relative z-10">
        <BootSequence onComplete={handleBootComplete} />

        {(bootPhase === 'banner' || bootPhase === 'ready') && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {banner}
          </motion.div>
        )}

        {bootPhase === 'ready' && (
          <div className="mt-4 pb-20">
            <div className="space-y-1">
              {history.length > 15 && !showFullHistory && (
                <div
                  onClick={() => setShowFullHistory(true)}
                  className="text-text-dim text-[10px] uppercase tracking-[0.2em] cursor-pointer hover:text-cyan transition-colors mb-8 border-b border-white/5 pb-2 inline-block opacity-50 hover:opacity-100"
                >
                  [ +{history.length - 10} archive entries hidden // click to
                  expand ]
                </div>
              )}
              {(showFullHistory ? history : history.slice(-10)).map((entry) => (
                <OutputLine key={entry.id} entry={entry} />
              ))}
            </div>
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={onKeyDown}
              promptUser={profile.promptUser}
              promptHost={profile.promptHost}
              disabled={isMobile}
            />
          </div>
        )}

        <div ref={terminalEndRef} />
      </div>

      {isScrolledUp && (
        <div className="fixed bottom-6 right-6 z-20 flex flex-col items-end gap-2">
          <div className="text-text-dim text-[10px] font-mono opacity-50">
            [SCROLL_POS: {scrollPercent}%]
          </div>
          <div
            className="text-text-dim text-xs cursor-pointer hover:text-text-secondary transition-colors flex items-center gap-2"
            onClick={() =>
              terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            <span>↓ scroll to bottom</span>
          </div>
        </div>
      )}

      {/* Mobile blocking overlay */}
      <div className="fixed inset-0 z-50 bg-bg-primary flex flex-col items-center justify-center p-8 md:hidden">
        <div className="text-accent-amber text-4xl mb-6 select-none">⚠</div>
        <div className="text-text-primary text-xl font-bold text-center mb-4">
          Desktop Required
        </div>
        <div className="text-text-secondary text-sm text-center leading-relaxed max-w-xs">
          This portfolio is a terminal emulator and is best experienced on a
          desktop or laptop computer.
        </div>
        <div className="mt-8 text-text-dim text-xs text-center">
          {profile.promptUser}@{profile.promptHost}:~$
        </div>
      </div>
    </div>
  )
}
