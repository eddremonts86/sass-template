# Utils API Reference

API reference for utility functions in the template.

## cn (Class Name Utility)

Merge Tailwind CSS classes with proper conflict resolution.

**Location:** `src/lib/utils.ts`

**Signature:**

```typescript
function cn(...inputs: ClassValue[]): string
```

**Usage:**

```tsx
import { cn } from '@/lib/utils'

<div className={cn(
  'base-class',
  isActive && 'active-class',
  variant === 'primary' && 'primary-variant',
  className
)} />
```

**Examples:**

```tsx
cn('text-red-500', 'text-blue-500') // 'text-blue-500' (later wins)
cn('px-4 py-2', { 'bg-blue-500': isPrimary }) // Conditional classes
cn('base', undefined, null, 'additional') // Filters falsy values
```

## Strapi Utilities

### flattenStrapiResponse

Flatten a single Strapi entity response.

**Location:** `src/lib/strapi/utils.ts`

**Signature:**

```typescript
function flattenStrapiResponse<T>(response: StrapiResponse<T>): T
```

**Usage:**

```typescript
import { flattenStrapiResponse } from '@/lib/strapi/utils'

const rawUser = await strapiClient.get('/template-users/1')
const user = flattenStrapiResponse(rawUser)
// { id: 1, name: 'John', email: 'john@example.com' }
```

### flattenStrapiCollection

Flatten a Strapi collection response.

**Location:** `src/lib/strapi/utils.ts`

**Signature:**

```typescript
function flattenStrapiCollection<T>(response: StrapiCollectionResponse<T>): T[]
```

**Usage:**

```typescript
import { flattenStrapiCollection } from '@/lib/strapi/utils'

const rawUsers = await strapiClient.get('/template-users')
const users = flattenStrapiCollection(rawUsers)
// [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }]
```

## Logger Utilities

### log

Centralized logging utility with Sentry integration.

**Location:** `src/lib/logger.ts`

**Signature:**

```typescript
const log = {
  debug: (message: string, meta?: object) => void
  info: (message: string, meta?: object) => void
  warn: (message: string, meta?: object) => void
  error: (message: string, meta?: object, error?: Error) => void
}
```

**Usage:**

```typescript
import { log } from '@/lib/logger'

log.info('User logged in', { userId, timestamp })
log.warn('Rate limit approaching', { remaining: 10 })
log.error('API request failed', { endpoint, status }, error)
log.debug('Cache hit', { key, ttl })
```

### logRequest

Log HTTP requests.

**Location:** `src/lib/logger.ts`

**Signature:**

```typescript
function logRequest(
  req: Request,
  res: Response,
  responseTime: number
): void
```

### logPerformance

Log performance metrics.

**Location:** `src/lib/logger.ts`

**Signature:**

```typescript
function logPerformance(
  operation: string,
  duration: number,
  meta?: object
): void
```

### logSecurityEvent

Log security-related events.

**Location:** `src/lib/logger.ts`

**Signature:**

```typescript
function logSecurityEvent(
  event: string,
  severity: 'low' | 'medium' | 'high',
  meta?: object
): void
```

## Security Utilities

### sanitizeInput

Sanitize user input.

**Location:** `src/lib/security.ts`

**Signature:**

```typescript
function sanitizeInput(input: string): string
```

### validateCSRF

Validate CSRF tokens.

**Location:** `src/lib/security.ts`

**Signature:**

```typescript
function validateCSRF(token: string, secret: string): boolean
```

## Date/Time Utilities

### formatDate

Format dates based on locale.

**Usage:**

```typescript
import { useFormatter } from 'next-intl'

const format = useFormatter()
const formatted = format.dateTime(new Date(), {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})
```

### formatRelativeTime

Format relative time (e.g., "2 hours ago").

**Usage:**

```typescript
import { useFormatter } from 'next-intl'

const format = useFormatter()
const relative = format.relativeTime(pastDate)
```

## Validation Utilities

### Zod Schemas

Common validation schemas using Zod.

**Location:** Throughout the codebase

**Examples:**

```typescript
import * as z from 'zod'

// Email validation
const emailSchema = z.string().email()

// Password validation
const passwordSchema = z.string().min(8).regex(/[A-Z]/)

// Phone validation
const phoneSchema = z.string().regex(/^\+?[1-9]\d{1,14}$/)

// Custom validation
const userSchema = z.object({
  name: z.string().min(2).max(50),
  email: emailSchema,
  age: z.number().min(18).max(120),
})
```

## String Utilities

### capitalize

Capitalize first letter of string.

```typescript
function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
```

### slugify

Convert string to URL-safe slug.

```typescript
function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
```

### truncate

Truncate string to specified length.

```typescript
function truncate(str: string, length: number): string {
  return str.length > length ? str.slice(0, length) + '...' : str
}
```

## Array Utilities

### chunk

Split array into chunks.

```typescript
function chunk<T>(array: T[], size: number): T[][] {
  return Array.from(
    { length: Math.ceil(array.length / size) },
    (_, i) => array.slice(i * size, i * size + size)
  )
}
```

### unique

Remove duplicates from array.

```typescript
function unique<T>(array: T[]): T[] {
  return [...new Set(array)]
}
```

### groupBy

Group array items by key.

```typescript
function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((acc, item) => {
    const group = String(item[key])
    acc[group] = acc[group] || []
    acc[group].push(item)
    return acc
  }, {} as Record<string, T[]>)
}
```

## Object Utilities

### pick

Pick specific keys from object.

```typescript
function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  return keys.reduce((acc, key) => {
    if (key in obj) acc[key] = obj[key]
    return acc
  }, {} as Pick<T, K>)
}
```

### omit

Omit specific keys from object.

```typescript
function omit<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result = { ...obj }
  keys.forEach(key => delete result[key])
  return result
}
```

## Best Practices

1. **Import only what you need** - Tree-shaking optimization
2. **Type your utilities** - Use TypeScript generics
3. **Write pure functions** - Avoid side effects
4. **Document complex logic** - Add JSDoc comments
5. **Test utilities** - Unit test all helper functions
6. **Keep functions small** - Single responsibility principle
7. **Use lodash sparingly** - Native methods are often sufficient
