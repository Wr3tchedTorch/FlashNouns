import stylisticJs from "@stylistic/eslint-plugin-js";

export default [
  {
    plugins: {
      "@stylistic/js": stylisticJs
    },
    rules: {
      "@stylistic/js/indent": ["error", 2],
      "@stylistic/js/semi": ["error", "always", { "omitLastInOneLineClassBody": true }],
      "@stylistic/js/quotes": ["error", "double"]
    }
  }
]