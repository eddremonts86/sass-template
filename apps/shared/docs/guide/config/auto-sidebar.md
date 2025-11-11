# Automatic Sidebar Generation

The documentation sidebar is automatically generated from the file structure in the `docs/` folder.

## How It Works

The `scripts/generate-docs-sidebar.js` script:

1. **Scans** the `docs/` folder recursively (up to 5 levels deep)
2. **Discovers** all `.md` and `.mdx` files
3. **Organizes** them by section (guide, strapi, components, patterns, api)
4. **Groups** files logically (e.g., UI Components vs Layout Components)
5. **Updates** the VitePress configuration file automatically

## Automatic Execution

The script runs automatically before every documentation command:

```bash
# Development server - sidebar updates on start
pnpm docs:dev

# Build documentation - sidebar updates before build
pnpm docs:build

# Preview built docs - sidebar updates before preview
pnpm docs:preview
```

## Manual Execution

You can also run the script manually:

```bash
node scripts/generate-docs-sidebar.js
```

## File Organization

### Scanning Rules

The script scans these main sections:

- `/docs/guide/` - Getting Started guides
- `/docs/strapi/` - Strapi integration documentation
- `/docs/components/` - UI component documentation
- `/docs/patterns/` - Design patterns and best practices
- `/docs/api/` - API reference documentation

### Ignored Items

The following are automatically ignored:

- `.vitepress/` folder
- `public/` folder
- `node_modules/` folder
- `api/` folder (processed separately)
- `index.md` files (usually landing pages)

### File Naming

File names are automatically converted to titles:

| Filename                | Generated Title    |
| ----------------------- | ------------------ |
| `getting-started.md`    | Getting Started    |
| `QUICK_START_STRAPI.md` | Quick Start Strapi |
| `strapi-integration.md` | Strapi Integration |
| `use-theme.md`          | Use Theme          |

## Sorting Priority

Files are sorted with this priority:

1. **overview** files (e.g., `overview.md`) - Always first
2. **getting-started** files - Second
3. **quick** files (e.g., `QUICK_START_STRAPI.md`) - Third
4. **Alphabetical** - All other files

## Components Section

The Components section has special handling:

### UI Components Group

Files automatically grouped as UI Components:

- `button.md`
- `card.md`
- `form.md`
- `input.md`

- `modal.md`

- `overview.md`

### Layout Group

Files automatically grouped as Layout:

- `header.md`
- `sidebar.md`
- `footer.md`
- `navigation.md`

## Configuration Depth

The script recursively scans up to **5 levels deep** in the folder structure:

```
docs/
  └─ guide/           ← Level 1
      └─ advanced/    ← Level 2
          └─ api/     ← Level 3
              └─ ...  ← Up to Level 5
```

## Adding New Documentation

To add new documentation:

1. Create a new `.md` or `.mdx` file in the appropriate section
2. The file will be automatically discovered on next run
3. Run any docs command to regenerate the sidebar:

   ```bash
   pnpm docs:dev
   ```

## Customization

### Section Titles

Edit `folderToTitle()` function in `scripts/generate-docs-sidebar.js`:

```javascript
function folderToTitle(foldername) {
  const titleMap = {
    guide: 'Getting Started',
    components: 'UI Components',
    patterns: 'Design Patterns',
    strapi: 'Strapi Integration',
    api: 'API Documentation',
    // Add your custom mappings here
    tutorials: 'Tutorials',
    examples: 'Code Examples',
  };

  return titleMap[foldername] || filenameToTitle(foldername);
}
```

### Ignored Folders

Edit `IGNORED_FOLDERS` constant:

```javascript
const IGNORED_FOLDERS = [
  '.vitepress',
  'public',
  'node_modules',
  'api',
  // Add folders to ignore
  'drafts',
  'templates',
];
```

### Ignored Files

Edit `IGNORED_FILES` constant:

```javascript
const IGNORED_FILES = [
  'index.md',
  // Add files to ignore
  'README.md',
  'draft.md',
];
```

### Maximum Depth

Edit `MAX_DEPTH` constant:

```javascript
const MAX_DEPTH = 5; // Change to desired depth
```

## Troubleshooting

### Sidebar Not Updating

If the sidebar doesn't update:

1. **Check file location**: Ensure files are in the correct section folder
2. **Check file extension**: Only `.md` and `.mdx` files are processed
3. **Run manually**: `node scripts/generate-docs-sidebar.js`
4. **Check output**: Script shows generated configuration
5. **Verify config**: Check `docs/.vitepress/config.mjs` was updated

### Corrupted Config File

If the config file becomes corrupted:

```bash
# Restore from git
git checkout docs/.vitepress/config.mjs

# Regenerate sidebar
node scripts/generate-docs-sidebar.js
```

### Files Not Appearing

Common reasons:

- File is in `IGNORED_FILES` list
- File is in an ignored folder
- File is deeper than `MAX_DEPTH` (5 levels)
- File extension is not `.md` or `.mdx`
- Filename is `index.md` (ignored by default)

## Best Practices

1. **Use clear filenames**: They become navigation titles
2. **Follow naming conventions**: Use `kebab-case` for files
3. **Organize logically**: Put files in appropriate sections
4. **Include overview.md**: Provides section landing pages
5. **Test locally**: Run `pnpm docs:dev` to preview changes

## Example Structure

```
docs/
├── guide/
│   ├── overview.md              → "Overview" (first)
│   ├── getting-started.md       → "Getting Started" (second)
│   ├── authentication.md        → "Authentication"
│   └── deployment.md            → "Deployment"
├── components/
│   ├── overview.md              → UI Components: "Overview"
│   ├── button.md                → UI Components: "Button"
│   ├── header.md                → Layout: "Header"
│   └── footer.md                → Layout: "Footer"

└── patterns/
    ├── overview.md              → "Overview"
    ├── react.md                 → "React"
    └── javascript.md            → "Javascript"
```

Generated sidebar:

- **Guide**: Overview, Getting Started, Authentication, Deployment
- **Components**:
  - **UI Components**: Overview, Button
  - **Layout**: Header, Footer
- **Patterns**: Overview, React, Javascript

## Related Files

- **Script**: `scripts/generate-docs-sidebar.js`
- **Config**: `docs/.vitepress/config.mjs`
- **Package scripts**: `package.json` (docs:dev, docs:build, docs:preview)
