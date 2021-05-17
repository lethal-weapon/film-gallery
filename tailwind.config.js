const colors = require('tailwindcss/colors')

module.exports = {
  purge: [
    './public/index.html',
    './src/**/*.{js,jsx}',
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        'reset-button': 'spin 3s reverse ease-in',
        'reload-button': 'spin 2s linear infinite'
      },
      boxShadow: {
        filmLight: '1px 1px .5rem cornflowerblue, -1px -1px .5rem cornflowerblue',
        filmDark: '1px 1px .5rem gray, -1px -1px .5rem gray'
      },
      colors: {
        orange: colors.orange,
        lime: colors.lime,
        dark: colors.trueGray
      },
    },
  },
  variants: {
    extend: {
      width: ['focus'],
      boxShadow: ['dark']
    },
  },
  plugins: [],
}
