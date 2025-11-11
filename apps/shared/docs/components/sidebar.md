# Sidebar Component

A collapsible navigation sidebar with theme support and responsive behavior.

## Location

`src/components/layouts/SmartLayout.tsx` includes the sidebar implementation.

## Features

- Collapsible/expandable
- Persistent state (localStorage)
- Responsive design
- Icon-only mode when collapsed
- Smooth animations
- Theme-aware styling

## Usage

The sidebar is automatically included in the `SmartLayout` component:

```tsx
import SmartLayout from '@/components/layouts/SmartLayout';

export default function DashboardPage() {
  return (
    <SmartLayout>
      <h1>Dashboard Content</h1>
    </SmartLayout>
  );
}
```

## Structure

```tsx
<aside
  className={cn(
    'fixed inset-y-0 left-0 z-50 transition-all duration-300',
    sidebarCollapsed ? 'w-16' : 'w-64'
  )}
>
  {/* Sidebar header */}
  <div className="flex h-16 items-center justify-between px-4">
    {!sidebarCollapsed && <Logo />}
    <Button onClick={toggleSidebar}>
      <ChevronLeft />
    </Button>
  </div>

  {/* Navigation items */}
  <nav className="space-y-1 px-2">
    {menuItems.map(item => (
      <SidebarItem key={item.href} item={item} collapsed={sidebarCollapsed} />
    ))}
  </nav>
</aside>
```

## Navigation Items

Define navigation items with icons:

```tsx
const menuItems = [
  {
    href: '/dashboard',
    icon: LayoutDashboard,
    label: 'Dashboard',
  },
  {
    href: '/analytics',
    icon: BarChart,
    label: 'Analytics',
  },
  {
    href: '/settings',
    icon: Settings,
    label: 'Settings',
  },
];
```

## Sidebar Item Component

```tsx
function SidebarItem({ item, collapsed }: SidebarItemProps) {
  const pathname = usePathname();
  const isActive = pathname === item.href;

  return (
    <Link
      href={item.href}
      className={cn(
        'flex items-center gap-3 rounded-lg px-3 py-2',
        'text-sm font-medium transition-colors',
        isActive
          ? 'bg-primary text-primary-foreground'
          : 'hover:bg-accent hover:text-accent-foreground'
      )}
    >
      <item.icon className="h-5 w-5" />
      {!collapsed && <span>{item.label}</span>}
    </Link>
  );
}
```

## State Management

The sidebar state is managed via Zustand store:

```tsx
import { useAuthStore } from '@/stores/auth-store';

function Sidebar() {
  const { sidebarCollapsed, setSidebarCollapsed } = useAuthStore();

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <aside
      className={cn(
        'transition-all duration-300',
        sidebarCollapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Sidebar content */}
    </aside>
  );
}
```

## Mobile Behavior

On mobile devices, the sidebar:

- Opens as an overlay
- Closes on route change
- Can be toggled via header button

```tsx
<div
  className={cn(
    'fixed inset-0 z-40 bg-black/50 md:hidden',
    sidebarOpen ? 'block' : 'hidden'
  )}
  onClick={() => setSidebarOpen(false)}
/>

<aside
  className={cn(
    'fixed inset-y-0 left-0 z-50 w-64 md:relative',
    'transform transition-transform duration-300 md:translate-x-0',
    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
  )}
>
  {/* Sidebar content */}
</aside>
```

## Styling

### Collapsed State

```tsx
// Icon only
<div
  className={cn(
    'flex items-center justify-center',
    sidebarCollapsed ? 'px-2' : 'px-4'
  )}
>
  <item.icon className="h-5 w-5" />
</div>
```

### Active State

```tsx
<Link
  className={cn(
    'flex items-center gap-3 rounded-lg px-3 py-2',
    isActive && 'bg-primary text-primary-foreground'
  )}
>
  {/* Item content */}
</Link>
```

## Accessibility

- Keyboard navigation with Tab and Enter
- Focus visible indicators
- ARIA labels for icon-only mode
- Semantic HTML (`<nav>`, `<aside>`)
- Screen reader announcements

## Customization

### Adding Sections

```tsx
<nav className="flex-1 space-y-6 px-2 py-4">
  <div>
    <h3 className="mb-2 px-3 text-xs font-semibold uppercase">Main</h3>
    <div className="space-y-1">
      {mainItems.map(item => (
        <SidebarItem key={item.href} item={item} />
      ))}
    </div>
  </div>

  <div>
    <h3 className="mb-2 px-3 text-xs font-semibold uppercase">Admin</h3>
    <div className="space-y-1">
      {adminItems.map(item => (
        <SidebarItem key={item.href} item={item} />
      ))}
    </div>
  </div>
</nav>
```

### Icons

Use Lucide React icons for consistency:

```tsx
import {
  LayoutDashboard,
  BarChart,
  Settings,
  Users,
  FileText,
} from 'lucide-react';
```
