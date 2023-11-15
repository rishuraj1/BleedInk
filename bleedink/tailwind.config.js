/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Title: ["postTitle", "sans-serif"],
        Body: ["Kalam", "sans-serif"],
      },
      backgroundImage: {
        postbg: "url('/bleedink/src/assets/postBackground.jpg)",
      },
    },
  },
  plugins: [],
};
