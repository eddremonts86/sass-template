# Footer Component

A flexible footer component for site-wide navigation and information.

## Basic Footer

```tsx
export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Company */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              <li>
                <Link href="/careers">Careers</Link>
              </li>
            </ul>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Product</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/features">Features</Link>
              </li>
              <li>
                <Link href="/pricing">Pricing</Link>
              </li>
              <li>
                <Link href="/docs">Documentation</Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy">Privacy</Link>
              </li>
              <li>
                <Link href="/terms">Terms</Link>
              </li>
              <li>
                <Link href="/cookies">Cookies</Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Follow Us</h3>
            <div className="flex gap-4">
              <Link href="https://twitter.com" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="https://github.com" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="https://linkedin.com" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="text-muted-foreground mt-8 border-t pt-8 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
```

## Minimal Footer

```tsx
export function MinimalFooter() {
  return (
    <footer className="border-t py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} Your Company
          </p>
          <nav className="flex gap-4 text-sm">
            <Link href="/privacy" className="hover:underline">
              Privacy
            </Link>
            <Link href="/terms" className="hover:underline">
              Terms
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
```

## Newsletter Footer

```tsx
export function NewsletterFooter() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
  };

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        {/* Newsletter Section */}
        <div className="mb-8 text-center">
          <h3 className="mb-2 text-xl font-semibold">Stay Updated</h3>
          <p className="text-muted-foreground mb-4 text-sm">
            Subscribe to our newsletter for the latest updates
          </p>
          <form onSubmit={handleSubmit} className="mx-auto flex max-w-md gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>

        {/* Links and Info */}
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <Logo className="mb-4 h-8 w-8" />
            <p className="text-muted-foreground text-sm">
              Building amazing products for amazing people.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/blog">Blog</Link>
              </li>
              <li>
                <Link href="/support">Support</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold">Contact</h4>
            <p className="text-muted-foreground text-sm">
              Email: hello@example.com
              <br />
              Phone: +1 234 567 890
            </p>
          </div>
        </div>

        <div className="text-muted-foreground mt-8 border-t pt-8 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
```

## Usage in Layout

```tsx
import { Footer } from '@/components/common/Footer';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
```

## Styling

The footer automatically adapts to the current theme:

```tsx
<footer
  className={cn(
    'border-t',
    'bg-background text-foreground',
    'dark:border-border dark:bg-background'
  )}
>
  {/* Footer content */}
</footer>
```

## Accessibility

- Semantic `<footer>` element
- Proper heading hierarchy
- ARIA labels for social links
- Keyboard navigable links
- Color contrast compliance

## Customization

### Add Logo

```tsx
<div className="flex items-center gap-2">
  <Logo className="h-8 w-8" />
  <span className="text-lg font-bold">Your Brand</span>
</div>
```

### Add Language Selector

```tsx
import { LocaleSelector } from '@/components/common/LocaleSelector';

<div className="flex items-center justify-center gap-4">
  <LocaleSelector />
  <ThemeSwitcher />
</div>;
```
