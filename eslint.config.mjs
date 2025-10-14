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
    // Regla personalizada para detectar strings hardcodeados
    files: ["**/*.{js,jsx,ts,tsx}"],
    ignores: ["**/*.test.{js,jsx,ts,tsx}", "**/*.spec.{js,jsx,ts,tsx}", "**/__tests__/**", "jest.setup.js", "**/*.config.{js,mjs,ts}"],
    plugins: {
      "custom": {
        rules: {
          "no-hardcoded-strings": {
            meta: {
              type: "problem",
              docs: {
                description: "Disallow hardcoded strings that should use translations",
                category: "Best Practices",
                recommended: true,
              },
              fixable: null,
              schema: [],
            },
            create(context) {
              const suspiciousStrings = /^[A-Z][a-zA-Z\s]{2,}$/; // Strings que empiecen con mayúscula y tengan al menos 3 caracteres
              const allowedPatterns = [
                /^(className|data-|aria-|id|key|ref|style|type|role|placeholder|alt|title)$/,
                /^(sr-only|hidden|loading|error|success|warning|info)$/,
                /^(light|dark|system|auto|manual|true|false|yes|no)$/,
                /^(px|rem|em|vh|vw|%|deg|ms|s)$/,
                /^[0-9]+$/,
                /^#[0-9a-fA-F]{3,8}$/,
                /^rgb\(|rgba\(|hsl\(|hsla\(/,
              ];
              
              return {
                Literal(node) {
                  if (typeof node.value === 'string' && 
                      suspiciousStrings.test(node.value) &&
                      !allowedPatterns.some(pattern => pattern.test(node.value)) &&
                      node.value.length > 2) {
                    
                    // Verificar si está dentro de un JSX
                    let parent = node.parent;
                    let isInJSX = false;
                    while (parent) {
                      if (parent.type === 'JSXElement' || parent.type === 'JSXFragment' || parent.type === 'JSXText') {
                        isInJSX = true;
                        break;
                      }
                      parent = parent.parent;
                    }
                    
                    if (isInJSX) {
                      context.report({
                        node,
                        message: `Hardcoded string "${node.value}" should use translations. Use useTranslations() hook instead.`,
                      });
                    }
                  }
                },
                JSXText(node) {
                  const text = node.value.trim();
                  if (text && suspiciousStrings.test(text) && text.length > 2) {
                    context.report({
                      node,
                      message: `Hardcoded JSX text "${text}" should use translations. Use {t('key')} instead.`,
                    });
                  }
                }
              };
            },
          },
        },
      },
    },
    rules: {
      "custom/no-hardcoded-strings": "error",
    },
  },
  {
    files: ["scripts/**/*.js"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
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
