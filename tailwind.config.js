/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: 'var(--accent-color)',
          light: 'var(--accent-color-light)',
          dark: 'var(--accent-color-dark)',
        }
      },
      backgroundColor: {
        accent: {
          DEFAULT: 'var(--accent-color)',
          light: 'var(--accent-color-light)',
          dark: 'var(--accent-color-dark)',
        }
      },
      textColor: {
        accent: {
          DEFAULT: 'var(--accent-color)',
          light: 'var(--accent-color-light)',
          dark: 'var(--accent-color-dark)',
        }
      },
      borderColor: {
        accent: {
          DEFAULT: 'var(--accent-color)',
          light: 'var(--accent-color-light)',
          dark: 'var(--accent-color-dark)',
        }
      },
      ringColor: {
        accent: {
          DEFAULT: 'var(--accent-color)',
          light: 'var(--accent-color-light)',
          dark: 'var(--accent-color-dark)',
        }
      },
    },
  },
  plugins: [],
  safelist: [
    'bg-accent',
    'bg-accent-light',
    'bg-accent-dark',
    'text-accent',
    'text-accent-light',
    'text-accent-dark',
    'border-accent',
    'border-accent-light',
    'border-accent-dark',
    'ring-accent',
    'ring-accent-light',
    'ring-accent-dark',
    'hover:bg-accent',
    'hover:bg-accent-dark',
    'hover:text-accent',
    'focus:ring-accent',
  ],
}