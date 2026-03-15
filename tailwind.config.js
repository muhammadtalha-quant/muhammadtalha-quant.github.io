/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0d1117',
        'bg-secondary': '#161b22',
        'bg-tertiary': '#21262d',
        border: '#30363d',
        'text-primary': '#e6edf3',
        'text-secondary': '#8b949e',
        'text-dim': '#484f58',
        'accent-amber': '#f59e0b',
        'accent-green': '#10b981',
        'accent-purple': '#818cf8',
        'accent-red': '#f87171',
        'accent-blue': '#38bdf8',
      },
      fontFamily: {
        terminal: ['"JetBrains Mono"', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}
