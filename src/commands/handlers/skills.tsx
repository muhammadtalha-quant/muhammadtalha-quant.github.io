import { skills } from '../../data/skills'
import type { SkillCategory, SkillItem } from '../../types'
import { useTypingLines } from '../../hooks/useTypingLines'

const SkillBlock: React.FC<{
  category: SkillCategory
  visibleCount: number
  startIndex: number
}> = ({ category, visibleCount, startIndex }) => {
  const currentItems = category.items.slice(
    0,
    Math.max(0, visibleCount - startIndex)
  )

  if (visibleCount < startIndex) return null

  return (
    <div className="mb-6">
      <div className="text-text-dim uppercase text-[11px] font-bold tracking-widest mb-3 flex items-center gap-2">
        <span className="text-accent-amber">●</span> {category.name}
      </div>
      <div className="grid grid-cols-1 gap-y-2">
        {currentItems.map((item: SkillItem, i: number) => (
          <div key={i} className="flex gap-4 group">
            <span className="text-accent-amber font-mono shrink-0 w-32">
              {item.label}
            </span>
            <span className="text-text-secondary group-hover:text-text-primary transition-colors">
              {item.detail}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export const Skills: React.FC<{ category?: 'cpp' | 'python' | 'math' }> = ({
  category,
}) => {
  const categories: SkillCategory[] = category
    ? [skills[category]]
    : [skills.cpp, skills.python, skills.math]

  // Flattened structure for timing: [Cat1Header, Cat1Item1, Cat1Item2, ..., Cat2Header, ...]
  const totalSteps = categories.reduce(
    (acc, cat) => acc + 1 + cat.items.length,
    0
  )
  const { visibleCount } = useTypingLines(Array(totalSteps).fill(''), 100)

  let currentStep = 0
  return (
    <div className="my-4 max-w-4xl">
      {categories.map((cat, idx) => {
        const startIndex = currentStep
        currentStep += 1 + cat.items.length
        return (
          <SkillBlock
            key={idx}
            category={cat}
            visibleCount={visibleCount}
            startIndex={startIndex + 1}
          />
        )
      })}
    </div>
  )
}
