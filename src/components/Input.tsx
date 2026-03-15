import React, { useRef, useEffect } from 'react'

interface InputProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
  promptUser: string
  promptHost: string
}

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  onKeyDown,
  promptUser,
  promptHost,
}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleGlobalClick = () => {
      inputRef.current?.focus()
    }
    window.addEventListener('click', handleGlobalClick)
    return () => window.removeEventListener('click', handleGlobalClick)
  }, [])

  return (
    <div className="flex gap-2 items-center relative py-1">
      <span className="text-accent-amber font-bold shrink-0" aria-hidden="true">
        {promptUser}@{promptHost}:~$
      </span>
      <div className="relative flex-1 flex items-center">
        <span className="text-text-primary whitespace-pre">{value}</span>
        <span className="cursor-block" aria-hidden="true" />
        <input
          ref={inputRef}
          type="text"
          className="absolute inset-0 opacity-0 cursor-default outline-none bg-transparent text-transparent caret-transparent w-full"
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          autoFocus
          spellCheck={false}
          autoComplete="off"
          aria-label="Terminal input"
        />
      </div>
    </div>
  )
}
