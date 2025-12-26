import type { Config } from "tailwindcss";

const config: Config = {
  // [Fix] 여기가 범인입니다!
  // 기존에는 pages, components, app 폴더만 보고 있었을 겁니다.
  // 아래처럼 './src/**/*.{...}' 하나로 통일하거나, 경로를 추가해야 합니다.
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/*.{js,ts,jsx,tsx,mdx}", // ★ 이 줄을 반드시 추가하세요! (mdx-components.tsx를 감지함)
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;