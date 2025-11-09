/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        family: {
          EA: "#1D7ED6",
          EC: "#2FA36B",
          IA: "#E67E22",
          IC: "#6E56CF",
        },
        surface: {
          0: "#ffffff",
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },
        primary: "#6E56CF",
        "primary-hover": "#5B45B5",
        "body-strong": "#2B2B2B",
        "body-muted": "#5A5A5A",
        "body-subtle": "#777777",
      },
      borderRadius: {
        "radius-2xl": "1.5rem",
      },
      fontSize: {
        display: ["3.5rem", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        h1: ["2.5rem", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
        h2: ["1.875rem", { lineHeight: "1.25", letterSpacing: "-0.005em" }],
        body: ["1rem", { lineHeight: "1.7" }],
        small: ["0.875rem", { lineHeight: "1.6" }],
      },
      transitionDuration: {
        600: "600ms",
      },
    },
  },
  plugins: [],
};
