/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
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
      
      fontFamily: {
        ubuntu: ['Ubuntu', 'sans-serif'],
      },
      
      spacing: {
        'xs': '0.2rem',
        'sm': '0.4rem',
        'md': '0.85rem', 
        'lg': '1.25rem',
        'xl': '1.75rem',
      },
      
      borderRadius: {
        'sm': '0.2rem',
        'md': '0.4rem',
        'lg': '0.6rem',
      },
      
      boxShadow: {
        'sm': '0 1px 1.5px rgba(0, 0, 0, 0.04)',
        'md': '0 2px 5px rgba(0, 0, 0, 0.08)',
        'lg': '0 3px 10px rgba(0, 0, 0, 0.12)',
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
  
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {

        '.accordion-container': {
        '@apply space-y-4': {},
      },
      
      '.accordion-item': {
        '@apply border border-gray-300 rounded-md overflow-hidden bg-white transition-all duration-200 hover:shadow-sm': {},
      },
      
      '.accordion-header': {
        '@apply w-full p-4 text-left flex items-center justify-between bg-white hover:bg-gray-50 transition-colors duration-200': {},
      },
      
      '.accordion-content-container': {
        '@apply transition-all duration-300 ease-in-out overflow-hidden': {},
      },
      
      '.accordion-content-expanded': {
        '@apply max-h-96 opacity-100 border-t border-gray-200': {},
      },
      
      '.accordion-content-collapsed': {
        '@apply max-h-0 opacity-0': {},
      },
      
      '.accordion-content-inner': {
        '@apply p-4 bg-gray-50': {},
      },
      
      '.accordion-chevron': {
        '@apply flex-shrink-0 ml-4 transform transition-transform duration-200': {},
      },
      
      '.accordion-chevron-expanded': {
        '@apply rotate-180': {},
      },
      
      '.accordion-chevron-collapsed': {
        '@apply rotate-0': {},
      },
      // Add to your plugins in tailwind.config.js
      '.badge': {
        '@apply inline-flex items-center px-3 py-1 rounded-full text-xs font-medium': {},
      },
      '.badge-purple': {
        '@apply bg-purple-100 text-purple-800': {},
      },
      '.badge-success': {
        '@apply bg-green-100 text-green-800': {},
      },
      '.badge-warning': {
        '@apply bg-yellow-100 text-yellow-800': {},
      },
      '.badge-error': {
        '@apply bg-red-100 text-red-800': {},
      },
      '.badge-info': {
        '@apply bg-blue-100 text-blue-800': {},
      },
      '.badge-gray': {
        '@apply bg-gray-100 text-gray-800': {},
      },
          '.input-base': {
          '@apply block w-full max-w-[25rem] px-md py-sm border border-gray-300 rounded-full font-ubuntu text-body bg-surface text-text-primary transition-all duration-200 ease-in-out': {},
        },

        '.input-hover': {
          '@apply hover:border-primary': {},
        },

        '.input-focus': {
          '@apply focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20': {},
        },

        '.input-disabled': {
          '@apply disabled:bg-disabled disabled:cursor-not-allowed disabled:text-text-secondary disabled:border-gray-300': {},
        },

        '.textarea-base': {
          '@apply block w-full max-w-[25rem] px-md py-sm border border-gray-300 rounded-full font-ubuntu text-body bg-surface text-text-primary transition-all duration-200 ease-in-out resize-vertical': {},
        },

        '.textarea-hover': {
          '@apply hover:border-primary': {},
        },

        '.textarea-focus': {
          '@apply focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20': {},
        },

        '.textarea-disabled': {
          '@apply disabled:bg-disabled disabled:cursor-not-allowed disabled:text-text-secondary disabled:border-gray-300': {},
        },
        
        '.btn-base': {
          '@apply block w-full max-w-[25rem] min-w-[8rem] px-lg py-md border border-border-neutral rounded-md font-ubuntu font-medium text-body text-center cursor-pointer shadow-sm transition-all duration-200 ease-in-out box-border': {},
        },

        '.btn-hover': {
          '@apply hover:shadow-md hover:-translate-y-0.5': {},
        },

        '.btn-focus': {
          '@apply focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2': {},
        },

        '.btn-disabled': {
          '@apply disabled:bg-disabled disabled:text-gray-500 disabled:border-gray-400 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none': {},
        },
        
        '.label-base': {
          '@apply flex flex-col gap-xs font-ubuntu text-body text-text-primary w-full max-w-full box-border': {},
        },
        
        '.dropdown-base': {
          '@apply absolute top-[calc(100%+0.2rem)] right-0 hidden flex-col bg-surface border border-border-neutral rounded-md shadow-md p-md min-w-[200px] z-20 font-ubuntu text-body transition-all duration-200': {},
        },

        '.dropdown-responsive': {
          '@apply sm:right-md sm:left-md sm:min-w-auto sm:w-auto': {},
        },
        
        '.progress-container': {
          '@apply flex flex-col gap-2 w-full max-w-[25rem] sm:max-w-full': {},
        },

        '.progress-track': {
          '@apply w-full h-3 min-h-5 bg-gray-200 rounded-md shadow-sm overflow-hidden': {},
        },

        '.progress-fill': {
          '@apply h-full bg-blue-600 rounded-md transition-all duration-300 ease-in-out': {},
        },
        
        '.card-base': {
          '@apply bg-white text-gray-800 rounded-lg shadow-sm border border-gray-200 p-6 transition-all duration-200 ease-in-out box-border': {},
        },

        '.card-hover': {
          '@apply hover:shadow-lg hover:-translate-y-0.5': {},
        },
        
        '.flex-col-center': {
          '@apply flex flex-col items-center justify-center': {},
        },

        '.flex-row-center': {
          '@apply flex flex-row items-center justify-center': {},
        },
        
        '.responsive-padding': {
          '@apply md:px-md md:py-sm sm:px-sm sm:py-xs': {},
        },

        '.responsive-text': {
          '@apply md:text-[0.95rem] sm:text-[0.9rem]': {},
        },

        '.responsive-grid': {
          '@apply grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6': {},
        },
        
        '.form-layout': {
          '@apply space-y-8': {},
        },

        '.form-field-group': {
          '@apply space-y-6': {},
        },

        '.form-actions': {
          '@apply flex flex-col sm:flex-row gap-4 sm:gap-6 pt-6 border-t border-gray-200': {},
        },
        
        '.state-disabled': {
          '@apply opacity-60 cursor-not-allowed': {},
        },

        '.state-loading': {
          '@apply animate-pulse pointer-events-none': {},
        },

        '.hover-lift': {
          '@apply hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200': {},
        },

        '.hover-glow': {
          '@apply hover:shadow-md hover:border-primary/50 transition-all duration-200': {},
        },
        
        '.alert-base': {
          '@apply rounded-md p-4 border flex': {},
        },

        '.alert-info': {
          '@apply bg-blue-50 border-blue-200 text-blue-800': {},
        },

        '.alert-success': {
          '@apply bg-green-50 border-green-200 text-green-800': {},
        },

        '.alert-warning': {
          '@apply bg-yellow-50 border-yellow-200 text-yellow-800': {},
        },

        '.alert-error': {
          '@apply bg-red-50 border-red-200 text-red-800': {},
        }
      }
      
      addUtilities(newUtilities)
    }
  ],
}