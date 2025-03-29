import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#e0f2ff",
          200: "#bae3ff",
          300: "#7cc9ff",
          400: "#38b6ff",
          500: "#0096fb",
          600: "#0078d4",
          700: "#005ea8",
          800: "#004c8c",
          900: "#003a6c",
        },
        secondary: {
          100: "#f0e7ff",
          200: "#d8c5ff",
          300: "#b592ff",
          400: "#9b6dff",
          500: "#8849ff",
          600: "#7132db",
          700: "#5c28b3",
          800: "#471f8b",
          900: "#371968",
        },
        success: {
          100: "#e6fbf2",
          500: "#00c853",
          700: "#00a142",
        },
        error: {
          100: "#ffeded",
          500: "#ef5350",
          700: "#d32f2f",
        },
        warning: {
          100: "#fff8e6",
          500: "#ffa726",
          700: "#f57c00",
        },
        background: {
          card: "rgba(255, 255, 255, 0.1)",
          glass: "rgba(255, 255, 255, 0.15)",
          dark: "#121212",
          light: "#f5f5f5",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "glass-gradient": "linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05))",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.2)",
        "glass-sm": "0 4px 16px 0 rgba(31, 38, 135, 0.15)",
        "glass-lg": "0 12px 48px 0 rgba(31, 38, 135, 0.25)",
      },
      backdropBlur: {
        glass: "16px",
      },
    },
  },
  plugins: [],
};

export default config;