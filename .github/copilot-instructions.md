# Copilot Instructions - Next.js SaaS Template

## Architecture Overview

This is a **Next.js 16 (App Router)** enterprise SaaS template with:

- **Authentication**: Clerk.js with `middleware.ts` protecting routes (`/dashboard/*`, `/profile/*`, `/settings/*`)
- **i18n**: `next-intl` with locale routing (`/[locale]/...`), supports en/es/da. Config in `src/lib/i18n/config.ts`
- **State**: Zustand stores with localStorage persistence (see `src/stores/auth-store.ts`)
- **Styling**: Tailwind CSS v4 + shadcn/ui components
- **PWA**: `next-pwa` with offline support (`public/sw.js`, manifest)
- **Monitoring**: Sentry error tracking + Winston logging (`src/lib/logger.ts`, `src/lib/error-tracking.ts`)

## Critical Workflows

### Development

```bash
pnpm dev              # Dev server with --inspect for debugging
pnpm build            # Production build (must pass before completing tasks)
pnpm lint             # ESLint with custom no-hardcoded-strings rule
pnpm format:check     # Prettier validation
```

### Testing (MANDATORY before task completion)

```bash
pnpm test             # Jest unit tests (tests/unit/**)
pnpm test:e2e         # Playwright E2E (tests/e2e/**)
pnpm test:coverage    # Coverage threshold: 70% all metrics
```

### Quality Gates (ALL must pass with 0 errors/warnings)

1. `pnpm run check:spell` - cspell validation
2. `pnpm run lint` - ESLint (includes hardcoded string detection)
3. `pnpm run check:format` - Prettier formatting
4. `pnpm run build` - TypeScript compilation

**Zero tolerance policy**: No warnings or errors allowed before marking tasks complete.

## Code Conventions

### TypeScript & Typing

- **Strict mode enforced**: No `any` types, use explicit interfaces/types
- **Path aliases**: `@/` maps to `src/` (configured in `tsconfig.json`)
- **Type files**: Colocate as `types.ts` in feature folders or in `src/types/`

### Component Structure

- **Naming**: PascalCase for components, camelCase for utils/hooks
- **Organization**: Feature-based folders with `components/`, `hooks/`, `const/`, `utils/`
- **Exports**: Named exports preferred, include `index.ts` for barrel exports
- **JSDoc required**: All exported components/functions must have JSDoc

Example structure:

```
src/components/features/analytics/
├── components/
│   ├── AnalyticsChart.tsx
│   └── types.ts
├── hooks/
│   └── useAnalyticsData.ts
├── const/
│   └── chartConfig.ts
└── index.ts
```

### React Patterns (Critical for Performance)

- **Dependencies**: Never omit `useEffect`/`useMemo`/`useCallback` dependency arrays
- **Memoization**: Use `React.memo` + `useCallback` for child component props
- **State management**: Zustand for global state, local state only when needed
- **Keys**: Stable unique IDs (DB ids), never `index` or `Math.random()`
- **Async effects**: Create internal async function, don't mark `useEffect` async
- **Cleanup**: Return cleanup function in effects (AbortController, timers)

### i18n (Internationalization)

- **NO HARDCODED STRINGS**: ESLint will error on text in JSX (custom rule `no-hardcoded-strings`)
- **Use translations**: `const t = useTranslations('namespace');` then `{t('key')}`
- **Message files**: `src/lib/i18n/locales/{en,es,da}.json`
- **Locale switching**: Via `useAuthStore().setLocale()` or URL params

### Logging & Errors

- **Never use `console.*`**: Import from `src/lib/logger.ts` instead
  ```typescript
  import { log } from '@/lib/logger';
  log.error('Message', { context }, error);
  log.warn('Slow query', { duration });
  ```
- **Error tracking**: Errors automatically sent to Sentry via logger
- **Request logging**: Use `logRequest(req, res, responseTime)` in API routes

### Styling

- **Tailwind v4**: Use utility classes, Prettier plugin auto-sorts classes
- **shadcn/ui**: Components in `src/components/ui/`, use `cn()` for conditional classes
- **Dark mode**: Handled by `useAuthStore().theme` ('light'|'dark'|'system')
- **Responsive**: Mobile-first approach, use `sm:`, `md:`, `lg:` breakpoints

## Integration Points

### Authentication Flow

1. `middleware.ts` runs on every request, checks Clerk session
2. `ClerkAuthProvider` (`src/lib/auth/clerk-provider.tsx`) wraps app, syncs user to Zustand
3. Protected routes redirect to `/sign-in` if unauthenticated
4. Access user via `useAuthStore()` or Clerk's `useUser()`

### i18n Routing

1. `middleware.ts` applies `next-intl` middleware after auth check
2. Routes auto-prefixed with locale: `/dashboard` → `/en/dashboard`
3. `src/app/[locale]/layout.tsx` loads locale-specific messages
4. Root layout uses default 'en' for error boundaries

### PWA & Offline

- `next.config.ts` configures `withPWA` with `NetworkFirst` strategy
- Service worker (`public/sw.js`) caches API responses (max 200 entries)
- `src/lib/pwa.ts` utilities for install prompts

### Security Headers

- CSP configured in `next.config.ts` with Clerk/Vercel allowlist
- `src/lib/security.ts` has input sanitization utilities (DOMPurify)

## Testing Patterns

### Unit Tests (Jest)

- Location: `tests/unit/components/`, `tests/unit/hooks/`
- Setup: `jest.setup.js` includes `@testing-library/jest-dom`
- Mocks: next-intl requires mocking in test files
- Example:

  ```typescript
  import { render, screen } from '@testing-library/react';
  import Component from '@/components/Component';

  jest.mock('next-intl', () => ({
    useTranslations: () => (key: string) => key,
  }));
  ```

### E2E Tests (Playwright)

- Location: `tests/e2e/`
- Config: Multi-browser (Chromium, Firefox, WebKit, mobile)
- Base URL: `http://localhost:3000` (auto-starts dev server)
- Global setup/teardown in `tests/e2e/global-{setup,teardown}.ts`

## Key Files Reference

- **Auth**: `middleware.ts`, `src/lib/auth/clerk-provider.tsx`
- **i18n**: `src/lib/i18n/config.ts`, `src/lib/i18n/locales/*.json`
- **State**: `src/stores/auth-store.ts` (user, theme, locale, sidebar)
- **Logging**: `src/lib/logger.ts` (Winston + Sentry integration)
- **Utils**: `src/lib/utils.ts` (cn, cleanArray, etc.)
- **Progressive UI**: `src/components/ui/progressive-card.tsx` (complex task breakdown example)

## Pre-Commit Automation

Husky + lint-staged runs on staged files:

- ESLint auto-fix
- Prettier formatting
- Spell checking (cspell)

Configure in `.husky/` and `package.json` `lint-staged` section.

---

**When working on this codebase**:

1. Run quality checks early and often (`pnpm lint`, `pnpm build`)
2. Use translations for ALL user-facing text (ESLint enforces this)
3. Follow React performance patterns (proper deps, memoization)
4. Document with JSDoc, test coverage ≥70%
5. Verify zero warnings before completing any task
