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
        "bg-canvas": "#ffffff",
        "bg-subtle": "#f9fafb",
        "bg-card": "#ffffff",
        // Border tokens
        "border-default": "#e5e7eb",
        "border-subtle": "#e5e7eb",
        // Text tokens
        "text-primary": "#000000",
        "text-secondary": "#57606a",
        "text-muted": "#57606a",
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
      // Primer Web standard font sizes
      fontSize: {
        "primer-xs": "10px",
        "primer-sm": "12px",
        "primer-md": "14px",
        "primer-base": "16px",
        "primer-lg": "18px",
        "primer-xl": "20px",
        "primer-2xl": "24px",
        "primer-3xl": "32px",
        "primer-4xl": "40px",
        "primer-5xl": "48px",
      },
      // Primer Web standard font weights
      fontWeight: {
        "primer-normal": "400",
        "primer-medium": "500",
        "primer-semibold": "600",
      },
      maxWidth: {
        content: "960px",
      },
    },
  },
  plugins: [],
};
export default config;
