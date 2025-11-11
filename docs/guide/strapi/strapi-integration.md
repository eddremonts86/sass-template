# Strapi 5 Integration

This project is configured to work with Strapi 5 as a headless CMS and database.

## 🚀 Initial Configuration

### 1. Install Strapi 5

```bash
# In a separate directory (outside next-js-template)
npx create-strapi-app@latest my-strapi-app --quickstart
```

### 2. Create the `template-users` collection

1. Start Strapi: `npm run develop`
2. Access `http://localhost:1337/admin`
3. Go to **Content-Type Builder** > **Create new collection type**
4. Name: `template-users` (use plural)
5. Add the following fields:

| Field          | Type      | Required | Unique | Notes                          |
| -------------- | --------- | --------- | ----- | ------------------------------ |
| clerkId        | Text      | ✅        | ✅    | User ID in Clerk        |
| email          | Email     | ✅        | ✅    | User email              |
| firstName      | Text      | ❌        | ❌    | First name                         |
| lastName       | Text      | ❌        | ❌    | Last name                       |
| username       | Text      | ❌        | ✅    | Unique username                 |
| imageUrl       | Text      | ❌        | ❌    | Profile image URL     |
| bio            | Rich Text | ❌        | ❌    | User biography          |
| locale         | Text      | ❌        | ❌    | Preferred language (en, es, da)  |
| timezone       | Text      | ❌        | ❌    | Timezone                   |
| isActive       | Boolean   | ❌        | ❌    | Active user (default: true) |
| lastSignInAt   | DateTime  | ❌        | ❌    | Last sign-in        |

6. Save and restart Strapi

### 3. Create API Token

1. Go to **Settings** > **API Tokens** > **Create new API Token**
2. Name: `Next.js Template`
3. Token duration: `Unlimited`
4. Token type: `Full access` (or custom as needed)
5. Copy the generated token

### 4. Configure Permissions

1. Go to **Settings** > **Users & Permissions Plugin** > **Roles** > **Public**
2. In **template-users**, check the necessary permissions:
   - `find` (if you need to list users publicly)
   - `findOne` (if you need to get a specific user)
3. Guarda

### 5. Environment Variables in Next.js

Copy `.env.local.example` to `.env.local` and configure:

```bash
# Strapi Configuration
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
STRAPI_API_TOKEN=tu_token_api_aqui

# Clerk Webhook Secret (para sincronización automática)
CLERK_WEBHOOK_SECRET=tu_webhook_secret_aqui
```

## 🔗 Configure Clerk Webhook

To automatically sync users from Clerk to Strapi:

### 1. Create Webhook in Clerk

1. Go to <https://dashboard.clerk.com>
2. Select your application
3. Go to **Webhooks** > **Add Endpoint**
4. Endpoint URL: `https://your-domain.com/api/webhooks/clerk`
   - For local development, use ngrok: `https://abc123.ngrok.io/api/webhooks/clerk`
5. Events to subscribe:
   - `user.created`
   - `user.updated`
6. Copy the **Signing Secret** and save it in `CLERK_WEBHOOK_SECRET`

### 2. Test webhook locally with ngrok

```bash
# Install ngrok
brew install ngrok

# Start ngrok
ngrok http 3000

# Use the ngrok URL in Clerk webhook
```

## 📝 Usage in Code

### Import services

```typescript
import {
  getAllTemplateUsers,
  getTemplateUserByClerkId,
  createTemplateUser,
  updateTemplateUser,
  syncTemplateUserFromClerk,
} from '@/lib/strapi/services/template-users';
```

### Usage examples

#### Get current user

```typescript
import { currentUser } from '@clerk/nextjs/server';
import { getTemplateUserByClerkId } from '@/lib/strapi/services/template-users';

export default async function ProfilePage() {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    return <div>Not authenticated</div>;
  }

  const strapiUser = await getTemplateUserByClerkId(clerkUser.id);

  return (
    <div>
      <h1>Profile of {strapiUser?.firstName}</h1>
      <p>Email: {strapiUser?.email}</p>
      <p>Bio: {strapiUser?.bio}</p>
    </div>
  );
}
```

#### Create or update user manually

```typescript
import { syncTemplateUserFromClerk } from '@/lib/strapi/services/template-users';
import { currentUser } from '@clerk/nextjs/server';

const clerkUser = await currentUser();

if (clerkUser) {
  const strapiUser = await syncTemplateUserFromClerk({
    id: clerkUser.id,
    emailAddresses: clerkUser.emailAddresses,
    firstName: clerkUser.firstName,
    lastName: clerkUser.lastName,
    username: clerkUser.username,
    imageUrl: clerkUser.imageUrl,
    lastSignInAt: clerkUser.lastSignInAt,
  });
}
```

#### Search users

```typescript
import { searchTemplateUsers } from '@/lib/strapi/services/template-users';

const results = await searchTemplateUsers('john');
// Search in firstName, lastName, email, username
```

#### Get users with pagination

```typescript
import { getAllTemplateUsers } from '@/lib/strapi/services/template-users';

const users = await getAllTemplateUsers({
  pagination: {
    page: 1,
    pageSize: 10,
  },
  sort: ['firstName:asc'],
  filters: {
    isActive: true,
  },
});
```

## 🗄️ Use PostgreSQL with Strapi

By default, Strapi uses SQLite. To use PostgreSQL:

### 1. Install dependencies

```bash
cd my-strapi-app
npm install pg
```

### 2. Configure `config/database.ts`

```typescript
export default ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', '127.0.0.1'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'strapi'),
      user: env('DATABASE_USERNAME', 'strapi'),
      password: env('DATABASE_PASSWORD', 'strapi'),
      ssl: env.bool('DATABASE_SSL', false) && {
        rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false),
      },
    },
    debug: false,
  },
});
```

### 3. Strapi Environment Variables

Create `.env` in your Strapi project:

```bash
DATABASE_CLIENT=postgres
DATABASE_HOST=127.0.0.1
DATABASE_PORT=5432
DATABASE_NAME=strapi
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=strapi
DATABASE_SSL=false
```

### 4. PostgreSQL Providers

Recommended options:

- **Supabase**: Free PostgreSQL + hosting
- **Neon**: Serverless PostgreSQL
- **Railway**: Easy hosting with PostgreSQL
- **Vercel Postgres**: Integration with Vercel
- **AWS RDS**: For enterprise production

## 📚 Resources

- [Documentación de Strapi 5](https://docs.strapi.io/dev-docs/intro)
- [REST API Strapi](https://docs.strapi.io/dev-docs/api/rest)
- [Strapi + Next.js](https://strapi.io/integrations/nextjs-cms)
- [Clerk Webhooks](https://clerk.com/docs/integrations/webhooks/overview)

## 🔧 Troubleshooting

### Error: "Strapi API error: 401"

- Verify that `STRAPI_API_TOKEN` is configured correctly
- Ensure the token has sufficient permissions

### Error: "Cannot find module 'qs'"

```bash
pnpm add qs @types/qs
```

### Webhook doesn't execute

- Verify the webhook URL is publicly accessible
- Check that `CLERK_WEBHOOK_SECRET` is configured
- Review Clerk Dashboard > Webhooks logs

### CORS error

Configure CORS in Strapi (`config/middlewares.ts`):

```typescript
export default [
  // ...
  {
    name: 'strapi::cors',
    config: {
      origin: ['http://localhost:3000', 'https://tu-dominio.com'],
    },
  },
  // ...
];
```
