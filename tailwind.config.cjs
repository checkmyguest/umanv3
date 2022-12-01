/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    fontFamily:{
      'medium': 'URWGeometric Medium',
    },
    screens: {
      sm: '640px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
    },
    extend: {
      boxShadow:{
        'cmg': '0px 0.5px 1px 0.5px rgba(6, 18, 73, 0.2)'
      },
      borderRadius: {
        'cmg': '4px'
      },
      colors:{
        'blue': '#196DFD',
        'red': '#FF0055',
        'white': '#FFFFFF',
        'black': '#000000'
      }
    },
  },
  plugins: [],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
}