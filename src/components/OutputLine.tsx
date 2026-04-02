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
      animate={{ opacity: entry.isFaded ? 0.2 : 1, y: 0 }}
      whileHover={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="command-block group"
    >
      {entry.type === 'input' ? (
        <div className="flex gap-2">
          <span className="font-bold shrink-0">
            <span className="text-cyan">{profile.promptUser}</span>
            <span className="text-muted-indigo">@</span>
            <span className="text-violet">{profile.promptHost}</span>
            <span className="text-text-secondary">:</span>
            <span className="text-acid">~</span>{' '}
            <span className="text-magenta">❯</span>
          </span>
          <span className="text-text-primary opacity-90">{entry.content}</span>
        </div>
      ) : (
        <div className="text-text-primary whitespace-pre-wrap mt-2 flex flex-col gap-2">
          {entry.content}
        </div>
      )}
    </motion.div>
  )
})

OutputLine.displayName = 'OutputLine'
