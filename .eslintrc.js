module.exports = {
    env: {
      browser: true,
      es2021: true,
    },
    parser: "@typescript-eslint/parser",
    plugins: [
      "@typescript-eslint"
    ],
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/eslint-recommended",
      "plugin:@typescript-eslint/recommended"
    ],
    overrides: [
    ],
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
        "linebreak-style": 0,
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/no-this-alias": "off",
        "no-useless-escape": "off",
        "prefer-const": "off",
        "no-prototype-builtins": "off",
        "@typescript-eslint/ban-types": "off",
    },
};
// "lint": "tsc --noEmit && eslint ./src/**/*.ts --max-warnings=-1",
