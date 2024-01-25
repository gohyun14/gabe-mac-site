import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      keyframes: {
        bounceUp: {
          "0%": {
            transform: "none",
          },
          "50%": {
            transform: "translateY(-25%)",
            animationTimingFunction: "cubic-bezier(0.8,0,1,1)",
          },
          "100%": {
            transform: "none",
          },
        },
      },
      animation: {
        bounceUp: "bounceUp 850ms infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
