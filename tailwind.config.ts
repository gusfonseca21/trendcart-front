import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      height: {
        "128": "32rem",
        "144": "40rem",
      },
      width: {
        "128": "32rem",
        "144": "40rem",
      },
      animation: {
        "fade-in-out": "fade 500ms linear",
        "button-click": "press 200ms linear",
      },
      keyframes: {
        fade: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        press: {
          "0%": { scale: "1" },
          "50%": { scale: "0.99" },
          "100%": { scale: "1" },
        },
      },
      colors: {
        main: "#dc9814",
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".center": {
          display: "flex",
          "flex-direction": "column",
          "justify-content": "center",
          "align-items": "center",
        },
        ".transition-black-opacity": {
          "transition-property": "opacity",
          "transition-duration": "300ms",
          "transition-timing-function": "ease-in-out",
          "&:hover": {
            opacity: "0.6",
          },
        },
        ".input": {
          border: "1px solid #ccc",
          padding: "0.75rem 0.5rem 0.75rem 0.5rem",
        },
        ".transition-text": {
          transition: "all 200ms ease-in-out",
        },
      });
    }),
  ],
};
export default config;
