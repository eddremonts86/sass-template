# Header Component

The main navigation header component with responsive design and theme support.

## Location

`src/components/layouts/SmartLayout.tsx` includes the header implementation.

## Features

- Responsive design (mobile & desktop)
- Theme switcher integration
- Locale selector
- User authentication state
- Sidebar toggle (mobile)
- Smooth animations

## Usage

The header is automatically included in the `SmartLayout` component:

```tsx
import SmartLayout from '@/components/layouts/SmartLayout'

export default function Page() {
  return (
    <SmartLayout>
      <div>Page content</div>
    </SmartLayout>
  )
}
```

## Components

### Logo Section

```tsx
<div className="flex items-center gap-2">
  <Logo className="h-8 w-8" />
  <span className="text-xl font-bold">App Name</span>
</div>
```

### Navigation Links

```tsx
<nav className="hidden md:flex items-center gap-6">
  <Link href="/dashboard">Dashboard</Link>
  <Link href="/analytics">Analytics</Link>
  <Link href="/settings">Settings</Link>
</nav>
```

### User Section

```tsx
<div className="flex items-center gap-4">
  <ThemeSwitcher />
  <LocaleSelector />
  <UserButton />
</div>
```

## Customization

### Adding Navigation Items

Edit the header section in `SmartLayout.tsx`:

```tsx
const navigationItems = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/analytics', label: 'Analytics' },
  { href: '/settings', label: 'Settings' },
  // Add your items here
]

<nav className="hidden md:flex items-center gap-6">
  {navigationItems.map(item => (
    <Link
      key={item.href}
      href={item.href}
      className="text-sm font-medium hover:text-primary"
    >
      {item.label}
    </Link>
  ))}
</nav>
```

### Styling

The header uses Tailwind CSS classes and respects the theme:

```tsx
<header className={cn(
  'sticky top-0 z-50 w-full border-b',
  'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'
)}>
  {/* Header content */}
</header>
```

## Mobile Responsiveness

On mobile devices, the header shows:

- Hamburger menu button
- Logo
- Essential actions (theme, user)

```tsx
<Button
  variant="ghost"
  size="icon"
  className="md:hidden"
  onClick={() => setSidebarOpen(!sidebarOpen)}
>
  <Menu className="h-5 w-5" />
</Button>
```

## Integration with Clerk

The header integrates with Clerk for authentication:

```tsx
import { UserButton } from '@clerk/nextjs'

<div className="flex items-center gap-4">
  <UserButton afterSignOutUrl="/" />
</div>
```

## Accessibility

- Semantic HTML (`<header>`, `<nav>`)
- Keyboard navigation support
- ARIA labels on interactive elements
- Focus management
- Color contrast compliance
