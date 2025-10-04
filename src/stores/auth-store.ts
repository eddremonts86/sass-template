import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Locale } from '@/lib/i18n/config';

/**
 * User interface for authenticated user data
 */
export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
}

/**
 * Theme type definition
 */
export type Theme = 'light' | 'dark' | 'system';

/**
 * Auth store state interface
 */
interface AuthState {
  // User data
  user: User | null;
  isAuthenticated: boolean;
  
  // UI preferences
  theme: Theme;
  locale: Locale;
  sidebarCollapsed: boolean;
  
  // Actions
  setUser: (user: User | null) => void;
  setAuthenticated: (authenticated: boolean) => void;
  setTheme: (theme: Theme) => void;
  setLocale: (locale: Locale) => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  reset: () => void;
}

/**
 * Initial state for the auth store
 */
const initialState = {
  user: null,
  isAuthenticated: false,
  theme: 'system' as Theme,
  locale: 'en' as Locale,
  sidebarCollapsed: false,
};

/**
 * Zustand store for authentication and user preferences
 * Persisted in localStorage for user preferences
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      ...initialState,
      
      setUser: (user: User | null) => {
        set({ user, isAuthenticated: !!user });
      },
      
      setAuthenticated: (authenticated: boolean) => {
        set({ isAuthenticated: authenticated });
        if (!authenticated) {
          set({ user: null });
        }
      },
      
      setTheme: (theme: Theme) => {
        set({ theme });
        // Apply theme to document
        if (typeof window !== 'undefined') {
          const root = window.document.documentElement;
          root.classList.remove('light', 'dark');
          
          if (theme === 'system') {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            root.classList.add(systemTheme);
          } else {
            root.classList.add(theme);
          }
        }
      },
      
      setLocale: (locale: Locale) => {
    set({ locale });
  },
      
      setSidebarCollapsed: (collapsed: boolean) => {
        set({ sidebarCollapsed: collapsed });
      },
      
      reset: () => {
        set(initialState);
      },
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({
        theme: state.theme,
        locale: state.locale,
        sidebarCollapsed: state.sidebarCollapsed,
      }),
    }
  )
);