# Ejemplos de Uso de Strapi

## 📝 Server Components (Recomendado para SEO)

### Ejemplo 1: Página de Perfil

```typescript
// src/app/[locale]/profile/page.tsx
import { currentUser } from '@clerk/nextjs/server';
import { getTemplateUserByClerkId } from '@/lib/strapi';

export default async function ProfilePage() {
  const clerkUser = await currentUser();
  const strapiUser = await getTemplateUserByClerkId(clerkUser!.id);

  return (
    <div>
      <h1>Perfil de {strapiUser?.firstName}</h1>
      <p>{strapiUser?.email}</p>
    </div>
  );
}
```

### Ejemplo 2: Lista de Usuarios Activos

```typescript
// src/app/[locale]/users/page.tsx
import { getActiveTemplateUsers } from '@/lib/strapi';

export default async function UsersPage() {
  const { data: users, meta } = await getActiveTemplateUsers({
    pagination: { page: 1, pageSize: 10 },
    sort: ['createdAt:desc'],
  });

  return (
    <div>
      <h1>Usuarios Activos</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.firstName} {user.lastName} - {user.email}
          </li>
        ))}
      </ul>
      <p>Total: {meta.pagination?.total}</p>
    </div>
  );
}
```

## 🔄 Client Components (Para interactividad)

### Ejemplo 3: Hook personalizado con React Query

```typescript
// src/hooks/use-strapi-user.ts
'use client';

import { useUser } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';

export function useStrapiUser() {
  const { user: clerkUser } = useUser();

  const { data: strapiUser, isLoading } = useQuery({
    queryKey: ['strapiUser', clerkUser?.id],
    queryFn: () => fetch(`/api/users/me`).then(r => r.json()),
    enabled: !!clerkUser,
  });

  return { strapiUser, isLoading };
}
```

```typescript
// src/components/profile-card.tsx
'use client';

import { useStrapiUser } from '@/hooks/use-strapi-user';

export function ProfileCard() {
  const { strapiUser, isLoading } = useStrapiUser();

  if (isLoading) return <div>Cargando...</div>;

  return (
    <div>
      <h2>{strapiUser?.firstName}</h2>
      <p>{strapiUser?.bio}</p>
    </div>
  );
}
```

## 🔧 API Routes

### Ejemplo 4: Actualizar perfil desde API Route

```typescript
// src/app/api/users/update-profile/route.ts
import { auth } from '@clerk/nextjs/server';
import { updateTemplateUserByClerkId } from '@/lib/strapi';
import { NextResponse } from 'next/server';

export async function PATCH(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { bio, locale } = body;

  const updatedUser = await updateTemplateUserByClerkId(userId, {
    bio,
    locale,
  });

  return NextResponse.json({ user: updatedUser });
}
```

### Ejemplo 5: Buscar usuarios

```typescript
// src/app/api/users/search/route.ts
import { searchTemplateUsers } from '@/lib/strapi';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';

  const { data: users } = await searchTemplateUsers(query);

  return NextResponse.json({ users });
}
```

## 🎯 Queries Avanzadas

### Ejemplo 6: Filtros complejos

```typescript
import { getAllTemplateUsers } from '@/lib/strapi';

// Usuarios activos que han iniciado sesión en los últimos 7 días
const recentUsers = await getAllTemplateUsers({
  filters: {
    isActive: true,
    lastSignInAt: {
      $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
  },
  sort: ['lastSignInAt:desc'],
  pagination: {
    page: 1,
    pageSize: 20,
  },
});
```

### Ejemplo 7: Búsqueda con OR

```typescript
import { strapiClient, buildStrapiQuery } from '@/lib/strapi';

const params = buildStrapiQuery({
  filters: {
    $or: [
      { email: { $containsi: 'gmail' } },
      { username: { $containsi: 'admin' } },
    ],
  },
});

const response = await strapiClient.get(`/template-users?${params}`);
```

## 🔐 Server Actions (Next.js 15)

### Ejemplo 8: Server Action para actualizar bio

```typescript
// src/app/actions/update-bio.ts
'use server';

import { auth } from '@clerk/nextjs/server';
import { updateTemplateUserByClerkId } from '@/lib/strapi';
import { revalidatePath } from 'next/cache';

export async function updateBio(bio: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  const updatedUser = await updateTemplateUserByClerkId(userId, { bio });

  revalidatePath('/profile');

  return { success: true, user: updatedUser };
}
```

```typescript
// src/components/bio-form.tsx
'use client';

import { updateBio } from '@/app/actions/update-bio';
import { useState } from 'react';

export function BioForm({ initialBio }: { initialBio: string }) {
  const [bio, setBio] = useState(initialBio);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await updateBio(bio);
    alert('Bio actualizada!');
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        className="w-full rounded border p-2"
      />
      <button type="submit">Guardar</button>
    </form>
  );
}
```

## 📊 Con TanStack Table

### Ejemplo 9: Tabla de usuarios con paginación

```typescript
'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export function UsersTable() {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ['users', page],
    queryFn: () =>
      fetch(`/api/users?page=${page}&pageSize=10`).then((r) => r.json()),
  });

  if (isLoading) return <div>Cargando...</div>;

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {data.users.map((user: any) => (
            <tr key={user.id}>
              <td>
                {user.firstName} {user.lastName}
              </td>
              <td>{user.email}</td>
              <td>{user.isActive ? 'Activo' : 'Inactivo'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <button onClick={() => setPage((p) => Math.max(1, p - 1))}>
          Anterior
        </button>
        <span>Página {page}</span>
        <button onClick={() => setPage((p) => p + 1)}>Siguiente</button>
      </div>
    </div>
  );
}
```

## 🎨 Mejores Prácticas

### ✅ DO

```typescript
// ✅ Usar en Server Components para mejor SEO
const users = await getAllTemplateUsers();

// ✅ Manejar errores correctamente
try {
  const user = await getTemplateUserByClerkId(userId);
} catch (error) {
  console.error('Error:', error);
  return <ErrorComponent />;
}

// ✅ Usar React Query en Client Components
const { data, isLoading, error } = useQuery({
  queryKey: ['user', id],
  queryFn: () => fetchUser(id),
});
```

### ❌ DON'T

```typescript
// ❌ No usar await en Client Components directamente
'use client';
const user = await getTemplateUserByClerkId(userId); // Error!

// ❌ No hacer fetch sin manejo de errores
const user = await fetch('/api/users/me').then((r) => r.json());

// ❌ No exponer el STRAPI_API_TOKEN en el cliente
const token = process.env.STRAPI_API_TOKEN; // Solo en server!
```
