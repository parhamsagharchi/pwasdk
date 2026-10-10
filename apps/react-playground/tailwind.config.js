/** @type {import('tailwindcss').Config} */
/**
 * Design tokens for the react-playground showcase.
 * Source of truth → mapped to CSS variables in src/styles/theme.css
 * and consumed by base/hero/gallery/showcase/stages/demo-bridge.
 */
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
          /** Camera / video void */
          void: "#020408",
          /** Prompt / code panels */
          panel: "#04060a",
          /** Device shells, code bars */
          stage: "#0d121e",
          /** Soft slate fills (pills, icons) */
          slate: "#1e293b",
        },
        ink: {
          DEFAULT: "#f1f5f9",
          muted: "#94a3b8",
          dim: "#64748b",
          soft: "#cbd5e1",
          pure: "#ffffff",
          inverse: "#030712",
        },
        line: {
          subtle: "rgba(255, 255, 255, 0.07)",
          soft: "rgba(255, 255, 255, 0.04)",
          hover: "rgba(255, 255, 255, 0.18)",
          glow: "rgba(0, 242, 254, 0.22)",
          active: "#00f2fe",
        },
        cyan: {
          DEFAULT: "#00f2fe",
          soft: "#4facfe",
          glow: "rgba(0, 242, 254, 0.35)",
          mist: "rgba(0, 242, 254, 0.08)",
          wash: "rgba(0, 242, 254, 0.15)",
          rim: "rgba(0, 242, 254, 0.25)",
          edge: "rgba(0, 242, 254, 0.3)",
          strong: "rgba(0, 242, 254, 0.4)",
        },
        emerald: {
          DEFAULT: "#05f19c",
          glow: "rgba(5, 241, 156, 0.35)",
          mist: "rgba(5, 241, 156, 0.1)",
          rim: "rgba(5, 241, 156, 0.3)",
        },
        violet: {
          DEFAULT: "#8b5cf6",
          glow: "rgba(139, 92, 246, 0.3)",
          mist: "rgba(139, 92, 246, 0.08)",
          wash: "rgba(139, 92, 246, 0.2)",
        },
        coral: {
          DEFAULT: "#ff4757",
          mist: "rgba(255, 71, 87, 0.1)",
          glow: "rgba(255, 71, 87, 0.25)",
          hot: "rgba(255, 71, 87, 0.6)",
        },
        amber: {
          DEFAULT: "#ffc107",
          mist: "rgba(255, 193, 7, 0.1)",
          rim: "rgba(255, 193, 7, 0.45)",
        },
      },
      fontFamily: {
        sans: [
          "Geist Variable",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        display: [
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
      spacing: {
        grid: "40px",
        nav: "88px",
      },
      screens: {
        xs: "480px",
        sm: "640px",
        md: "700px",
        lg: "960px",
      },
      zIndex: {
        grid: "0",
        raise: "1",
        stage: "10",
        nav: "100",
        overlay: "200",
      },
      boxShadow: {
        glow: "0 0 14px rgba(0, 242, 254, 0.35)",
        "glow-lg": "0 8px 30px rgba(0, 242, 254, 0.5)",
        card: "0 10px 25px -10px rgba(0, 0, 0, 0.5)",
        lift: "0 20px 40px -15px rgba(0, 0, 0, 0.8)",
        media:
          "0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 35px rgba(0, 242, 254, 0.15)",
        emerald: "0 0 14px rgba(5, 241, 156, 0.35)",
        coral: "0 0 16px rgba(255, 71, 87, 0.25)",
      },
      transitionTimingFunction: {
        bounce: "cubic-bezier(0.34, 1.4, 0.64, 1)",
        smooth: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
