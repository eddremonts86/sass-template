# API Documentation

Esta sección contiene la documentación completa de la API del proyecto Template Trae, incluyendo componentes, hooks, utilidades y tipos.

## 📚 Secciones

### [Componentes UI](./components/)
Documentación completa de todos los componentes de interfaz de usuario:
- **Base Components**: Button, Input, Label, etc.
- **Layout Components**: Container, Grid, Flex, etc.
- **Form Components**: Form, Field, Validation, etc.
- **Navigation Components**: Menu, Breadcrumb, Pagination, etc.
- **Specialized Components**: DataTable, Modal, Toast, etc.

### [Hooks Personalizados](./hooks/)
Documentación de todos los hooks personalizados:
- **useTheme**: Gestión de temas
- **useLocalStorage**: Persistencia local
- **useDebounce**: Debouncing de valores
- **useMediaQuery**: Responsive queries
- **useAuth**: Autenticación con Clerk

### [Utilidades](./utils/)
Funciones de utilidad y helpers:
- **cn**: Merge de clases CSS
- **formatters**: Formateo de datos
- **validators**: Validación de datos
- **constants**: Constantes del proyecto

### [Stores](./stores/)
Gestión de estado con Zustand:
- **authStore**: Estado de autenticación
- **themeStore**: Estado del tema
- **uiStore**: Estado de la interfaz

### [Tipos TypeScript](./types/)
Definiciones de tipos y interfaces:
- **Component Types**: Tipos de componentes
- **API Types**: Tipos de API
- **Utility Types**: Tipos de utilidades

## 🚀 Generación de Documentación

### Automática con JSDoc

```bash
# Instalar JSDoc globalmente
npm install -g jsdoc

# Generar documentación
jsdoc -c jsdoc.config.js
```

### Manual con VitePress

```bash
# Ejecutar servidor de desarrollo
pnpm docs:dev

# Construir documentación
pnpm docs:build

# Vista previa de la build
pnpm docs:preview
```

## 📝 Estándares de Documentación

### Para Componentes React

```tsx
/**
 * Button component with multiple variants and accessibility features
 * 
 * @component
 * @param {Object} props - Component props
 * @param {'default'|'destructive'|'outline'|'secondary'|'ghost'|'link'} props.variant - Button style variant
 * @param {'default'|'sm'|'lg'|'icon'} props.size - Button size
 * @param {React.ReactNode} props.children - Button content
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.disabled=false] - Whether button is disabled
 * @param {Function} [props.onClick] - Click event handler
 * 
 * @example
 * // Basic usage
 * <Button variant="default" size="md">
 *   Click me
 * </Button>
 * 
 * @example
 * // Destructive action
 * <Button variant="destructive" onClick={handleDelete}>
 *   Delete Item
 * </Button>
 * 
 * @since 1.0.0
 * @accessibility Supports keyboard navigation and screen readers
 */
export function Button({ variant = 'default', size = 'default', ...props }) {
  // Implementation
}
```

### Para Hooks Personalizados

```tsx
/**
 * Custom hook for managing theme state with persistence
 * 
 * @hook
 * @returns {Object} Theme management utilities
 * @returns {string} returns.theme - Current theme ('light' | 'dark' | 'system')
 * @returns {Function} returns.setTheme - Function to change theme
 * @returns {Function} returns.toggleTheme - Function to toggle between themes
 * @returns {boolean} returns.isDark - Whether current theme is dark
 * 
 * @example
 * const { theme, setTheme, toggleTheme, isDark } = useTheme()
 * 
 * // Change to dark theme
 * setTheme('dark')
 * 
 * // Toggle theme
 * toggleTheme()
 * 
 * @since 1.0.0
 */
export function useTheme() {
  // Implementation
}
```

### Para Utilidades

```tsx
/**
 * Merges CSS classes using clsx and tailwind-merge
 * 
 * @function
 * @param {...(string|Object|Array)} classes - Classes to merge
 * @returns {string} Merged and deduplicated CSS classes
 * 
 * @example
 * // Basic usage
 * cn('px-4 py-2', 'bg-blue-500', 'text-white')
 * // Returns: 'px-4 py-2 bg-blue-500 text-white'
 * 
 * @example
 * // With conditional classes
 * cn('base-class', {
 *   'active-class': isActive,
 *   'disabled-class': isDisabled
 * })
 * 
 * @since 1.0.0
 */
export function cn(...classes: ClassValue[]): string {
  // Implementation
}
```

## 🔧 Configuración JSDoc

El archivo `jsdoc.config.js` está configurado para:

- **Incluir**: Componentes, hooks, utilidades, stores y tipos
- **Excluir**: Tests, stories y node_modules
- **Plugins**: Markdown y summarize
- **Salida**: Directorio `docs/api/`
- **TypeScript**: Soporte completo para TS/TSX

## 📖 Recursos Adicionales

- [JSDoc Official Documentation](https://jsdoc.app/)
- [TypeScript JSDoc Reference](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html)
- [React Component Documentation Best Practices](https://react-styleguidist.js.org/docs/documenting/)
- [VitePress Documentation](https://vitepress.dev/)

## 🤝 Contribuir a la Documentación

1. **Documenta todos los exports públicos**
2. **Usa ejemplos claros y prácticos**
3. **Incluye información de accesibilidad**
4. **Mantén la documentación actualizada**
5. **Sigue los estándares establecidos**

---

*Esta documentación se genera automáticamente a partir de los comentarios JSDoc en el código fuente.*