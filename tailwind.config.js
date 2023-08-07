/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        'blink': 'blink 1s cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      colors: {
        "off-white": "var(--off-white)",
        "1-primary": "var(--1-primary)",
        "1-secondary": "var(--1-secondary)",
        "1-tertiary": "var(--1-tertiary)",
        "2-primary": "var(--2-primary)",
        "2-secondary": "var(--2-secondary)",
        "2-tertiary": "var(--2-tertiary)",
        bgprimary : 'rgb(var(--bg-primary) / <alpha-value>)',
        bgsecondary: 'rgb(var(--bg-secondary) / <alpha-value>)',
        textprimary : 'rgb(var(--text-primary) / <alpha-value>)',
        accentprimary: 'rgb(var(--accent-primary) / <alpha-value>)',
        accentsecondary : 'rgb(var(--accent-secondary) / <alpha-value>)',
        accenttertiary: 'rgb(var(--accent-tertiary) / <alpha-value>)',
      },
      keyframes: {
        blink: {
          '0%, 100%': { 
            'opacity': '0',
          },
          '50%': { 
            'opacity': '1' ,
          },
        },
      },

    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    }),
  ],
}

