/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      xsm: "500px",
      "2xl": "1536px",
      "xl-custom": { max: "1734px" },
      "sml-custom": { max: "1369px" },
      "image-custom": { max: "1050px" },
      "showAll-custom": { max: "1016px" },
      "showAll-custom2": { max: "978px" },
      "showAll-custom3": { max: "831px" },
      "showAll-custom4": { max: "700px" },
      "tiny-custom2": { max: "530px" },
      "tiny-custom": { max: "470px" },
    },
    extend: {},
  },
  plugins: [require("daisyui")],
};
