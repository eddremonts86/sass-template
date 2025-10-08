import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import tseslint from "typescript-eslint";
import nextPlugin from "@next/eslint-plugin-next";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals", 
    "next/typescript",
    "prettier"
  ),
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-explicit-any": "warn",
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
