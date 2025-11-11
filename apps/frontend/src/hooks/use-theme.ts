'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/stores/auth-store';

/**
 * Custom hook for theme management
 * Integrates with Zustand store and system preferences
 */
export function useTheme() {
  const { theme, setTheme } = useAuthStore();

  /**
   * Apply theme to document on mount and theme changes
   */
  useEffect(() => {
    const root = window.document.documentElement;

    // Remove existing theme classes
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      // Use system preference
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light';
      root.classList.add(systemTheme);
    } else {
      // Use selected theme
      root.classList.add(theme);
    }
  }, [theme]);

  /**
   * Listen for system theme changes when using system theme
   */
  useEffect(() => {
    if (theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [theme]);

  /**
   * Toggle between light and dark themes
   */
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  /**
   * Set theme to system preference
   */
  const setSystemTheme = () => {
    setTheme('system');
  };

  /**
   * Get current resolved theme (useful when theme is 'system')
   */
  const getResolvedTheme = (): 'light' | 'dark' => {
    if (typeof window === 'undefined') {
      return 'light'; // Default for SSR
    }
    if (theme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }
    return theme;
  };

  return {
    theme,
    setTheme,
    toggleTheme,
    setSystemTheme,
    resolvedTheme: getResolvedTheme(),
  };
}
