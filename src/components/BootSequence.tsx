import React from 'react'
import { motion } from 'framer-motion'
import { useBootSequence } from '../hooks/useBootSequence'

interface BootSequenceProps {
  onComplete: () => void
}

export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const { lines } = useBootSequence(onComplete)

  return (
    <div className="font-terminal text-text-primary">
      {lines.map((line, i) => (
        <div key={i} className="min-h-[1.6em] whitespace-pre-wrap">
          {line}
        </div>
      ))}
    </div>
  )
}
