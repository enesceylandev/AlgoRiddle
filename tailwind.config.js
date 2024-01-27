/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          background: {
            dark: "#0F172A"
          },
          text : {
            dark: "#FFFFFF"
          }
        }
      }
    },
  },
  plugins: [],
}

