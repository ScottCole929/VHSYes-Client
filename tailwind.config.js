/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'vhs': ['Lester Bold', 'sans-serif']
      },
      backgroundImage: {
        'background-pattern': "url('src/assets/vhscollection.jpeg')",
      },
      backgroundRepeat: {
        'repeat': 'repeat',
      }
    },
  },
  plugins: [],
}