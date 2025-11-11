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
      "node_modules/**",
      ".pnp/**",
      ".yarn/**",

      // Build and output
      ".next/**",
      "out/**",
      "build/**",
      "dist/**",
      "coverage/**",

      // Documentation and tools
      "docs/**",
      ".husky/**",
      ".vscode/**",
      ".clerk/**",
      "--version/**",

      // Static assets
      "public/**",

      // Generated Storybook
      "storybook-static/**",

      // Empty project folders
      "src/styles/**",
      "src/types/**",
      "src/forms/**",
      "src/tables/**",
      "src/utils/**",

      // Config and system files
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

      // Lock files and temporary
      "pnpm-lock.yaml",
      "yarn.lock",
      "package-lock.json",
      "tmp/**",
      "temp/**",

      // Project-specific files
      "components.json",
      ".trae-instructions.md",
    ],
  },
];

export default eslintConfig;
