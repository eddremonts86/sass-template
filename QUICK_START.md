# Quick Start Guide

Get the project running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- pnpm installed (`npm install -g pnpm`)
- Git installed

## Step 1: Install Dependencies

```bash
pnpm install
```

## Step 2: Start Strapi Backend

```bash
pnpm dev:backend
```

Wait for Strapi to start, then:

1. Open http://localhost:1337/admin
2. Create your admin account (first time only)
3. Navigate to **Settings** → **API Tokens**
4. Create a new token with **Full access**
5. Copy the token

Keep Strapi running in this terminal.

## Step 3: Configure Environment Variables

Open a new terminal and edit `apps/frontend/.env.local`:

```env
# Add your Strapi token here
STRAPI_API_TOKEN=paste_your_token_here
```

## Step 4: Start All Services

```bash
pnpm dev:all
```

This starts:

- **Frontend**: http://localhost:3004
- **Backend**: http://localhost:1337
- **Docs**: http://localhost:5173

## Step 5: Test It Out

1. Open http://localhost:3004
2. Click **Sign Up**
3. Create an account with Clerk
4. You should be redirected to the dashboard

## What's Next?

### Complete Webhook Setup (Optional)

For user sync between Clerk and Strapi, follow [SETUP_CREDENTIALS.md](./SETUP_CREDENTIALS.md) to:

- Configure Clerk webhooks
- Set up webhook signing secrets

### Explore the Documentation

- **Full Setup**: [SETUP.md](./SETUP.md)
- **Credentials Guide**: [SETUP_CREDENTIALS.md](./SETUP_CREDENTIALS.md)
- **Strapi Integration**: [docs/strapi/strapi-integration.md](./apps/shared/docs/guide/strapi/strapi-integration.md)
- **Component Docs**: http://localhost:5173 (when docs are running)

### Development Commands

```bash
# Run only frontend
pnpm dev:frontend

# Run only backend
pnpm dev:backend

# Run only docs
pnpm docs:dev

# Run everything
pnpm dev:all

# Build for production
pnpm build

# Run tests
pnpm test
pnpm test:e2e

# Lint and format
pnpm lint
pnpm format
```

## Common Issues

### Port Already in Use

```bash
# Kill process on port 3004
lsof -ti:3004 | xargs kill -9

# Kill process on port 1337
lsof -ti:1337 | xargs kill -9
```

### Strapi Database Issues

```bash
# Delete database and start fresh (loses data!)
rm -rf apps/backend/.tmp/data.db
pnpm dev:backend
```

### Missing Environment Variables

Check `apps/frontend/.env.local` exists and has:

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `STRAPI_API_TOKEN`

## Need Help?

- Read the full [SETUP.md](./SETUP.md)
- Check [SETUP_CREDENTIALS.md](./SETUP_CREDENTIALS.md) for detailed credential setup
- Review the documentation at http://localhost:5173

Happy coding! 🚀
