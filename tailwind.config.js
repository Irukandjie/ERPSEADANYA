/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // INI DIA KUNCINYA BIAR TOMBOL TOGGLE JALAN!
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // INI YANG BIKIN TAILWIND BACA FILE LU
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}