# Integración con Strapi 5

Este proyecto está configurado para trabajar con Strapi 5 como CMS headless y base de datos.

## 🚀 Configuración Inicial

### 1. Instalar Strapi 5

```bash
# En un directorio separado (fuera de next-js-template)
npx create-strapi-app@latest my-strapi-app --quickstart
```

### 2. Crear la colección `template-users`

1. Inicia Strapi: `npm run develop`
2. Accede a http://localhost:1337/admin
3. Ve a **Content-Type Builder** > **Create new collection type**
4. Nombre: `template-users` (usar plural)
5. Agrega los siguientes campos:

| Campo          | Tipo      | Requerido | Único | Notas                          |
| -------------- | --------- | --------- | ----- | ------------------------------ |
| clerkId        | Text      | ✅        | ✅    | ID del usuario en Clerk        |
| email          | Email     | ✅        | ✅    | Email del usuario              |
| firstName      | Text      | ❌        | ❌    | Nombre                         |
| lastName       | Text      | ❌        | ❌    | Apellido                       |
| username       | Text      | ❌        | ✅    | Username único                 |
| imageUrl       | Text      | ❌        | ❌    | URL de la imagen de perfil     |
| bio            | Rich Text | ❌        | ❌    | Biografía del usuario          |
| locale         | Text      | ❌        | ❌    | Idioma preferido (en, es, da)  |
| timezone       | Text      | ❌        | ❌    | Zona horaria                   |
| isActive       | Boolean   | ❌        | ❌    | Usuario activo (default: true) |
| lastSignInAt   | DateTime  | ❌        | ❌    | Último inicio de sesión        |

6. Guarda y reinicia Strapi

### 3. Crear API Token

1. Ve a **Settings** > **API Tokens** > **Create new API Token**
2. Nombre: `Next.js Template`
3. Token duration: `Unlimited`
4. Token type: `Full access` (o personalizado según necesites)
5. Copia el token generado

### 4. Configurar Permisos

1. Ve a **Settings** > **Users & Permissions Plugin** > **Roles** > **Public**
2. En **template-users**, marca los permisos necesarios:
   - `find` (si necesitas listar usuarios públicamente)
   - `findOne` (si necesitas obtener un usuario específico)
3. Guarda

### 5. Variables de Entorno en Next.js

Copia `.env.local.example` a `.env.local` y configura:

```bash
# Strapi Configuration
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
STRAPI_API_TOKEN=tu_token_api_aqui

# Clerk Webhook Secret (para sincronización automática)
CLERK_WEBHOOK_SECRET=tu_webhook_secret_aqui
```

## 🔗 Configurar Webhook de Clerk

Para sincronizar automáticamente los usuarios de Clerk con Strapi:

### 1. Crear Webhook en Clerk

1. Ve a https://dashboard.clerk.com
2. Selecciona tu aplicación
3. Ve a **Webhooks** > **Add Endpoint**
4. URL del endpoint: `https://tu-dominio.com/api/webhooks/clerk`
   - En desarrollo local, usa ngrok: `https://abc123.ngrok.io/api/webhooks/clerk`
5. Eventos a suscribir:
   - `user.created`
   - `user.updated`
6. Copia el **Signing Secret** y guárdalo en `CLERK_WEBHOOK_SECRET`

### 2. Probar el Webhook localmente con ngrok

```bash
# Instalar ngrok
brew install ngrok

# Iniciar ngrok
ngrok http 3000

# Usar la URL de ngrok en Clerk webhook
```

## 📝 Uso en el Código

### Importar servicios

```typescript
import {
  getAllTemplateUsers,
  getTemplateUserByClerkId,
  createTemplateUser,
  updateTemplateUser,
  syncTemplateUserFromClerk,
} from '@/lib/strapi/services/template-users';
```

### Ejemplos de uso

#### Obtener usuario actual

```typescript
import { currentUser } from '@clerk/nextjs/server';
import { getTemplateUserByClerkId } from '@/lib/strapi/services/template-users';

export default async function ProfilePage() {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    return <div>No autenticado</div>;
  }

  const strapiUser = await getTemplateUserByClerkId(clerkUser.id);

  return (
    <div>
      <h1>Perfil de {strapiUser?.firstName}</h1>
      <p>Email: {strapiUser?.email}</p>
      <p>Bio: {strapiUser?.bio}</p>
    </div>
  );
}
```

#### Crear o actualizar usuario manualmente

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

#### Buscar usuarios

```typescript
import { searchTemplateUsers } from '@/lib/strapi/services/template-users';

const results = await searchTemplateUsers('john');
// Busca en firstName, lastName, email, username
```

#### Obtener usuarios con paginación

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

## 🗄️ Usar PostgreSQL con Strapi

Por defecto, Strapi usa SQLite. Para usar PostgreSQL:

### 1. Instalar dependencias

```bash
cd my-strapi-app
npm install pg
```

### 2. Configurar `config/database.ts`

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

### 3. Variables de entorno de Strapi

Crea `.env` en tu proyecto Strapi:

```bash
DATABASE_CLIENT=postgres
DATABASE_HOST=127.0.0.1
DATABASE_PORT=5432
DATABASE_NAME=strapi
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=strapi
DATABASE_SSL=false
```

### 4. Proveedores de PostgreSQL

Opciones recomendadas:

- **Supabase**: PostgreSQL gratis + hosting
- **Neon**: PostgreSQL serverless
- **Railway**: Hosting fácil con PostgreSQL
- **Vercel Postgres**: Integración con Vercel
- **AWS RDS**: Para producción enterprise

## 📚 Recursos

- [Documentación de Strapi 5](https://docs.strapi.io/dev-docs/intro)
- [REST API Strapi](https://docs.strapi.io/dev-docs/api/rest)
- [Strapi + Next.js](https://strapi.io/integrations/nextjs-cms)
- [Clerk Webhooks](https://clerk.com/docs/integrations/webhooks/overview)

## 🔧 Solución de Problemas

### Error: "Strapi API error: 401"

- Verifica que `STRAPI_API_TOKEN` esté configurado correctamente
- Asegúrate de que el token tenga permisos suficientes

### Error: "Cannot find module 'qs'"

```bash
pnpm add qs @types/qs
```

### El webhook no se ejecuta

- Verifica que la URL del webhook sea accesible públicamente
- Revisa que `CLERK_WEBHOOK_SECRET` esté configurado
- Comprueba los logs de Clerk Dashboard > Webhooks

### Error de CORS

Configura CORS en Strapi (`config/middlewares.ts`):

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
