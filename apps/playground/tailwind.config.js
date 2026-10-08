/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        obsidian: {
          deep: "#05070b",
          surface: "#0a0e17",
          card: "#0f1523",
          hover: "#141c2e",
          glass: "rgba(15, 21, 35, 0.75)",
        },
        ink: {
          DEFAULT: "#f1f5f9",
          muted: "#94a3b8",
          dim: "#64748b",
          inverse: "#030712",
        },
        line: {
          subtle: "rgba(255, 255, 255, 0.07)",
          glow: "rgba(0, 242, 254, 0.22)",
          active: "#00f2fe",
        },
        cyan: {
          DEFAULT: "#00f2fe",
          soft: "#4facfe",
          glow: "rgba(0, 242, 254, 0.35)",
        },
        emerald: {
          DEFAULT: "#05f19c",
          glow: "rgba(5, 241, 156, 0.35)",
        },
        violet: {
          DEFAULT: "#8b5cf6",
          glow: "rgba(139, 92, 246, 0.3)",
        },
        coral: "#ff4757",
      },
      fontFamily: {
        sans: [
          "Geist Variable",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "Geist Mono Variable",
          "ui-monospace",
          "monospace",
        ],
      },
      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "14px",
        xl: "20px",
        pill: "9999px",
      },
      maxWidth: {
        wrap: "1260px",
      },
      transitionTimingFunction: {
        bounce: "cubic-bezier(0.34, 1.4, 0.64, 1)",
        smooth: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
