/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./thank-you/**/*.html",
    "./assets/js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0B1046',
          dark: '#070B30',
          light: '#141B66'
        },
        brand: {
          orange: '#E8531F',
          hover: '#CF4313'
        }
      }
    }
  },
  plugins: []
};
