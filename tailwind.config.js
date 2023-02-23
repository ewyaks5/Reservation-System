/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.handlebars"],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui")
  ],

  daisyui: {
    themes: ["luxury"]
  }
}
