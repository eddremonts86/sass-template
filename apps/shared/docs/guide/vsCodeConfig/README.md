# VS Code Configuration

This folder contains shared VS Code settings and configurations for the project. These settings ensure consistency across the development team.

## Files Overview

### `extensions.json`

Recommended VS Code extensions for the project. When you open the workspace, VS Code will prompt you to install missing recommended extensions.

**Essential Extensions:**

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Tailwind CSS IntelliSense** - Tailwind autocomplete
- **Error Lens** - Inline error display
- **Pretty TypeScript Errors** - Better TypeScript errors

### `settings.json`

Workspace-specific settings that override user settings for this project.

**Key Features:**

- Auto-format on save with Prettier
- ESLint auto-fix on save
- TypeScript strict mode
- Tailwind CSS IntelliSense configuration
- Path aliases (@/ mapping)
- File nesting patterns
- Spell checking enabled

### `launch.json`

Debug configurations for:

- Next.js server-side debugging (port 9229)
- Next.js client-side debugging (Chrome)
- Full-stack debugging
- Jest unit tests
- Playwright E2E tests
- Strapi backend debugging

**Usage:** Press `F5` or go to Run & Debug panel to select a configuration.

### `tasks.json`

Pre-configured tasks for common development workflows.

**Available Tasks:**

- `Dev: Frontend` - Start Next.js dev server
- `Dev: Backend (Strapi)` - Start Strapi dev server
- `Dev: Full Stack` - Start both frontend and backend
- `Build: Frontend` - Build frontend for production
- `Lint: Check` - Run ESLint
- `Lint: Fix` - Auto-fix ESLint issues
- `Format: Check` - Check Prettier formatting
- `Format: Write` - Format code with Prettier
- `Type Check` - Run TypeScript compiler check
- `Test: Unit` - Run Jest tests
- `Test: E2E` - Run Playwright tests
- `Quality: Full Check` - Run all quality checks in sequence

**Usage:** `Cmd+Shift+P` → "Tasks: Run Task" or `Cmd+Shift+B` for build tasks.

### `snippets.code-snippets`

Custom code snippets for faster development.

**Available Snippets:**

- `rfc` - React Functional Component
- `rfcp` - React Component with Props
- `npage` - Next.js Page
- `nlayout` - Next.js Layout
- `napi` - Next.js API Route
- `hook` - Custom React Hook
- `zustand` - Zustand Store
- `shad` - shadcn/ui Component Import
- `cn` - Tailwind cn utility
- `rtl` - React Testing Library Test
- `pwtest` - Playwright Test
- `strapi` - Strapi Service
- `usetrans` - next-intl useTranslations
- `servertrans` - Server-side translations

**Usage:** Start typing the prefix and press `Tab`.

## Getting Started

1. **Install Recommended Extensions:**
   - Open the workspace in VS Code
   - Click "Install" when prompted to install recommended extensions
   - Or manually: `Cmd+Shift+P` → "Extensions: Show Recommended Extensions"

2. **Verify Settings:**
   - Settings are automatically applied when you open the workspace
   - Check bottom-right corner for Prettier and ESLint status

3. **Start Debugging:**
   - Press `F5` to start debugging with the default configuration
   - Or select a specific debug configuration from the Run & Debug panel

4. **Run Tasks:**
   - Press `Cmd+Shift+B` to run the default build task
   - Or `Cmd+Shift+P` → "Tasks: Run Task" to see all available tasks

## Customization

### Personal Settings

To customize settings for yourself without affecting the team:

1. Open VS Code Settings (`Cmd+,`)
2. Switch to "User" tab (not "Workspace")
3. Make your changes there

### Adding New Extensions

To recommend a new extension:

1. Install the extension
2. Add its ID to `extensions.json` under `recommendations`
3. Commit the change

### Troubleshooting

**ESLint not working:**

- Check ESLint output panel: `View` → `Output` → Select "ESLint"
- Ensure you're in the correct working directory
- Run `pnpm install` to ensure dependencies are installed

**Prettier not formatting:**

- Check if `.prettierrc` exists in project root
- Verify "Format on Save" is enabled
- Check Prettier output panel for errors

**IntelliSense not working:**

- Run TypeScript: Restart TS Server (`Cmd+Shift+P`)
- Ensure `typescript.tsdk` points to workspace TypeScript
- Check if `tsconfig.json` is valid

**Path aliases not resolving:**

- Verify `tsconfig.json` has correct path mappings
- Restart TypeScript server
- Reload VS Code window

## Team Guidelines

1. **Do not modify** `.vscode/settings.json` without team discussion
2. **Always use** the configured formatter (Prettier)
3. **Fix ESLint warnings** before committing (enforced by pre-commit hooks)
4. **Install recommended extensions** for the best experience
5. **Use provided snippets** to maintain code consistency

## Additional Resources

- [VS Code Documentation](https://code.visualstudio.com/docs)
- [ESLint Rules](https://eslint.org/docs/rules/)
- [Prettier Options](https://prettier.io/docs/en/options.html)
- [Tailwind CSS IntelliSense](https://github.com/tailwindlabs/tailwindcss-intellisense)
