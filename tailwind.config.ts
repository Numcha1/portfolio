import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "#040B1D",
        surface: "#0C1A36",
        surfaceAlt: "#101F42",
        primary: "#2E6DFF",
        primarySoft: "#7FA9FF",
        border: "#1B325E",
        muted: "#A9B9DC"
      },
      boxShadow: {
        card: "0 20px 55px -25px rgba(16, 43, 102, 0.65)",
        soft: "0 10px 30px -15px rgba(14, 34, 82, 0.45)"
      },
      fontFamily: {
        heading: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-plus-jakarta)", "sans-serif"]
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" }
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "0.95" }
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
        pulseGlow: "pulseGlow 3s ease-in-out infinite",
        slideUp: "slideUp 0.6s ease-out both"
      }
    }
  },
  plugins: []
};

export default config;
