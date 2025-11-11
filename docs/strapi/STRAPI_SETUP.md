# 🎉 Integración con Strapi 5 - Configuración Completa

## ✅ Archivos Creados

### 📁 Configuración y Cliente

1. **`src/lib/strapi/client.ts`**
   - Cliente HTTP personalizado para Strapi 5 REST API
   - Métodos: GET, POST, PUT, DELETE
   - Manejo de autenticación con API Token
   - Soporte para caching y revalidación

2. **`src/lib/strapi/utils.ts`**
   - Utilidades para query building con `qs`
   - Helpers para aplanar respuestas de Strapi
   - Formateo de fechas
   - Detección de errores

3. **`src/lib/strapi/index.ts`**
   - Exportaciones centralizadas
   - Punto único de importación

### 📊 Tipos TypeScript

4. **`src/types/strapi.ts`**
   - Tipos base de Strapi (StrapiResponse, StrapiData, etc.)
   - Interfaz `TemplateUserAttributes` con todos los campos
   - Tipos para filtros y queries avanzados
   - Tipos para paginación

### 🔧 Servicios

5. **`src/lib/strapi/services/template-users.ts`**
   - CRUD completo para template_users:
     - `getAllTemplateUsers()` - Listar con paginación
     - `getTemplateUserById()` - Obtener por ID de Strapi
     - `getTemplateUserByClerkId()` - Obtener por Clerk ID
     - `createTemplateUser()` - Crear usuario
     - `updateTemplateUser()` - Actualizar por ID
     - `updateTemplateUserByClerkId()` - Actualizar por Clerk ID
     - `deleteTemplateUser()` - Eliminar usuario
     - `syncTemplateUserFromClerk()` - Sincronizar desde Clerk
     - `searchTemplateUsers()` - Buscar por nombre/email
     - `getActiveTemplateUsers()` - Solo usuarios activos

### 🔗 API Routes & Webhooks

6. **`src/app/api/webhooks/clerk/route.ts`**
   - Webhook de Clerk para sincronización automática
   - Eventos soportados: `user.created`, `user.updated`
   - Verificación de firma con Svix
   - Sincronización automática con Strapi

7. **`src/app/api/users/me/route.ts`**
   - GET: Obtener usuario actual
   - PATCH: Actualizar perfil del usuario

### 🎨 Hooks & Componentes

8. **`src/hooks/use-strapi-user.ts`**
   - Hook personalizado con React Query
   - Carga automática del usuario de Strapi
   - Cache y revalidación inteligente

### 📚 Documentación

9. **`docs/strapi-integration.md`**
   - Guía completa de configuración
   - Paso a paso para crear colección template-users
   - Configuración de PostgreSQL
   - Configuración de webhooks de Clerk
   - Solución de problemas comunes

10. **`docs/strapi-examples.md`**
    - 9 ejemplos prácticos de uso
    - Server Components, Client Components, API Routes
    - Server Actions
    - Queries avanzadas
    - Mejores prácticas

## 📋 Schema de template_users en Strapi

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

## 🚀 Flujo de Sincronización

```
Usuario se registra en Clerk
         ↓
Clerk dispara webhook → /api/webhooks/clerk
         ↓
Verificación de firma (Svix)
         ↓
syncTemplateUserFromClerk()
         ↓
Crear/Actualizar en Strapi
         ↓
Usuario disponible en template-users ✅
```

## 🔑 Variables de Entorno Necesarias

```env
# Strapi
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
STRAPI_API_TOKEN=your_api_token_here

# Clerk Webhook
CLERK_WEBHOOK_SECRET=whsec_your_webhook_secret
```

## 📦 Dependencias Instaladas

- `qs` - Query string builder para Strapi
- `@types/qs` - Tipos TypeScript
- `svix` - Verificación de webhooks de Clerk

## 🎯 Próximos Pasos

### 1. Configurar Strapi 5

```bash
npx create-strapi-app@latest my-strapi --quickstart
```

### 2. Crear Colección template-users

Ver guía completa en `docs/strapi-integration.md`

### 3. Obtener API Token

Settings > API Tokens > Create new API Token

### 4. Configurar Webhook de Clerk

1. Ir a https://dashboard.clerk.com
2. Webhooks > Add Endpoint
3. URL: `https://your-domain.com/api/webhooks/clerk`
4. Events: `user.created`, `user.updated`
5. Copiar Signing Secret

### 5. Configurar .env.local

Copiar `.env.local.example` y completar los valores

## 💡 Ejemplos de Uso

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

### Client Component con Hook

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
    pagination: { page: 1, pageSize: 10 }
  });

  return Response.json({ users: data });
}
```

## 🔒 Seguridad

- ✅ API Token solo en servidor (variable sin `NEXT_PUBLIC_`)
- ✅ Webhooks verificados con Svix
- ✅ Autenticación con Clerk antes de acceder a Strapi
- ✅ Validación de datos en todos los endpoints

## 🐛 Debugging

Ver logs en:
- Terminal de Next.js: Webhooks y sincronización
- Strapi Admin: Settings > Logs
- Clerk Dashboard: Webhooks > Logs

## 📖 Más Información

- [Strapi 5 Docs](https://docs.strapi.io)
- [Clerk Webhooks](https://clerk.com/docs/integrations/webhooks)
- [Ejemplos Completos](./strapi-examples.md)
