/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F0F8FF',
          100: '#E0EFFE',
          200: '#B9E0FE',
          300: '#7CC7FD',
          400: '#36ACFA',
          500: '#0C91EB',
          600: '#0078D4',
          700: '#005597',
          800: '#004578',
          900: '#00325A',
          950: '#00213B',
        },
        danger: {
          DEFAULT: '#F8285A',
          hover: '#D81A48',
        },
        background: 'white',
        border: {
          separator: '#F1F1F4',
        },
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(273deg, #0078D4 0%, #9692FF 94.81%)',
        'primary-gradient-hover': 'linear-gradient(281deg, #106EBE 0%, #7974FF 94.81%)',
      },
      boxShadow: {
        'custom-sm': '0px 3px 25px -3px rgba(0, 0, 0, 0.10), 0px 0px 6px -2px rgba(0, 0, 0, 0.07)',
        'custom-md': '0px 3px 20px -3px rgba(0, 0, 0, 0.15), 0px 0px 6px -2px rgba(0, 0, 0, 0.08)',
        'custom-xs-blue': '0px 1px 3px 0px rgba(0, 120, 212, 0.10), 0px 1px 2px 0px rgba(12, 145, 235, 0.10)',
        'custom-sm-blue': '0px 3px 25px 0px rgba(0, 120, 212, 0.10), 0px 1px 6px 0px rgba(12, 145, 235, 0.10)',
      },
      keyframes: {
        // Radix
        slideUpAndFade: {
          from: { opacity: 0, transform: 'translateY(4px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        slideRightAndFade: {
          from: { opacity: 0, transform: 'translateX(-4px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        slideDownAndFade: {
          from: { opacity: 0, transform: 'translateY(-4px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        slideLeftAndFade: {
          from: { opacity: 0, transform: 'translateX(4px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        overlayShow: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        contentShow: {
          from: { opacity: '0', transform: 'translate(-50%, -48%) scale(0.96)' },
          to: { opacity: '1', transform: 'translate(-50%, -50%) scale(1)' },
        },
        // Custom
      },
      animation: {
        // Radix
        slideUpAndFade: 'slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideRightAndFade: 'slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideDownAndFade: 'slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideLeftAndFade: 'slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        overlayShow: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        contentShow: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        // Custom
      },
      maxWidth: {
        content: '1140px',
      },
      gridTemplateColumns: {
        'horizontal-input': '180px 1fr',
      },
    },
  },
  plugins: [
    ({ addBase }) => {
      addBase({});
    },
  ],
};
