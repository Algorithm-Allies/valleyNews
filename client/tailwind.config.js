/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "brown-100": "#F1EBE4",
        "brown-200": "#E5D9D1",
        "brown-300": "#786759",
        "custom-orange": "#E48F45",
        "custom-gray": "#C4C4C4",
      },
    },
  },
  plugins: [],
};
