# 🚀 Quick Start - Strapi 5 Integration

## ⚡ Resumen Ejecutivo

Tu proyecto Next.js ya está **completamente configurado** para trabajar con Strapi 5. Solo necesitas:

1. ✅ Instalar Strapi 5
2. ✅ Crear la colección `template-users`
3. ✅ Configurar variables de entorno
4. ✅ (Opcional) Configurar webhook de Clerk

## 🔥 Inicio Rápido (5 minutos)

### Paso 1: Instalar Strapi

```bash
# En un directorio SEPARADO
npx create-strapi-app@latest my-strapi --quickstart
cd my-strapi
npm run develop
```

### Paso 2: Crear Colección template-users

1. Abre <http://localhost:1337/admin>
2. Content-Type Builder > Create new collection type
3. Nombre: `template-users`
4. Agrega estos campos:

| Campo        | Tipo     | Required | Unique |
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

5. Guarda y espera que reinicie

### Paso 3: Obtener API Token

1. Settings > API Tokens > Create new API Token
2. Nombre: `Next.js Template`
3. Token type: `Full access`
4. **COPIA EL TOKEN** (solo se muestra una vez)

### Paso 4: Configurar .env.local

```bash
# En tu proyecto Next.js
cp .env.local.example .env.local
```

Edita `.env.local` y agrega:

```env
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
STRAPI_API_TOKEN=el_token_que_copiaste_arriba
```

### Paso 5: ¡Listo! 🎉

Tu integración está completa. Prueba con:

```typescript
// src/app/test-strapi/page.tsx
import { getAllTemplateUsers } from '@/lib/strapi';

export default async function TestPage() {
  const { data } = await getAllTemplateUsers();

  return (
    <div>
      <h1>Usuarios en Strapi: {data.length}</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
```

## 🔄 Sincronización Automática con Clerk (Opcional)

Para que los usuarios se creen automáticamente en Strapi cuando se registran:

### 1. Configurar Webhook en Clerk

1. <https://dashboard.clerk.com> > Tu App > Webhooks
2. Add Endpoint
3. URL: `https://tu-dominio.com/api/webhooks/clerk`
   - Local: Usa ngrok → `ngrok http 3000`
4. Events: `user.created`, `user.updated`
5. Copia el **Signing Secret**

### 2. Agregar a .env.local

```env
CLERK_WEBHOOK_SECRET=whsec_el_signing_secret
```

## 📖 API Disponible

### Importar servicios

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
// Obtener todos los usuarios
const { data, meta } = await getAllTemplateUsers({
  pagination: { page: 1, pageSize: 10 },
  sort: ['createdAt:desc'],
});

// Obtener usuario actual
const clerk = await currentUser();
const user = await getTemplateUserByClerkId(clerk!.id);

// Buscar usuarios
const results = await searchTemplateUsers('john');

// Actualizar usuario
await updateTemplateUser(userId, {
  firstName: 'John',
  bio: 'Developer from Spain',
});
```

## 🐛 Solución de Problemas

### Error: "Strapi API error: 401"

→ Verifica que `STRAPI_API_TOKEN` esté configurado correctamente

### Error: "Cannot find module 'qs'"

```bash
pnpm add qs @types/qs
```

### El webhook no funciona

1. Verifica que la URL sea accesible públicamente
2. Comprueba `CLERK_WEBHOOK_SECRET`
3. Revisa logs en Clerk Dashboard > Webhooks

### Usuario no aparece en Strapi

1. Verifica que el webhook esté configurado
2. Revisa logs del servidor Next.js
3. Crea manualmente: `await syncTemplateUserFromClerk(clerkUser)`

## 📚 Documentación Completa

- **Guía Detallada**: [`docs/strapi-integration.md`](./strapi-integration.md)
- **Ejemplos de Código**: [`docs/strapi-examples.md`](./strapi-examples.md)
- **Configuración Completa**: [`docs/STRAPI_SETUP.md`](./STRAPI_SETUP.md)

## 🎯 Próximos Pasos Recomendados

1. ✅ Configurar PostgreSQL para producción
2. ✅ Agregar más colecciones según tu app
3. ✅ Configurar permisos granulares en Strapi
4. ✅ Implementar rate limiting en webhooks
5. ✅ Agregar tests para servicios de Strapi

## 💡 Tips

- **Desarrollo**: Usa SQLite (viene por defecto con Strapi)
- **Producción**: Usa PostgreSQL con Supabase/Neon/Railway
- **Cache**: Los datos de Strapi se cachean automáticamente
- **Revalidación**: Usa `revalidatePath()` después de mutaciones

---

**¿Necesitas ayuda?** Revisa la documentación completa o abre un issue.
