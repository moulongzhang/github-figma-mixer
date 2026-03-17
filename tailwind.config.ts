import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Background tokens
        "bg-canvas": "#0d1117",
        "bg-subtle": "#161b22",
        "bg-card": "#1c2129",
        // Border tokens
        "border-default": "#30363d",
        "border-subtle": "#21262d",
        // Text tokens
        "text-primary": "#e6edf3",
        "text-secondary": "#8b949e",
        "text-muted": "#6e7681",
        // Accent tokens
        "accent-blue": "#58a6ff",
        "accent-purple": "#bc8cff",
        "accent-pink": "#f778ba",
        "accent-green": "#3fb950",
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "'Noto Sans JP'",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      maxWidth: {
        content: "960px",
      },
    },
  },
  plugins: [],
};
export default config;
