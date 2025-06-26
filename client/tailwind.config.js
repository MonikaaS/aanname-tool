/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontSize: {
        xss: ".65rem",
        xs: ".75rem",
      },
      fontFamily: {
        "playfair-display": ["Playfair Display", "serif"],
        "open-sans": ["Open Sans", "Sans-serif"],
        domine: ["Domine", "Sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      fontWeight: {
        black: 900,
      },
      inset: {
        "1/5": "20%",
        "1/10": "10%",
        "2/5": "40%",
        "7/12": "58.333333%;",
        92: "22rem",
        "36rem": "36rem",
      },
    },
  },
  variants: {
    extend: {
      zIndex: ["hover", "active"],
      backgroundColor: ["active", "hover", "focus"],
      borderColor: ["active", "hover", "focus"],
    },
  },
  plugins: [],
};
