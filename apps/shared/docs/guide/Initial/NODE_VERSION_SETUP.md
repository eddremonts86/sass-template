# Node.js Version Setup

This project requires **Node.js v22.11.0** for Strapi compatibility with SQLite.

## Automatic Setup

Run the setup script to automatically install and configure the correct Node.js version:

```bash
pnpm setup
```

This script will:

1. ✅ Check if NVM is installed (install if needed)
2. ✅ Install Node.js v22.11.0 (if not already installed)
3. ✅ Switch to Node.js v22.11.0
4. ✅ Install dependencies with pnpm
5. ✅ Rebuild better-sqlite3 native bindings

## Manual Setup

### 1. Install NVM

If you don't have NVM installed:

```bash
# macOS/Linux
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

# Then restart your terminal or run:
source ~/.bashrc  # or ~/.zshrc
```

### 2. Install and Use Node.js v22.11.0

```bash
# Install Node.js v22.11.0
nvm install 22.11.0

# Use it for this project
nvm use 22.11.0

# Or use the .nvmrc file
nvm use
```

### 3. Install Dependencies

```bash
pnpm install
```

### 4. Rebuild Native Modules

```bash
pnpm rebuild better-sqlite3
```

## Auto-load Node Version

To automatically switch to the correct Node version when entering this directory, add this to your `~/.zshrc` or `~/.bashrc`:

```bash
# Auto-load .nvmrc
autoload -U add-zsh-hook
load-nvmrc() {
  local nvmrc_path="$(nvm_find_nvmrc)"
  if [ -n "$nvmrc_path" ]; then
    local nvmrc_node_version=$(nvm version "$(cat "${nvmrc_path}")")
    if [ "$nvmrc_node_version" = "N/A" ]; then
      nvm install
    elif [ "$nvmrc_node_version" != "$(nvm version)" ]; then
      nvm use
    fi
  fi
}
add-zsh-hook chpwd load-nvmrc
load-nvmrc
```

## Why Node.js v22?

- **Strapi 5.30.1** requires Node.js `>=18.0.0 <=22.x.x`
- **better-sqlite3** native bindings are compiled for specific Node versions
- Using Node.js v24 causes `NODE_MODULE_VERSION` mismatch errors

## Database Configuration

The project is configured to use **SQLite by default** with support for **PostgreSQL**.

### SQLite (Default)

```env
# apps/backend/.env
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
```

### PostgreSQL (Optional)

```env
# apps/backend/.env
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=strapi_template
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
DATABASE_SSL=false
```

Both `pg` and `better-sqlite3` are installed to support switching between databases.

## Troubleshooting

### Error: "better-sqlite3 bindings not found"

Run:

```bash
pnpm rebuild better-sqlite3
```

### Error: "Unsupported engine"

You're using Node.js v24+. Switch to v22:

```bash
nvm use 22.11.0
```

### Error: "NODE_MODULE_VERSION mismatch"

The native module was compiled for a different Node version:

```bash
nvm use 22.11.0
pnpm rebuild better-sqlite3
```

## Quick Reference

```bash
# Check current Node version
node -v

# List installed versions
nvm list

# Switch to project version
nvm use

# Run setup script
pnpm setup

# Start development
pnpm dev
```
