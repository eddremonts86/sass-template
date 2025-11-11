# API Documentation

This section contains the complete API documentation for the Template Trae project, including components, hooks, utilities, and types.

## 📚 Sections

### [UI Components](./components/)
Complete documentation of all user interface components:
- **Base Components**: Button, Input, Label, etc.
- **Layout Components**: Container, Grid, Flex, etc.
- **Form Components**: Form, Field, Validation, etc.
- **Navigation Components**: Menu, Breadcrumb, Pagination, etc.
- **Specialized Components**: DataTable, Modal, Toast, etc.

### [Custom Hooks](./hooks/)
Documentation of all custom hooks:
- **useTheme**: Theme management
- **useLocalStorage**: Local persistence
- **useDebounce**: Value debouncing
- **useMediaQuery**: Responsive queries
- **useAuth**: Authentication with Clerk

### [Utilities](./utils/)
Utility functions and helpers:
- **cn**: CSS class merging
- **formatters**: Data formatting
- **validators**: Data validation
- **constants**: Project constants

### [Stores](./stores/)
State management with Zustand:
- **authStore**: Authentication state
- **themeStore**: Theme state
- **uiStore**: Interface state

### [TypeScript Types](./types/)
Type and interface definitions:
- **Component Types**: Component types
- **API Types**: API types
- **Utility Types**: Utility types

## 🚀 Documentation Generation

### Automatic with JSDoc

```bash
# Install JSDoc globally
npm install -g jsdoc

# Generate documentation
jsdoc -c jsdoc.config.js
```

### Manual with VitePress

```bash
# Run development server
pnpm docs:dev

# Build documentation
pnpm docs:build

# Preview build
pnpm docs:preview
```

## 📝 Documentation Standards

### For React Components

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

### For Custom Hooks

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

### For Utilities

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

## 🔧 JSDoc Configuration

The `jsdoc.config.js` file is configured to:

- **Include**: Components, hooks, utilities, stores, and types
- **Exclude**: Tests, stories, and node_modules
- **Plugins**: Markdown and summarize
- **Output**: Directory `docs/api/`
- **TypeScript**: Full support for TS/TSX

## 📖 Additional Resources

- [JSDoc Official Documentation](https://jsdoc.app/)
- [TypeScript JSDoc Reference](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html)
- [React Component Documentation Best Practices](https://react-styleguidist.js.org/docs/documenting/)
- [VitePress Documentation](https://vitepress.dev/)

## 🤝 Contributing to Documentation

1. **Document all public exports**
2. **Use clear and practical examples**
3. **Include accessibility information**
4. **Keep documentation up to date**
5. **Follow established standards**

---

*This documentation is automatically generated from JSDoc comments in the source code.*
