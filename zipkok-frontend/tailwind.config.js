
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",        // ✅ layout.jsx, page.jsx
    "./styles/**/*.{css}",               // ✅ 혹시 CSS 안에 클래스가 있을 때
    "./components/**/*.{js,ts,jsx,tsx}"  // ✅ 미래 대비
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
