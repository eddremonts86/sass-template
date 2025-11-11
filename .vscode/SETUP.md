# Guía de Configuración de VS Code

## 📋 Resumen

La carpeta `.vscode/` contiene toda la configuración necesaria para un entorno de desarrollo consistente y productivo. Esta guía te ayudará a configurar VS Code correctamente.

## 🚀 Instalación Rápida

### Opción 1: Script Automático (Recomendado)

```bash
# Dar permisos de ejecución (solo primera vez)
chmod +x .vscode/setup-extensions.sh

# Ejecutar script
./.vscode/setup-extensions.sh
```

### Opción 2: Manual

1. Abre VS Code en este proyecto
2. Aparecerá una notificación: "This workspace has extension recommendations"
3. Click en "Install All"
4. Espera a que se instalen todas las extensiones
5. Reinicia VS Code

## ⚙️ Archivos de Configuración

### `settings.json` - Configuración del Workspace

**Características principales:**

- ✨ **Auto-formateo** con Prettier al guardar
- 🔍 **Auto-lint** con ESLint mientras escribes
- 🎨 **Tailwind CSS IntelliSense** con soporte para `cn()` y `cva()`
- 📝 **TypeScript** con inlay hints habilitados
- 🌍 **Spell Checker** en inglés y español
- 📊 **Error Lens** para mostrar errores inline
- 🔗 **Path aliases** configurados (`@/` → `src/`)
- 🗂️ **File nesting** para organizar archivos relacionados

### `extensions.json` - Extensiones Recomendadas

**47 extensiones** organizadas en categorías:

- **Esenciales**: Prettier, ESLint, TypeScript, Path Intellisense
- **Next.js & React**: Snippets, Refactoring, Console Ninja
- **Tailwind**: IntelliSense, Documentation
- **Calidad**: Error Lens, SonarLint, Spell Checker, Code Metrics
- **Git**: GitLens, Git Graph, GitHub Copilot
- **Testing**: Jest, Playwright
- **Y más...**

### `tasks.json` - 30+ Tareas Automatizadas

**Acceso rápido:** `Ctrl/Cmd + Shift + P` → "Tasks: Run Task"

Categorías:

- 🚀 **Desarrollo**: Dev, Build, Start
- 🔍 **Calidad**: Lint, Format, Type Check
- 🧪 **Testing**: Unit, E2E, Coverage
- 📚 **Storybook**: Dev, Build
- 📖 **Docs**: Dev, Build, API
- 🌍 **i18n**: Check, Sync
- 🧹 **Limpieza**: Clean Build, Clean All

### `launch.json` - Configuraciones de Debug

**11 configuraciones** para debugging:

- 🐛 Next.js Server-Side
- 🌐 Next.js Client-Side (Chrome/Firefox)
- 🔥 Next.js Full Stack
- 🧪 Jest Tests
- 🎭 Playwright E2E
- 🔧 Node Scripts
- 📚 Storybook

### `typescript.code-snippets` - Snippets Personalizados

**25+ snippets** para:

- Componentes Next.js (page, client, layout)
- Hooks personalizados
- Zustand stores
- Logger (no console.log)
- API routes
- Tests (Jest, Playwright)
- JSDoc
- Utilities

### `cspell.json` - Diccionario Personalizado

- 100+ palabras específicas del proyecto
- Configuración para ignorar patrones (hex colors, URLs)
- Soporte para inglés y español

## 🎯 Comandos y Atajos Esenciales

### Navegación

| Atajo                    | Acción                       |
| ------------------------ | ---------------------------- |
| `Ctrl/Cmd + P`           | Quick Open (buscar archivos) |
| `Ctrl/Cmd + Shift + O`   | Go to Symbol                 |
| `Ctrl/Cmd + T`           | Buscar símbolo en workspace  |
| `F12`                    | Ir a definición              |
| `Alt + F12`              | Peek Definition              |
| `Shift + F12`            | Ver todas las referencias    |

### Edición

| Atajo              | Acción                |
| ------------------ | --------------------- |
| `Alt + Shift + F`  | Formatear documento   |
| `Ctrl/Cmd + .`     | Quick Fix             |
| `F2`               | Renombrar símbolo     |
| `Ctrl/Cmd + /`     | Toggle comentario     |
| `Ctrl/Cmd + D`     | Seleccionar siguiente |

### Debugging

| Atajo     | Acción                  |
| --------- | ----------------------- |
| `F5`      | Iniciar debugging       |
| `F9`      | Toggle breakpoint       |
| `F10`     | Step over               |
| `F11`     | Step into               |
| `Shift+F11` | Step out              |

### Terminal y Panel

| Atajo              | Acción          |
| ------------------ | --------------- |
| `Ctrl/Cmd + \``    | Toggle Terminal |
| `Ctrl/Cmd + J`     | Toggle Panel    |
| `Ctrl/Cmd + B`     | Toggle Sidebar  |

## 📝 Snippets Más Usados

### Componentes

```typescript
// nxpage - Next.js Page
nxpage → Tab

// nxclient - Client Component con i18n
nxclient → Tab

// rcp - React Component con Props
rcp → Tab
```

### Hooks

```typescript
// ust - useTranslations
ust → Tab
// Genera: const t = useTranslations('namespace');

// ushook - Custom Hook
ushook → Tab
```

### Utilities

```typescript
// tryc - Try-Catch con logger
tryc → Tab

// imp@ - Import con path alias
imp@ → Tab
// Genera: import module from '@/path';

// cn - className con cn utility
cn → Tab
```

## 🔧 Tareas Más Usadas

### Desarrollo Diario

```bash
# Iniciar dev server
🚀 Dev Server

# Lint y auto-fix
🔧 Lint & Fix

# Full quality check
✨ Full Quality Check
```

### Testing

```bash
# Unit tests
🧪 Test

# Watch mode
🧪 Test Watch

# E2E tests
🎭 E2E Tests

# Coverage
📊 Test Coverage
```

## 🐛 Debugging Común

### 1. Debug Next.js Full Stack

```
1. Presiona F5 (o selecciona "🔥 Next.js: Debug Full Stack")
2. Coloca breakpoints en tu código
3. El navegador se abrirá automáticamente
4. Navega a la ruta que quieres debuggear
```

### 2. Debug Test Específico

```
1. Abre el archivo de test
2. Presiona F5
3. Selecciona "🧪 Debug Current Jest Test"
4. El test se ejecutará en modo debug
```

### 3. Debug Playwright E2E

```
1. Selecciona "🎭 Debug Playwright Tests"
2. Los tests se ejecutarán en modo interactivo
3. Podrás ver el navegador en acción
```

## 🆘 Solución de Problemas

### Problema: Las extensiones no se instalan

**Solución:**

```bash
# Verifica que 'code' esté en el PATH
code --version

# Si no está, instálalo:
# macOS/Linux: Cmd/Ctrl+Shift+P → "Shell Command: Install 'code' command in PATH"

# Ejecuta el script de nuevo
./.vscode/setup-extensions.sh
```

### Problema: Prettier no formatea

**Solución:**

```
1. Verifica que Prettier esté instalado
2. Cmd/Ctrl+Shift+P → "Format Document With..."
3. Selecciona "Prettier"
4. Marca "Configure Default Formatter"
5. Reinicia VS Code
```

### Problema: ESLint no muestra errores

**Solución:**

```
1. Output Panel → ESLint (revisa errores)
2. Cmd/Ctrl+Shift+P → "ESLint: Restart ESLint Server"
3. Verifica que eslint.config.mjs existe
4. Ejecuta: pnpm lint
```

### Problema: TypeScript lento

**Solución:**

```
1. Cmd/Ctrl+Shift+P → "TypeScript: Restart TS Server"
2. Cierra archivos no necesarios
3. Verifica memoria: Activity Monitor (macOS) / Task Manager (Windows)
```

### Problema: Las tareas no aparecen

**Solución:**

```
1. Cmd/Ctrl+Shift+P → "Developer: Reload Window"
2. Verifica que .vscode/tasks.json existe
3. Reinicia VS Code
```

## 💡 Tips Avanzados

### 1. Multi-cursor Editing

```
Alt + Click → Agregar cursor
Ctrl/Cmd + Alt + ↑/↓ → Cursor arriba/abajo
Ctrl/Cmd + D → Seleccionar siguiente ocurrencia
Ctrl/Cmd + Shift + L → Seleccionar todas las ocurrencias
```

### 2. Zen Mode (Modo Enfoque)

```
Ctrl/Cmd + K, Z → Activa/desactiva Zen Mode
```

### 3. Búsqueda Avanzada

```
Ctrl/Cmd + Shift + F → Buscar en archivos
Alt+C → Toggle case sensitive
Alt+W → Toggle whole word
Alt+R → Toggle regex
```

### 4. Refactoring Rápido

```
F2 → Renombrar símbolo
Ctrl/Cmd + . → Quick fix
Ctrl/Cmd + Shift + R → Refactor
```

### 5. File Nesting

Los archivos relacionados se agrupan automáticamente:

```
package.json
  ├─ pnpm-lock.yaml
  ├─ package-lock.json
  └─ yarn.lock

tsconfig.json
  ├─ tsconfig.node.json
  └─ tsconfig.app.json
```

## 📚 Recursos

- [VS Code Docs](https://code.visualstudio.com/docs)
- [Keyboard Shortcuts PDF](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-macos.pdf)
- [README Completo](.vscode/README-FULL.md)
- [Keybindings Recomendados](.vscode/KEYBINDINGS.md)

## ✅ Checklist de Configuración

- [ ] VS Code instalado
- [ ] Comando `code` en el PATH
- [ ] Extensiones instaladas (ejecutar `.vscode/setup-extensions.sh`)
- [ ] VS Code reiniciado
- [ ] Prettier formateando correctamente
- [ ] ESLint mostrando errores
- [ ] TypeScript IntelliSense funcionando
- [ ] Tailwind CSS autocompletando
- [ ] Tareas disponibles (Ctrl/Cmd+Shift+P → Tasks)
- [ ] Debug funcionando (F5)
- [ ] Snippets disponibles (probar `nxpage` + Tab)

---

**¿Todo listo?** 🎉 ¡Estás preparado para desarrollar! Ejecuta `pnpm dev` para empezar.
