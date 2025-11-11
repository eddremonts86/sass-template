# Authentication Guide

Complete guide to authentication with Clerk in this Next.js template.

## Overview

This template uses **Clerk** for authentication with automatic synchronization to **Strapi CMS**.

## Setup

### Environment Variables

```env
# .env.local
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

### Provider Setup

The Clerk provider is configured in the root layout:

```tsx
// src/app/layout.tsx
import { ClerkProvider } from '@clerk/nextjs'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <html>
        <body>{children}</body>
      </html>
    </ClerkProvider>
  )
}
```

## Usage

### Sign In/Sign Up Pages

```tsx
// src/app/[locale]/(auth)/sign-in/[[...sign-in]]/page.tsx
import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignIn />
    </div>
  )
}
```

```tsx
// src/app/[locale]/(auth)/sign-up/[[...sign-up]]/page.tsx
import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignUp />
    </div>
  )
}
```

### Accessing User Data

#### Server Components

```tsx
import { auth, currentUser } from '@clerk/nextjs/server'

export default async function DashboardPage() {
  const { userId } = await auth()
  const user = await currentUser()

  if (!userId) {
    redirect('/sign-in')
  }

  return (
    <div>
      <h1>Welcome, {user?.firstName}!</h1>
      <p>Email: {user?.emailAddresses[0].emailAddress}</p>
    </div>
  )
}
```

#### Client Components

```tsx
'use client'

import { useUser, useAuth } from '@clerk/nextjs'

export function UserProfile() {
  const { user, isLoaded, isSignedIn } = useUser()
  const { signOut } = useAuth()

  if (!isLoaded) return <div>Loading...</div>
  if (!isSignedIn) return <div>Not signed in</div>

  return (
    <div>
      <h2>{user.fullName}</h2>
      <p>{user.primaryEmailAddress?.emailAddress}</p>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  )
}
```

### Protected Routes

#### With Middleware

```tsx
// src/middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)'])

export default clerkMiddleware((auth, request) => {
  if (!isPublicRoute(request)) {
    auth().protect()
  }
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
```

#### Component-Level Protection

```tsx
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function ProtectedPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  return <div>Protected content</div>
}
```

## User Button

Pre-built component for user profile and sign out:

```tsx
import { UserButton } from '@clerk/nextjs'

export function Header() {
  return (
    <header>
      <nav>
        <UserButton afterSignOutUrl="/" />
      </nav>
    </header>
  )
}
```

## Webhook Integration

### Webhook Setup

The template includes automatic user synchronization to Strapi via webhooks:

```tsx
// src/app/api/webhooks/clerk/route.ts
import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { createTemplateUser, updateTemplateUser } from '@/lib/strapi/services/template-users'

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('CLERK_WEBHOOK_SECRET not set')
  }

  // Get headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Missing svix headers', { status: 400 })
  }

  // Get body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // Verify webhook
  const wh = new Webhook(WEBHOOK_SECRET)
  let evt: WebhookEvent

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Webhook verification failed:', err)
    return new Response('Webhook verification failed', { status: 400 })
  }

  // Handle events
  const eventType = evt.type

  if (eventType === 'user.created') {
    const { id, email_addresses, first_name, last_name } = evt.data

    await createTemplateUser({
      clerk_id: id,
      email: email_addresses[0].email_address,
      first_name: first_name || '',
      last_name: last_name || '',
    })
  }

  if (eventType === 'user.updated') {
    const { id, email_addresses, first_name, last_name } = evt.data

    await updateTemplateUser(id, {
      email: email_addresses[0].email_address,
      first_name: first_name || '',
      last_name: last_name || '',
    })
  }

  return new Response('Webhook processed', { status: 200 })
}
```

### Clerk Dashboard Configuration

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Select your application
3. Navigate to **Webhooks**
4. Click **Add Endpoint**
5. Set URL: `https://yourdomain.com/api/webhooks/clerk`
6. Subscribe to events: `user.created`, `user.updated`
7. Copy the **Signing Secret** to `CLERK_WEBHOOK_SECRET`

## State Management

User authentication state is managed via Zustand store:

```typescript
// src/stores/auth-store.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  email: string
  name: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  setUser: (user: User | null) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({ user: state.user }),
    }
  )
)
```

### Syncing Clerk State

```tsx
'use client'

import { useUser } from '@clerk/nextjs'
import { useAuthStore } from '@/stores/auth-store'
import { useEffect } from 'react'

export function AuthSync() {
  const { user, isLoaded } = useUser()
  const setUser = useAuthStore((state) => state.setUser)

  useEffect(() => {
    if (isLoaded) {
      setUser(
        user
          ? {
              id: user.id,
              email: user.primaryEmailAddress?.emailAddress || '',
              name: user.fullName || '',
            }
          : null
      )
    }
  }, [user, isLoaded, setUser])

  return null
}
```

## Customization

### Custom Sign In Page

```tsx
import { SignIn } from '@clerk/nextjs'

export default function CustomSignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="w-full max-w-md">
        <h1 className="mb-8 text-center text-3xl font-bold">Welcome Back</h1>
        <SignIn
          appearance={{
            elements: {
              rootBox: 'mx-auto',
              card: 'shadow-lg',
            },
          }}
        />
      </div>
    </div>
  )
}
```

### Custom Styling

```tsx
<ClerkProvider
  appearance={{
    layout: {
      socialButtonsVariant: 'iconButton',
    },
    variables: {
      colorPrimary: 'hsl(var(--primary))',
    },
  }}
>
  {children}
</ClerkProvider>
```

## Best Practices

1. **Always verify webhooks** - Use svix library for signature verification
2. **Use middleware** for route protection instead of component-level checks
3. **Handle loading states** - Check `isLoaded` before accessing user data
4. **Secure API routes** - Verify authentication in API handlers
5. **Store minimal data** - Keep only necessary user info in state
6. **Test webhook locally** - Use ngrok or Clerk's testing tools

## Security Considerations

- Never expose `CLERK_SECRET_KEY` in client code
- Validate all webhook payloads before processing
- Use HTTPS in production for webhook endpoints
- Implement rate limiting on authentication endpoints
- Log authentication events for security monitoring
