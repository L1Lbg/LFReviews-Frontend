/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'background': '#252525',
          'secondary-background': '#111111',
          'text': '#FFFFFF',
          'gradient-blue': '#015FDF',
          'gradient-red': '#B52639',
          'high-gradient-blue': '#006aff',
          'high-gradient-red': '#ff0022',
          'purple': '#443366',
          'black': '#171717',
          'grey-dark': '#212121',
          'grey-light': '#2F2F2F',
          'grey-lighter': '#ABABAB',
          'white': '#ECECEC',
          'lite-white': 'rgb(187, 187, 187)',
        },
      },
    },
    plugins: [],
  }