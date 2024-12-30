/** @type {import('tailwindcss').Config} */
import baseConfig from '@jarvis-helpdesk-plugins/shared/tailwind.config';

export default {
  ...baseConfig,
  content: ['./src/**/*.{html,js,ts,jsx,tsx}', '../../packages/shared/src/**/*.{html,js,ts,jsx,tsx}'],
};
