import React, { useEffect, useState, useRef } from 'react'
import ReactDOM from 'react-dom'
import type { Command } from '../../types'
import { profile } from '../../data/profile'

export const Help: React.FC<{ registry: Command[] }> = ({ registry }) => {
  const categories: Record<string, Command[]> = {
    identity: [],
    work: [],
    contact: [],
    system: [],
    navigation: [],
  }

  registry
    .filter((cmd) => cmd.name !== 'mail' && !cmd.isHidden)
    .forEach((cmd) => categories[cmd.category].push(cmd))

  return (
    <div className="my-4 space-y-4">
      {Object.entries(categories).map(([category, cmds]) => (
        <div key={category}>
          <div className="label-md mb-2 mt-4 first:mt-0">{category}</div>
          <div className="grid grid-cols-[140px_1fr] gap-4">
            {cmds.map((cmd) => (
              <React.Fragment key={cmd.name}>
                <div className="text-accent-amber font-bold">{cmd.name}</div>
                <div className="text-text-secondary">{cmd.description}</div>
              </React.Fragment>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export const Reboot: React.FC = () => {
  const [lines, setLines] = useState<string[]>(['Rebooting...'])

  useEffect(() => {
    const sequence = [
      { text: '[    0.000000] Flushing session data...', delay: 300 },
      { text: '[    0.041000] Unmounting modules...', delay: 600 },
      { text: '[    0.082000] Initiating hard reload.', delay: 900 },
    ]

    sequence.forEach((item) => {
      setTimeout(() => {
        setLines((prev) => [...prev, item.text])
      }, item.delay)
    })

    const timer = setTimeout(() => {
      window.location.reload()
    }, 1400) // Total delay for all lines + a bit more

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="my-2 text-text-primary">
      {lines.map((line, i) => (
        <div key={i}>{line}</div>
      ))}
    </div>
  )
}

export const GetCV: React.FC = () => {
  const [output, setOutput] = useState<string[]>(['Connecting to host...'])
  const hasRun = useRef(false)

  useEffect(() => {
    if (hasRun.current) return
    hasRun.current = true

    // No parameters required anymore.

    const sequence = [
      { text: 'HTTP request sent, awaiting response... 200 OK', delay: 400 },
      { text: 'Length: 1.2MB [application/pdf]', delay: 800 },
      { text: 'Saving to: ‘myresume.pdf’', delay: 1200 },
    ]

    sequence.forEach((item) => {
      setTimeout(() => {
        setOutput((prev) => [...prev, item.text])
      }, item.delay)
    })

    setTimeout(() => {
      const link = document.createElement('a')
      link.href = profile.resumeUrl
      link.download = 'Muhammad_Talha_Resume.pdf'
      link.target = '_blank'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      setOutput((prev) => [...prev, 'Download started successfully.'])
    }, 1600)
  }, [])

  return (
    <div className="my-2 text-text-primary">
      {output.map((line, i) => (
        <div key={i} className="min-h-[1.6em]">
          {line}
        </div>
      ))}
    </div>
  )
}

export const Shutdown: React.FC = () => {
  const [lines, setLines] = useState<string[]>([])
  const [crashed, setCrashed] = useState(false)

  useEffect(() => {
    const sequence = [
      { text: 'Shutting down...', delay: 0 },
      { text: '[    0.000000] Stopping all processes...', delay: 80 },
      { text: '[    0.041000] Unmounting file systems...', delay: 160 },
      { text: '[    0.082000] Flushing disk buffers...', delay: 240 },
      { text: '[    0.120000] Kernel panic — not syncing.', delay: 320 },
      { text: '[    0.161000] Segmentation fault (core dumped)', delay: 400 },
    ]

    sequence.forEach(({ text, delay }) => {
      setTimeout(() => setLines((prev) => [...prev, text]), delay)
    })

    setTimeout(() => setCrashed(true), 1200)
  }, [])

  const crashOverlay = crashed
    ? ReactDOM.createPortal(
        <div className="fixed inset-0 z-[9999] bg-bg-primary flex items-center justify-center">
          <div className="text-center max-w-md px-8">
            <div className="text-accent-red text-6xl mb-6 select-none">◉</div>
            <div className="text-text-primary text-3xl font-bold mb-4">
              Aw, Snap!
            </div>
            <p className="text-text-secondary mb-2">
              Something went wrong while running this terminal.
            </p>
            <p className="text-text-dim text-sm font-terminal mb-8">
              Error code: SIGKILL_BY_USER
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn-ghost transition-colors cursor-pointer font-terminal text-sm px-6 py-2"
            >
              [ Start ]
            </button>
          </div>
        </div>,
        document.body
      )
    : null

  return (
    <>
      <div className="my-2 text-accent-red">
        {lines.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
      {crashOverlay}
    </>
  )
}
