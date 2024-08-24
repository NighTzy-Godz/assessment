import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        gelionReg: "Gelion_Reg",
        gelionBold: "Gelion_Bold",
      },
      colors: {
        bgColor: "rgb(var(--bgColor))",

        mainColor: "rgb(var(--mainColor))",
        mainColorDark: "rgb(var(--mainColorDark))",

        error: "rgb(var(--error))",
        errorDark: "rgb(var(--errorDark))",

        success: "rgb(var(--success))",
        successDark: "rgb(var(--successDark))",

        textColor: "rgb(var(--textColor))",
        textColorDark: "rgb(var(--textColorDark))",

        inputPlaceHolder: "rgb(var(--inputPlaceHolder))",
        dark: "rgb(var(--dark))",
      },

      container: {
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "3rem",
          xl: "6rem",
          "2xl": "8rem",
        },
      },

      screens: {
        sm: "575px",
        md: "768px",
        lg: "992px",
        xl: "1180px",
        "2xl": "1350px",
      },
    },
  },
  plugins: [],
};
export default config;
