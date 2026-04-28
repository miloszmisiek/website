/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["selector", '[data-theme="dark"]'],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    screens: {
      xs: "430px",
      sm: "640px",
      md: "768px",
      md2: "820px",
      mlg: "960px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      short: { raw: "(max-height: 800px) and (min-width: 768px)" },
      heroShort: { raw: "(max-height: 640px) and (min-width: 768px)" },
      heroShortAny: { raw: "(max-height: 800px)" },
    },
    extend: {
      fontSize: {
        nano: "0.55rem",    // ~8.8px
        micro: "0.625rem",  // 10px
        caption: "0.6875rem", // 11px
        label: "0.8125rem", // 13px
      },
      letterSpacing: {
        technical: "0.2em",
        display: "0.3em",
      },
      lineHeight: {
        "heading-xl": "1.05",
        heading: "1.1",
        "heading-tight": "1.15",
        "body-loose": "1.4",
      },
      zIndex: {
        header: "99999",
        menu: "99998",
        skip: "100000",
      },
      colors: {
        background: "rgb(var(--color-background) / <alpha-value>)",
        foreground: "rgb(var(--color-foreground) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
        border: "rgb(var(--color-border) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        "accent-fg": "rgb(var(--color-accent-fg) / <alpha-value>)",
        // Pre-baked rgba — no opacity modifier support
        line: "var(--color-line)",
        dim: "var(--color-dim)",
        "hover-bg": "var(--color-hover-bg)",
        // Raw RGB components — opacity modifier supported
        "card-bg": "rgb(var(--color-card-bg) / <alpha-value>)",
        "card-bg-hover": "rgb(var(--color-card-bg-hover) / <alpha-value>)",
        // Semantic status colors
        success: "var(--color-success)",
        info: "var(--color-info)",
        // Gradient tokens
        "gradient-from": "var(--gradient-text-from)",
        "gradient-to": "var(--gradient-text-to)",
        "gradient-via": "var(--gradient-hover-via)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Space Grotesk", "Inter", "sans-serif"],
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
