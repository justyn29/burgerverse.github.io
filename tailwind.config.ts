import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#080808",
        surface: "#111111",
        "surface-elevated": "#181818",
        text: "#F5F5F5",
        accent: "#FF9D00",
        "accent-secondary": "#FF5A00",
        highlight: "#FFD65A",
      },
      fontFamily: {
        display: ["var(--font-bebas)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      fontSize: {
        "hero": ["120px", { lineHeight: "1", letterSpacing: "-0.02em" }],
        "hero-mobile": ["64px", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-xl": ["72px", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-lg": ["48px", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        "display-md": ["36px", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "display-sm": ["28px", { lineHeight: "1.25", letterSpacing: "0" }],
        "heading-lg": ["24px", { lineHeight: "1.3", letterSpacing: "0" }],
        "heading-md": ["20px", { lineHeight: "1.35", letterSpacing: "0" }],
        "heading-sm": ["18px", { lineHeight: "1.4", letterSpacing: "0" }],
        "body-lg": ["18px", { lineHeight: "1.6", letterSpacing: "0" }],
        "body-md": ["16px", { lineHeight: "1.6", letterSpacing: "0" }],
        "body-sm": ["14px", { lineHeight: "1.5", letterSpacing: "0" }],
        "caption": ["12px", { lineHeight: "1.5", letterSpacing: "0.02em" }],
      },
      spacing: {
        "space-4xs": "4px",
        "space-3xs": "8px",
        "space-2xs": "12px",
        "space-xs": "16px",
        "space-sm": "24px",
        "space-md": "32px",
        "space-lg": "48px",
        "space-xl": "64px",
        "space-2xl": "96px",
        "space-3xl": "128px",
        "space-4xl": "192px",
      },
      borderRadius: {
        "radius-sm": "8px",
        "radius-md": "12px",
        "radius-lg": "16px",
        "radius-xl": "24px",
        "radius-2xl": "32px",
        "radius-full": "9999px",
      },
      boxShadow: {
        "shadow-sm": "0 2px 8px rgba(0, 0, 0, 0.3)",
        "shadow-md": "0 8px 24px rgba(0, 0, 0, 0.4)",
        "shadow-lg": "0 16px 48px rgba(0, 0, 0, 0.5)",
        "shadow-xl": "0 24px 64px rgba(0, 0, 0, 0.6)",
        "shadow-glow": "0 0 40px rgba(255, 157, 0, 0.3)",
        "shadow-glow-strong": "0 0 80px rgba(255, 157, 0, 0.5)",
      },
      transitionDuration: {
        "duration-fast": "150ms",
        "duration-normal": "300ms",
        "duration-slow": "500ms",
        "duration-slower": "800ms",
      },
      transitionTimingFunction: {
        "ease-out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "ease-out-circ": "cubic-bezier(0.08, 0.82, 0.17, 1)",
        "ease-spring": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-up": "slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-down": "slideDown 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "scale-in": "scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "rotate-slow": "rotateSlow 20s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(255, 157, 0, 0.2)" },
          "50%": { boxShadow: "0 0 60px rgba(255, 157, 0, 0.5)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(2deg)" },
        },
        rotateSlow: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;