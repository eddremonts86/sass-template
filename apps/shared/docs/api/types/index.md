# Types API Reference

API reference for TypeScript types and interfaces in the template.

## Strapi Types

**Location:** `src/types/strapi.ts`

### StrapiResponse

Response type for single Strapi entities.

```typescript
interface StrapiResponse<T> {
  data: {
    id: number
    attributes: T
  }
  meta?: object
}
```

### StrapiCollectionResponse

Response type for Strapi collections.

```typescript
interface StrapiCollectionResponse<T> {
  data: Array<{
    id: number
    attributes: T
  }>
  meta?: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}
```

### TemplateUser

User entity type for Strapi.

```typescript
interface TemplateUser {
  id: number
  clerk_id: string
  email: string
  first_name: string
  last_name: string
  createdAt: string
  updatedAt: string
}
```

### TemplateUserInput

Input type for creating/updating users.

```typescript
interface TemplateUserInput {
  clerk_id: string
  email: string
  first_name?: string
  last_name?: string
}
```

## Clerk Types

### User

Clerk user type (imported from @clerk/nextjs).

```typescript
interface User {
  id: string
  firstName: string | null
  lastName: string | null
  fullName: string | null
  emailAddresses: EmailAddress[]
  primaryEmailAddress: EmailAddress | null
  imageUrl: string
  // ...more fields
}
```

### EmailAddress

```typescript
interface EmailAddress {
  id: string
  emailAddress: string
  verification: Verification
}
```

## Internationalization Types

### Locale

Supported locale codes.

```typescript
type Locale = 'en' | 'es' | 'da'
```

### LocaleNames

Locale display names.

```typescript
type LocaleNames = Record<Locale, string>
```

## Theme Types

### Theme

Theme mode options.

```typescript
type Theme = 'light' | 'dark' | 'system'
```

## Component Prop Types

### Common Props

```typescript
interface ComponentProps {
  className?: string
  children?: React.ReactNode
}
```

### Layout Props

```typescript
interface LayoutProps {
  children: React.ReactNode
  params: {
    locale: Locale
  }
}
```

### Page Props

```typescript
interface PageProps {
  params: {
    locale: Locale
    [key: string]: string
  }
  searchParams?: {
    [key: string]: string | string[] | undefined
  }
}
```

## API Types

### API Response

```typescript
interface APIResponse<T = any> {
  data?: T
  error?: string
  message?: string
}
```

### API Error

```typescript
interface APIError {
  status: number
  message: string
  code?: string
}
```

## Form Types

### Form Values

```typescript
interface FormValues {
  [key: string]: string | number | boolean
}
```

### Form Errors

```typescript
interface FormErrors {
  [key: string]: string
}
```

## Utility Types

TypeScript utility types used throughout the template.

### Awaited

Unwrap Promise type.

```typescript
type User = Awaited<ReturnType<typeof fetchUser>>
```

### Partial

Make all properties optional.

```typescript
type PartialUser = Partial<User>
```

### Required

Make all properties required.

```typescript
type RequiredUser = Required<PartialUser>
```

### Pick

Pick specific properties.

```typescript
type UserBasic = Pick<User, 'id' | 'name' | 'email'>
```

### Omit

Omit specific properties.

```typescript
type UserWithoutPassword = Omit<User, 'password'>
```

### Record

Create object type with specific key/value types.

```typescript
type LocaleMessages = Record<Locale, Record<string, string>>
```

### Extract

Extract types from union.

```typescript
type ThemeMode = Extract<Theme, 'light' | 'dark'>
```

### Exclude

Exclude types from union.

```typescript
type NonSystemTheme = Exclude<Theme, 'system'>
```

## Generic Types

### Pagination

```typescript
interface Pagination<T> {
  data: T[]
  page: number
  pageSize: number
  total: number
  totalPages: number
}
```

### AsyncState

```typescript
interface AsyncState<T> {
  data: T | null
  loading: boolean
  error: Error | null
}
```

### Result

```typescript
type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E }
```

## Type Guards

### isError

```typescript
function isError(value: unknown): value is Error {
  return value instanceof Error
}
```

### isString

```typescript
function isString(value: unknown): value is string {
  return typeof value === 'string'
}
```

### isLocale

```typescript
function isLocale(value: string): value is Locale {
  return ['en', 'es', 'da'].includes(value)
}
```

## Creating Custom Types

### Interface

For object shapes.

```typescript
interface Product {
  id: number
  name: string
  price: number
  inStock: boolean
}
```

### Type Alias

For unions, intersections, and complex types.

```typescript
type Status = 'pending' | 'approved' | 'rejected'
type ID = string | number
```

### Generics

For reusable types.

```typescript
interface Response<T> {
  data: T
  status: number
}

type FetchResponse<T> = Response<T>
type UserResponse = FetchResponse<User>
```

### Intersection

Combine multiple types.

```typescript
type UserWithPermissions = User & {
  permissions: string[]
}
```

### Union

One of multiple types.

```typescript
type Input = string | number
type Result = Success | Error
```

## Best Practices

1. **Use interfaces for objects** - Better for extension
2. **Use type aliases for unions** - More flexible
3. **Prefer specific types** - Avoid `any` and `unknown`
4. **Export types** - Make them reusable
5. **Document complex types** - Add JSDoc comments
6. **Use generics** - For reusable type patterns
7. **Create type guards** - For runtime type checking
8. **Leverage utility types** - Don't reinvent the wheel

## Type Utilities

### DeepPartial

Make all properties optional recursively.

```typescript
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}
```

### DeepReadonly

Make all properties readonly recursively.

```typescript
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P]
}
```

### NonNullable

Remove null and undefined.

```typescript
type NonNullableUser = NonNullable<User | null | undefined>
```

### ReturnType

Get function return type.

```typescript
type UserData = ReturnType<typeof fetchUser>
```

### Parameters

Get function parameter types.

```typescript
type FetchParams = Parameters<typeof fetchUser>
```
