/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0D2A2E", // banknote ink, deep teal-green
        ink2: "#12383D",
        paper: "#EEF3F0", // cool off-white, not cream
        foil: "#E3B95B", // gold foil accent
        up: "#4FBF8B",
        down: "#E0674F",
      },
    },
  },
  plugins: [],
};
