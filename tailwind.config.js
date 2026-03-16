/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Syne"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        ink: {
          950: '#050810',
          900: '#0a0f1e',
          800: '#0f172a',
          700: '#1e293b',
          600: '#334155',
        },
        ocean: {
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
        },
        jade: {
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
        },
        amber: {
          400: '#fbbf24',
          500: '#f59e0b',
        },
        rose: {
          400: '#fb7185',
          500: '#f43f5e',
        },
        violet: {
          400: '#a78bfa',
          500: '#8b5cf6',
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          from: { boxShadow: '0 0 10px rgba(14,165,233,0.3)' },
          to: { boxShadow: '0 0 30px rgba(14,165,233,0.7)' },
        },
      },
      backdropBlur: { xs: '2px' },
    },
  },
  plugins: [],
}
