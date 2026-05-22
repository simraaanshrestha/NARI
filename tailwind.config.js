/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: '#0A0A0A',
          light: '#1A1A1A',
          dark: '#050505',
        },
        emerald: {
          light: '#065F46',
          DEFAULT: '#064E3B',
          dark: '#022C22',
          deep: '#011A14',
        },
        gold: {
          light: '#D4AF37',
          DEFAULT: '#C5A028',
          dark: '#A67C00',
        },
        pearl: {
          light: '#FFFFFF',
          DEFAULT: '#F8F5F2',
          dark: '#E8E2DA',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        sans: ['Montserrat', 'sans-serif'],
      },
      animation: {
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
