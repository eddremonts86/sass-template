import tseslint from "typescript-eslint";

const eslintConfig = [
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  {
    ignores: [
      // Dependencias y cache
      "node_modules/**",
      ".pnp/**",
      ".yarn/**",

      // Build y output
      ".next/**",
      "out/**",
      "build/**",
      "dist/**",
      "coverage/**",

      // Documentación y herramientas
      "docs/**",
      ".husky/**",
      ".vscode/**",
      ".clerk/**",
      "--version/**",

      // Assets estáticos
      "public/**",

      // Storybook generado
      "storybook-static/**",

      // Carpetas vacías del proyecto
      "src/styles/**",
      "src/types/**",
      "src/forms/**",
      "src/tables/**",
      "src/utils/**",

      // Archivos de configuración y sistema
      "next-env.d.ts",
      "*.config.js",
      "*.config.mjs",
      "*.config.ts",
      "tailwind.config.*",
      "postcss.config.*",
      "jsdoc.config.*",
      "*.tsbuildinfo",
      ".DS_Store",
      "*.log",
      "*.env*",
      ".prettierrc*",
      ".prettierignore",

      // Archivos de lock y temporales
      "pnpm-lock.yaml",
      "yarn.lock",
      "package-lock.json",
      "tmp/**",
      "temp/**",

      // Archivos específicos del proyecto
      "components.json",
      ".trae-instructions.md",
    ],
  },
];

export default eslintConfig;
