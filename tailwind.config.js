/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        coral: {
          50: '#fff5f3',
          100: '#ffe8e3',
          200: '#ffd0c7',
          300: '#ffb3a3',
          400: '#ff8c73',
          500: '#ff6b4a',
          600: '#f04f30',
          700: '#d63d20',
          800: '#b0321a',
          900: '#922d1a',
        },
        peach: {
          50: '#fff8f3',
          100: '#ffede0',
          200: '#ffdcc2',
          300: '#ffc499',
          400: '#ffa76f',
          500: '#ff8a4a',
          600: '#f06820',
          700: '#d64f15',
          800: '#b03f16',
          900: '#923618',
        },
        lavender: {
          50: '#f9f7ff',
          100: '#f0ebff',
          200: '#e4d9ff',
          300: '#d0bdff',
          400: '#b599ff',
          500: '#9b6fff',
          600: '#8447ff',
          700: '#7330f5',
          800: '#5f26cc',
          900: '#4f22a3',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}
