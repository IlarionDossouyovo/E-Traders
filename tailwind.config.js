/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Primary Brand Colors - ELECTRON Gold/Yellow
        electron: {
          gold: "#FFD700",
          goldLight: "#FFE44D",
          goldDark: "#C9A227",
          yellow: "#FFC107",
        },
        // Secondary - Premium Deep Blue
        premium: {
          900: "#0A1628",
          800: "#0F2137",
          700: "#152D4A",
          600: "#1C3958",
          500: "#234567",
        },
        // Accent - Electric Cyan
        accent: {
          cyan: "#00D4FF",
          cyanLight: "#5CE1FF",
          cyanDark: "#00A8CC",
          green: "#00FF88",
          red: "#FF4757",
        },
        // Background Dark Mode
        dark: {
          bg: "#080C14",
          card: "#0D1420",
          border: "#1A2332",
          hover: "#141C28",
        },
        // Light mode
        light: {
          bg: "#F8FAFC",
          card: "#FFFFFF",
          border: "#E2E8F0",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      animation: {
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "slide-up": "slide-up 0.5s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { opacity: "1", boxShadow: "0 0 20px rgba(255, 215, 0, 0.3)" },
          "50%": { opacity: "0.8", boxShadow: "0 0 40px rgba(255, 215, 0, 0.6)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      boxShadow: {
        electron: "0 0 30px rgba(255, 215, 0, 0.3)",
        "electron-lg": "0 0 60px rgba(255, 215, 0, 0.4)",
        glow: "0 0 30px rgba(0, 212, 255, 0.5)",
      },
    },
  },
  plugins: [],
};