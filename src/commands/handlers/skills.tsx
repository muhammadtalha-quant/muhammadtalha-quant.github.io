import React from 'react'
import { skills } from '../../data/skills'
import { SkillCategory } from '../../types'

interface SkillsProps {
  category?: 'cpp' | 'python' | 'math'
}

const SkillBlock: React.FC<{ category: SkillCategory }> = ({ category }) => (
  <div className="mb-6">
    <div className="text-accent-amber font-bold mb-1 tracking-wider">{category.name}</div>
    <div className="text-text-dim mb-3">─────────────────────────────────────────────────────</div>
    <div className="space-y-2">
      {category.items.map((item, i) => (
        <div key={i} className="grid grid-cols-[140px_1fr] gap-4">
          <span className="text-text-secondary">{item.label}</span>
          <span className="text-text-primary">: {item.detail}</span>
        </div>
      ))}
    </div>
  </div>
)

export const Skills: React.FC<SkillsProps> = ({ category }) => {
  if (category) {
    return <div className="my-4"><SkillBlock category={skills[category]} /></div>
  }

  return (
    <div className="my-4">
      <SkillBlock category={skills.cpp} />
      <SkillBlock category={skills.python} />
      <SkillBlock category={skills.math} />
    </div>
  )
}
