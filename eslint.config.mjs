import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";

const eslintConfig = [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: tsparser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-explicit-any": "warn",
      "no-console": "warn",
      "react/react-in-jsx-scope": "off",
    },
  },
  {
    files: ["scripts/**/*.js", "src/patterns/vanilla-js-patterns.js"],
    rules: {
      "no-console": "off",
    },
  },
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "dist/**",
      "coverage/**",
      "docs/**",
      ".husky/**",
      ".vscode/**",
      ".clerk/**",
      "--version/**",
      "public/**",
      "src/styles/**",
      "src/types/**",
      "src/forms/**",
      "src/tables/**",
      "src/utils/**",
      "**/*.config.js",
      "**/*.config.mjs",
      "**/*.config.ts",
      "*.tsbuildinfo",
      "**/*.test.{js,jsx,ts,tsx}",
      "**/*.spec.{js,jsx,ts,tsx}",
      "**/__tests__/**",
      "tests/**",
      ".storybook/**",
      "jest.setup.js",
      "jest.config.js",
      "playwright.config.ts",
      "types/**",
      "proxy.ts",
      "src/proxy.ts",
    ],
  },
];

export default eslintConfig;
