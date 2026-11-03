/** @type {import('tailwindcss').Config} */
const withAlpha = (variable) =>
  `color-mix(in oklch, var(${variable}) calc(<alpha-value> * 100%), transparent)`

export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "'Geist Variable'", "sans-serif"],
        heading: ["var(--font-heading)", "'Geist Variable'", "sans-serif"],
      },
      colors: {
        background: withAlpha("--background"),
        foreground: withAlpha("--foreground"),
        card: {
          DEFAULT: withAlpha("--card"),
          foreground: withAlpha("--card-foreground"),
        },
        popover: {
          DEFAULT: withAlpha("--popover"),
          foreground: withAlpha("--popover-foreground"),
        },
        primary: {
          DEFAULT: withAlpha("--primary"),
          foreground: withAlpha("--primary-foreground"),
        },
        secondary: {
          DEFAULT: withAlpha("--secondary"),
          foreground: withAlpha("--secondary-foreground"),
        },
        muted: {
          DEFAULT: withAlpha("--muted"),
          foreground: withAlpha("--muted-foreground"),
        },
        accent: {
          DEFAULT: withAlpha("--accent"),
          foreground: withAlpha("--accent-foreground"),
        },
        destructive: {
          DEFAULT: withAlpha("--destructive"),
        },
        border: withAlpha("--border"),
        input: withAlpha("--input"),
        ring: withAlpha("--ring"),
        sidebar: {
          DEFAULT: withAlpha("--sidebar"),
          foreground: withAlpha("--sidebar-foreground"),
          primary: withAlpha("--sidebar-primary"),
          "primary-foreground": withAlpha("--sidebar-primary-foreground"),
          accent: withAlpha("--sidebar-accent"),
          "accent-foreground": withAlpha("--sidebar-accent-foreground"),
          border: withAlpha("--sidebar-border"),
          ring: withAlpha("--sidebar-ring"),
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "4xl": "2rem",
      },
      ringWidth: {
        3: "3px",
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("data-open", ['&[data-state="open"]', '&[data-open]:not([data-open="false"])'])
      addVariant("data-closed", ['&[data-state="closed"]', '&[data-closed]:not([data-closed="false"])'])
      addVariant("data-active", ['&[data-state="active"]', '&[data-active]:not([data-active="false"])'])
      addVariant("data-popup-open", ['&[data-popup-open]:not([data-popup-open="false"])'])
    },
  ],
}
