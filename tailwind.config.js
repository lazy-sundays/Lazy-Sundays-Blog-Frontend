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
        //  special 'article-[serif/sans/mono] families are specified with the lists reversed to remedy a really dumb bug. 
        //  this is only a band-aid solution, but it works!
        logo: ['var(--font-bricolage-grotesque), var(--font-noto-sans-jp)', ...defaultTheme.fontFamily.sans],
        header: ['var(--font-urw-gothic), var(--font-noto-sans-jp)', ...defaultTheme.fontFamily.sans],
        serif: ['var(--font-libre-baskerville), var(--font-noto-serif-jp)', ...(defaultTheme.fontFamily.serif)],
        'article-serif': [...(defaultTheme.fontFamily.serif.reverse()), 'var(--font-libre-baskerville), var(--font-noto-serif-jp)'],
        sans: ['var(--font-public-sans), var(--font-noto-sans-jp)', ...(defaultTheme.fontFamily.sans)],
        'article-sans': [...(defaultTheme.fontFamily.sans.reverse()), 'var(--font-public-sans), var(--font-noto-sans-jp)'],
        mono: ['var(--font-fira-code)', ...defaultTheme.fontFamily.mono],
        'article-mono': [...defaultTheme.fontFamily.mono, 'var(--font-fira-code)'],
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
            fontFamily: theme('fontFamily.article-serif'),
            '.lead, h1, h2, h3, h4, table, thead, tr, th, td, blockquote, figcaption': {
              fontFamily: theme('fontFamily.article-sans'),
            },
            'code': {
              fontFamily: theme('fontFamily.article-mono'),
            },
            'blockquote, thead, th': {
              'font-weight': 'bold',
            },
            // figure-related styles
            'figure img': {
              width: '100%',
            },
            'figure figcaption': {
              textAlign: 'end',
            }
          },
        },
      }),
      maxWidth: {
        '4xl': '60rem',
        '5xl': '72rem',
        'screen-readable': 'calc(1440px + 16vw)',
      },
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
