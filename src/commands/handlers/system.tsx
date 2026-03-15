import React, { useEffect, useState } from 'react'
import { Command } from '../../types'
import { profile } from '../../data/profile'

export const Help: React.FC<{ registry: Command[] }> = ({ registry }) => {
  const categories: Record<string, Command[]> = {
    identity: [],
    work: [],
    contact: [],
    system: [],
  }

  registry.forEach((cmd) => categories[cmd.category].push(cmd))

  return (
    <div className="my-4 space-y-4 max-w-2xl">
      {Object.entries(categories).map(([cat, cmds]) => (
        <div key={cat}>
          <div className="text-text-dim uppercase text-[12px] font-bold tracking-widest mb-1">{cat}</div>
          <div className="space-y-1">
            {cmds.map((cmd) => (
              <div key={cmd.name} className="grid grid-cols-[120px_1fr] gap-4">
                <span className="text-accent-amber font-bold">{cmd.name}</span>
                <span className="text-text-secondary">{cmd.description}</span>
              </div>
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
      { text: '[    0.000000] Flushing session data...', delay: 400 },
      { text: '[    0.041000] Unmounting modules...', delay: 800 },
      { text: '[    0.082000] Initiating hard reload.', delay: 1200 },
    ]

    sequence.forEach((item) => {
      setTimeout(() => {
        setLines((prev) => [...prev, item.text])
      }, item.delay)
    })

    setTimeout(() => {
      window.location.reload()
    }, 2400)
  }, [])

  return (
    <div className="my-2 text-text-primary">
      {lines.map((line, i) => (
        <div key={i}>{line}</div>
      ))}
    </div>
  )
}

export const Wget: React.FC<{ args: string[] }> = ({ args }) => {
  const [output, setOutput] = useState<string[]>([])
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    if (args[0] !== 'myresume.pdf') {
      setOutput([`wget: cannot retrieve '${args[0]}': 404 Not Found`, 'Resume not yet available. Check back soon.'])
      setIsError(true)
      return
    }

    const steps = [
      { text: '--2026-04-01 09:14:22--', delay: 80 },
      { text: '  https://muhammadtalha-quant.dev/myresume.pdf', delay: 160 },
      { text: 'Resolving muhammadtalha-quant.dev... 104.21.14.82', delay: 240 },
      { text: 'Connecting to muhammadtalha-quant.dev:443... connected.', delay: 320 },
      { text: 'HTTP request sent, awaiting response... 200 OK', delay: 400 },
      { text: 'Length: 152871 (149K) [application/pdf]', delay: 480 },
      { text: "Saving to: 'myresume.pdf'", delay: 560 },
      { text: '', delay: 600 },
      { text: 'myresume.pdf    100%[===================>]  149.29K  2.14MB/s  in 0.07s', delay: 700 },
      { text: '', delay: 750 },
      { text: "2026-04-01 09:14:23 (2.14 MB/s) — 'myresume.pdf' saved [152871/152871]", delay: 850 },
    ]

    steps.forEach((step) => {
      setTimeout(() => {
        setOutput((prev) => [...prev, step.text])
      }, step.delay)
    })

    setTimeout(() => {
      try {
        const a = document.createElement('a')
        a.href = profile.resumeUrl
        a.download = 'myresume.pdf'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      } catch {
        setOutput((prev) => [...prev, "wget: failed to trigger download."])
        setIsError(true)
      }
    }, 1000)
  }, [args])

  return (
    <div className={`my-2 ${isError ? 'text-accent-red' : 'text-text-primary'}`}>
      {output.map((line, i) => (
        <div key={i} className="min-h-[1.6em]">{line}</div>
      ))}
    </div>
  )
}
