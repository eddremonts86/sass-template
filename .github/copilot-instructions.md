# Copilot Instructions - Template Trae

> **Single Source of Truth**: This document consolidates all project guidelines, code standards, and development practices for AI assistants and developers.

## Project Overview

**Next.js 15.5.4** template with App Router featuring:

- **Authentication**: Clerk.js with automatic Strapi sync
- **CMS**: Strapi 5 integration with PostgreSQL
- **i18n**: next-intl (English, Spanish, Danish)
- **UI**: shadcn/ui components + Tailwind CSS v4
- **State**: Zustand with localStorage persistence
- **Testing**: Jest + Playwright + React Testing Library
- **Quality**: Strict TypeScript, ESLint, Prettier, spell checking
- **PWA**: Service worker + manifest (production only)
- **Monitoring**: Sentry error tracking

## Mandatory Quality Verification System

**CRITICAL**: No task is complete without passing ALL checks. Zero tolerance for errors AND warnings.

### Required Checks (All Must Pass)

````bash
# Run in this exact sequence before completing ANY task
pnpm run lint            # 0 errors/warnings
pnpm run format:check    # 0 issues
pnpm run type-check      # 0 TypeScript errors
pnpm run build           # Must complete successfully
```### Quality Enforcement Rules

- **Zero Tolerance**: Warnings = Failures. Fix everything.
- **Pre-commit**: Husky + lint-staged auto-enforce on staged files
- **CI/CD**: All checks run in pipeline, failures block merges
- **Type Safety**: TypeScript strict mode enforced
- **Documentation**: All fixes documented in commit messages

## English-Only Policy

**MANDATORY**: All code, comments, documentation, and commits in English.

### What Must Be English

- ✅ Code comments (inline, block, JSDoc/TSDoc)
- ✅ Function/variable names
- ✅ Git commits (conventional commits format)
- ✅ Pull request descriptions
- ✅ **ALL documentation files (.md, .mdx)**
- ✅ **ENTIRE docs/ folder content (VitePress documentation)**
- ✅ README files
- ✅ Error messages (except user-facing i18n)
- ✅ Test descriptions
- ✅ Storybook stories and documentation
- ✅ API documentation
- ✅ Component documentation

### Exceptions

- User-facing i18n strings in `src/lib/i18n/locales/*.json`
- Test fixture data
- Example i18n content

### ESLint Enforcement

Detects Spanish keywords in comments:

```javascript
// ❌ Wrong - triggers warning
// Obtener el usuario de la base de datos

// ✅ Correct
// Get user from database
````

Detected terms: `obtener`, `crear`, `actualizar`, `eliminar`, `usuario`, `información`, `configuración`, `función`, `verificar`, `sincronizar`, `último`, `básica`, `perfil`

### Translation Help

Use AI tools (ChatGPT, Claude) to translate, then review for technical accuracy.

## Architecture Patterns

### Routing & Layouts

```
src/app/
  layout.tsx              # Root layout (Clerk provider)
  [locale]/              # Locale-based routing
    layout.tsx           # Locale layout (ThemeProvider, i18n)
    (auth)/             # Route group - auth pages
    (dashboard)/        # Route group - protected pages
    page.tsx            # Home page
```

**Critical Rules**:

- Always `await params` in layouts/pages: `const { locale } = await params`
- Call `setRequestLocale(locale)` in locale layout for server components
- Layouts cascade: Root → Locale → Route Group → Page
- Supported locales: `en` (default), `es`, `da`

### State Management

**Zustand** for global state (`src/stores/auth-store.ts`):

```typescript
// State structure
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  theme: 'light' | 'dark' | 'system';
  locale: 'en' | 'es' | 'da';
  sidebarCollapsed: boolean;
}
```

**Persistence**: Theme, locale, sidebar state → localStorage
**Auth State**: Synced from Clerk via `useUser()` hook
**Theme Management**: Use `useTheme()` hook, never local state

### Component Organization

**Feature-based** structure:

```
src/components/
  ui/               # shadcn/ui primitives (Button, Dialog, etc.)
  common/           # Shared cross-feature components
  layouts/          # Layout wrappers (SmartLayout, etc.)
  features/         # Feature-specific components by domain
    dashboard/      # Dashboard feature components
    analytics/      # Analytics feature components
    settings/       # Settings feature components
```

**Naming Conventions**:

- Components: `PascalCase` (files + folders)
- Hooks: `camelCase` with `use` prefix
- Directories: `kebab-case`
- Types: `camelCase` in `src/types/`

**Colocate**: component + types + tests + index

### Strapi 5 Integration

**Architecture**:

```
Clerk (auth) → Webhook → Next.js API → Strapi (user data)
```

**Key Files**:

- `src/lib/strapi/client.ts` - Singleton HTTP client
- `src/lib/strapi/services/template-users.ts` - User CRUD service
- `src/app/api/webhooks/clerk/route.ts` - Auto-sync webhook
- `src/types/strapi.ts` - Type definitions

**Critical Patterns**:

```typescript
// Always flatten Strapi responses
import {
  flattenStrapiResponse,
  flattenStrapiCollection,
} from '@/lib/strapi/utils';

// Single entity
const user = flattenStrapiResponse(response);

// Collection
const users = flattenStrapiCollection(response);
```

**Webhook Flow**:

1. User signs up/updates in Clerk
2. Clerk sends webhook to `/api/webhooks/clerk`
3. Verify signature with `svix` library
4. Sync data to Strapi `template-users` collection

### Styling

**Tailwind CSS v4** with PostCSS:

```typescript
// ALWAYS use cn() for conditional classes
import { cn } from '@/lib/utils';

<div className={cn(
  'base-class',
  isActive && 'active-class',
  variant === 'primary' && 'primary-variant'
)} />
```

**Theme System**:

- CSS variables in `src/app/globals.css`
- Dark mode via `class` strategy (applied to `<html>`)
- Theme provider wraps app in locale layout
- Theme state managed via Zustand store

**shadcn/ui**:

- Components in `src/components/ui/`
- Fully customizable, modify as needed
- Use Radix UI primitives under the hood

## TypeScript Standards

**Strict Mode Enabled**:

```typescript
// ✅ Correct
const data: User | null = await fetchUser();
const result: unknown = await apiCall();

// ❌ Wrong
const data: any = await fetchUser();
```

**Path Aliases**:

```typescript
// ✅ Use @/ alias
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

// ❌ Never use relative paths for src/
import { cn } from '../../../lib/utils';
```

**Type Imports**:

```typescript
// When importing only types
import type { User, AuthState } from '@/types';
```

**Interfaces vs Types**:

- Interfaces for data structures
- Types for unions/utilities/complex transformations

## React Performance Rules

**CRITICAL**: Follow to avoid infinite loops and unnecessary renders.

### Hook Dependencies

```typescript
// ✅ ALWAYS specify dependencies
useEffect(() => {
  fetchData();
}, [userId, page]); // Include ALL used variables

// ❌ NEVER omit dependencies
useEffect(() => {
  fetchData();
}); // Missing deps = ESLint error
```

### Memoization

```typescript
// ✅ Memoize objects/arrays passed as props
const config = useMemo(
  () => ({
    theme,
    locale,
  }),
  [theme, locale]
);

// ✅ Memoize functions passed to children
const handleClick = useCallback(() => {
  doSomething(userId);
}, [userId]);

// ✅ Memo components receiving stable props
const UserCard = React.memo(({ user, onClick }) => {
  // ...
});
```

### Anti-Patterns (NEVER DO THIS)

```typescript
// ❌ Setting state in render body
function Component() {
  const [count, setCount] = useState(0);
  setCount(count + 1); // INFINITE LOOP
}

// ❌ useEffect without deps for derived values
useEffect(() => {
  setFullName(firstName + ' ' + lastName); // Use useMemo instead
});

// ❌ Inline functions to memoized children
<MemoizedChild onClick={() => handleClick()} />

// ❌ Using array index as key
{items.map((item, index) => <Item key={index} />)}

// ✅ Use stable IDs
{items.map(item => <Item key={item.id} />)}
```

### Quick Checklist

- [ ] All `useEffect`/`useMemo`/`useCallback` have dependency arrays
- [ ] No inline functions/objects passed to memoized components
- [ ] No `key={index}` or `key={Math.random()}`
- [ ] No `setState` in component body
- [ ] Derived values use `useMemo`, not `useEffect`
- [ ] Async effects use `AbortController` or mounted flag
- [ ] No direct state mutation (`push`, `splice` - use spread/map/filter)

## Logging

**NEVER use console methods in production code**.

```typescript
// ✅ Correct - use centralized logger
import { log } from '@/lib/logger';

log.info('User logged in', { userId, timestamp });
log.warn('Rate limit approaching', { remaining: 10 });
log.error('API request failed', { endpoint, status }, error);
log.debug('Cache hit', { key, ttl });

// Specialized loggers
logRequest(req, res, responseTime);
logPerformance('fetchUsers', duration);
logSecurityEvent('failed_login', 'high', { ip, attempts });

// ❌ Wrong
console.log('User logged in');
console.error('Error:', error);
```

**Logger integrates with Sentry** for error tracking and breadcrumbs.

## Testing

### Unit Tests (Jest + React Testing Library)

```bash
tests/unit/
  components/
  hooks/
  lib/
```

**Run**: `pnpm test` or `pnpm test:coverage`
**Coverage threshold**: 70% (branches, functions, lines, statements)

### E2E Tests (Playwright)

```bash
tests/e2e/
  auth.spec.ts
  dashboard.spec.ts
```

**Run**:

- `pnpm test:e2e` - Headless mode
- `pnpm test:e2e:ui` - Interactive UI mode
- `pnpm test:e2e:headed` - Browser visible

**Config**: Multi-browser (Chrome, Firefox, Safari, Edge) + mobile viewports

## Development Workflows

### Essential Commands

```bash
# Development
pnpm dev              # Dev server (Turbopack + Node inspector on 127.0.0.1:9229)
pnpm build            # Production build
pnpm start            # Start production server

# Quality Checks
pnpm lint             # ESLint check + auto-fix
pnpm lint:fix         # Force fix all auto-fixable issues
pnpm format           # Format with Prettier
pnpm format:check     # Check formatting without changes
pnpm type-check       # TypeScript validation

# Testing
pnpm test             # Unit tests
pnpm test:watch       # Unit tests in watch mode
pnpm test:coverage    # Unit tests with coverage report
pnpm test:e2e         # E2E tests (Playwright)
pnpm test:e2e:ui      # E2E tests interactive mode

# Documentation
pnpm storybook        # Component documentation (port 6006)
pnpm docs:dev         # VitePress documentation dev server (port 5173)
pnpm docs:build       # Build VitePress documentation
pnpm docs:preview     # Preview built documentation

# Translation Scripts
pnpm check:translations  # Verify i18n completeness
pnpm sync:translations   # Sync missing translation keys
```

### Git Workflow

**Conventional Commits** (enforced by commitlint):

```bash
# Format
<type>(<scope>): <description>

# Examples
feat(auth): add password reset flow
fix(webhook): correct Clerk signature verification
docs(readme): update Strapi setup instructions
refactor(api): simplify user data fetching
test(hooks): add useTheme hook tests
chore(deps): update Next.js to 15.5.4
perf(images): optimize AVIF encoding
```

**Types**: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `perf`, `style`, `ci`, `build`, `revert`

**Pre-commit Hooks**:

- lint-staged runs ESLint + Prettier on staged files only
- Spell check on staged files
- Fails commit if any check fails

**Branch Naming**:

- `feature/<name>` - New features
- `fix/<issue>` - Bug fixes
- `docs/<topic>` - Documentation
- `refactor/<area>` - Code refactoring

## Environment Variables

**Required** in `.env.local`:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Strapi CMS
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
STRAPI_API_TOKEN=your_token_here

# Clerk Webhook (for Strapi sync)
CLERK_WEBHOOK_SECRET=whsec_...

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Optional: Logging
LOG_LEVEL=debug  # development | info for production
```

**Never commit** `.env.local` (already in `.gitignore`)

## Security & Performance

### Security Headers

CSP configured in `next.config.ts`:

- Strict Content-Security-Policy
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Strict-Transport-Security
- Permissions-Policy

### Image Optimization

```typescript
// next.config.ts
images: {
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
}
```

### PWA Configuration

- Disabled in development
- Service worker + manifest in `public/`
- Network-first caching strategy
- Offline fallback support

### Build Optimizations

- Turbopack for faster builds
- `removeConsole: true` in production
- Tree shaking enabled
- Bundle analysis available

## Common Gotchas & Solutions

### 1. i18n Params

```typescript
// ✅ ALWAYS await params
export default async function Page({ params }: Props) {
  const { locale } = await params; // Next.js 15+ requirement
  // ...
}

// ❌ This will error in Next.js 15+
const { locale } = params;
```

### 2. Strapi Response Structure

```typescript
// Strapi returns nested structure
const rawResponse = {
  data: {
    id: 1,
    attributes: { name: 'John', email: 'john@example.com' },
  },
};

// ✅ Always flatten
import { flattenStrapiResponse } from '@/lib/strapi/utils';
const user = flattenStrapiResponse(rawResponse);
// { id: 1, name: 'John', email: 'john@example.com' }
```

### 3. Theme Management

```typescript
// ✅ Use Zustand store (syncs across app)
import { useAuthStore } from '@/stores/auth-store';
const { theme, setTheme } = useAuthStore();

// ✅ Or use custom hook
import { useTheme } from '@/hooks/use-theme';
const { theme, setTheme, toggleTheme } = useTheme();

// ❌ Never use local state
const [theme, setTheme] = useState('dark'); // Won't sync
```

### 4. Clerk Webhook Security

```typescript
// ✅ ALWAYS verify webhook signature
import { Webhook } from 'svix';

const wh = new Webhook(WEBHOOK_SECRET);
const evt = wh.verify(body, headers); // Throws if invalid

// ❌ Never skip verification
const evt = await req.json(); // Unsafe!
```

### 5. Path Imports

```typescript
// ✅ Always use @/ alias for src/
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// ❌ Never use relative paths
import { Button } from '../../../components/ui/button';
```

### 6. Console Methods

```typescript
// ✅ Use logger
import { log } from '@/lib/logger';
log.info('Message', { meta });

// ❌ Never use console (removed in production builds)
console.log('Message');
console.error(error);
```

## Documentation & References

- **Setup Guide**: `SETUP.md` - Initial project configuration
- **Strapi Integration**: `docs/strapi/strapi-integration.md` - CMS setup and sync
- **Quick Start Strapi**: `docs/strapi/QUICK_START_STRAPI.md` - Fast Strapi setup
- **Strapi Examples**: `docs/strapi/strapi-examples.md` - Code examples
- **Component Docs**: `docs/components/overview.md` - Component documentation
- **Design Patterns**: `docs/patterns/design-patterns.md` - Architecture patterns

## IDE Recommendations

**VS Code Extensions**:

- ESLint - Code linting
- Prettier - Code formatting
- Tailwind CSS IntelliSense - Tailwind autocomplete
- Error Lens - Inline error display
- Pretty TypeScript Errors - Better error messages
- Code Metrics - Complexity analysis
- Import Cost - Bundle size inline

**Settings**:

- Format on save: enabled
- ESLint auto-fix on save: enabled
- TypeScript validation: enabled

**Last Updated**: 2025-11-11
**Template Version**: 0.1.0
**Next.js Version**: 15.5.4
**React Version**: 19.1.0
