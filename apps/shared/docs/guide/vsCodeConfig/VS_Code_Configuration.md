# VS Code Configuration Setup Complete ✅

This document summarizes the VS Code configuration created for team collaboration.

## Created Files

### 1. `.vscode/extensions.json`

**Purpose:** Recommend essential VS Code extensions to the team

**Key Extensions:**

- ESLint & Prettier (code quality)
- Tailwind CSS IntelliSense
- TypeScript error improvements
- Testing tools (Jest, Playwright)
- Git tools (GitLens, Git Graph)
- Productivity tools (TODO Tree, Better Comments)

### 2. `.vscode/settings.json`

**Purpose:** Shared workspace settings for consistency

**Key Features:**

- Auto-format on save with Prettier
- ESLint auto-fix on save
- TypeScript strict mode with inlay hints
- Tailwind CSS configuration
- Path aliases (@/ mapping)
- File nesting patterns
- Spell checking with custom dictionary
- Terminal and editor preferences

### 3. `.vscode/launch.json`

**Purpose:** Debug configurations for different scenarios

**Available Configs:**

- Next.js server-side debugging (port 9229)
- Next.js client-side debugging (Chrome & Firefox)
- Full-stack debugging (compound)
- Jest unit tests (current file & all tests)
- Playwright E2E tests
- Strapi backend debugging

### 4. `.vscode/tasks.json`

**Purpose:** Pre-configured tasks for common workflows

**Available Tasks:**

- Development (Frontend, Backend, Full Stack)
- Build (Frontend, Backend)
- Linting (Check, Fix)
- Formatting (Check, Write)
- Type checking
- Testing (Unit, E2E, Coverage)
- Quality checks (combined)
- Storybook & Documentation
- Translation management

### 5. `.vscode/snippets.code-snippets`

**Purpose:** Custom code snippets for faster development

**Available Snippets:**

- React components (rfc, rfcp)
- Next.js pages and layouts (npage, nlayout, napi)
- Custom hooks (hook)
- Zustand stores (zustand)
- shadcn/ui imports (shad)
- Tailwind utilities (cn)
- Testing (rtl, pwtest)
- Strapi services (strapi)
- Internationalization (usetrans, servertrans)

### 6. `.vscode/README.md`

**Purpose:** Comprehensive documentation for the team

**Contents:**

- Overview of all configuration files
- Getting started guide
- Customization instructions
- Troubleshooting tips
- Team guidelines

### 7. `.vscode/QUICK_REFERENCE.md`

**Purpose:** Quick access to common commands and shortcuts

**Contents:**

- Keyboard shortcuts
- Code snippets reference
- Common tasks
- Extension tips
- Terminal commands
- Tips & tricks

### 8. `next-js-template.code-workspace`

**Purpose:** Multi-folder workspace configuration

**Features:**

- Organized folder structure (Root, Frontend, Backend, Shared)
- Workspace-specific search exclusions
- Extension recommendations
- Launch and task configurations

## How to Use

### For Team Members

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd next-js-template
   ```

2. **Open in VS Code**

   ```bash
   code .
   ```

3. **Install recommended extensions**
   - VS Code will prompt: "This workspace has extension recommendations"
   - Click "Install All" or "Show Recommendations"
   - Wait for all extensions to install

4. **Reload VS Code**
   - Press `Cmd+Shift+P`
   - Type "Developer: Reload Window"
   - Press Enter

5. **Verify setup**
   - Check bottom-right corner for Prettier and ESLint status
   - Open any TypeScript file - you should see type hints
   - Try formatting with `Shift+Alt+F`

### Alternative: Open Workspace File

```bash
code next-js-template.code-workspace
```

This provides a better multi-folder experience with organized navigation.

## What Gets Shared

✅ **Shared (committed to git):**

- `.vscode/` folder (all configuration)
- `next-js-template.code-workspace`

❌ **Not shared (in .gitignore):**

- `.vscode/settings.json` user overrides
- Personal VS Code settings

## Benefits

### 1. Consistency

- Everyone uses the same formatter (Prettier)
- Same linting rules (ESLint)
- Identical code style

### 2. Productivity

- Pre-configured debug setups
- Common tasks available via `Cmd+Shift+B`
- Helpful code snippets
- Auto-formatting on save

### 3. Quality

- ESLint auto-fix on save
- TypeScript strict mode
- Spell checking enabled
- Pre-commit hooks (Husky)

### 4. Onboarding

- New team members get everything they need
- Extension recommendations auto-appear
- Documentation included

## Customization

### Personal Settings (Not Shared)

To customize settings without affecting the team:

1. Open VS Code Settings (`Cmd+,`)
2. Switch to "User" tab (not "Workspace")
3. Make your personal changes

### Adding Team Extensions

To recommend a new extension:

1. Install the extension locally
2. Get its ID from the extension page
3. Add to `.vscode/extensions.json`:
   ```json
   {
     "recommendations": ["existing.extensions", "new.extension-id"]
   }
   ```
4. Commit and push

### Modifying Shared Settings

⚠️ **Important:** Always discuss with the team before modifying:

- `.vscode/settings.json`
- `.vscode/launch.json`
- `.vscode/tasks.json`

## Troubleshooting

### Extensions not installing

```bash
# Clear extension cache
rm -rf ~/.vscode/extensions
# Reopen VS Code and try again
```

### Settings not applying

1. `Cmd+Shift+P` → "Developer: Reload Window"
2. Close and reopen VS Code
3. Check for conflicting user settings

### ESLint not working

1. Check output panel: `View` → `Output` → Select "ESLint"
2. Run `pnpm install` to ensure dependencies exist
3. Reload VS Code window

### Prettier conflicts with ESLint

This shouldn't happen - configuration is already set up with:

- `eslint-config-prettier` (disables conflicting rules)
- Prettier runs after ESLint

## Additional Resources

### Documentation

- [VS Code Documentation](https://code.visualstudio.com/docs)
- [ESLint Rules](https://eslint.org/docs/rules/)
- [Prettier Options](https://prettier.io/docs/en/options.html)
- [Tailwind IntelliSense](https://github.com/tailwindlabs/tailwindcss-intellisense)

### Project Documentation

- `README.md` - Project overview
- `SETUP.md` - Setup instructions
- `.github/copilot-instructions.md` - AI coding guidelines
- `apps/shared/docs/` - Component & pattern documentation

## Maintenance

### Keep Extensions Updated

Periodically review and update recommended extensions:

1. Check for newer/better alternatives
2. Remove deprecated extensions
3. Update extension IDs if changed

### Review Settings

Every few months:

1. Review workspace settings for outdated configs
2. Update TypeScript/ESLint/Prettier settings
3. Add new best practices

### Update Documentation

When making changes:

1. Update `.vscode/README.md`
2. Update this summary document
3. Notify team of significant changes

## Quick Checklist for New Team Members

- [ ] Clone repository
- [ ] Open in VS Code
- [ ] Install recommended extensions (click prompt)
- [ ] Reload VS Code window
- [ ] Run `pnpm install`
- [ ] Verify formatting works (`Shift+Alt+F`)
- [ ] Verify ESLint works (check status bar)
- [ ] Try a code snippet (type `rfc` + Tab)
- [ ] Run a task (`Cmd+Shift+B`)
- [ ] Read `.vscode/README.md`
- [ ] Review `.github/copilot-instructions.md`

## Support

If you encounter issues:

1. **Check documentation:** `.vscode/README.md` and `.vscode/QUICK_REFERENCE.md`
2. **Ask the team:** Slack/Teams channel
3. **Check logs:** VS Code Output panels (ESLint, Prettier, TypeScript)
4. **Try fresh start:** Reload window or restart VS Code

---

**Last Updated:** November 14, 2025
**Configuration Version:** 1.0.0
**Compatible with:** VS Code 1.80+
