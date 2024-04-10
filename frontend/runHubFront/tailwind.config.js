/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        lightYellow: "#F2C46D",
        whiteNeutral: "#F2F2F2",
        mediumGray: "#D9D9D9",
        darkGray: "#8C8C8C",
        deepBlack: "#0D0D0D "
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
    // Custom plugin to add !important to utilities
    function ({
      addVariant
    }) {
      addVariant('important', ({
        container
      }) => {
        container.walkRules(rule => {
          rule.selector = `.\\!${rule.selector.slice(1)}`;
          rule.walkDecls(decl => {
            decl.important = true;
          });
        });
      });
    }
  ],
}