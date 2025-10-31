/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // Use direct color values instead of CSS variables
      colors: {
        primary: {
          DEFAULT: '#0b5ed7',
          hover: '#094bb5',
        },
        secondary: {
          DEFAULT: '#f8f9fa', 
          hover: '#e9ecef',
        },
        surface: '#ffffff',
        text: {
          primary: '#212529',
          secondary: '#495057',
        },
        border: {
          neutral: '#dee2e6',
        },
        status: {
          success: '#198754',
          error: '#dc3545',
          danger: {
            DEFAULT: '#c82333',
            hover: '#a71d2a',
          },
        },
        disabled: '#ced4da',
        focus: '#0b5ed7',
      },
      // Use direct font family
      fontFamily: {
        ubuntu: ['Ubuntu', 'sans-serif'],
      },
      // Use direct spacing values
      spacing: {
        'xs': '0.2rem',
        'sm': '0.4rem',
        'md': '0.85rem', 
        'lg': '1.25rem',
        'xl': '1.75rem',
      },
      // Use direct border radius
      borderRadius: {
        'sm': '0.2rem',
        'md': '0.4rem',
        'lg': '0.6rem',
      },
      // Use direct box shadow
      boxShadow: {
        'sm': '0 1px 1.5px rgba(0, 0, 0, 0.04)',
        'md': '0 2px 5px rgba(0, 0, 0, 0.08)',
        'lg': '0 3px 10px rgba(0, 0, 0, 0.12)',
      },
      // Use direct font sizes
      fontSize: {
        'heading-lg': '1.75rem',
        'heading-md': '1.25rem',
        'body': '0.95rem',
        'caption': '0.8125rem',
      },
      animation: {
        'fadeIn': 'fadeIn 0.5s ease forwards',
      },
      keyframes: {
        fadeIn: {
          from: { 
            opacity: '0',
            transform: 'translateY(15px)'
          },
          to: { 
            opacity: '1',
            transform: 'translateY(0)'
          },
        }
      },
    },
  },
  plugins: [],
}