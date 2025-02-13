/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily:{
        robotoBlack: [ "Roboto", "sans-serif"],
        helveticaNue:['Helvetica Neue', "sans-serif"],
        raleway:["Raleway", "sans-serif"]
      },
      gridTemplateColumns:{
        'noteGrid':'auto'
      }
  }
  },
  plugins: [],
}

