import React from 'react'
import { motion } from 'framer-motion'
import { OutputEntry } from '../types'
import { profile } from '../data/profile'

interface OutputLineProps {
  entry: OutputEntry
}

export const OutputLine: React.FC<OutputLineProps> = React.memo(({ entry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      className="mb-1"
    >
      {entry.type === 'input' ? (
        <div className="flex gap-2">
          <span className="text-accent-amber font-bold">
            {profile.promptUser}@{profile.promptHost}:~$
          </span>
          <span className="text-text-primary">{entry.content}</span>
        </div>
      ) : (
        <div className="text-text-primary whitespace-pre-wrap">
          {entry.content}
        </div>
      )}
    </motion.div>
  )
})

OutputLine.displayName = 'OutputLine'
