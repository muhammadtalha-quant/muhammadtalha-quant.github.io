import React, { useMemo } from 'react'
import { profile } from '../../data/profile'
import { useTypingLines } from '../../hooks/useTypingLines'

export const Nitch: React.FC = () => {
  const uptime = useMemo(() => {
    const birth = new Date(2006, 0, 21)
    const now = new Date()

    let years = now.getFullYear() - birth.getFullYear()
    let months = now.getMonth() - birth.getMonth()
    let days = now.getDate() - birth.getDate()

    if (days < 0) {
      months--
      days += new Date(now.getFullYear(), now.getMonth(), 0).getDate()
    }
    if (months < 0) {
      years--
      months += 12
    }

    return `${years}y ${months}m ${days}d`
  }, [])

  const rows = [
    { label: 'OS', value: 'Arch Linux' },
    { label: 'Uptime', value: uptime },
  ]

  const { visibleCount } = useTypingLines(
    rows.map((r) => r.label),
    50
  )

  return (
    <div className="my-4 font-terminal flex flex-col md:flex-row gap-8">
      <div className="text-accent-amber select-none hidden md:block leading-none">
        <pre className="text-[12px] whitespace-pre overflow-x-visible">
          {`███╗   ███╗████████╗
████╗ ████║╚══██╔══╝
██╔████╔██║   ██║   
██║╚██╔╝██║   ██║   
██║ ╚═╝ ██║   ██║   
╚═╝     ╚═╝   ╚═╝   `}
        </pre>
      </div>

      <div className="flex-1">
        <div className="text-accent-green font-bold text-lg mb-2 flex items-center gap-2">
          {profile.promptUser}@{profile.promptHost}
        </div>
        <div className="text-text-dim mb-2">──────────────────────────────</div>
        <div className="space-y-1">
          {rows.slice(0, visibleCount).map((row, i) => (
            <div key={i} className="flex gap-4">
              <span className="text-accent-amber font-bold w-24 shrink-0">
                {row.label}
              </span>
              <span className="text-text-primary">{row.value}</span>
            </div>
          ))}
        </div>

        {visibleCount === rows.length && (
          <div className="mt-4 grid grid-cols-1 gap-1">
            <div className="flex gap-4">
              <span className="text-accent-amber font-bold w-24 shrink-0">
                C++
              </span>
              <span className="text-text-primary">
                Systems, HFT engines, Optimizers
              </span>
            </div>
            <div className="flex gap-4">
              <span className="text-accent-amber font-bold w-24 shrink-0">
                Python
              </span>
              <span className="text-text-primary">
                ML research, signals, risk models
              </span>
            </div>
            <div className="flex gap-4">
              <span className="text-accent-amber font-bold w-24 shrink-0">
                Targets
              </span>
              <span className="text-text-primary">
                {profile.targets.join(' · ')}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
