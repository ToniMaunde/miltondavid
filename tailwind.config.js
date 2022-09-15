/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    colors: {
      "bg": "#011627",
      "bg-darker": "#011321",
      "primary": "#F2A541",
      "white": "#FDFFFC",
      "black": "#010100",
      "gray": "#363636",
      "light-gray": "#D3D3D3",
    },
    fontFamily: {
      "body": ['"Work Sans"', "sans"]
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};