# 🎉 Strapi 5 Integration - Complete Configuration

## ✅ Created Files

### 📁 Configuration and Client

1. **`src/lib/strapi/client.ts`**
   - Custom HTTP client for Strapi 5 REST API
   - Methods: GET, POST, PUT, DELETE
   - Authentication handling with API Token
   - Support for caching and revalidation

2. **`src/lib/strapi/utils.ts`**
   - Utilities for query building with `qs`
   - Helpers to flatten Strapi responses
   - Date formatting
   - Error detection

3. **`src/lib/strapi/index.ts`**
   - Centralized exports
   - Single import point

### 📊 TypeScript Types

4. **`src/types/strapi.ts`**
   - Base Strapi types (StrapiResponse, StrapiData, etc.)
   - `TemplateUserAttributes` interface with all fields
   - Types for filters and advanced queries
   - Types for pagination

### 🔧 Services

5. **`src/lib/strapi/services/template-users.ts`**
   - Complete CRUD for template_users:
     - `getAllTemplateUsers()` - List with pagination
     - `getTemplateUserById()` - Get by Strapi ID
     - `getTemplateUserByClerkId()` - Get by Clerk ID
     - `createTemplateUser()` - Create user
     - `updateTemplateUser()` - Update by ID
     - `updateTemplateUserByClerkId()` - Update by Clerk ID
     - `deleteTemplateUser()` - Delete user
     - `syncTemplateUserFromClerk()` - Sync from Clerk
     - `searchTemplateUsers()` - Search by name/email
     - `getActiveTemplateUsers()` - Active users only

### 🔗 API Routes & Webhooks

6. **`src/app/api/webhooks/clerk/route.ts`**
   - Clerk webhook for automatic synchronization
   - Supported events: `user.created`, `user.updated`
   - Signature verification with Svix
   - Automatic synchronization with Strapi

7. **`src/app/api/users/me/route.ts`**
   - GET: Get current user
   - PATCH: Update user profile

### 🎨 Hooks & Components

8. **`src/hooks/use-strapi-user.ts`**
   - Custom hook with React Query
   - Automatic loading of Strapi user
   - Smart caching and revalidation

### 📚 Documentation

9. **`docs/strapi-integration.md`**
   - Complete configuration guide
   - Step by step to create template-users collection
   - PostgreSQL configuration
   - Clerk webhook configuration
   - Common troubleshooting

10. **`docs/strapi-examples.md`**
    - 9 practical usage examples
    - Server Components, Client Components, API Routes
    - Server Actions
    - Advanced queries
    - Best practices

## 📋 template_users Schema in Strapi

```typescript
{
  clerkId: string;          // ✅ Requerido, Único
  email: string;            // ✅ Requerido, Único
  firstName?: string;       // Opcional
  lastName?: string;        // Opcional
  username?: string;        // Opcional, Único
  imageUrl?: string;        // Opcional
  bio?: string;             // Opcional (Rich Text)
  locale?: string;          // Opcional (en, es, da)
  timezone?: string;        // Opcional
  isActive?: boolean;       // Opcional (default: true)
  lastSignInAt?: DateTime;  // Opcional
  createdAt: DateTime;      // Auto
  updatedAt: DateTime;      // Auto
  publishedAt: DateTime;    // Auto
}
```

## 🚀 Synchronization Flow

```
User registers in Clerk
         ↓
Clerk triggers webhook → /api/webhooks/clerk
         ↓
Signature verification (Svix)
         ↓
syncTemplateUserFromClerk()
         ↓
Create/Update in Strapi
         ↓
User available in template-users ✅
```

## 🔑 Required Environment Variables

```env
# Strapi
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
STRAPI_API_TOKEN=your_api_token_here

# Clerk Webhook
CLERK_WEBHOOK_SECRET=whsec_your_webhook_secret
```

## 📦 Installed Dependencies

- `qs` - Query string builder for Strapi
- `@types/qs` - TypeScript types
- `svix` - Clerk webhook verification

## 🎯 Next Steps

### 1. Set Up Strapi 5

```bash
npx create-strapi-app@latest my-strapi --quickstart
```

### 2. Create template-users Collection

See complete guide in `docs/strapi-integration.md`

### 3. Get API Token

Settings > API Tokens > Create new API Token

### 4. Configure Clerk Webhook

1. Ir a https://dashboard.clerk.com
2. Webhooks > Add Endpoint
3. URL: `https://your-domain.com/api/webhooks/clerk`
4. Events: `user.created`, `user.updated`
5. Copiar Signing Secret

### 5. Configure .env.local

Copy `.env.local.example` and fill in the values

## 💡 Usage Examples

### Server Component

```typescript
import { getTemplateUserByClerkId } from '@/lib/strapi';
import { currentUser } from '@clerk/nextjs/server';

export default async function Page() {
  const clerk = await currentUser();
  const user = await getTemplateUserByClerkId(clerk!.id);

  return <div>{user?.email}</div>;
}
```

### Client Component with Hook

```typescript
'use client';
import { useStrapiUser } from '@/hooks/use-strapi-user';

export function Profile() {
  const { strapiUser, isLoading } = useStrapiUser();

  if (isLoading) return <div>Loading...</div>;

  return <div>{strapiUser?.firstName}</div>;
}
```

### API Route

```typescript
import { getAllTemplateUsers } from '@/lib/strapi';

export async function GET() {
  const { data } = await getAllTemplateUsers({
    pagination: { page: 1, pageSize: 10 },
  });

  return Response.json({ users: data });
}
```

## 🔒 Security

- ✅ API Token server-side only (variable without `NEXT_PUBLIC_`)
- ✅ Webhooks verified with Svix
- ✅ Authentication with Clerk before accessing Strapi
- ✅ Data validation on all endpoints

## 🐛 Debugging

Check logs in:

- Next.js Terminal: Webhooks and synchronization
- Strapi Admin: Settings > Logs
- Clerk Dashboard: Webhooks > Logs

## 📖 More Information

- [Strapi 5 Docs](https://docs.strapi.io)
- [Clerk Webhooks](https://clerk.com/docs/integrations/webhooks)
- [Complete Examples](./strapi-examples.md)
