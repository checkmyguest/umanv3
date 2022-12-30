/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    fontFamily:{
      'medium': 'URWGeometric Medium',
      'table': 'Ubuntu'
    },
    screens: {
      sm: '640px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
    },
    extend: {
      boxShadow: {
        'cmg': '0px 0.5px 1px 0.5px rgba(6, 18, 73, 0.2)'
      },
      borderRadius: {
        'cmg': '4px'
      },
      colors: {
        'blue': '#196DFD',
        'red': '#FF0055',
        'white': '#FFFFFF',
        'black': '#000000',
        'orange-light': '#FFC58B',
        'sky': '#E3E8EE',
        'yellow-bgn': '#FCF6AB',
        'red-light': '#FAB9CA',
        'purple-light': '#E3D0FF',
        'green-light': '#CBF4CA',
        'grey1': '#CCCFDB',
        'red-darker': '#FFC4D5',
        'blue-sky': '#EDF3F9'
      },
      fontSize: {
        'default': '14px',
        'medium': '16px',
        'large': '18px'
      },
      lineHeight: {
        'default': '20px',
        'medium': '24px',
        'large': '24px'
      },
      height: {
        'default': '26px',
        'medium': '36px',
        'large': '46px'
      }
    },
  },
  plugins: [],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
}