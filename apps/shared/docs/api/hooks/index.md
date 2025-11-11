# Hooks API Reference

API reference for all custom hooks in the template.

## useTheme

Hook for managing theme state.

**Location:** `src/hooks/use-theme.ts`

**Usage:**

```tsx
import { useTheme } from '@/hooks/use-theme'

function Component() {
  const { theme, setTheme, toggleTheme } = useTheme()

  return <button onClick={toggleTheme}>Toggle Theme</button>
}
```

**Return Type:**

```typescript
interface UseThemeReturn {
  theme: 'light' | 'dark' | 'system' | undefined
  setTheme: (theme: 'light' | 'dark' | 'system') => void
  toggleTheme: () => void
}
```

## useStrapiUser

Hook for fetching and managing Strapi user data.

**Location:** `src/hooks/use-strapi-user.ts`

**Usage:**

```tsx
import { useStrapiUser } from '@/hooks/use-strapi-user'

function UserProfile() {
  const { user, loading, error, refetch } = useStrapiUser()

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return <div>{user?.name}</div>
}
```

**Return Type:**

```typescript
interface UseStrapiUserReturn {
  user: TemplateUser | null
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}
```

## useAIGuidance

Hook for AI-powered code guidance.

**Location:** `src/hooks/use-ai-guidance.ts`

**Usage:**

```tsx
import { useAIGuidance } from '@/hooks/use-ai-guidance'

function CodeEditor() {
  const { getSuggestion, loading } = useAIGuidance()

  const handleRequest = async () => {
    const suggestion = await getSuggestion('How to optimize this code?')
    console.log(suggestion)
  }

  return <button onClick={handleRequest}>Get Suggestion</button>
}
```

**Return Type:**

```typescript
interface UseAIGuidanceReturn {
  getSuggestion: (prompt: string) => Promise<string>
  loading: boolean
  error: string | null
}
```

## React Hooks

Standard React hooks used throughout the template.

### useState

```tsx
const [state, setState] = useState<T>(initialValue)
```

### useEffect

```tsx
useEffect(() => {
  // Effect code
  return () => {
    // Cleanup
  }
}, [dependencies])
```

### useMemo

```tsx
const memoizedValue = useMemo(() => {
  return computeExpensiveValue(a, b)
}, [a, b])
```

### useCallback

```tsx
const memoizedCallback = useCallback(() => {
  doSomething(a, b)
}, [a, b])
```

### useRef

```tsx
const ref = useRef<HTMLDivElement>(null)
```

## Next.js Hooks

### useRouter

```tsx
import { useRouter } from 'next/navigation'

const router = useRouter()
router.push('/dashboard')
router.back()
router.refresh()
```

### usePathname

```tsx
import { usePathname } from 'next/navigation'

const pathname = usePathname()
```

### useParams

```tsx
import { useParams } from 'next/navigation'

const params = useParams()
const locale = params.locale
```

### useSearchParams

```tsx
import { useSearchParams } from 'next/navigation'

const searchParams = useSearchParams()
const query = searchParams.get('q')
```

## Clerk Hooks

### useUser

```tsx
import { useUser } from '@clerk/nextjs'

const { user, isLoaded, isSignedIn } = useUser()
```

### useAuth

```tsx
import { useAuth } from '@clerk/nextjs'

const { userId, signOut } = useAuth()
```

## next-intl Hooks

### useTranslations

```tsx
import { useTranslations } from 'next-intl'

const t = useTranslations('namespace')
const text = t('key')
```

### useLocale

```tsx
import { useLocale } from 'next-intl'

const locale = useLocale()
```

### useFormatter

```tsx
import { useFormatter } from 'next-intl'

const format = useFormatter()
const formattedDate = format.dateTime(new Date())
const formattedNumber = format.number(1234.56)
```

## Zustand Hooks

### useAuthStore

```tsx
import { useAuthStore } from '@/stores/auth-store'

const { user, theme, setTheme } = useAuthStore()
```

**Store Structure:**

```typescript
interface AuthState {
  user: User | null
  isAuthenticated: boolean
  theme: 'light' | 'dark' | 'system'
  locale: 'en' | 'es' | 'da'
  sidebarCollapsed: boolean
  setUser: (user: User | null) => void
  setTheme: (theme: Theme) => void
  setLocale: (locale: Locale) => void
  setSidebarCollapsed: (collapsed: boolean) => void
}
```

## Creating Custom Hooks

### Basic Pattern

```tsx
export function useCustomHook() {
  const [state, setState] = useState()

  useEffect(() => {
    // Effect
  }, [])

  const helper = useCallback(() => {
    // Logic
  }, [])

  return { state, helper }
}
```

### With TypeScript

```tsx
interface UseCustomHookReturn {
  data: Data | null
  loading: boolean
  error: Error | null
}

export function useCustomHook(): UseCustomHookReturn {
  const [data, setData] = useState<Data | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  return { data, loading, error }
}
```

## Best Practices

1. **Prefix with "use"** - Follow React naming convention
2. **Type everything** - Use TypeScript for return types
3. **Specify dependencies** - Always provide dependency arrays
4. **Handle cleanup** - Return cleanup function from useEffect
5. **Memoize callbacks** - Use useCallback for functions passed as props
6. **Extract logic** - Move reusable logic to custom hooks
7. **Test hooks** - Use @testing-library/react-hooks
