/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pastel: {
          pink: '#ffd6e7',
          purple: '#e6d6ff',
          blue: '#d6e6ff',
          peach: '#ffe6d6',
          mint: '#d6ffe6',
        }
      },
      fontFamily: {
        elegant: ['Crimson Text', 'serif'],
      }
    },
  },
  plugins: [],
}
