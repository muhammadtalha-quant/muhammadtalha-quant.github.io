import React from 'react'
import { useTypingLines } from '../../hooks/useTypingLines'

export const Bio: React.FC = () => {
  const bioLines = [
    'I am a 20-year-old computer science student from Pakistan at the start of a deliberate learning journey. My focus is on building the rigorous engineering and mathematical foundations required for quantitative research.',
    '',
    "My primary language is C++. I focus on writing clean, solid code from first principles. My most significant work to date is 'mmqli' — a working interpreter for a custom mathematical query language that I designed and built from scratch. This project served as my first major deep-dive into system architecture and memory management.",
    '',
    'I am currently building my maturity in formal mathematics and preparing to start serious training in Python and data research. My targets are algorithm developer and quantitative researcher roles at firms like HRT and Citadel. I am at the beginning of that road, holding myself to a professional standard as I follow a strict roadmap to get there.',
  ]

  const { visibleCount } = useTypingLines(bioLines, 400)

  return (
    <div className="my-4 space-y-2 max-w-3xl">
      {bioLines.slice(0, visibleCount).map((line, i) => (
        <p key={i} className="text-text-primary min-h-[1.6em] leading-relaxed">
          {line}
        </p>
      ))}

      {visibleCount === bioLines.length && (
        <div className="pt-4 mt-4 border-t border-border/30">
          <p className="text-text-secondary italic">
            "I treat every project as a serious artifact. My goal is to master
            the fundamentals so thoroughly that I can eventually solve technical
            problems at the highest level without apology. The journey is long,
            but the commitment is total."
          </p>
        </div>
      )}
    </div>
  )
}
