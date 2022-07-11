module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        show: 'shows 1s linear ',
        win:"winkey .8s linear 3 "
      },

      keyframes: {
        shows: {
          '0%':{color:"black"},
          '100%': { color:"white" },
        },
        winkey:{
          "0%":{color:"black"},
          "100%":{color:"rgb(30 58 138);"}
        }

      }
    },
  },
  plugins: [],
}