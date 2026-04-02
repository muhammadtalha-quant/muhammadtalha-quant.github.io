/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#080810',
        'surface-low': '#1b1b23',
        'surface-high': '#292932',
        'bg-primary': '#080810',
        border: 'rgba(30, 30, 58, 0.22)',
        'text-primary': '#dde2ec',
        'text-secondary': '#7b8098',
        'text-dim': '#454860',
        'accent-amber': '#b8ff2e', // mapped conditionally just in case, but custom ones below
        'accent-green': '#00f5ff',
        'accent-purple': '#9d4edd',
        'accent-red': '#ff2d78',
        'accent-blue': '#00f5ff',
        cyan: '#00f5ff',
        violet: '#9d4edd',
        acid: '#b8ff2e',
        magenta: '#ff2d78',
        'muted-indigo': '#5b5b8c',
      },
      fontFamily: {
        terminal: ['"JetBrains Mono"', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}
