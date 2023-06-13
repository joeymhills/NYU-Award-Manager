import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {

      fontFamily: {
        bentonbold: ['benton-bold'],
        bentonreg: ['benton-reg']
      }
    },
  },
  plugins: [],
} satisfies Config;
