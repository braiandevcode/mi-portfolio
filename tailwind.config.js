/**@type {import("tailwindcss").Config} **/

export default {
  content: [
    "./index.html", // Asegúrate de incluir tu archivo HTML si es necesario
    "./src/**/*.{js,ts,jsx, tsx}", // Si estás trabajando con JS/TS en src
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E293B",
        secondary: "#0F172A",
        accent: "#06B6D4",
        accentDark: "#0891B2",
        light: "#F8FAFC",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["Fira Code", "monospace"],
      },
    },
  },

};
