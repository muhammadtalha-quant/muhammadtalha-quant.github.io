import React from 'react'

export const Bio: React.FC = () => {
  return (
    <div className="my-4 max-w-2xl text-text-primary leading-relaxed">
      <p className="mb-4">
        I am a 20-year-old BSCS student from Pakistan building toward
        Algorithm Developer and Quantitative Researcher roles at HRT,
        Citadel Securities, and Two Sigma.
      </p>

      <p className="mb-4">
        My work sits at the intersection of rigorous mathematics,
        high-performance C++, and data-driven research. On the systems
        side I write production-grade C++ — event-driven engines, order
        book implementations, numerical solvers, and performance-critical
        data structures. On the research side I work in Python — signal
        discovery, statistical validation, ML alpha, and quantitative
        risk management.
      </p>

      <p>
        I treat every project as a professional artifact. Nothing ships
        without tests, benchmarks, and documentation written as if a
        senior engineer is reading it cold. The standard is simple:
        would I show this in an interview without apology?
        The answer has to be yes. Every time.
      </p>
    </div>
  )
}
