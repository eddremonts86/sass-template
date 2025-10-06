# Copilot Integration & Project Practices for RoyaltyWeb2

## Language & Communication

- **English is mandatory** for all code, comments, documentation, and commit messages.

## Typing & TypeScript

- **Strict typing enforced**: Avoid `any`, use interfaces/types for all data structures.
- **Discriminated unions** and type guards are preferred for conditional logic.
- **Type declaration files** (`src/types/`) extend third-party libs and ambient types.
- **TypeScript config**: Path aliases (e.g., `@/components`), `skipLibCheck`, `isolatedModules`, `noEmit`.

## Code Formatting & Quality

- **Prettier**: Opinionated formatting, auto-run on save, commit, and via scripts.
  - `pnpm run format:fix` to format, `pnpm run check:format` to check.
- **ESLint**: Flat config, TypeScript/React/Tailwind plugins, Prettier integration, no-console, no-duplicate-imports.
  - `pnpm run lint` to lint & fix, auto-run pre-commit and in CI.
- **Logging**: Use centralized logger (`src/services/utils/logger.ts`) instead of `console` methods.
  - Import `logInfo`, `logWarn`, `logError`, `logDebug` from logger for consistent logging.
  - Logger provides module-based logging with configurable levels and storage.
- **Spell Checking**: `cspell` via `pnpm run check:spell` and pre-commit.
- **SonarLint**: Use in IDE for real-time code quality feedback.
- **Husky/lint-staged**: Pre-commit hooks enforce formatting, linting, and spell check on staged files only.

## Mandatory Quality Verification System

**CRITICAL REQUIREMENT**: No task can be considered complete without passing ALL quality checks. This is a MANDATORY verification system that must be executed before marking any task as finished.

### Required Quality Checks (All Must Pass):

1. **Spelling Verification**:
   - Run: `pnpm run check:spell`
   - Must return 0 errors and 0 warnings
   - Fix all typos and spelling issues before proceeding

2. **Build Compilation**:
   - Run: `pnpm run build`
   - Must complete with exit code 0
   - No TypeScript compilation errors or warnings allowed

3. **Code Linting & Formatting**:
   - Run: `pnpm run lint`
   - Run: `pnpm run check:format`
   - Must return 0 ESLint errors AND 0 warnings
   - Must pass Prettier formatting checks with no issues

4. **TypeScript Type Checking**:
   - Included in build process
   - No type errors or warnings allowed
   - Strict typing must be maintained with zero tolerance for warnings

5. **Code Quality Review**:
   - Remove unnecessary comments
   - Ensure proper JSDoc documentation
   - Verify no dead code or unused imports

### Automated Detection Procedures:

```bash
# Complete quality check sequence (must all pass)
pnpm run check:spell     # Spell check
pnpm run lint           # ESLint check
pnpm run check:format   # Prettier check
pnpm run build          # TypeScript & build check
```

### Error Notification & Correction Protocol:

1. **Detection**: Run all quality checks in sequence
2. **Notification**: Any failing check must be reported with:
   - Specific error details
   - File locations
   - Suggested fixes
3. **Correction**: ALL errors must be fixed before task completion
4. **Re-verification**: Re-run all checks after fixes
5. **Completion**: Only proceed when ALL checks pass with 0 errors/warnings

### Enforcement Rules:

- **Zero Tolerance**: No exceptions for any quality check failures (errors OR warnings)
- **Complete Coverage**: All modified files must pass quality checks with zero errors and zero warnings
- **Documentation**: All fixes must be documented in commit messages
- **Verification**: Final verification must be performed before task closure
- **Warning Policy**: Warnings are treated as failures and must be resolved before completion

## Folder & Component Architecture

- **Feature-based structure**: Organize by feature, not type.
- **Feature Organization**: Always organize features into the following categories when possible:
  - **Components**: Reusable components following atomic design principles (atoms, molecules, organisms, etc.)
  - **Hooks**: Reusable logic with hooks (camelCase, `use` prefix, business logic separated from UI)
  - **Const**: Constants and configurations
  - **Providers**: Contexts and state providers
  - **Utils**: Utility functions (camelCase)
- **Functional Grouping**: Create specific folders to group related functionalities, where each folder contains all necessary elements for a specific function.
- **Component folders**: PascalCase, include main `.tsx`, `types.ts`, `index.ts`, styles, and tests.
- **Types**: camelCase, colocated in `src/types/`.
- **Folders**: kebab-case.
- **Documentation**: Only create documentation files (.md, README) when explicitly requested. Do not create example files or explanatory documentation proactively.
- **JSDoc**: All features/components should have JSDoc comments for proper documentation.

## UI & State Patterns

- **Generic, reusable, type-safe components** (see `web-docs/README.md`).
- **Hierarchical tables**: Use generic types/utilities/hooks, no feature dependencies in global components.
- **State management**: Centralized via custom hooks/stores (Zustand), UI state mirrored in stores.
- **Error handling**: Use `ErrorAlertsList` with actionable buttons.
- **Selection logic**: Use generic `cleanArray` utility for array filtering.

## Styling & Theming

- **Tailwind CSS**: Used for all styling, with Prettier plugin for class sorting.
- **Global styles**: In `src/styles/`.

## Testing & Automation

- **Playwright**: E2E tests (`pnpm run test:app`), config in `playwright.config.ts`.
- **Unit tests**: Place next to components, use `.test.tsx` suffix.
- **Fake API**: `pnpm run fake:api` for local dev.
- **CI/CD**: Lint, format, spell, and test checks run in pipeline.

## Scripts & Workflows

- **Dev server**: `pnpm run dev` (port 3000)
- **Build**: `pnpm run build`
- **Preview**: `pnpm run preview`
- **Docs**: `pnpm run open:docs` (port 3002)
- **Test report**: `pnpm run open:report` (port 3003)
- **Code quality**: `pnpm run check:isReady` for pre-deploy checks

## IDE & Tooling

- **VS Code recommended**: Use extensions for ESLint, Prettier, SonarLint, Error Lens, Tailwind CSS IntelliSense, CodeMetrics, Import Cost, Pretty TypeScript Errors.

## Commit & Contribution

- **Conventional commits**: Enforced via commitlint.
- **Branch naming**: `feature/<name>`, `fix/<issue>`.
- **Pull requests**: Must include description, link to issues, and pass all checks.

## React Performance & Optimization Rules

**CRITICAL REQUIREMENTS**: Follow these rules to avoid unnecessary renders and infinite loops in React.

### 1. HOOK DEPENDENCIES

- `useEffect` / `useMemo` / `useCallback`: never omit the dependency array.
- Don't lie to React: if a variable is used inside the effect, it must be in the array.
- Golden rule: if ESLint (`react-hooks/exhaustive-deps`) complains, fix it, don't silence it.
- Inline objects/functions in deps ⇒ extract to `useMemo`/`useCallback` first.

### 2. LOCAL VS GLOBAL STATE

- Lift state only when truly necessary; avoid parent re-rendering all children for data only one child needs.
- Context splitting: separate heavy Contexts (auth, theme, cart) into multiple files so changes don't trigger global re-renders.
- Zustand / Jotai / Recoil > massive Context when the tree is large.

### 3. COMPONENT MEMOIZATION

- `React.memo` for child components receiving primitive or stabilized props.
- Always accompany `React.memo` with `useCallback`/`useMemo` for functions/objects passed as props.
- Custom comparison with `areEqual` only if shallow comparison isn't sufficient.

### 4. INLINE FUNCTIONS AND OBJECTS

- Define outside render any pure function that doesn't depend on props/state.
- `useCallback` for functions passed to memoized children or used in hook deps.
- `useMemo` for objects/arrays calculated from props/state.
- Avoid arrow functions in JSX (`onClick={() => …}`) unless previously memoized.

### 5. KEYS IN LISTS

- Unique and stable key (DB id, not array index).
- Don't use `Math.random()` or `Date.now()` as key.
- Re-ordering lists ⇒ key must continue identifying the same element.

### 6. ASYNC / AWAIT IN useEffect

- Don't mark `useEffect` as async; create internal async function and call immediately.
- `AbortController` / mounted flag to avoid setState on unmounted component.
- Clean timers, listeners, and subscriptions in the useEffect return.

### 7. UPDATE CYCLES

- Don't set the same state with the value it already has (React won't block it).
- Avoid effects that set state triggering the same effect ⇒ review deps.
- `useRef` for values that don't need render trigger but must persist.

### 8. EARLY CONDITIONAL RENDERING

- Early return instead of nesting JSX inside heavy conditionals.
- Lazy load (`React.lazy` + `Suspense`) for heavy routes and modals.

### 9. PROPS DRILLING

- Compose children ("slots" pattern) instead of passing props 5 levels down.
- Context or external state only when multiple levels need the same data.

### 10. DEVELOPMENT TOOLS

- React DevTools Profiler → record interaction and see which components re-render and why.
- Why did it re-render? (React DevTools → Settings → Highlight updates).
- `eslint-plugin-react-hooks` ALWAYS enabled.

### 11. SEVERE ANTI-PATTERNS

- ❌ `setState` in component body (outside useEffect/event).
- ❌ `useEffect` without deps that only "calculates" derived ⇒ use `useMemo`.
- ❌ Effect depending on itself (e.g. dep `[value]` and inside `setValue(value + 1)`).
- ❌ Directly mutating state (`push`, `splice`, etc.) ⇒ always new object/array.

### 12. QUICK CHECKLIST BEFORE PUSH

- [ ] No `useEffect` without dependency array.
- [ ] No inline function/object passed to memoized child.
- [ ] No `key={index}` or `key={Math.random()}`.
- [ ] No `setState` inside pure render.
- [ ] All derived values in `useMemo`, not in `useEffect` or render.
- [ ] `AbortController` or mounted flag in effects with fetch.
- [ ] React DevTools shows no re-render flashes in stable tree.

## References & Further Reading

- `web-docs/README.md`, `web-docs/utils/PrettierGuide.md`, `web-docs/utils/ESLintGuide.md`, `web-docs/utils/FolderStructureGuide.mdx`, `web-docs/utils/TypeScriptGuide.md`, `web-docs/general/Project.md`
- Example: `src/features/settlement/components/wizard/SettlementsRunSelection.tsx` for state, error, and selection logic.
- All features/components: see `docs/` for HTML-rendered props and usage.

---

**If any section is unclear or missing, specify which workflows, patterns, or conventions need more detail.**
