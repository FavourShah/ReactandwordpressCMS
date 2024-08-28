/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customNav: {
          DEFAULT: "#2C3E50",
        },
        customBdText: {
          DEFAULT: "#4A4A4A",
        },
        customHead: {
          DEFAULT: "#00000",
        },
        customCard: {
          DEFAULT: "#fafafa",
        },
        customFooter: {
          DEFAULT: "#2C3E50",
        },
        customButton: {
          DEFAULT: "#2196F3",
        },
        customLink: {
          DEFAULT: "#007BFF",
        },
        customTyp: {
          DEFAULT: "#ffffff",
        },
        customIcon: {
          DEFAULT: "#B0BEC5",
        },
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        oswald: ["Oswald", "sans-serif"],
        "open-sans": ["Open Sans", "sans-serif"],
        lato: ["Lato", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        raleway: ["Raleway", "sans-serif"],
      },
    },
  },
  plugins: [],
};
