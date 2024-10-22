import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        "background-100": "#121A27",
        "background-200": "#1E2433",
        "background-300": "#262D3C",
        "vibrant-green-100": "#28D482",
        "vibrant-green-200": "#20b56d",
      },
    },
  },
  plugins: [],
};
export default config;
