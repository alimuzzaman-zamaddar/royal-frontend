import type { Config } from "tailwindcss";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cinzel: ["Cinzel", "serif"],
        cinzelDec: ["Cinzel Decorative", "serif"],
        garamond: ["EB Garamond", "serif"],
        lora: ["Lora", "serif"],
      },
      keyframes: {
        fadeUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        shimmer: {
          "0%": {
            backgroundPosition: "-200% center",
          },
          "100%": {
            backgroundPosition: "200% center",
          },
        },
        bgPulse: {
          "0%, 100%": {
            opacity: "0.6",
          },
          "50%": {
            opacity: "1",
          },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.9s ease forwards",
        shimmer: "shimmer 4s linear infinite",
        bgPulse: "bgPulse 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;