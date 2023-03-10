/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#f25551",
        second200: "#feede1",
        second100: "#fffbff",
        green: "#50f283",
        dark900: "#241722",
        dark800: "#352432",
        dark700: "#462730",
        dark600: "#632239",
      },
      backgroundColor: {
        primary: "#f25551",
        second200: "#feede1",
        second100: "#fffbff",
        green: "#50f283",
        dark900: "#241722",
        dark800: "#352432",
        dark700: "#462730",
        dark600: "#632239",
      },
      keyframes: {
        "top-popup": {
          "0%": {
            transform: "translate(0 , -200px)",
          },
          "20%": {
            transform: "translate(0 , 140px)",
          },
          "50%": {
            transform: "translate(0 , 90px)",
          },
          "80%": {
            transform: "translate(0 , 110px)",
          },
          "100%": {
            transform: "translate(0 , -200px)",
          },
        },
      },
      animation:{
        'top-popup':'top-popup 2s ease-in-out '
      }
    },
  },
  plugins: [],
};
