/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "button1-gradient": "linear-gradient(to right, #304c5e 0%, #08293e 57%, #304c5e 100%)",
      }
    },
  },
  plugins: [],
}