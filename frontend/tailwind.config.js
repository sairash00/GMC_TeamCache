/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens:{
        "9": "900px",
        "950": "950px",
        'xs': '500px',
       'xsm': '420px'
      },
      colors: {
        'primary': '#111844',
        'secondary': '#4B5694',
        'accent': '#7288AE',
        'credits': '#C98A2E',
        'success': '#4A8F63',
        'error': '#B94A48',
        'info': '#5A7BC2',
        'background': '#EAE0CF',
        'surface': '#F2EBDF',
        'card': '#FBF8F3',
        'text-primary': '#111844',
        'text-secondary': '#4B5694',
        'border': '#E8DCC0',
        'divider': '#E8DCC0',
        'shadow-hover': 'rgba(0, 0, 0, 0.1)',
        'accent-hover': '#5A7BC2',
      },
      fontFamily: {
        display: ['Manrope', 'sans-serif'],
        body: ['Manrope', 'sans-serif'],
        mono: ['Source Code Pro', 'monospace'],
      },
      borderRadius: {
        'sm': '0.375rem',
        'md': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '0' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}