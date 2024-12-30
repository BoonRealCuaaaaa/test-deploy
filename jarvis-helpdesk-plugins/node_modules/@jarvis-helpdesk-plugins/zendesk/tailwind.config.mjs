/** @type {import('tailwindcss').Config} */

export default {
  presets: [require('@jarvis-helpdesk-plugins/shared/tailwind.config')],
  content: ['./src/**/*.{html,js,ts,jsx,tsx}', '../../packages/shared/src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        black: '#2F3941',
      },
    },
  },
};
