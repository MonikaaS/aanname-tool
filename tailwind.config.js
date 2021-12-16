module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontSize: {
        xss: ".5rem",
        xs: ".75rem",
      },
      fontFamily: {
        "playfair-display": ['"Playfair Display"', "serif"],
        "open-sans": ['"Open Sans"', "Sans-serif"],
      },
      fontWeight: {
        black: 900,
      },
      inset: {
        "1/5": "20%",
        "1/10": "10%",
        "2/5": "40%",
      },
    },
  },
  variants: {
    extend: { zIndex: ["hover", "active"] },
  },
  plugins: [],
};
