/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      screens: {
        desktop: "1440px",
      },
      colors: {
        "dark-blue": "#0d253f",
        "light-blue": "#01b4e4",
        "light-green": "#90cea1",
      },
    },
  },
  plugins: [],
};
