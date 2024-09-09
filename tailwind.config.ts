import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        mono: ["var(--font-roboto-mono)"],
      },
      colors: {
        "light-grey": "#F8F8F8",
        "ds-dark-purple": {
          50: "#F7F4FC", // Lighter than 100
          100: "#ECE7F5", // Lightest shade
          200: "#C8BFE1",
          300: "#A599CE",
          400: "#8273BA",
          500: "#8E7AB5", // Base color
          600: "#6D5D92",
          700: "#554774",
          800: "#3D3156",
          900: "#261D38", // Darkest shade
        },
        "ds-light-purple": {
          50: "#F5F0F4", // Lighter than 100
          100: "#E0BCC7",
          200: "#C58AAE",
          300: "#A66E9D",
          400: "#B784B7", // Base color
          500: "#9A6A9A",
          600: "#7A5A7A",
          700: "#5A4B5A",
          800: "#3B3B3B",
          900: "#1C1C1C", // Darkest shade
        },
        "ds-salmon": {
          50: "#FCEEEE", // Lighter than 100
          100: "#F8C6C7",
          200: "#F4A1A2",
          300: "#F07B7C",
          400: "#EEA5A6", // Base color
          500: "#E07475",
          600: "#D03F40",
          700: "#B62B2C",
          800: "#921A1B",
          900: "#6D0F10", // Darkest shade
        },
        "ds-pink": {
          100: "#FDE8EF", // Lightest shade
          200: "#F9C6D5",
          300: "#F5A3BC",
          400: "#F180A2",
          500: "#E493B3", // Base color
          600: "#B16A8A",
          700: "#8E536C",
          800: "#6B3D4F",
          900: "#482634", // Darkest shade
        },
        "ds-red": {
          100: "#FDE4E6", // Lightest shade
          200: "#F9B3B8",
          300: "#F5828A",
          400: "#F0515B",
          500: "#E74354", // Base color
          600: "#B63545",
          700: "#8A2735",
          800: "#5D1926",
          900: "#330C15", // Darkest shade
        },
        "ds-yellow": {
          400: "#F6D639",
        },
        "ds-green": {
          400: "#72D673",
        },
      },
    },
  },
  plugins: [],
};
export default config;
