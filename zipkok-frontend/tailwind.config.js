
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        'noto-kr': ['Noto Sans KR', 'sans-serif'],
        'noto-jp': ['Noto Sans JP', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
