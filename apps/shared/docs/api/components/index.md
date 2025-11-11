# Components API Reference

API reference for all components in the template.

## UI Components

Components from shadcn/ui located in `src/components/ui/`.

### Button

```tsx
import { Button } from '@/components/ui/button'
```

**Props:**

```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  asChild?: boolean
}
```

**Example:**

```tsx
<Button variant="destructive" size="lg">
  Delete
</Button>
```

### Input

```tsx
import { Input } from '@/components/ui/input'
```

**Props:**

```typescript
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
```

### Card

```tsx
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
```

**Props:**

```typescript
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}
```

### Dialog

```tsx
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
```

**Props:**

```typescript
interface DialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  defaultOpen?: boolean
}
```

## Layout Components

Located in `src/components/layouts/`.

### SmartLayout

Main layout component with header, sidebar, and content area.

```tsx
import SmartLayout from '@/components/layouts/SmartLayout'
```

**Props:**

```typescript
interface SmartLayoutProps {
  children: React.ReactNode
}
```

**Usage:**

```tsx
<SmartLayout>
  <div>Page content</div>
</SmartLayout>
```

## Common Components

Shared components located in `src/components/common/`.

### ThemeSwitcher

Theme toggle component.

```tsx
import { ThemeSwitcher } from '@/components/common/ThemeSwitcher'
```

**Props:** None

**Usage:**

```tsx
<ThemeSwitcher />
```

### LocaleSelector

Language selector component.

```tsx
import { LocaleSelector } from '@/components/common/LocaleSelector'
```

**Props:** None

**Usage:**

```tsx
<LocaleSelector />
```

## Type Definitions

All component prop types are exported from component files:

```tsx
import type { ButtonProps } from '@/components/ui/button'
import type { CardProps } from '@/components/ui/card'
```

## Best Practices

1. Always import components from their full path
2. Use TypeScript for proper type checking
3. Spread props with `{...props}` for extensibility
4. Use `asChild` prop when needed for Radix primitives
5. Check component documentation for specific APIs
