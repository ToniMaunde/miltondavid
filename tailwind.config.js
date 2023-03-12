/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    colors: {
      "bg": "#011627",
      "bg-darker": "#010E17",
      "primary": "#F2A541",
      "white": "#FDFFFC",
      "black": "#010100",
      "gray": "#363636",
      "light-gray": "#D3D3D3",
    },
    fontFamily: {
      "body": ['"Work Sans"', "sans"]
    },
    extend: {
      screens: {
        "2xl": "1440px",
        "3xl": "1536px",
        "4xl": "1920px"
      },
      padding: {
        "104": "28rem"
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
