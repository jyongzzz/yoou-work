/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {}, // [Check] v3는 이렇게 문자열 키를 씁니다.
    autoprefixer: {},
  },
};

export default config;