/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      "gray-background": "#fafbfb",
      "gray-medium": "#949DB2",
      "gray-light": "#F5F6F6",
      gray: "#8492a6",
      "gray-dark": "#273444",
      blue: "#1fb6ff",
      "blue-light": "#03C9D7",
      "blue-extralight": "#38bdf8",
      purple: "#7e5bef",
      pink: "#ff49db",
      orange: "#ff7849",
      "orange-light": "#fbbf24",
      green: "#13ce66",
      "green-light": "#a3e635",
      "green-dark": "#00C292",
      yellow: "#ffc82c",
      white: "#fff",
      red: "#dc2626",
    },
    extend: {
      colors: {
        green: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        'kisan': {
          DEFAULT: '#00922F',
          dark: '#007D28',
          light: '#00A735'
        }
      }
    },
  },
  plugins: [],
};
