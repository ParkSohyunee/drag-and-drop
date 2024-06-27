/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/components/**/*.{js,jsx}", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      boxShadow: {
        "item-drag": `rgba(0, 0, 0, 0.24) 0px 3px 8px`,
        item: `0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`,
      },
    },
  },
  plugins: [],
};
