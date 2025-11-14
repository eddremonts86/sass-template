# Setup Credentials Guide

This guide will help you configure the required API tokens and webhook secrets for the application.

## 1. Strapi API Token Setup

### Step 1: Start Strapi Backend

```bash
pnpm dev:backend
```

Strapi will be available at `http://localhost:1337`

### Step 2: Create Admin Account

1. Open `http://localhost:1337/admin`
2. If this is your first time, you'll see the admin registration page
3. Fill in the form:
   - **First Name**: Your first name
   - **Last Name**: Your last name
   - **Email**: Your admin email
   - **Password**: Choose a secure password (min 8 characters)
4. Click "Let's start"

### Step 3: Generate API Token

1. In the Strapi admin panel, navigate to **Settings** (gear icon in sidebar)
2. Under "Global Settings", click **API Tokens**
3. Click **+ Create new API Token** button
4. Configure the token:
   - **Name**: `Frontend App Token`
   - **Description**: `Token for Next.js frontend authentication`
   - **Token duration**: `Unlimited` (for development)
   - **Token type**: `Full access`
5. Click **Save**
6. **IMPORTANT**: Copy the generated token immediately (you won't see it again!)

### Step 4: Add Token to Frontend Environment

1. Open `apps/frontend/.env.local`
2. Find the line: `STRAPI_API_TOKEN=`
3. Paste your token:
   ```env
   STRAPI_API_TOKEN=your_generated_token_here
   ```
4. Save the file

## 2. Clerk Webhook Secret Setup

### Step 1: Access Clerk Dashboard

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Sign in to your account
3. Select your application project

### Step 2: Create Webhook Endpoint

1. In the left sidebar, click **Webhooks**
2. Click **+ Add Endpoint** button
3. Configure the webhook:
   - **Endpoint URL**: `http://localhost:3004/api/webhooks/clerk` (for development)
     - For production: `https://yourdomain.com/api/webhooks/clerk`
   - **Description**: `Sync users to Strapi`
   - **Subscribe to events**: Select the following events:
     - ✅ `user.created`
     - ✅ `user.updated`
     - ✅ `user.deleted`
4. Click **Create**

### Step 3: Get Webhook Signing Secret

1. After creating the webhook, you'll see it in the list
2. Click on your newly created webhook
3. In the webhook details page, find the **Signing Secret** section
4. Click **Copy** to copy the secret (it starts with `whsec_`)

### Step 4: Add Secret to Frontend Environment

1. Open `apps/frontend/.env.local`
2. Find the line: `CLERK_WEBHOOK_SECRET=`
3. Paste your secret:
   ```env
   CLERK_WEBHOOK_SECRET=whsec_your_signing_secret_here
   ```
4. Save the file

## 3. Verify Configuration

Your `apps/frontend/.env.local` should now have these values filled:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Strapi CMS
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
STRAPI_API_TOKEN=your_generated_strapi_token_here

# Clerk Webhook (for Strapi sync)
CLERK_WEBHOOK_SECRET=whsec_your_clerk_webhook_secret_here
```

## 4. Test the Setup

### Start All Services

```bash
pnpm dev:all
```

This will start:

- **Frontend** (Next.js) on `http://localhost:3004`
- **Backend** (Strapi) on `http://localhost:1337`
- **Docs** (VitePress) on `http://localhost:5173`

### Test User Sync

1. Open `http://localhost:3004`
2. Click **Sign Up** to create a new account
3. Complete the registration in Clerk
4. After signing up, check Strapi admin:
   - Go to `http://localhost:1337/admin`
   - Navigate to **Content Manager** → **Template Users**
   - You should see your newly created user synced from Clerk

## Troubleshooting

### Issue: Strapi API Token Not Working

**Symptoms**: API calls to Strapi return 401 Unauthorized

**Solution**:

1. Verify the token is correctly copied in `.env.local`
2. Ensure there are no extra spaces before/after the token
3. Restart the frontend dev server: `pnpm dev:frontend`
4. Try regenerating the token in Strapi admin

### Issue: Webhook Not Firing

**Symptoms**: New users in Clerk don't appear in Strapi

**Solution**:

1. Check that `CLERK_WEBHOOK_SECRET` is set in `.env.local`
2. Verify the webhook endpoint URL in Clerk dashboard
3. For local development, you may need to use a tunneling service:

   ```bash
   # Install ngrok or similar
   npx ngrok http 3004

   # Update webhook URL in Clerk to use ngrok URL
   # Example: https://abc123.ngrok.io/api/webhooks/clerk
   ```

4. Check webhook logs in Clerk dashboard for errors

### Issue: Port Already in Use

**Symptoms**: Error "Port 3004 is already in use"

**Solution**:

```bash
# Find process using the port
lsof -i :3004

# Kill the process (replace PID with actual process ID)
kill -9 PID

# Or use this one-liner
lsof -ti:3004 | xargs kill -9
```

### Issue: Database Connection Error in Strapi

**Symptoms**: Strapi fails to start with database errors

**Solution**:

1. For development, Strapi uses SQLite by default
2. Ensure `.tmp/` directory exists in `apps/backend/`
3. Check `apps/backend/.env` has correct database settings
4. Try deleting `.tmp/data.db` to start fresh (you'll lose data)

## Production Deployment

When deploying to production:

1. **Update environment variables** in your hosting platform (Vercel, Netlify, etc.)
2. **Update Clerk webhook URL** to your production domain
3. **Use PostgreSQL** for Strapi instead of SQLite
4. **Generate new API tokens** with appropriate permissions
5. **Never commit** `.env.local` or `.env` files to version control

## Next Steps

After completing this setup:

1. Read [SETUP.md](./SETUP.md) for detailed project setup
2. Check [docs/strapi/strapi-integration.md](./apps/shared/docs/strapi/strapi-integration.md) for integration details
3. Review [.github/copilot-instructions.md](./.github/copilot-instructions.md) for development guidelines
