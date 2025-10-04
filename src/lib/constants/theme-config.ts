/**
 * Theme Configuration Constants
 * Centralized theme and styling configurations
 */

export const THEME_CONFIG = {
  // Color schemes
  colors: {
    primary: {
      light: 'hsl(210, 40%, 98%)',
      DEFAULT: 'hsl(222.2, 84%, 4.9%)',
      dark: 'hsl(222.2, 84%, 4.9%)',
    },
    secondary: {
      light: 'hsl(210, 40%, 96%)',
      DEFAULT: 'hsl(210, 40%, 96%)',
      dark: 'hsl(217.2, 32.6%, 17.5%)',
    },
    accent: {
      light: 'hsl(210, 40%, 96%)',
      DEFAULT: 'hsl(210, 40%, 96%)',
      dark: 'hsl(217.2, 32.6%, 17.5%)',
    },
    muted: {
      light: 'hsl(210, 40%, 96%)',
      DEFAULT: 'hsl(210, 40%, 96%)',
      dark: 'hsl(217.2, 32.6%, 17.5%)',
    },
    destructive: {
      light: 'hsl(0, 84.2%, 60.2%)',
      DEFAULT: 'hsl(0, 84.2%, 60.2%)',
      dark: 'hsl(0, 62.8%, 30.6%)',
    },
  },

  // Typography
  typography: {
    fontFamily: {
      sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular'],
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
    },
    fontWeight: {
      thin: '100',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
    lineHeight: {
      none: '1',
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
    },
  },

  // Spacing
  spacing: {
    px: '1px',
    0: '0px',
    0.5: '0.125rem',
    1: '0.25rem',
    1.5: '0.375rem',
    2: '0.5rem',
    2.5: '0.625rem',
    3: '0.75rem',
    3.5: '0.875rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '1.75rem',
    8: '2rem',
    9: '2.25rem',
    10: '2.5rem',
    11: '2.75rem',
    12: '3rem',
    14: '3.5rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    28: '7rem',
    32: '8rem',
    36: '9rem',
    40: '10rem',
    44: '11rem',
    48: '12rem',
    52: '13rem',
    56: '14rem',
    60: '15rem',
    64: '16rem',
    72: '18rem',
    80: '20rem',
    96: '24rem',
  },

  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
    none: '0 0 #0000',
  },

  // Border radius
  borderRadius: {
    none: '0px',
    sm: '0.125rem',
    DEFAULT: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },

  // Transitions
  transitions: {
    duration: {
      75: '75ms',
      100: '100ms',
      150: '150ms',
      200: '200ms',
      300: '300ms',
      500: '500ms',
      700: '700ms',
      1000: '1000ms',
    },
    timing: {
      linear: 'linear',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },

  // Component-specific configurations
  components: {
    button: {
      sizes: {
        sm: {
          height: '2rem',
          padding: '0 0.75rem',
          fontSize: '0.875rem',
        },
        md: {
          height: '2.5rem',
          padding: '0 1rem',
          fontSize: '0.875rem',
        },
        lg: {
          height: '2.75rem',
          padding: '0 2rem',
          fontSize: '0.875rem',
        },
        xl: {
          height: '3rem',
          padding: '0 2rem',
          fontSize: '1rem',
        },
      },
      variants: {
        default: {
          background: 'hsl(222.2, 84%, 4.9%)',
          color: 'hsl(210, 40%, 98%)',
          hover: 'hsl(222.2, 84%, 4.9%)/90',
        },
        destructive: {
          background: 'hsl(0, 84.2%, 60.2%)',
          color: 'hsl(210, 40%, 98%)',
          hover: 'hsl(0, 84.2%, 60.2%)/90',
        },
        outline: {
          border: '1px solid hsl(214.3, 31.8%, 91.4%)',
          background: 'hsl(0, 0%, 100%)',
          hover: 'hsl(210, 40%, 96%)',
        },
        secondary: {
          background: 'hsl(210, 40%, 96%)',
          color: 'hsl(222.2, 84%, 4.9%)',
          hover: 'hsl(210, 40%, 96%)/80',
        },
        ghost: {
          hover: 'hsl(210, 40%, 96%)',
          color: 'hsl(222.2, 84%, 4.9%)',
        },
        link: {
          color: 'hsl(222.2, 84%, 4.9%)',
          textDecoration: 'underline-offset-4',
          hover: 'underline',
        },
      },
    },
    card: {
      background: 'hsl(0, 0%, 100%)',
      border: '1px solid hsl(214.3, 31.8%, 91.4%)',
      borderRadius: '0.5rem',
      shadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    },
    input: {
      height: '2.5rem',
      padding: '0 0.75rem',
      border: '1px solid hsl(214.3, 31.8%, 91.4%)',
      borderRadius: '0.375rem',
      fontSize: '0.875rem',
      focus: {
        borderColor: 'hsl(222.2, 84%, 4.9%)',
        outline: '2px solid transparent',
        outlineOffset: '2px',
      },
    },
  },
} as const

export type ThemeConfig = typeof THEME_CONFIG