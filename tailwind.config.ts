import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FBF8F3",
        forest: "#1C2B1F",
        sage: "#5C7060",
        amber: "#C8731A",
        blush: "#EDE0D4",
        sanguine: "#F5A623",
        choleric: "#E05A4E",
        phlegmatic: "#4A9B8E",
        melancholic: "#8B6BAE",
      },
      fontFamily: {
        mincho: ["var(--font-mincho)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
