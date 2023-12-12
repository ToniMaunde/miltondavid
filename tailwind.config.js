/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      colors: {
      },
      fontFamily: {
        "overpass-mono": ['"Overpass Mono"', "sans"],
        "overpass-regular": ['"Overpass Regular"', "sans"],
        "overpass-medium": ['"Overpass Medium"', "sans"],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
