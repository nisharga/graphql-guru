const eslintPluginTs = require("@typescript-eslint/eslint-plugin");
const parserTs = require("@typescript-eslint/parser");
const globals = require("globals");

module.exports = {
  ignores: ["dist/**/*", "node_modules/**/*"], // Example ignores
  languageOptions: {
    parser: parserTs,
    parserOptions: {
      project: true,
    },
    globals: {
      ...globals.node,
    },
  },
  plugins: {
    "@typescript-eslint": eslintPluginTs,
  },
  rules: {
    "@typescript-eslint/explicit-function-return-type": "error",
  },
};
