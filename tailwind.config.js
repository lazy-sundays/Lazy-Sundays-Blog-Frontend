/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode:'class',
  theme: {
    extend: {
      animation: {
        'blink': 'blink 1s cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      aspectRatio: {
        '4/3': '4 / 3',
        '16/9': '16 / 9',
        '21/9': '21 / 9',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
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
      fontFamily: {
        logo: [...defaultTheme.fontFamily.sans, 'var(--font-bricolage-grotesque), var(--font-noto-sans-jp)'],
        // header: 'var(--font-libre-inter)',
        serif: [...(defaultTheme.fontFamily.serif.reverse()), 'var(--font-libre-baskerville), var(--font-noto-sans-jp)'],
        sans: [...(defaultTheme.fontFamily.sans.reverse()),'var(--font-public-sans), var(--font-noto-sans-jp)'],
        mono: [...defaultTheme.fontFamily.mono, 'var(--font-fira-code)'],
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
            fontFamily: theme('fontFamily.serif'),
            // 'h1, h2, h3, h4, th, figcaption': {
            //   fontFamily: theme('fontFamily.sans'),
            // },
            '.lead, h1, h2, h3, h4, table, thead, tr, th, td, blockquote, figcaption': {
              fontFamily: theme('fontFamily.sans'),
            },
            'code': {
              fontFamily: theme('fontFamily.mono'),
            },
            'blockquote, thead, th': {
              'font-weight': 'bold',
            },
          },
        },
      })
    },
  },
  plugins: [
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
