module.exports = {
  root: true,
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
  },
  env: {
    node: true,
  },
  extends: [
    "eslint:recommended",
    "prettier",
    "plugin:vue/vue3-recommended",
    "plugin:unicorn/recommended",
  ],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "vue/multi-word-component-names": "off",
    "no-unused-vars": "off",
    "unicorn/no-null": "off",
    "vue/require-default-prop": "off"
  },
};
