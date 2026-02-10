/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',
  ],
  safelist: ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-cyan-500', 'bg-yellow-500'],
  // tailwind.config.js
  theme: {
    extend: {
      fontFamily: {
        dm: ['"DM Sans"', 'Arial', 'sans-serif'],
        inter: ['Inter', 'Arial', 'sans-serif'],
        outfit: ['Outfit', 'Arial', 'sans-serif'],
        arial: ['Arial', 'sans-serif'],
      },
    },
  },

  // theme: {
  //   extend: {
  //     screens: {
  //       'xxl': '1500px',
  //     },
  //     fontFamily: {
  //       sans: ['Outfit', 'Inter', 'Arial', 'DM Sans', 'sans-serif'],
  //     },
  //   },
  // },
  plugins: [],
};
