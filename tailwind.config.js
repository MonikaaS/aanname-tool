module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'playfair-display': ['"Playfair Display"', 'serif'],
        'open-sans': ['"Open Sans"', 'Sans-serif']
      },
      fontWeight: { 
        'black': 900
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
