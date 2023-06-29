import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {

      width: {
        '236': '64rem',
        '200': '53rem',
        '128': '36rem'
      },
      height: {
        '70': '278px'
      },

      fontFamily: {
        bentonbold: ['benton-bold'],
        bentonreg: ['benton-reg']
      }
    },
  },
  plugins: [],
} satisfies Config;
