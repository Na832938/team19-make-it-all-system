/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,mdx}",
    "./src/app/**/*.{js,jsx,ts,tsx,mdx}",
  ],
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-colour)",
        primaryHover: "var(--primary-hover)",
        secondary: "var(--secondary-colour)",
        secondaryHover: "var(--secondary-hover)",
        surface: "var(--surface-colour)",
        textPrimary: "var(--text-primary)",
        textSecondary: "var(--text-secondary)",
        borderNeutral: "var(--border-neutral)",
        success: "var(--success-colour)",
        error: "var(--error-colour)",
        danger: "var(--danger-colour)",
        dangerHover: "var(--danger-hover)",
        focus: "var(--focus-colour)",
        disabled: "var(--disabled-colour)",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
      spacing: {
        xs: "var(--space-xs)",
        sm: "var(--space-sm)",
        md: "var(--space-md)",
        lg: "var(--space-lg)",
        xl: "var(--space-xl)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
      },
      animation: { fadeIn: "fadeIn 0.5s ease forwards" },
      keyframes: {
        fadeIn: {
          from: { opacity: "0", transform: "translateY(15px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
