/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
};
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    ({ addComponents }) => {
      addComponents({
        ".container": {
          maxWidth: "100%",
          width: "100%",
          paddingLeft: "1rem",
          paddingRight: "1rem",
          margin: "0 auto",
          "@screen sm": {
            width: "640px",
          },
          "@screen md": {
            width: "768px",
          },
          "@screen lg": {
            width: "1200px",
          },
          "@screen xl": {
            width: "1322px",
          },
        },
      });
    },
  ],
};
