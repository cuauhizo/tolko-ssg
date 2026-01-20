/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        principal: ['"Josefin Sans"', 'sans-serif'],
        Black: ['"Franie-Black"', 'sans-serif'],
        Light: ['"Franie-Light"', 'sans-serif'],
        SemiBold: ['"Franie-SemiBold"', 'sans-serif'],
        SemiBoldItalic: ['"Franie-SemiBoldItalic"', 'sans-serif'],
      },
      colors: {
        'tolko-red': 'rgb(204, 0, 50)',
      },
      backgroundImage: {
        'close-menu': "url('../assets/img/icon-close.svg')",
        'open-menu': "url('../assets/img/icon-hamburger.svg')",
      },
    },
  },
  plugins: [],
}
