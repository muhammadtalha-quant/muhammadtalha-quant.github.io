import type { SkillCategory } from '../types'

export const skills: {
  cpp: SkillCategory
  python: SkillCategory
  math: SkillCategory
} = {
  cpp: {
    name: 'C++ Systems',
    items: [
      {
        label: 'Core Language',
        detail:
          'Solid understanding of modern C++20 for building production-quality programs from scratch with correct memory management.',
      },
      {
        label: 'Architecture',
        detail:
          'Designed and built an entire mathematical query language (mmqli) including the text processing and execution logic.',
      },
      {
        label: 'Development Flow',
        detail:
          'Comfortable compiling, building, and managing projects directly from the terminal using CMake and Ninja.',
      },
      {
        label: 'Upcoming Training',
        detail:
          'Currently building toward formal algorithms, efficient data structures, and high-performance multithreading.',
      },
    ],
  },
  python: {
    name: 'Python',
    items: [
      {
        label: 'Current Status',
        detail:
          'Have introductory knowledge of the language but have not yet used it for any serious or professional scripting.',
      },
      {
        label: 'Upcoming Training',
        detail:
          'Serious study of Python for data research and machine learning is a planned goal for a future phase.',
      },
    ],
  },
  math: {
    name: 'Mathematics',
    items: [
      {
        label: 'Foundations',
        detail:
          'Functional understanding of university-level calculus, linear algebra, and basic probability.',
      },
      {
        label: 'Current Focus',
        detail:
          'Actively building formal mathematical maturity through proof-writing and rigorous logic exercises.',
      },
      {
        label: 'Upcoming Training',
        detail:
          'Preparing for future deep-dives into statistics, time series analysis, and stochastic calculus.',
      },
    ],
  },
}
