/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    colors: {
      "chinese-black": "#15141B",
      "charleston-green": "#252533",
      "naples-yellow": "#FFC85B",
      "baby-powder": "#FDFFFC",
      "phillipine-silver": "#B1B1B1",
      "light-gray": "#D3D3D3",
      "davys-grey": "#575757",
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
