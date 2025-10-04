/**
 * JSDoc Configuration for Template Trae
 * 
 * Configuración para generar documentación automática de componentes,
 * hooks, utilidades y tipos TypeScript.
 */

module.exports = {
  source: {
    include: [
      './src/components/',
      './src/hooks/',
      './src/lib/',
      './src/utils/',
      './src/stores/',
      './src/types/',
      './README.md'
    ],
    includePattern: '\\.(js|jsx|ts|tsx)$',
    exclude: [
      './src/**/*.test.{js,jsx,ts,tsx}',
      './src/**/*.spec.{js,jsx,ts,tsx}',
      './src/**/*.stories.{js,jsx,ts,tsx}',
      './node_modules/'
    ]
  },
  
  opts: {
    destination: './docs/api/',
    recurse: true,
    readme: './README.md'
  },
  
  plugins: [
    'plugins/markdown',
    'plugins/summarize'
  ],
  
  templates: {
    cleverLinks: false,
    monospaceLinks: false
  },
  
  markdown: {
    parser: 'gfm',
    hardwrap: true
  },
  
  // Configuración específica para TypeScript
  typescript: {
    moduleRoot: './src'
  },
  
  // Tags personalizados para React components
  tags: {
    allowUnknownTags: true,
    dictionaries: ['jsdoc', 'closure']
  }
}

/**
 * Ejemplo de documentación JSDoc para componentes:
 * 
 * @example
 * ```tsx
 * /**
 *  * Button component with multiple variants and sizes
 *  * 
 *  * @component
 *  * @param {Object} props - Component props
 *  * @param {'default'|'destructive'|'outline'|'secondary'|'ghost'|'link'} props.variant - Button variant
 *  * @param {'default'|'sm'|'lg'|'icon'} props.size - Button size
 *  * @param {React.ReactNode} props.children - Button content
 *  * @param {string} [props.className] - Additional CSS classes
 *  * @param {Function} [props.onClick] - Click handler
 *  * @param {boolean} [props.disabled=false] - Whether button is disabled
 *  * 
 *  * @example
 *  * // Basic usage
 *  * <Button variant="default" size="md">
 *  *   Click me
 *  * </Button>
 *  * 
 *  * @example
 *  * // With custom styling
 *  * <Button 
 *  *   variant="outline" 
 *  *   size="lg"
 *  *   className="custom-class"
 *  *   onClick={() => console.log('clicked')}
 *  * >
 *  *   Custom Button
 *  * </Button>
 *  * 
 *  * @since 1.0.0
 *  * @author Template Trae Team
 *  * /
 * export function Button({ variant = 'default', size = 'default', ...props }) {
 *   // Component implementation
 * }
 * ```
 * 
 * Ejemplo de documentación para hooks:
 * 
 * @example
 * ```tsx
 * /**
 *  * Custom hook for theme management
 *  * 
 *  * @hook
 *  * @returns {Object} Theme utilities
 *  * @returns {string} returns.theme - Current theme ('light' | 'dark' | 'system')
 *  * @returns {Function} returns.setTheme - Function to set theme
 *  * @returns {Function} returns.toggleTheme - Function to toggle between light/dark
 *  * 
 *  * @example
 *  * // Basic usage
 *  * const { theme, setTheme, toggleTheme } = useTheme()
 *  * 
 *  * // Set specific theme
 *  * setTheme('dark')
 *  * 
 *  * // Toggle theme
 *  * toggleTheme()
 *  * 
 *  * @since 1.0.0
 *  * /
 * export function useTheme() {
 *   // Hook implementation
 * }
 * ```
 * 
 * Ejemplo de documentación para utilidades:
 * 
 * @example
 * ```tsx
 * /**
 *  * Utility function to merge CSS classes with Tailwind
 *  * 
 *  * @function
 *  * @param {...string} classes - CSS classes to merge
 *  * @returns {string} Merged CSS classes
 *  * 
 *  * @example
 *  * // Basic usage
 *  * const className = cn('px-4 py-2', 'bg-blue-500', 'text-white')
 *  * // Returns: 'px-4 py-2 bg-blue-500 text-white'
 *  * 
 *  * @example
 *  * // With conditional classes
 *  * const className = cn(
 *  *   'base-class',
 *  *   isActive && 'active-class',
 *  *   isDisabled && 'disabled-class'
 *  * )
 *  * 
 *  * @since 1.0.0
 *  * /
 * export function cn(...classes) {
 *   // Utility implementation
 * }
 * ```
 */