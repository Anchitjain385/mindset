
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))"
        },
        mindnest: {
          bg: {
            start: "#EADCF8", // Lavender
            mid: "#D8F3DC",   // Mint Green
            end: "#C7DFFD"    // Light Blue
          },
          accent: {
            peach: "#F9E5D9",
            green: "#B3E5C5",
            yellow: "#F9E7A1",
            purple: "#6D28D9", // Deep Purple accent
            blue: "#D6F0FF",
            lavender: "#E5DEFF", // New lavender accent
            mint: "#D1F5E3",    // New mint accent
            coral: "#FFD6CC",   // New coral accent
          },
          text: "#2E2E3A",
          card: "rgba(255, 255, 255, 0.5)"
        }
      },
      fontFamily: {
        poppins: ["'Poppins'", "sans-serif"],
        manrope: ["'Manrope'", "sans-serif"],
        quicksand: ["'Quicksand'", "sans-serif"],
        nunito: ["'Nunito'", "sans-serif"],
        playfair: ["'Playfair Display'", "serif"] // New font for headings
      },
      backgroundImage: {
        'gradient-mindnest': 'linear-gradient(135deg, var(--tw-gradient-from) 0%, var(--tw-gradient-via) 50%, var(--tw-gradient-to) 100%)',
        'gradient-soft': 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 100%)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.06), inset 0 1px 1px rgba(255, 255, 255, 0.5)',
        'soft': '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)',
        'inner-glow': 'inset 0 1px 3px rgba(255, 255, 255, 0.4)'
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" }
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" }
        },
        "breathe": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" }
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" }
        },
        "bounce-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" }
        },
        "ripple": {
          "0%": { transform: "scale(0)", opacity: "1" },
          "100%": { transform: "scale(4)", opacity: "0" }
        },
        "float-particle": {
          "0%, 100%": { transform: "translate(0px, 0px) rotate(0deg)" },
          "25%": { transform: "translate(10px, -10px) rotate(5deg)" },
          "50%": { transform: "translate(0px, -20px) rotate(0deg)" },
          "75%": { transform: "translate(-10px, -10px) rotate(-5deg)" }
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "gentle-rotate": {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" }
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 6s ease-in-out infinite",
        "breathe": "breathe 4s ease-in-out infinite",
        "pulse-slow": "pulse-slow 4s ease-in-out infinite",
        "bounce-slow": "bounce-slow 3s ease-in-out infinite",
        "ripple": "ripple 1s ease-out forwards",
        "float-particle": "float-particle 10s ease-in-out infinite",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "gentle-rotate": "gentle-rotate 6s ease-in-out infinite",
        "shimmer": "shimmer 3s linear infinite"
      },
      backdropBlur: {
        xs: "2px"
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
