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
        background: {
          DEFAULT: "#0d1117",
          subtle: "#161b22",
          card: "#1c2129",
        },
        border: {
          DEFAULT: "#30363d",
          subtle: "#21262d",
        },
        text: {
          primary: "#e6edf3",
          secondary: "#8b949e",
          muted: "#6e7681",
        },
        accent: {
          blue: "#58a6ff",
          purple: "#bc8cff",
          pink: "#f778ba",
          green: "#3fb950",
        },
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #58a6ff, #bc8cff)",
        "gradient-secondary": "linear-gradient(135deg, #f778ba, #bc8cff)",
        "gradient-tertiary": "linear-gradient(135deg, #58a6ff, #3fb950)",
      },
    },
  },
  plugins: [],
};

export default config;
