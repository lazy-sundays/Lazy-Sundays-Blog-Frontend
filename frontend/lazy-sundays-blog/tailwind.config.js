/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        'blink': 'blink 1s cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      colors: {
        "1-primary": "#048BA8",
        "1-secondary": "#F18F01",
        "1-tertiary": "#C072A5",
        "2-primary": "#E8998D",
        "2-secondary": "#6C9A8B",
        "2-tertiary": "#EED2CC",
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
  plugins: [],
}

