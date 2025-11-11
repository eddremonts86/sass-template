# Navigation Component

Responsive navigation components for routing and menu systems.

## Primary Navigation

```tsx
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navigationItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/products', label: 'Products' },
  { href: '/contact', label: 'Contact' },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-6">
      {navigationItems.map(item => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'hover:text-primary text-sm font-medium transition-colors',
            pathname === item.href ? 'text-foreground' : 'text-muted-foreground'
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
```

## Mobile Navigation

```tsx
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            onClick={() => setIsOpen(false)}
          />
          <nav className="bg-background fixed inset-y-0 left-0 z-50 w-64 p-6 md:hidden">
            <div className="flex flex-col gap-4">
              {navigationItems.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        </>
      )}
    </>
  );
}
```

## Breadcrumb Navigation

```tsx
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-2 text-sm">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {index > 0 && (
              <ChevronRight className="text-muted-foreground h-4 w-4" />
            )}
            {item.href ? (
              <Link
                href={item.href}
                className="text-muted-foreground hover:text-foreground"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
```

### Usage

```tsx
<Breadcrumb
  items={[
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Laptop' },
  ]}
/>
```

## Tab Navigation

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function TabNavigation() {
  return (
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <div className="py-4">Overview content</div>
      </TabsContent>

      <TabsContent value="analytics">
        <div className="py-4">Analytics content</div>
      </TabsContent>

      <TabsContent value="reports">
        <div className="py-4">Reports content</div>
      </TabsContent>

      <TabsContent value="settings">
        <div className="py-4">Settings content</div>
      </TabsContent>
    </Tabs>
  );
}
```

## Dropdown Navigation

```tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

export function DropdownNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1">
        Products
        <ChevronDown className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link href="/products/software">Software</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/products/hardware">Hardware</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/products/services">Services</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

## Pagination Navigation

```tsx
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {pages.map(page => (
        <Button
          key={page}
          variant={currentPage === page ? 'default' : 'outline'}
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
      ))}

      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </nav>
  );
}
```

## Vertical Navigation

```tsx
export function VerticalNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {navigationItems.map(item => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2',
            'text-sm font-medium transition-colors',
            pathname === item.href
              ? 'bg-primary text-primary-foreground'
              : 'hover:bg-accent hover:text-accent-foreground'
          )}
        >
          <item.icon className="h-5 w-5" />
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}
```

## Accessibility

- Use semantic `<nav>` elements
- Provide `aria-label` for navigation regions
- Use `aria-current="page"` for active links
- Keyboard navigation with Tab and Enter
- Focus visible indicators
- Screen reader announcements

## Best Practices

1. **Use Next.js Link** for client-side navigation
2. **Highlight active routes** for clarity
3. **Provide mobile alternatives** for complex navigation
4. **Use breadcrumbs** for deep hierarchies
5. **Keep navigation consistent** across pages
6. **Test keyboard navigation** thoroughly
7. **Ensure sufficient color contrast**
