/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "rgb(229 231 235)", // gray-200
        background: "rgb(255 255 255)", // white
        foreground: "rgb(17 24 39)", // gray-900
        muted: "rgb(243 244 246)", // gray-100
        "muted-foreground": "rgb(107 114 128)", // gray-500
        primary: "rgb(37 99 235)", // blue-600
        "primary-foreground": "rgb(255 255 255)", // white
        "brand-blue": "#1895d5", // Custom brand blue color
      },
    },
  },
  plugins: [],
};