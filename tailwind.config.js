/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // 회색 계열 (기존 유지)
        GRAY_LIGHT: "#f1f3f5",
        GRAY: "#adb5bd",
        GRAY_HEAVY: "#868e96",
        GRAY_EXTRAHEAVY: "#495057",
        BLACK: "#212529",

        // 포인트 컬러: 하늘~파랑 계열
        PRIMARY_LIGHT: "#d0ebff",   // 연한 하늘색
        PRIMARY: "#339af0",         // 메인 파랑 
        PRIMARY_HEAVY: "#1c7ed6",   // 진한 파랑

        // 상단 그라데이션
        GRADIENT_FROM: "#e3f2fd",   // 밝은 하늘색 (연한 시작)
        GRADIENT_TO: "#1e3a8a",     // 남색 느낌 (짙은 종료)
      },
      fontFamily: {
        fredoka: ['Fredoka', 'sans-serif'],  
      },
    },
  },
  plugins: [],
};
