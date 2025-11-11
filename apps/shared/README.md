# 📚 Shared Apps

This directory contains shared applications and documentation for the monorepo.

## Contents

### 📖 docs/

VitePress documentation site for the entire monorepo.

**Start dev server:**

```bash
# From root
pnpm docs:dev

# Access at http://localhost:5173
```

**Build documentation:**

```bash
pnpm docs:build
```

**Technologies:**

- VitePress 1.6.4
- Auto-generated sidebar from folder structure
- Markdown & MDX support

### 🎨 storybook-static/

Built Storybook component documentation (static files).

**Build Storybook:**

```bash
# From root
pnpm build-storybook

# Output to apps/shared/storybook-static/
```

**Serve locally:**

```bash
npx serve apps/shared/storybook-static
```

**Technologies:**

- Storybook 8.6.14
- Component stories from frontend app
- Interactive component documentation

## Usage

These are considered "apps" because they serve the entire monorepo:

- **docs**: Documentation for frontend, backend, and shared packages
- **storybook-static**: UI component library documentation

Both can be deployed independently or served alongside the main applications.
