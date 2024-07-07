/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: ["selector", '[data-theme="dark"]'],
  theme: {
    fontFamily: {
      Rubik: "Rubik",
      sansSerif: "sans-serif",
      Boomster: "Boomster",
      Nunito: "Nunito",
    },
    extend: {
      colors: {
        primary: {
          50: "#E6FBFF",
          100: "#CCF7FE",
          200: "#99EEFD",
          300: "#66E6FC",
          400: "#33DDFB",
          500: "#00D5FA",
          600: "#00A0BC",
          700: "#006B7D",
          800: "#00353F",
          900: "#001519",
        },
        grey: {
          0: "#FFFFFF",
          10: "#F6F6F6",
          50: "#F0F0F0",
          100: "#E0E0E0",
          200: "#C2C2C2",
          300: "#A3A3A3",
          400: "#858585",
          500: "#666666",
          600: "#4D4D4D",
          700: "#333333",
          800: "#1A1A1A",
          900: "#0A0A0A",
          1000: "#000000",
        },
      },
      backgroundImage: {},
      animation: {
        catBoom: "boom 4s ease-in-out forwards 3s",
        spinnerSpin: "rotation 1s linear infinite",
        blurImage: "blurAnim 5s ease-in-out infinite",
      },
      keyframes: {
        boom: {
          "0%": { transform: "translate(0%)" },
          "30%": { transform: "translate(-500%)" },
          "50%": { transform: "translate(-800%)" },
          "100%": { transform: "translate(-10000%)" },
        },
        blurAnim: {
          "0%": { filter: "blur(5px)" },
          "25%": { filter: "blur(15px)" },
          "50%": { filter: "blur(25px)" },
          "75%": { filter: "blur(15px)" },
          "100%": { filter: "blur(5px)" },
        },
        rotation: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
            borderTopColor: "gold",
          },
        },
      },
      screens: {
        xss: "340px",
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [],
}
