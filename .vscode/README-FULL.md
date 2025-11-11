# VS Code Workspace Configuration

Este directorio contiene la configuración completa de Visual Studio Code para el proyecto Next.js Template.

## 📁 Estructura de Archivos

```
.vscode/
├── README.md                    # Esta documentación
├── settings.json                # Configuración del workspace
├── extensions.json              # Extensiones recomendadas
├── tasks.json                   # Tareas automatizadas
├── launch.json                  # Configuraciones de debugging
├── typescript.code-snippets     # Snippets personalizados
├── cspell.json                  # Diccionario personalizado
├── KEYBINDINGS.md              # Atajos de teclado recomendados
└── setup-extensions.sh         # Script de instalación automática
```

## 🚀 Inicio Rápido

### Opción 1: Instalación Automática (Recomendado)

```bash
# Ejecutar el script de instalación
./.vscode/setup-extensions.sh
```

### Opción 2: Instalación Manual

1. Abre el proyecto en VS Code
2. Presiona `Ctrl/Cmd + Shift + P`
3. Escribe "Extensions: Show Recommended Extensions"
4. Haz clic en "Install All" (nube con flecha hacia abajo)
5. Reinicia VS Code

## ⚙️ Configuraciones Principales

### Formateo Automático

- **Prettier** se ejecuta automáticamente al guardar
- Configurado para usar `.prettierrc` del proyecto
- Soporta TypeScript, JavaScript, JSON, Markdown, CSS

### Linting en Tiempo Real

- **ESLint** se ejecuta mientras escribes
- Muestra errores y advertencias inline
- Auto-fix disponible con `Ctrl/Cmd + Shift + P` → "ESLint: Fix all auto-fixable Problems"

### TypeScript IntelliSense

- Autocompletado inteligente
- Inlay hints para tipos
- Navegación rápida de código
- Refactoring automático

### Tailwind CSS

- Autocompletado de clases
- Preview de colores
- Lint de conflictos de clases
- Documentación inline

## 🎯 Tareas Disponibles

Accede a las tareas desde: `Ctrl/Cmd + Shift + P` → "Tasks: Run Task"

### Desarrollo Diario

- `🚀 Dev Server` - Inicia el servidor de desarrollo
- `🏗️ Build Production` - Compila para producción
- `🔧 Lint & Fix` - Corrige problemas de código

### Testing

- `🧪 Test` - Ejecuta tests unitarios
- `🧪 Test Watch` - Modo watch para tests
- `🎭 E2E Tests` - Tests end-to-end con Playwright
- `📊 Test Coverage` - Genera reporte de cobertura

### Calidad de Código

- `✨ Full Quality Check` - Ejecuta todos los checks
- `🔧 Fix All` - Formatea y corrige todo

## 🐛 Debugging

### Configuraciones Disponibles

1. **Next.js: Debug Server-Side** (F5)
   - Debug del código server-side
   - Breakpoints en API routes, middleware, etc.

2. **Next.js: Debug Client-Side**
   - Debug en Chrome/Firefox
   - Breakpoints en componentes React

3. **Next.js: Debug Full Stack**
   - Debug simultáneo de server y client
   - Recomendado para desarrollo completo

4. **Debug Jest Tests**
   - Debug de tests unitarios
   - Breakpoints en tests

5. **Debug Playwright Tests**
   - Debug de tests E2E
   - Modo interactivo

### Cómo Usar

1. Presiona `F5` o ve a la vista de Debug (Ctrl/Cmd + Shift + D)
2. Selecciona la configuración que necesites
3. Presiona el botón de play verde
4. Coloca breakpoints haciendo clic en el margen izquierdo

## 📝 Snippets Personalizados

Escribe el prefijo y presiona `Tab` para expandir:

### Componentes

- `nxpage` - Next.js page component
- `nxclient` - Client component con i18n
- `nxlayout` - Layout component
- `rcp` - React component con props

### Hooks

- `ushook` - Custom hook
- `ust` - useTranslations hook

### Testing

- `jtest` - Jest test suite
- `ptest` - Playwright test

### Utilities

- `tryc` - Try-catch con logger
- `cn` - className con cn utility
- `imp@` - Import con path alias

Ver todos los snippets en `.vscode/typescript.code-snippets`

## 🎨 Extensiones Recomendadas

### Esenciales (Instalar Primero)

- ✅ **Prettier** - Formateo de código
- ✅ **ESLint** - Linting
- ✅ **TypeScript** - Soporte mejorado
- ✅ **Tailwind CSS IntelliSense** - Autocompletado Tailwind

### Productividad

- **Error Lens** - Errores inline
- **Path Intellisense** - Autocompletado de rutas
- **Auto Rename Tag** - Renombra tags automáticamente
- **Import Cost** - Muestra tamaño de imports

### Testing & Debug

- **Jest** - Soporte para Jest
- **Playwright** - E2E testing
- **Console Ninja** - Debug mejorado

### Git & Colaboración

- **GitLens** - Superpoderes Git
- **Git Graph** - Visualización de Git
- **GitHub Copilot** - AI assistant

Ver lista completa en `.vscode/extensions.json`

## 🔧 Personalización

### Configuración Local vs Workspace

- **Workspace** (`.vscode/settings.json`): Compartida con todo el equipo
- **Usuario**: Tu configuración personal

Para sobrescribir configuraciones del workspace:

1. `Ctrl/Cmd + ,` para abrir Settings
2. Cambia de "Workspace" a "User"
3. Modifica las configuraciones que necesites

### Agregar Palabras al Diccionario

Dos formas:

1. Click derecho sobre la palabra → "Add to Workspace Dictionary"
2. Edita `.vscode/cspell.json` manualmente

## 🆘 Solución de Problemas

### Prettier no formatea

```bash
# Verifica que Prettier esté instalado
code --list-extensions | grep prettier

# Reinstala si es necesario
code --install-extension esbenp.prettier-vscode

# Reinicia VS Code
```

### ESLint no muestra errores

```bash
# Abre la salida de ESLint
Output panel → ESLint

# Reinicia el servidor ESLint
Ctrl/Cmd + Shift + P → "ESLint: Restart ESLint Server"
```

### TypeScript no encuentra tipos

```bash
# Reinicia el servidor TypeScript
Ctrl/Cmd + Shift + P → "TypeScript: Restart TS Server"

# Verifica el tsconfig.json
pnpm run type-check
```

### Las tareas no aparecen

```bash
# Recarga la ventana
Ctrl/Cmd + Shift + P → "Developer: Reload Window"
```

## 📚 Recursos Adicionales

- [VS Code Documentation](https://code.visualstudio.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 💡 Tips y Trucos

### Comandos Útiles

| Atajo | Acción |
|-------|--------|
| `Ctrl/Cmd + P` | Quick Open - Buscar archivos |
| `Ctrl/Cmd + Shift + P` | Command Palette |
| `Ctrl/Cmd + Shift + O` | Go to Symbol - Navegar funciones/clases |
| `Ctrl/Cmd + T` | Go to Symbol in Workspace |
| `F12` | Go to Definition |
| `Alt + F12` | Peek Definition |
| `Shift + F12` | Find All References |
| `F2` | Rename Symbol |
| `Ctrl/Cmd + .` | Quick Fix |
| `Ctrl/Cmd + /` | Toggle Comment |

### Multi-cursor Editing

- `Alt + Click` - Agregar cursor
- `Ctrl/Cmd + Alt + ↑/↓` - Cursor arriba/abajo
- `Ctrl/Cmd + D` - Seleccionar siguiente ocurrencia
- `Ctrl/Cmd + Shift + L` - Seleccionar todas las ocurrencias

### Navegación Rápida

- `Ctrl/Cmd + B` - Toggle Sidebar
- `Ctrl/Cmd + J` - Toggle Panel (Terminal, Problems, etc.)
- `Ctrl/Cmd + \`` - Toggle Terminal
- `Ctrl/Cmd + K, Z` - Zen Mode

## 🤝 Contribuir

Si encuentras una configuración útil o una extensión que debería agregarse:

1. Abre un issue o PR
2. Describe el beneficio
3. Proporciona la configuración o extensión

## 📄 Licencia

Este conjunto de configuraciones es parte del proyecto y sigue la misma licencia.

---

**¿Necesitas ayuda?** Revisa el [README principal](../README.md) o crea un issue en el repositorio.
