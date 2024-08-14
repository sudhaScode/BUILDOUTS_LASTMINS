/** @type {import('tailwindcss').Config} */
export default  {
    content: [
      "./index.html",
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {},
      colors:{
        primary: 'oklch(40% 0.23 2)'
      }
    },
    plugins: [],
  };
  