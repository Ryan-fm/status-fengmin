/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier",
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "vue/comment-directive": "off",
    "prettier/prettier": "off",
    "no-useless-escape": "off",
    "no-undef": "off",
    "vue/multi-word-component-names": "off",
  },
};
