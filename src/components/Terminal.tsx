import React, { useState, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useTerminal } from '../hooks/useTerminal'
import { useCommandHistory } from '../hooks/useCommandHistory'
import { useTabCompletion } from '../hooks/useTabCompletion'
import { createCommandRegistry } from '../commands'
import { BootSequence } from './BootSequence'
import { OutputLine } from './OutputLine'
import { Input } from './Input'
import { profile } from '../data/profile'

export const Terminal: React.FC = () => {
  const [bootPhase, setBootPhase] = useState<'booting' | 'banner' | 'ready'>('booting')
  const [inputValue, setInputValue] = useState('')
  const { history, addEntry, clearHistory, terminalEndRef } = useTerminal()

  const commandRegistry = useMemo(() => createCommandRegistry(clearHistory), [clearHistory])
  const commandNames = useMemo(() => commandRegistry.map(c => c.name), [commandRegistry])

  const { addToHistory, getPrevious, getNext, resetIndex } = useCommandHistory()
  const { complete } = useTabCompletion(commandNames)

  const handleCommand = useCallback(async (input: string) => {
    const trimmedInput = input.trim()
    if (!trimmedInput) {
      addEntry({ type: 'input', content: '' })
      return
    }

    addToHistory(trimmedInput)
    addEntry({ type: 'input', content: trimmedInput })

    const [cmdName, ...args] = trimmedInput.split(' ')
    const command = commandRegistry.find(c => c.name === cmdName.toLowerCase())

    if (command) {
      const output = await command.handler(args)
      if (cmdName.toLowerCase() !== 'clear') {
        addEntry({ type: 'output', content: output })
      }
    } else {
      addEntry({
        type: 'error',
        content: (
          <div className="text-accent-red">
            bash: {cmdName}: command not found. Type 'help' to see available commands.
          </div>
        )
      })
    }
  }, [addEntry, addToHistory, commandRegistry])

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
      handleCommand('clear')
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
        {
          ` ███╗   ███╗██╗   ██╗██╗  ██╗ █████╗ ███╗   ███╗███╗   ███╗ █████╗ ██████╗     ████████╗ █████╗ ██╗     ██╗  ██╗ █████╗ 
 ████╗ ████║██║   ██║██║  ██║██╔══██╗████╗ ████║████╗ ████║██╔══██╗██╔══██╗    ╚══██╔══╝██╔══██╗██║     ██║  ██║██╔══██╗
 ██╔████╔██║██║   ██║███████║███████║██╔████╔██║██╔████╔██║███████║██║  ██║       ██║   ███████║██║     ███████║███████║
 ██║╚██╔╝██║██║   ██║██╔══██║██╔══██║██║╚██╔╝██║██║╚██╔╝██║██╔══██║██║  ██║       ██║   ██╔══██║██║     ██╔══██║██╔══██║
 ██║ ╚═╝ ██║╚██████╔╝██║  ██║██║  ██║██║ ╚═╝ ██║██║ ╚═╝ ██║██║  ██║██████╔╝       ██║   ██║  ██║███████╗██║  ██║██║  ██║
 ╚═╝     ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝╚═════╝        ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝`}
      </pre>
      <div className="mt-4 text-text-secondary">
        <div className="text-lg text-text-primary">Algorithm Developer · Quantitative Researcher</div>
        <div className="text-text-dim mt-1">────────────────────────────────────────────</div>
        <div className="mt-2">Type 'help' to see available commands.</div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-bg-primary p-4 md:p-8 relative overflow-y-auto selection:bg-accent-amber selection:text-bg-primary">
      <div className="crt-overlay" />
      <div className="scanline" />

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
              {history.map((entry) => (
                <OutputLine key={entry.id} entry={entry} />
              ))}
            </div>
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={onKeyDown}
              promptUser={profile.promptUser}
              promptHost={profile.promptHost}
            />
          </div>
        )}

        <div ref={terminalEndRef} />
      </div>

      {/* Mobile-only banner */}
      <div className="fixed top-0 left-0 right-0 bg-accent-amber text-bg-primary text-center text-[10px] md:hidden py-1 z-50 font-bold uppercase tracking-tighter">
        Best experienced on desktop
      </div>
    </div>
  )
}
