// tailwind.config.js
module.exports = {
  darkMode: 'class',
  content: ['./index.html','./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FFFDFD',      // bianco caldo
        accentPurple: '#8C82FE', // viola
        accentBlue: '#1B25F2',   // blu intenso
        darkNavy: '#020659',     // navy molto scuro
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
};
