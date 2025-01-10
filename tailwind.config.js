/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        indigo: {
          50: '#f0f5ff',
          100: '#e5edff',
          200: '#cddbfe',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
        },
        purple: {
          50: '#faf5ff',
          600: '#9333ea',
          700: '#7e22ce',
        },
      },
    },
  },
  plugins: [],
};