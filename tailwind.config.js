/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
const colors = require('tailwindcss/colors')

module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        'blink': 'blink 1s cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      colors: {
        bgprimary : 'rgb(var(--bg-primary) / <alpha-value>)',
        bgsecondary: 'rgb(var(--bg-secondary) / <alpha-value>)',
        bgcode: 'rgb(var(--bg-code) / <alpha-value>)',
        textprimary : 'rgb(var(--text-primary) / <alpha-value>)',
        textsecondary : 'rgb(var(--text-secondary) / <alpha-value>)',
        texttertiary : 'rgb(var(--text-tertiary) / <alpha-value>)',
        textcode: 'rgb(var(--text-code) / <alpha-value>)',
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
      screens: {
        'xs': '480px',
        '2xs': '360px',
      },
      typography: ({theme}) => ({
        article: {
          css: {
            '--tw-prose-body': theme('colors.textsecondary / 100%'),
            '--tw-prose-headings': theme('colors.textprimary / 100%'),
            '--tw-prose-lead': theme('colors.texttertiary / 100%'),
            '--tw-prose-links': theme('colors.accentprimary / 100%'),
            '--tw-prose-bold': theme('colors.textprimary / 100%'),
            '--tw-prose-counters': theme('colors.accentprimary / 100%'),
            '--tw-prose-bullets': theme('colors.accentprimary / 100%'),
            '--tw-prose-hr': theme('colors.textprimary / 25%'),
            '--tw-prose-quotes': theme('colors.textprimary / 100%'),
            '--tw-prose-quote-borders': theme('colors.accentsecondary / 100%'),
            '--tw-prose-captions': theme('colors.texttertiary / 100%'),
            '--tw-prose-code': theme('colors.accenttertiary / 100%'),
            '--tw-prose-pre-code': theme('colors.textcode / 100%'),
            '--tw-prose-pre-bg': theme('colors.bgcode / 100%'),
            '--tw-prose-th-borders': theme('colors.textprimary / 100%'),
            '--tw-prose-td-borders': theme('colors.texttertiary / 100%'),
          },
        },
      })
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'), //source: https://github.com/tailwindlabs/tailwindcss-aspect-ratio
    require("tailwind-gradient-mask-image"), //source: https://github.com/juhanakristian/tailwind-gradient-mask-image
    require('@tailwindcss/typography'), //source: https://tailwindcss.com/docs/typography-plugin
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
  safelist: [

  ],
}

