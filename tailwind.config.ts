import { createPreset } from "fumadocs-ui/tailwind-plugin";
import type { Config } from "tailwindcss";

const config: Config = {
  presets: [createPreset()],
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/fumadocs-ui/dist/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        cyber: ["Orbitron", "Space Grotesk", "sans-serif"],
        space: ["Space Grotesk", "sans-serif"],
        chakra: ["Chakra Petch", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        csc: {
          orange: "#ff7900",
          "orange-dark": "#d96500",
          "orange-glow": "#ff9533",
          dark: "#090a0f",
          "dark-subtle": "#12141d",
          card: "#161922",
          "card-hover": "#1f2330",
          border: "#282d3d",
          silver: "#cbd5e1",
        },
      },
      keyframes: {
        glow: {
          "0%, 100%": { opacity: "0.8", filter: "drop-shadow(0 0 15px rgba(255, 121, 0, 0.6))" },
          "50%": { opacity: "1", filter: "drop-shadow(0 0 25px rgba(255, 121, 0, 0.9))" },
        },
        pulseSlow: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.7" },
        },
      },
      animation: {
        glow: "glow 3s infinite ease-in-out",
        pulseSlow: "pulseSlow 4s infinite ease-in-out",
      },
    },
  },
  plugins: [],
};
export default config;
