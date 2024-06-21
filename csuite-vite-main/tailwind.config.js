/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "light-gray": "var(--bg-light-gray)",
        "card-bg-blue": "var(--card-bg-blue)",
      },
      boxShadow: {
        custom: "1px 1px 20px 15px #d4d9e1",
      },
    },
    screens: {
      "tablet-w": "540px",
      "laptop-w": "1024px",
      "desktop-w": "1280px",
      "tablet-h": { raw: "(min-height: 600px)" },
      "laptop-h": { raw: "(min-height: 768px)" },
      "desktop-h": { raw: "(min-height: 800px)" },
    },
  },
  plugins: [],
};
