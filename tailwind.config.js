/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        scroll: 'scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite',
        'radar-spin': 'radar-spin 10s linear infinite', // 🛰️ added here
        "meteor-effect": "meteor 5s linear infinite", // 🌠 added here
      },
      keyframes: {
        meteor: {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: 1 },
          "70%": { opacity: 1 },
          "100%": {
            transform: "rotate(215deg) translateX(-500px)",
            opacity: 0,
          },
        },
        scroll: {
          to: {
            transform: 'translate(calc(-50% - 0.5rem))',
          },
        },
        'radar-spin': {
          from: {
            transform: 'rotate(20deg)',
          },
          to: {
            transform: 'rotate(380deg)',
          },
        },
      },
    },
  },
  plugins: [],
}