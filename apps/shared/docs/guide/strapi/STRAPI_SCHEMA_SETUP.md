# Strapi Schema Setup Guide

## Automated Collection Creation

La colección `template-users` **ya está creada** en el backend de Strapi. Los archivos del schema se encuentran en:

```
apps/backend/src/api/template-users/
├── content-types/
│   └── template-users/
│       └── schema.json          ← Definición del schema
├── controllers/
│   └── template-users.ts        ← Controller automático
├── services/
│   └── template-users.ts        ← Service automático
└── routes/
    └── template-users.ts        ← Routes automáticas
```

## ¿Qué hace Strapi automáticamente?

Cuando **reinicias el servidor de Strapi**, automáticamente:

1. ✅ Lee todos los schemas en `src/api/*/content-types/*/schema.json`
2. ✅ Crea/actualiza las tablas en la base de datos (SQLite en este caso)
3. ✅ Genera las APIs REST automáticamente
4. ✅ Registra los endpoints en el admin panel

**No necesitas crear la colección manualmente** en el admin panel.

## Verificación del Schema

### Opción 1: Reiniciar el servidor (Recomendado)

```bash
# Detén el servidor actual (Ctrl+C)
# Luego ejecuta:
pnpm dev
```

Strapi detectará el schema y creará la colección automáticamente.

### Opción 2: Script de verificación

Ejecuta el script de migración desde el frontend:

```bash
cd apps/frontend
pnpm migrate:strapi
```

Este script:

- Verifica que la colección `template-users` exista en Strapi
- Muestra instrucciones si falta algo
- Imprime el schema completo de referencia

## Acceder a la Colección

Una vez que Strapi haya reiniciado:

1. **Admin Panel**: http://localhost:1337/admin
2. **Content Manager**:
   - Navega a "Content Manager" en el menú lateral
   - Verás "Template User" en la sección "Collection Types"
3. **API Endpoint**: http://localhost:1337/api/template-users

## Schema de template-users

La colección tiene los siguientes campos:

| Campo        | Tipo        | Restricciones    | Descripción                        |
| ------------ | ----------- | ---------------- | ---------------------------------- |
| clerkId      | String      | Required, Unique | Clerk user ID                      |
| email        | Email       | Required, Unique | User email address                 |
| firstName    | String      | -                | User first name                    |
| lastName     | String      | -                | User last name                     |
| username     | String      | Unique           | User username                      |
| imageUrl     | String      | -                | Profile image URL                  |
| bio          | Text        | -                | User biography                     |
| locale       | Enumeration | Default: 'en'    | User preferred locale (en, es, da) |
| timezone     | String      | -                | User timezone                      |
| isActive     | Boolean     | Default: true    | Whether the user account is active |
| lastSignInAt | DateTime    | -                | Last sign in timestamp             |

## Configurar Permisos (Importante)

Por defecto, Strapi **bloquea todos los endpoints públicos**. Necesitas configurar permisos:

### 1. Accede a Settings → Roles

En el admin panel: http://localhost:1337/admin/settings/users-permissions/roles

### 2. Configura el rol "Public"

Para permitir que el webhook de Clerk funcione, necesitas dar permisos al rol "Authenticated" o crear un API token.

### Opción A: Usar API Token (Recomendado)

1. Ve a **Settings → API Tokens**
2. Crea un nuevo token:
   - **Name**: "Frontend API Token"
   - **Token type**: "Full access" (o custom con permisos específicos)
   - **Duration**: "Unlimited"
3. Copia el token generado
4. Agrégalo al `.env.local` del frontend:

```env
STRAPI_API_TOKEN=tu_token_aqui
```

### Opción B: Permisos públicos (Solo desarrollo)

1. Ve a **Settings → Roles → Public**
2. Expande **Template-users**
3. Activa: `find`, `findOne`, `create`, `update`
4. Guarda

⚠️ **No uses permisos públicos en producción**.

## Probar la Integración

### 1. Crear un usuario manualmente

```bash
curl -X POST http://localhost:1337/api/template-users \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN" \
  -d '{
    "data": {
      "clerkId": "user_test123",
      "email": "test@example.com",
      "firstName": "Test",
      "lastName": "User",
      "locale": "en",
      "isActive": true
    }
  }'
```

### 2. Consultar usuarios

```bash
curl http://localhost:1337/api/template-users \
  -H "Authorization: Bearer TU_TOKEN"
```

## Próximos Pasos

1. ✅ **Reinicia Strapi** - La colección se creará automáticamente
2. ✅ **Crea un admin** - http://localhost:1337/admin (primera vez)
3. ✅ **Genera un API Token** - Settings → API Tokens
4. ✅ **Configura el webhook de Clerk** - Ver `docs/guide/strapi/strapi-integration.md`
5. ✅ **Prueba la sincronización** - Crea un usuario en Clerk

## Troubleshooting

### "Collection not found"

- **Solución**: Reinicia el servidor de Strapi
- El schema debe estar en `apps/backend/src/api/template-users/content-types/template-users/schema.json`

### "Forbidden" en las APIs

- **Solución**: Configura permisos o crea un API Token

### "Cannot find module"

- **Solución**: Ejecuta `pnpm install` en la raíz del proyecto

### Schema no se actualiza

- **Solución**: Elimina `apps/backend/.cache` y reinicia

```bash
rm -rf apps/backend/.cache
pnpm dev
```

## Referencias

- [Strapi Content-Type Schema](https://docs.strapi.io/dev-docs/backend-customization/models)
- [Strapi API Tokens](https://docs.strapi.io/dev-docs/configurations/api-tokens)
- [Clerk Webhooks](https://clerk.com/docs/integrations/webhooks)
