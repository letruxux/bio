import type { Config } from "tailwindcss";
import ta from "tailwindcss-animate";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "blue-bg": "rgb(35, 32, 80)",
        "blue-hl": "rgb(46, 43, 100)",
      },
      keyframes: {
        waveform: {
          "0%, 100%": { transform: "scaleY(1)" },
          "50%": { transform: "scaleY(0.5)" },
        },
      },
    },
  },
  plugins: [ta],
} satisfies Config;
