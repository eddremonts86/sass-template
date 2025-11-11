# Configuración de VS Code para el Proyecto

Esta carpeta contiene todas las configuraciones compartidas de VS Code para garantizar un entorno de desarrollo consistente entre todos los miembros del equipo.

## 📁 Archivos Incluidos

### `settings.json`

Configuración del espacio de trabajo que incluye:

- ✨ Formateo automático con Prettier
- 🔍 Linting automático con ESLint
- 🎨 Configuración de Tailwind CSS IntelliSense
- 📝 Reglas de TypeScript
- 🌍 Configuración de spell checker (inglés y español)
- 🎯 Path aliases y mappings
- 📊 Configuración de importCost y errorLens
- 🗂️ File nesting patterns

### `extensions.json`

Lista de extensiones recomendadas organizadas por categoría:

#### Esenciales

- Prettier - Formateador de código
- ESLint - Linter
- TypeScript - Soporte mejorado
- Path Intellisense

#### Next.js & React

- ES7+ React/Redux snippets
- React Refactor
- Console Ninja

#### Tailwind CSS

- Tailwind CSS IntelliSense
- Tailwind Documentation

#### Calidad de Código

- Error Lens
- SonarLint
- Code Spell Checker
- Better Comments
- Todo Tree
- Code Metrics
- Import Cost

#### Git

- GitLens
- Git Graph
- GitHub Copilot
- GitHub Copilot Chat

#### Testing

- Jest
- Jest Runner
- Playwright Test

#### Otras Utilidades

- Pretty TypeScript Errors
- DotENV
- REST Client
- Thunder Client

### `tasks.json`

Tareas predefinidas accesibles desde VS Code (Ctrl/Cmd + Shift + P → "Run Task"):

#### Desarrollo

- 🚀 Dev Server
- 🏗️ Build Production
- ▶️ Start Production

#### Calidad de Código

- 🔍 Lint
- 🔧 Lint & Fix
- 💅 Format
- ✅ Format Check
- 🔤 Type Check

#### Testing

- 🧪 Test
- 🧪 Test Watch
- 📊 Test Coverage
- 🎭 E2E Tests
- 🎭 E2E Tests UI
- 📈 E2E Report

#### Storybook

- 📚 Storybook
- 📚 Build Storybook

#### Documentación

- 📖 Docs Dev
- 📖 Docs Build
- 📖 API Docs

#### Traducciones

- 🌍 Check Translations
- 🌍 Sync Translations

#### Tareas Compuestas

- ✨ Full Quality Check (lint + format + type-check + test)
- 🔧 Fix All (format + lint fix)

#### Limpieza

- 🧹 Clean Build
- 🧹 Clean All
- 📦 Reinstall Dependencies

### `launch.json`

Configuraciones de debugging:

#### Next.js

- 🐛 Debug Server-Side
- 🌐 Debug Client-Side (Chrome)
- 🦊 Debug Client-Side (Firefox)
- 🔥 Debug Full Stack

#### Testing

- 🧪 Debug Jest Tests
- 🧪 Debug Current Jest Test
- 🎭 Debug Playwright Tests
- 🎭 Debug Current Playwright Test

#### Scripts

- 🔧 Debug Node Script
- 🌍 Debug Translation Scripts

#### Storybook

- 📚 Debug Storybook

#### Compuestos

- 🎯 Debug Full Application (Server + Client)

### `typescript.code-snippets`

Snippets personalizados para el proyecto:

#### React & Next.js

- `nxpage` - Next.js page component
- `nxclient` - Client component con i18n
- `nxlayout` - Layout component
- `rcp` - React component con props

#### Hooks

- `ushook` - Custom hook
- `ust` - useTranslations hook

#### Zustand

- `zstore` - Zustand store con persistencia

#### Logger

- `ilog` - Import logger
- `logerr` - Log error
- `logwarn` - Log warning
- `loginfo` - Log info

#### API Routes

- `nxapi` - Next.js API route handler

#### Tests

- `jtest` - Jest test suite
- `ptest` - Playwright E2E test

#### JSDoc

- `jsdoc` - JSDoc function
- `jsdoccomp` - JSDoc component

#### Utilities

- `tryc` - Try-catch con logger
- `atryc` - Async try-catch
- `imp@` - Import con path alias
- `cn` - cn utility
- `resp` - Responsive classes

## 🚀 Cómo Usar

### Primera Vez

1. Abre el proyecto en VS Code
2. VS Code te sugerirá instalar las extensiones recomendadas
3. Haz clic en "Install All" para instalarlas todas
4. Reinicia VS Code si es necesario

### Ejecutar Tareas

- Presiona `Ctrl/Cmd + Shift + P`
- Escribe "Run Task"
- Selecciona la tarea que quieres ejecutar

### Debugging

- Presiona `F5` para iniciar el debug por defecto
- O ve a la vista de Debug (Ctrl/Cmd + Shift + D)
- Selecciona la configuración de debug que necesites
- Presiona el botón de play verde

### Snippets

- Comienza a escribir el prefijo del snippet
- Presiona `Tab` para expandirlo
- Usa `Tab` para navegar entre los placeholders

## 🔧 Personalización

Si necesitas personalizar alguna configuración para tu entorno local:

1. NO modifiques los archivos en `.vscode/` (están compartidos)
2. Usa tu configuración de usuario de VS Code
3. Las configuraciones de usuario sobrescriben las del workspace

## 📝 Notas Importantes

### Auto-Save

El proyecto está configurado con `"files.autoSave": "onFocusChange"`, lo que significa que los archivos se guardan automáticamente cuando cambias de pestaña o ventana.

### Format on Save

Prettier se ejecuta automáticamente al guardar cualquier archivo.

### Lint on Type

ESLint se ejecuta mientras escribes, mostrando errores en tiempo real.

### Path Aliases

Los path aliases están configurados:

- `@/` → `src/`
- `@/components/` → `src/components/`
- `@/lib/` → `src/lib/`
- `@/hooks/` → `src/hooks/`
- `@/stores/` → `src/stores/`
- `@/utils/` → `src/utils/`
- `@/types/` → `src/types/`

### File Nesting

Los archivos relacionados se anidan automáticamente en el explorador:

- `package.json` agrupa los archivos lock
- `tsconfig.json` agrupa sus variantes
- `.env` agrupa sus variantes
- etc.

## 🆘 Solución de Problemas

### Las extensiones no se instalan

1. Abre la paleta de comandos: `Ctrl/Cmd + Shift + P`
2. Escribe "Extensions: Show Recommended Extensions"
3. Instala manualmente las que falten

### El formateo no funciona

1. Verifica que Prettier esté instalado
2. Verifica que `.prettierrc` existe en la raíz
3. Reinicia VS Code

### ESLint no muestra errores

1. Verifica que ESLint esté instalado
2. Abre la salida de ESLint: Output → ESLint
3. Verifica que `eslint.config.mjs` existe
4. Ejecuta "ESLint: Restart ESLint Server"

### TypeScript no encuentra los tipos

1. Ejecuta: `pnpm run type-check`
2. Reinicia el servidor de TypeScript: `Ctrl/Cmd + Shift + P` → "TypeScript: Restart TS Server"

## 🔗 Enlaces Útiles

- [VS Code Docs](https://code.visualstudio.com/docs)
- [VS Code Workspace Settings](https://code.visualstudio.com/docs/getstarted/settings)
- [VS Code Tasks](https://code.visualstudio.com/docs/editor/tasks)
- [VS Code Debugging](https://code.visualstudio.com/docs/editor/debugging)
- [VS Code Snippets](https://code.visualstudio.com/docs/editor/userdefinedsnippets)
