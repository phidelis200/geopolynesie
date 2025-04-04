// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    // Define custom color values
    colors: {
      // Core system colors
      border: "var(--color-border)",
      input: "var(--color-input)",
      ring: "var(--color-ring)",
      background: "var(--color-background)",
      foreground: "var(--color-foreground)",
      primary: {
        DEFAULT: "var(--color-primary)",
        foreground: "var(--color-primary-foreground)",
      },
      secondary: {
        DEFAULT: "var(--color-secondary)",
        foreground: "var(--color-secondary-foreground)",
      },
      destructive: {
        DEFAULT: "var(--color-destructive)",
        foreground: "var(--color-destructive-foreground)",
      },
      muted: {
        DEFAULT: "var(--color-muted)",
        foreground: "var(--color-muted-foreground)",
      },
      accent: {
        DEFAULT: "var(--color-accent)",
        foreground: "var(--color-accent-foreground)",
      },
      popover: {
        DEFAULT: "var(--color-popover)",
        foreground: "var(--color-popover-foreground)",
      },
      card: {
        DEFAULT: "var(--color-card)",
        foreground: "var(--color-card-foreground)",
      },
      sidebar: {
        DEFAULT: "var(--color-sidebar)",
        foreground: "var(--color-sidebar-foreground)",
        primary: "var(--color-sidebar-primary)",
        "primary-foreground": "var(--color-sidebar-primary-foreground)",
        accent: "var(--color-sidebar-accent)",
        "accent-foreground": "var(--color-sidebar-accent-foreground)",
        border: "var(--color-sidebar-border)",
        ring: "var(--color-sidebar-ring)",
      },
      // Custom ocean colors defined with CSS variables
      ocean: {
        50: "var(--color-ocean-50)",
        100: "var(--color-ocean-100)",
        200: "var(--color-ocean-200)",
        300: "var(--color-ocean-300)",
        400: "var(--color-ocean-400)",
        500: "var(--color-ocean-500)",
        600: "var(--color-ocean-600)",
        700: "var(--color-ocean-700)",
        800: "var(--color-ocean-800)",
        900: "var(--color-ocean-900)",
      },
      // Custom earth colors defined with CSS variables
      earth: {
        50: "var(--color-earth-50)",
        100: "var(--color-earth-100)",
        200: "var(--color-earth-200)",
        300: "var(--color-earth-300)",
        400: "var(--color-earth-400)",
        500: "var(--color-earth-500)",
        600: "var(--color-earth-600)",
        700: "var(--color-earth-700)",
        800: "var(--color-earth-800)",
        900: "var(--color-earth-900)",
      },
      // Add basic colors
      white: "white",
      black: "black",
      transparent: "transparent",
      current: "currentColor",
    },
    borderRadius: {
      lg: "var(--radius-lg)",
      md: "var(--radius-md)",
      sm: "var(--radius-sm)",
      xl: "var(--radius-xl)",
      full: "9999px",
      none: "0",
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        wave: {
          "0%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(-25%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        wave: "wave 15s linear infinite",
      },
      backgroundImage: {
        "wave-pattern":
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%230ea5e9' fill-opacity='0.1' d='M0,192L48,197.3C96,203,192,213,288,202.7C384,192,480,160,576,170.7C672,181,768,235,864,234.7C960,235,1056,181,1152,170.7C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E\")",
        "topo-pattern":
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%230ea5e9' fill-opacity='0.05'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
    },
  },
} satisfies Config;
