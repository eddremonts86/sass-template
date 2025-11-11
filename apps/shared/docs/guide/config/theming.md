# Theming Guide

Complete guide to theming and styling with Tailwind CSS v4 and shadcn/ui.

## Overview

This template uses:

- **Tailwind CSS v4** with PostCSS
- **shadcn/ui** for component primitives
- **CSS variables** for theme customization
- **Theme switching** (light/dark/system) via Zustand

## Theme Configuration

### CSS Variables

Theme colors are defined in `src/app/globals.css`:

```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 240 5.9% 10%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 240 5.9% 10%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 240 4.9% 83.9%;
  }
}
```

### Using Theme Colors

```tsx
// Always use Tailwind color classes
<div className="bg-background text-foreground">
  <h1 className="text-primary">Title</h1>
  <p className="text-muted-foreground">Description</p>
  <button className="bg-primary text-primary-foreground">Click me</button>
</div>
```

## Theme Switching

### Theme Provider

The theme provider is set up in the locale layout:

```tsx
// src/app/[locale]/layout.tsx
import { ThemeProvider } from 'next-themes';

export default function LocaleLayout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### useTheme Hook

```tsx
'use client';

import { useTheme as useNextTheme } from 'next-themes';

export function useTheme() {
  const { theme, setTheme, systemTheme } = useNextTheme();

  const currentTheme = theme === 'system' ? systemTheme : theme;

  const toggleTheme = () => {
    setTheme(currentTheme === 'light' ? 'dark' : 'light');
  };

  return {
    theme: currentTheme,
    setTheme,
    toggleTheme,
  };
}
```

### Theme Switcher Component

```tsx
'use client';

import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/use-theme';

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </Button>
  );
}
```

### Advanced Theme Switcher

```tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Moon, Sun, Monitor } from 'lucide-react';

export function ThemeSwitcher() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          <Sun className="mr-2 h-4 w-4" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          <Moon className="mr-2 h-4 w-4" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          <Monitor className="mr-2 h-4 w-4" />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

## Customizing Colors

### Changing Primary Color

1. Update CSS variables in `globals.css`:

```css
:root {
  --primary: 262 83% 58%; /* Purple */
  --primary-foreground: 0 0% 100%;
}

.dark {
  --primary: 262 83% 68%;
  --primary-foreground: 0 0% 0%;
}
```

2. Or use Tailwind configuration:

```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
      },
    },
  },
};
```

### Adding Custom Colors

```css
:root {
  --success: 142 76% 36%;
  --success-foreground: 0 0% 100%;
  --warning: 38 92% 50%;
  --warning-foreground: 0 0% 100%;
}
```

```tsx
<div className="bg-success text-success-foreground">Success message</div>
```

## Typography

### Font Configuration

```typescript
// src/app/layout.tsx
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html className={inter.variable}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
```

### Adding Additional Fonts

```typescript
import { Inter, Poppins } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

const poppins = Poppins({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-heading',
})

<html className={`${inter.variable} ${poppins.variable}`}>
  <body className="font-sans">
    <h1 className="font-heading">Heading</h1>
    <p className="font-sans">Body text</p>
  </body>
</html>
```

## Border Radius

### Global Radius

```css
:root {
  --radius: 0.5rem; /* Default */
}
```

### Component-Specific Radius

```tsx
<Card className="rounded-none">No radius</Card>
<Card className="rounded-md">Medium radius</Card>
<Card className="rounded-lg">Large radius</Card>
<Card className="rounded-full">Full radius</Card>
```

## Dark Mode Patterns

### Conditional Styling

```tsx
<div className="bg-white dark:bg-slate-900">
  <h1 className="text-slate-900 dark:text-white">Responsive to theme</h1>
</div>
```

### Images

```tsx
<Image
  src="/logo-light.svg"
  alt="Logo"
  className="block dark:hidden"
/>
<Image
  src="/logo-dark.svg"
  alt="Logo"
  className="hidden dark:block"
/>
```

### Dynamic Classes

```tsx
import { cn } from '@/lib/utils';

<div
  className={cn('transition-colors', isDarkMode ? 'bg-slate-900' : 'bg-white')}
>
  Content
</div>;
```

## Animations

### Tailwind Animations

```tsx
<Button className="hover:scale-105 transition-transform">
  Hover me
</Button>

<div className="animate-pulse">Loading...</div>
<div className="animate-spin">Spinner</div>
<div className="animate-bounce">Bounce</div>
```

### Custom Animations

```css
@layer base {
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .animate-fade-in {
    animation: fadeIn 0.3s ease-in;
  }
}
```

```tsx
<div className="animate-fade-in">Fades in on mount</div>
```

## Responsive Design

### Breakpoints

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  {/* Mobile: 1 col, Tablet: 2 cols, Desktop: 3 cols, Large: 4 cols */}
</div>
```

### Mobile-First Approach

```tsx
<div className="text-sm md:text-base lg:text-lg">
  Responsive text size
</div>

<div className="p-4 md:p-6 lg:p-8">
  Responsive padding
</div>
```

## Best Practices

1. **Use CSS variables** - Easy theme customization
2. **Leverage cn() utility** - Conditional class merging
3. **Mobile-first responsive** - Start small, scale up
4. **Prefer Tailwind classes** - Over custom CSS
5. **Use semantic colors** - `primary`, `destructive`, not `red-500`
6. **Test both themes** - Ensure readability in light and dark
7. **Avoid hardcoded colors** - Use theme variables
8. **Optimize dark mode** - Reduce eye strain with proper contrast

## Component Examples

### Card with Theme Support

```tsx
<Card className="bg-card text-card-foreground border-border">
  <CardHeader>
    <CardTitle className="text-foreground">Title</CardTitle>
    <CardDescription className="text-muted-foreground">
      Description
    </CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-foreground">Content</p>
  </CardContent>
</Card>
```

### Button Variants

```tsx
<Button className="bg-primary text-primary-foreground hover:bg-primary/90">
  Primary
</Button>

<Button className="bg-secondary text-secondary-foreground hover:bg-secondary/80">
  Secondary
</Button>

<Button className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
  Delete
</Button>
```

## Troubleshooting

### Theme Not Applying

1. Check `suppressHydrationWarning` on `<html>` tag
2. Verify ThemeProvider wraps app
3. Ensure `attribute="class"` is set
4. Check CSS variables are defined

### Flash of Unstyled Content

```tsx
<html suppressHydrationWarning>
  <body>
    <ThemeProvider attribute="class" disableTransitionOnChange>
      {children}
    </ThemeProvider>
  </body>
</html>
```

### Colors Not Updating

Ensure you're using `hsl(var(--color))` format in CSS:

```css
/* ✅ Correct */
background-color: hsl(var(--primary));

/* ❌ Wrong */
background-color: var(--primary);
```
