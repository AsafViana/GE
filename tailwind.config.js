/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/View/**/*.{js, jsx}'
  ],
  theme: {
    extend: {
      colors: {
        'sky':{
          500: '#48a1d9',
          700: '#03588c'
        }
      }
    },
  },
  plugins: [],
}
