# Stores API Reference

API reference for Zustand stores in the template.

## useAuthStore

Global authentication and UI state store.

**Location:** `src/stores/auth-store.ts`

### State Structure

```typescript
interface AuthState {
  // User Data
  user: User | null
  isAuthenticated: boolean

  // UI Preferences
  theme: 'light' | 'dark' | 'system'
  locale: 'en' | 'es' | 'da'
  sidebarCollapsed: boolean

  // Actions
  setUser: (user: User | null) => void
  setTheme: (theme: Theme) => void
  setLocale: (locale: Locale) => void
  setSidebarCollapsed: (collapsed: boolean) => void
}
```

### Usage

#### Get State

```tsx
import { useAuthStore } from '@/stores/auth-store'

function Component() {
  const user = useAuthStore((state) => state.user)
  const theme = useAuthStore((state) => state.theme)

  return <div>{user?.name}</div>
}
```

#### Multiple Values

```tsx
const { user, theme, setTheme } = useAuthStore()
```

#### Update State

```tsx
const setTheme = useAuthStore((state) => state.setTheme)

<button onClick={() => setTheme('dark')}>
  Dark Mode
</button>
```

### Persistence

The store persists these values to localStorage:

- `theme` - User's theme preference
- `locale` - User's language preference
- `sidebarCollapsed` - Sidebar state

**Note:** `user` and `isAuthenticated` are NOT persisted (security).

### Store Definition

```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      theme: 'system',
      locale: 'en',
      sidebarCollapsed: false,

      setUser: (user) => set({
        user,
        isAuthenticated: !!user
      }),

      setTheme: (theme) => set({ theme }),

      setLocale: (locale) => set({ locale }),

      setSidebarCollapsed: (sidebarCollapsed) => set({ sidebarCollapsed }),
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
)
```

## Creating Custom Stores

### Basic Store

```typescript
import { create } from 'zustand'

interface CounterState {
  count: number
  increment: () => void
  decrement: () => void
  reset: () => void
}

export const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}))
```

### Store with Persistence

```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SettingsState {
  notifications: boolean
  emailUpdates: boolean
  toggleNotifications: () => void
  toggleEmailUpdates: () => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      notifications: true,
      emailUpdates: false,
      toggleNotifications: () =>
        set((state) => ({ notifications: !state.notifications })),
      toggleEmailUpdates: () =>
        set((state) => ({ emailUpdates: !state.emailUpdates })),
    }),
    {
      name: 'settings-store',
    }
  )
)
```

### Store with Async Actions

```typescript
import { create } from 'zustand'

interface DataState {
  data: Data | null
  loading: boolean
  error: string | null
  fetchData: () => Promise<void>
}

export const useDataStore = create<DataState>((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchData: async () => {
    set({ loading: true, error: null })

    try {
      const response = await fetch('/api/data')
      const data = await response.json()
      set({ data, loading: false })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Unknown error',
        loading: false
      })
    }
  },
}))
```

## Advanced Patterns

### Selectors

Optimize re-renders by selecting specific values:

```tsx
// Only re-renders when user changes
const user = useAuthStore((state) => state.user)

// Only re-renders when theme changes
const theme = useAuthStore((state) => state.theme)
```

### Computed Values

```typescript
export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,

  // Computed value
  getUserName: () => get().user?.name || 'Guest',

  // Computed with params
  hasPermission: (permission: string) => {
    const user = get().user
    return user?.permissions?.includes(permission) || false
  },
}))
```

### Middleware

```typescript
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export const useStore = create<State>()(
  devtools(
    (set) => ({
      // Store implementation
    }),
    { name: 'MyStore' }
  )
)
```

### Immer Integration

```typescript
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

export const useStore = create<State>()(
  immer((set) => ({
    todos: [],

    addTodo: (todo) => set((state) => {
      state.todos.push(todo) // Mutate directly with immer
    }),
  }))
)
```

## Testing Stores

```typescript
import { renderHook, act } from '@testing-library/react'
import { useAuthStore } from '@/stores/auth-store'

describe('useAuthStore', () => {
  it('should set user', () => {
    const { result } = renderHook(() => useAuthStore())

    act(() => {
      result.current.setUser({ id: '1', name: 'John' })
    })

    expect(result.current.user).toEqual({ id: '1', name: 'John' })
    expect(result.current.isAuthenticated).toBe(true)
  })

  it('should toggle theme', () => {
    const { result } = renderHook(() => useAuthStore())

    act(() => {
      result.current.setTheme('dark')
    })

    expect(result.current.theme).toBe('dark')
  })
})
```

## Best Practices

1. **Keep stores focused** - One store per domain
2. **Use selectors** - Optimize component re-renders
3. **Type everything** - Use TypeScript interfaces
4. **Avoid deep nesting** - Keep state flat
5. **Use computed values** - For derived state
6. **Persist wisely** - Only persist necessary data
7. **Don't persist secrets** - Security-sensitive data
8. **Test your stores** - Unit test all actions

## Common Patterns

### Loading States

```typescript
interface AsyncState<T> {
  data: T | null
  loading: boolean
  error: string | null
  fetch: () => Promise<void>
}
```

### Pagination

```typescript
interface PaginationState {
  page: number
  pageSize: number
  total: number
  setPage: (page: number) => void
  nextPage: () => void
  prevPage: () => void
}
```

### Form State

```typescript
interface FormState {
  values: Record<string, any>
  errors: Record<string, string>
  setValue: (key: string, value: any) => void
  setError: (key: string, error: string) => void
  reset: () => void
}
```

## Debugging

Enable Redux DevTools:

```typescript
import { devtools } from 'zustand/middleware'

export const useStore = create<State>()(
  devtools(
    (set) => ({
      // Store implementation
    }),
    {
      name: 'MyStore',
      enabled: process.env.NODE_ENV === 'development',
    }
  )
)
```

Install Redux DevTools browser extension to inspect store state and actions.
