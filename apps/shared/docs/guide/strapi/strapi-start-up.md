# 🚀 Quick Start - Strapi 5 Integration

## ⚡ Executive Summary

Your Next.js project is **completely configured** to work with Strapi 5. You only need:

1. ✅ Install Strapi 5
2. ✅ Create the `template-users` collection
3. ✅ Configure environment variables
4. ✅ (Optional) Configure Clerk webhook

## 🔥 Quick Start (5 minutes)

### Step 1: Install Strapi

```bash
# In a SEPARATE directory
npx create-strapi-app@latest my-strapi --quickstart
cd my-strapi
npm run develop
```

### Step 2: Create template-users Collection

1. Open `http://localhost:1337/admin`
2. Content-Type Builder > Create new collection type
3. Name: `template-users`
4. Add these fields:

| Field        | Type     | Required | Unique |
| ------------ | -------- | -------- | ------ |
| clerkId      | Text     | ✅       | ✅     |
| email        | Email    | ✅       | ✅     |
| firstName    | Text     | ❌       | ❌     |
| lastName     | Text     | ❌       | ❌     |
| username     | Text     | ❌       | ✅     |
| imageUrl     | Text     | ❌       | ❌     |
| bio          | RichText | ❌       | ❌     |
| locale       | Text     | ❌       | ❌     |
| timezone     | Text     | ❌       | ❌     |
| isActive     | Boolean  | ❌       | ❌     |
| lastSignInAt | DateTime | ❌       | ❌     |

5. Save and wait for restart

### Step 3: Get API Token

1. Settings > API Tokens > Create new API Token
2. Name: `Next.js Template`
3. Token type: `Full access`
4. **COPY THE TOKEN** (shown only once)

### Step 4: Configure .env.local

```bash
# In your Next.js project
cp .env.local.example .env.local
```

Edit `.env.local` and add:

```env
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
STRAPI_API_TOKEN=el_token_que_copiaste_arriba
```

### Step 5: Ready! 🎉

Your integration is complete. Test with:

```typescript
// src/app/test-strapi/page.tsx
import { getAllTemplateUsers } from '@/lib/strapi';

export default async function TestPage() {
  const { data } = await getAllTemplateUsers();

  return (
    <div>
      <h1>Users in Strapi: {data.length}</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
```

## 🔄 Automatic Synchronization with Clerk (Optional)

For users to be automatically created in Strapi when they register:

### 1. Configure Webhook in Clerk

1. <https://dashboard.clerk.com> > Your App > Webhooks
2. Add Endpoint
3. URL: `https://your-domain.com/api/webhooks/clerk`
   - Local: Use ngrok → `ngrok http 3000`
4. Events: `user.created`, `user.updated`
5. Copy the **Signing Secret**

### 2. Add to .env.local

```env
CLERK_WEBHOOK_SECRET=whsec_el_signing_secret
```

## 📖 Available API

### Import services

```typescript
import {
  getAllTemplateUsers,
  getTemplateUserByClerkId,
  createTemplateUser,
  updateTemplateUser,
  syncTemplateUserFromClerk,
  searchTemplateUsers,
} from '@/lib/strapi';
```

### Ejemplos

```typescript
// Get all users
const { data, meta } = await getAllTemplateUsers({
  pagination: { page: 1, pageSize: 10 },
  sort: ['createdAt:desc'],
});

// Get current user
const clerk = await currentUser();
const user = await getTemplateUserByClerkId(clerk!.id);

// Search users
const results = await searchTemplateUsers('john');

// Update user
await updateTemplateUser(userId, {
  firstName: 'John',
  bio: 'Developer from Spain',
});
```

## 🐛 Troubleshooting

### Error: "Strapi API error: 401"

→ Verify that `STRAPI_API_TOKEN` is configured correctly

### Error: "Cannot find module 'qs'"

```bash
pnpm add qs @types/qs
```

### Webhook doesn't work

1. Verify the URL is publicly accessible
2. Check `CLERK_WEBHOOK_SECRET`
3. Review logs in Clerk Dashboard > Webhooks

### User doesn't appear in Strapi

1. Verify the webhook is configured
2. Review Next.js server logs
3. Create manually: `await syncTemplateUserFromClerk(clerkUser)`

## 📚 Complete Documentation

- **Detailed Guide**: [`docs/strapi-integration.md`](./strapi-integration.md)
- **Code Examples**: [`docs/strapi-examples.md`](./strapi-examples.md)
- **Complete Configuration**: [`docs/STRAPI_SETUP.md`](./STRAPI_SETUP.md)

## 🎯 Recommended Next Steps

1. ✅ Configure PostgreSQL for production
2. ✅ Add more collections based on your app
3. ✅ Configure granular permissions in Strapi
4. ✅ Implement rate limiting on webhooks
5. ✅ Add tests for Strapi services

## 💡 Tips

- **Development**: Use SQLite (comes by default with Strapi)
- **Production**: Use PostgreSQL with Supabase/Neon/Railway
- **Cache**: Strapi data is automatically cached
- **Revalidation**: Use `revalidatePath()` after mutations

---

**Need help?** Check the complete documentation or open an issue.
