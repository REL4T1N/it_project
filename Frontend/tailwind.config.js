/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      l: { min: "1600px" },

      m: { min: "1024px", max: "1599px" },

      s: { min: "300px", max: "1024px" },

      extend: {
        colors: {
          grey: "hsl(0, 0%, 20%)",
        },
        fontFamily: {
          sans: ["Inter", "sans-serif"],
          serif: ["Merriweather", "serif"],
          mono: ["Menlo", "monospace"],
          montserrat: ["Montserrat", "sans-serif"],
        },
      },
    },
  },
  plugins: [],
};
