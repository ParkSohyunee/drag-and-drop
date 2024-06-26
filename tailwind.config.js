/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/components/**/*.{js,jsx}", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      boxShadow: {
        item: `rgba(0, 0, 0, 0.24) 0px 3px 8px`,
      },
    },
  },
  plugins: [],
};
