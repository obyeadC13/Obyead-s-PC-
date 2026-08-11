import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"Fira Code"', 'monospace'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      colors: {
        term: {
          bg: "#0a0a0a",
          green: "#00ff41",
          dim: "#008f26",
          glow: "#00ff4133",
        },
        desktop: {
          bg: "#1a1a2e",
          accent: "#e94560",
          window: "#16213e",
          taskbar: "#0f3460",
          text: "#eaeaea",
          muted: "#8892a4",
        },
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        boot: {
          "0%": { opacity: "0" },
          "20%": { opacity: "1" },
          "100%": { opacity: "1" },
        },
        progress: {
          from: { width: "0%" },
          to: { width: "100%" },
        },
      },
      animation: {
        blink: "blink 1s step-end infinite",
        fadeIn: "fadeIn 0.5s ease-out forwards",
        slideUp: "slideUp 0.4s ease-out forwards",
        scaleIn: "scaleIn 0.25s ease-out forwards",
        boot: "boot 0.3s ease-out forwards",
        progress: "progress 2s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;