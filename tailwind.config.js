/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#fdba74", // orange-300
          DEFAULT: "#f97316", // orange-500
          dark: "#ea580c", // orange-600
        },
      },
      fontFamily: {
        serif: ['"Noto Serif SC"', "serif"],
        sans: ['"Noto Sans SC"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
