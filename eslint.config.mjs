import tseslint from "typescript-eslint";

const eslintConfig = [
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-require-imports": "off",
      // Enforce English-only comments (no Spanish/special characters)
      "no-warning-comments": [
        "warn",
        {
          terms: [
            "obtener",
            "crear",
            "actualizar",
            "eliminar",
            "usuario",
            "información",
            "configuración",
            "función",
            "verificar",
            "sincronizar",
            "último",
            "básica",
            "hola",
            "perfil",
          ],
          location: "anywhere",
        },
      ],
    },
  },
  {
    ignores: [
      // Dependencies and cache
      "**/node_modules/**",
      "**/.pnp/**",
      "**/.yarn/**",

      // Frontend build outputs
      ".next/**",
      "apps/frontend/.next/**",
      "apps/frontend/out/**",
      "apps/frontend/build/**",
      "**/public/sw.js",

      // Backend build outputs
      "apps/backend/dist/**",
      "apps/backend/build/**",
      "apps/backend/.strapi/**",
      "apps/backend/public/uploads/**",
      "**/apps/backend/types/generated/**",

      // Shared build outputs
      "**/out/**",
      "**/build/**",
      "**/dist/**",
      "**/coverage/**",
      "storybook-static/**",
      "**/storybook-static/**",

      // Documentation
      "apps/shared/docs/.vitepress/**",
      "docs/api/**",
      "**/docs/api/**",

      // Git hooks and tools
      ".husky/**",
      "--version/**",

      // IDE and config
      "**/.vscode/**",
      "**/.idea/**",
      "**/.clerk/**",

      // Generated and config files
      "**/next-env.d.ts",
      "**/*.config.js",
      "**/*.config.mjs",
      "**/*.config.ts",
      "**/tailwind.config.*",
      "**/postcss.config.*",
      "**/jsdoc.config.*",
      "**/*.tsbuildinfo",
      "**/.DS_Store",
      "**/*.log",
      "**/*.env*",
      "**/.prettierrc*",
      "**/.prettierignore",

      // Lock files and temporary
      "**/pnpm-lock.yaml",
      "**/yarn.lock",
      "**/package-lock.json",
      "**/tmp/**",
      "**/temp/**",

      // Test reports
      "tests/reports/**",

      // Project-specific files
      "**/components.json",
      "**/.trae-instructions.md",
    ],
  },
];

export default eslintConfig;
