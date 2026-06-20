/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    screens: {
      xs: '375px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        brand: {
          yellow: '#F5D000',
          green: '#39D353',
          ground: '#0B0B0B',
          text: '#D4E8D4',
          muted: '#5A7A57',
          card: '#0D140C',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out infinite 2s',
        'spin-slow': 'spin 20s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient': 'gradientShift 8s ease infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'scan': 'scanLine 10s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        scanLine: {
          '0%':   { transform: 'translateY(-5px)', opacity: '0' },
          '3%':   { opacity: '0.7' },
          '97%':  { opacity: '0.7' },
          '100%': { transform: 'translateY(100vh)', opacity: '0' },
        },
      },
      backgroundSize: {
        '400%': '400%',
      },
    },
  },
  plugins: [],
}
