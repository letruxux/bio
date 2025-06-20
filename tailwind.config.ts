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
        "blue-bg": "rgb(10, 15, 35)",
        "blue-hl": "rgb(15, 25, 55)",
        "accent-primary": "rgb(20, 40, 80)",
        "accent-secondary": "rgb(30, 50, 100)",
        "surface-dark": "rgb(8, 12, 25)",
        "surface-light": "rgb(15, 25, 45)",
        "text-primary": "rgb(240, 240, 245)",
        "text-secondary": "rgb(200, 200, 210)",
        "border-subtle": "rgb(20, 35, 65)",

        "surface-deep": "rgb(5, 8, 20)", // ancora più scuro di surface-dark
        "surface-glow": "rgb(20, 30, 60)", // per sfumature leggere
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
