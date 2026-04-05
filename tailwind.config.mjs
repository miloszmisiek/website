/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        foreground: "#ffffff",
        muted: "#888888",
        border: "#1f1f1f",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        nav: ["VT323", "monospace"],
        "mono-system": [
          "ui-monospace",
          '"Cascadia Code"',
          '"Source Code Pro"',
          "monospace",
        ],
      },
    },
  },
  plugins: [],
};
