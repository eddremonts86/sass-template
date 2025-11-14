# Quick Reference Guide

## Keyboard Shortcuts

### Code Navigation

- `Cmd+P` - Quick file open
- `Cmd+Shift+O` - Go to symbol in file
- `Cmd+T` - Go to symbol in workspace
- `F12` - Go to definition
- `Shift+F12` - Go to references
- `Alt+F12` - Peek definition
- `Cmd+Shift+F` - Search in workspace
- `Cmd+Click` - Go to definition

### Editing

- `Cmd+D` - Select next occurrence
- `Cmd+Shift+L` - Select all occurrences
- `Alt+Click` - Add cursor
- `Cmd+Alt+Up/Down` - Add cursor above/below
- `Cmd+/` - Toggle line comment
- `Shift+Alt+A` - Toggle block comment
- `Alt+Up/Down` - Move line up/down
- `Shift+Alt+Up/Down` - Copy line up/down
- `Cmd+Shift+K` - Delete line

### Code Actions

- `Cmd+.` - Quick fix
- `F2` - Rename symbol
- `Shift+Alt+F` - Format document
- `Cmd+K Cmd+F` - Format selection
- `Cmd+Shift+O` - Organize imports

### Debugging

- `F5` - Start/Continue debugging
- `F9` - Toggle breakpoint
- `F10` - Step over
- `F11` - Step into
- `Shift+F11` - Step out
- `Shift+F5` - Stop debugging

### Terminal

- `` Ctrl+` `` - Toggle terminal
- `Cmd+Shift+C` - Open new terminal
- `Cmd+K` - Clear terminal

### Workspace

- `Cmd+B` - Toggle sidebar
- `Cmd+J` - Toggle panel
- `Cmd+Shift+E` - Explorer
- `Cmd+Shift+F` - Search
- `Cmd+Shift+G` - Source control
- `Cmd+Shift+D` - Run & Debug
- `Cmd+Shift+X` - Extensions

## Code Snippets Quick Reference

### React/Next.js

| Prefix    | Description                |
| --------- | -------------------------- |
| `rfc`     | React Functional Component |
| `rfcp`    | React Component with Props |
| `npage`   | Next.js Page               |
| `nlayout` | Next.js Layout             |
| `napi`    | Next.js API Route          |

### Hooks & State

| Prefix        | Description               |
| ------------- | ------------------------- |
| `hook`        | Custom React Hook         |
| `zustand`     | Zustand Store             |
| `usetrans`    | next-intl useTranslations |
| `servertrans` | Server-side translations  |

### UI & Styling

| Prefix | Description                |
| ------ | -------------------------- |
| `shad` | shadcn/ui Component Import |
| `cn`   | Tailwind cn utility        |

### Testing

| Prefix   | Description                |
| -------- | -------------------------- |
| `rtl`    | React Testing Library Test |
| `pwtest` | Playwright E2E Test        |

### Backend

| Prefix   | Description    |
| -------- | -------------- |
| `strapi` | Strapi Service |

## Common Tasks

### Start Development

1. Press `Cmd+Shift+P`
2. Type "Tasks: Run Task"
3. Select "Dev: Full Stack"

Or press `Cmd+Shift+B` and select build task.

### Run Tests

- Unit: `Cmd+Shift+P` → "Tasks: Run Task" → "Test: Unit"
- E2E: `Cmd+Shift+P` → "Tasks: Run Task" → "Test: E2E"
- Current File: Use Jest debug configuration in Run & Debug panel

### Format & Lint

- Format: `Shift+Alt+F` (or auto on save)
- Fix ESLint: `Cmd+Shift+P` → "ESLint: Fix all auto-fixable Problems"
- Run all checks: `Cmd+Shift+P` → "Tasks: Run Task" → "Quality: Full Check"

### Debug

1. Set breakpoints with `F9`
2. Press `F5` to start debugging
3. Choose configuration:
   - "Next.js: debug server-side" - for server components/API routes
   - "Next.js: debug client-side" - for client components
   - "Full Stack Debug" - both server and client

### Search

- **In Files**: `Cmd+Shift+F`
- **Symbol**: `Cmd+T`
- **In Current File**: `Cmd+F`
- **Replace**: `Cmd+Alt+F`

## Extension Quick Tips

### ESLint

- View problems: `Cmd+Shift+M`
- Auto-fix: `Cmd+.` on error/warning
- Fix all: `Cmd+Shift+P` → "ESLint: Fix all auto-fixable Problems"

### Prettier

- Format on save is enabled by default
- Manual format: `Shift+Alt+F`
- Check output: `View` → `Output` → Select "Prettier"

### Tailwind CSS IntelliSense

- Auto-complete: Start typing class names
- Hover: See computed values
- Color preview: Inline color swatches

### Error Lens

- Errors shown inline in code
- Warnings shown inline
- Customize colors in settings

### GitLens

- View file history: `Cmd+Shift+P` → "GitLens: Show File History"
- Blame annotations: `Cmd+Shift+P` → "GitLens: Toggle Line Blame Annotations"
- Compare: `Cmd+Shift+P` → "GitLens: Compare References"

### Path Intellisense

- Auto-complete paths as you type
- Works with `@/` alias
- Supports all file types

### TODO Tree

- View all TODOs: Click icon in sidebar
- Add TODO: Type `// TODO: description`
- Supported tags: TODO, FIXME, HACK, BUG, XXX

## Performance Tips

1. **Exclude node_modules from search** - Already configured
2. **Use workspace TypeScript** - Prompt appears automatically
3. **Disable unused extensions** - Keep only what you need
4. **Use file nesting** - Already configured for cleaner explorer
5. **Use workspace trust** - Improve security and performance

## Troubleshooting Quick Fixes

### "Extension not working"

1. `Cmd+Shift+P` → "Developer: Reload Window"
2. Check extension is installed and enabled
3. Check output panel for errors

### "TypeScript not finding imports"

1. `Cmd+Shift+P` → "TypeScript: Restart TS Server"
2. Check `tsconfig.json` is valid
3. Run `pnpm install`

### "ESLint/Prettier conflict"

1. Check `.eslintrc.js` has Prettier integration
2. Disable conflicting formatters
3. Reload window

### "Path alias not working"

1. Check `tsconfig.json` paths configuration
2. Restart TypeScript server
3. Check `settings.json` path-intellisense.mappings

### "Slow performance"

1. Close unused tabs
2. Exclude large folders from search
3. Disable unused extensions
4. Check for infinite TypeScript compilation

## Useful Commands

### Package Management

```bash
pnpm install           # Install dependencies
pnpm add <package>     # Add package
pnpm remove <package>  # Remove package
pnpm update            # Update packages
```

### Development

```bash
pnpm dev              # Start dev server
pnpm build            # Production build
pnpm start            # Start production server
pnpm lint             # Run ESLint
pnpm format           # Format with Prettier
pnpm type-check       # TypeScript check
```

### Testing

```bash
pnpm test             # Run unit tests
pnpm test:watch       # Unit tests in watch mode
pnpm test:coverage    # With coverage
pnpm test:e2e         # E2E tests
pnpm test:e2e:ui      # E2E with UI
```

### Documentation

```bash
pnpm storybook        # Component docs
pnpm docs:dev         # VitePress docs
```

## Tips & Tricks

### Multi-cursor editing

1. `Alt+Click` to add cursors
2. `Cmd+D` to select next occurrence
3. `Cmd+Shift+L` to select all occurrences

### Quick file switching

- `Cmd+P` then type filename
- Use fuzzy search (e.g., "btn" finds "button.tsx")

### Zen mode

- `Cmd+K Z` for distraction-free coding
- Press `Esc` twice to exit

### Split editor

- `Cmd+\` to split editor
- `Cmd+1/2/3` to switch between groups

### Markdown preview

- `Cmd+K V` to open preview side-by-side
- `Cmd+Shift+V` to toggle preview

### Source control

- `Cmd+Enter` in commit message to commit
- Stage files with `+` icon or `Cmd+Enter` on changes
- View diff with click on changed file
