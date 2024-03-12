/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#2563eb",
          secondary: "#4f46e5",
          accent: "#7e22ce",
          neutral: "#4b5563",
          "base-100": "#374151",
          info: "#38bdf8",
          success: "#bef264",
          warning: "#fdba74",
          error: "#f87171",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
