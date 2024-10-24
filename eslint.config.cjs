const jsxA11y = require("eslint-plugin-jsx-a11y");

module.exports = [
  {
    ignores: ["node_modules/**"],
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 12,
      sourceType: "module",
    },
    plugins: {
      a11y: jsxA11y,
    },
    rules: {
      "no-console": "off",
      "no-unused-vars": "warn",
    },
  },
];
