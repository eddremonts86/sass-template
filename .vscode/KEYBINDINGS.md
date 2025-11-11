# Keybindings Personalizados para el Proyecto

Este archivo contiene atajos de teclado recomendados para mejorar la productividad en este proyecto.

## 🎯 Cómo Usar

1. Abre las preferencias de teclado: `Ctrl/Cmd + K, Ctrl/Cmd + S`
2. Haz clic en el icono de archivo en la esquina superior derecha
3. Copia los keybindings que desees usar
4. Pégalos en tu archivo `keybindings.json` personal

## ⌨️ Atajos Recomendados

```jsonc
[
  // ============================================
  // TAREAS RÁPIDAS
  // ============================================
  {
    "key": "ctrl+shift+d",
    "command": "workbench.action.tasks.runTask",
    "args": "🚀 Dev Server"
  },
  {
    "key": "ctrl+shift+b",
    "command": "workbench.action.tasks.runTask",
    "args": "🏗️  Build Production"
  },
  {
    "key": "ctrl+shift+t",
    "command": "workbench.action.tasks.runTask",
    "args": "🧪 Test"
  },
  {
    "key": "ctrl+shift+l",
    "command": "workbench.action.tasks.runTask",
    "args": "🔍 Lint"
  },
  {
    "key": "ctrl+shift+f",
    "command": "workbench.action.tasks.runTask",
    "args": "💅 Format"
  },
  {
    "key": "ctrl+shift+q",
    "command": "workbench.action.tasks.runTask",
    "args": "✨ Full Quality Check"
  },

  // ============================================
  // NAVEGACIÓN MEJORADA
  // ============================================
  {
    "key": "ctrl+shift+o",
    "command": "workbench.action.gotoSymbol"
  },
  {
    "key": "ctrl+t",
    "command": "workbench.action.quickOpen"
  },

  // ============================================
  // EDICIÓN
  // ============================================
  {
    "key": "alt+shift+f",
    "command": "editor.action.formatDocument",
    "when": "editorHasDocumentFormattingProvider && editorTextFocus && !editorReadonly"
  },
  {
    "key": "ctrl+shift+k",
    "command": "editor.action.deleteLines",
    "when": "editorTextFocus && !editorReadonly"
  },

  // ============================================
  // TERMINAL
  // ============================================
  {
    "key": "ctrl+`",
    "command": "workbench.action.terminal.toggleTerminal"
  },
  {
    "key": "ctrl+shift+`",
    "command": "workbench.action.terminal.new"
  },

  // ============================================
  // GIT
  // ============================================
  {
    "key": "ctrl+shift+g",
    "command": "workbench.view.scm"
  },

  // ============================================
  // TESTING
  // ============================================
  {
    "key": "ctrl+shift+r",
    "command": "testing.runCurrentFile",
    "when": "editorTextFocus"
  }
]
```

## 📝 Notas

- Estos atajos están diseñados para no entrar en conflicto con los atajos predeterminados de VS Code
- Puedes personalizar cualquier atajo según tus preferencias
- Los atajos que comiencen con `Ctrl` en Windows/Linux usan `Cmd` en macOS
