module.exports = {
      darkMode: "class",
      content: ["./index.html", "./app.js"],
      plugins: [require("@tailwindcss/forms"), require("@tailwindcss/container-queries")],
      theme: {
        extend: {
          colors: {
            wood: {
              charcoal: '#1c1917',
              walnut: '#2c221e',
              rich: '#3e2723',
              amber: '#9a7b56',
              amberLight: '#d6b896',
              sand: '#ece7de',
              cream: '#faf8f5',
              surface: '#f6f3ee',
              border: '#e4ddd3'
            }
          },
          fontFamily: {
            headline: ["Space Grotesk", "sans-serif"],
            body: ["Hanken Grotesk", "sans-serif"],
            mono: ["JetBrains Mono", "monospace"]
          }
        }
      }
    };
