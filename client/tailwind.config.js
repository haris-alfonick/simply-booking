/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',
    // other paths
  ],
  safelist: [
    // Assuming `item.color` could be a list of colors
    'bg-red-500', 'bg-blue-500', 'bg-green-500',
    'bg-cyan-500', 'bg-green-500', 'bg-yellow-500', // etc.
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};



// module.exports = {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }


// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

