/**
 * UI Configuration Constants
 * Centralized UI settings, styles, and visual parameters
 */

export const UI_CONFIG = {
  // Layout dimensions
  layout: {
    headerHeight: '4rem',
    footerHeight: '6rem',
    sidebarWidth: '16rem',
    sidebarCollapsedWidth: '4rem',
    maxContentWidth: '1200px',
    containerPadding: '1rem',
  },

  // Animation durations (in milliseconds)
  animations: {
    fast: 150,
    normal: 300,
    slow: 500,
    sidebar: 200,
    modal: 250,
    tooltip: 100,
  },

  // Breakpoints (matching Tailwind CSS)
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Z-index layers
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
    toast: 1080,
  },

  // Border radius values
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    default: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    full: '9999px',
  },

  // Shadow configurations
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    default: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  },

  // Icon sizes
  iconSizes: {
    xs: '0.75rem',
    sm: '1rem',
    md: '1.25rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '2.5rem',
  },

  // Button configurations
  button: {
    sizes: {
      sm: {
        height: '2rem',
        padding: '0.5rem 0.75rem',
        fontSize: '0.875rem',
      },
      md: {
        height: '2.5rem',
        padding: '0.625rem 1rem',
        fontSize: '0.875rem',
      },
      lg: {
        height: '3rem',
        padding: '0.75rem 1.5rem',
        fontSize: '1rem',
      },
    },
  },

  // Input configurations
  input: {
    height: '2.5rem',
    padding: '0.625rem 0.75rem',
    fontSize: '0.875rem',
    borderWidth: '1px',
  },

  // Card configurations
  card: {
    padding: '1.5rem',
    borderRadius: '0.5rem',
    borderWidth: '1px',
  },

  // Modal configurations
  modal: {
    maxWidth: '32rem',
    padding: '1.5rem',
    borderRadius: '0.5rem',
  },

  // Toast configurations
  toast: {
    width: '24rem',
    padding: '1rem',
    borderRadius: '0.375rem',
    duration: 5000,
  },
} as const;

export type UIConfig = typeof UI_CONFIG;
