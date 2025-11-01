/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0b5ed7',
        'primary-hover': '#094bb5',
        'primary-light': '#dbeafe',
        secondary: '#f8f9fa',
        'secondary-hover': '#e9ecef',
        surface: '#ffffff',
        'text-primary': '#212529',
        'text-secondary': '#495057',
        'border-neutral': '#dee2e6',
        'border-focus': '#0b5ed7',
        'status-success': '#198754',
        'status-error': '#dc3545',
        'status-danger': '#c82333',
        'status-danger-hover': '#a71d2a',
        disabled: '#ced4da',
      },
      spacing: {
        'xs': '0.2rem',
        'sm': '0.4rem',
        'md': '0.85rem',
        'lg': '1.25rem',
        'xl': '1.75rem',
      },
      borderRadius: {
        'sm': '0.3rem',
        'md': '0.5rem',
        'lg': '0.75rem',
      },
      fontFamily: {
        ubuntu: ['Ubuntu', 'sans-serif'],
      },
    },
  },
  plugins: [],
}