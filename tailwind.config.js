/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1FAF8B", // Teal
        secondary: "#1E3A8A", // Deep Blue
        accent: "#D1FAE5", // Pale Mint
        neutral: "#FFFFFF",
        "gray-bg": "#F3F4F6", // Background Gray
        "gray-text": "#374151", // Text Gray
        "gray-light": "#9CA3AF",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
};
