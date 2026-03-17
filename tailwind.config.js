/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
     "./layout/*.liquid",
    "./sections/*.liquid",
    "./snippets/*.liquid",
    "./templates/*.liquid",
    "./templates/**/*.liquid",
    "./assets/*.js"
  ],
  theme: {
     textColor: theme => theme('colors'),
     textColor: {
       'title': '#0A4874',
      },
      borderColor: theme => ({
        ...theme('colors'),
        DEFAULT: theme('colors.gray.300', 'currentColor'),
        'custom-grey': '#E8E8E8',
        'custom-blue': '#0A4874',
      }),
      backgroundColor: theme => ({
       ...theme('colors'),
       'custom-blue': '#0A4874'
      }),
    extend: {
      fontSize: {
      small: ['14px', {
        lineHeight: '16px',
      }],
      medium: ['16px', {
        lineHeight: '18px',
      }]
    },
     fontFamily: {
        franklin: ['"Franklin Gothic ATF"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

