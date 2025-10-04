# Comenzando

¡Bienvenido a Sass Edd Template! Esta guía te ayudará a configurar y ejecutar el proyecto en tu entorno local.

## 📋 Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18 o superior)
- **pnpm** (recomendado) o npm/yarn
- **Git**
- Una cuenta en [Clerk](https://clerk.com) para autenticación

## 🚀 Instalación

### 1. Clonar el Repositorio

```bash
git clone https://github.com/your-username/sass-edd-template.git
cd sass-edd-template
```

### 2. Instalar Dependencias

```bash
# Usando pnpm (recomendado)
pnpm install

# O usando npm
npm install

# O usando yarn
yarn install
```

### 3. Configurar Variables de Entorno

Copia el archivo de ejemplo y configura las variables necesarias:

```bash
cp .env.example .env.local
```

Edita `.env.local` con tus valores:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
CLERK_SECRET_KEY=sk_test_your_secret_key_here

# Next.js Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Database (opcional)
DATABASE_URL=your_database_url_here

# Otras configuraciones
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id_here
```

### 4. Configurar Clerk

1. Ve a [Clerk Dashboard](https://dashboard.clerk.com)
2. Crea una nueva aplicación
3. Copia las claves API a tu archivo `.env.local`
4. Configura las URLs permitidas:
   - **Frontend API**: `http://localhost:3000`
   - **Homepage URL**: `http://localhost:3000`

### 5. Iniciar el Servidor de Desarrollo

```bash
pnpm dev
```

¡Listo! Tu aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

## 🏗️ Estructura del Proyecto

```
template-trae/
├── src/
│   ├── app/                    # App Router de Next.js
│   │   ├── [locale]/          # Rutas internacionalizadas
│   │   ├── globals.css        # Estilos globales
│   │   └── layout.tsx         # Layout raíz
│   ├── components/            # Componentes React
│   │   ├── ui/               # Componentes base (shadcn/ui)
│   │   ├── common/           # Componentes comunes
│   │   ├── dashboard/        # Componentes del dashboard
│   │   ├── forms/            # Componentes de formularios
│   │   └── layout/           # Componentes de layout
│   ├── hooks/                # Custom hooks
│   ├── lib/                  # Utilidades y configuraciones
│   │   ├── auth/            # Configuración de autenticación
│   │   ├── i18n/            # Configuración de i18n
│   │   └── utils/           # Funciones utilitarias
│   ├── stores/              # Gestión de estado (Zustand)
│   ├── styles/              # Estilos adicionales
│   ├── types/               # Definiciones de tipos TypeScript
│   └── utils/               # Utilidades adicionales
├── messages/                # Archivos de traducción
├── public/                  # Archivos estáticos
├── docs/                    # Documentación (VitePress)
└── tests/                   # Tests
```

## 🎯 Próximos Pasos

Ahora que tienes el proyecto funcionando, puedes:

1. **[Explorar los Componentes](/components/overview)** - Conoce la biblioteca de componentes disponibles
2. **[Configurar la Autenticación](/guide/authentication)** - Personaliza el flujo de autenticación
3. **[Añadir Idiomas](/guide/i18n)** - Configura idiomas adicionales
4. **[Personalizar Temas](/guide/theming)** - Modifica los colores y estilos

## 🔧 Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `pnpm dev` | Inicia el servidor de desarrollo |
| `pnpm build` | Construye la aplicación para producción |
| `pnpm start` | Inicia el servidor de producción |
| `pnpm lint` | Ejecuta ESLint |
| `pnpm lint:fix` | Corrige errores de linting automáticamente |
| `pnpm type-check` | Verifica tipos de TypeScript |
| `pnpm docs:dev` | Inicia el servidor de documentación |
| `pnpm docs:build` | Construye la documentación |

## 🐛 Solución de Problemas

### Error: "Invalid publishableKey"

Si ves este error, verifica que:
1. Has configurado correctamente las claves de Clerk en `.env.local`
2. Las claves no contienen espacios adicionales
3. Has reiniciado el servidor después de cambiar las variables de entorno

### Error de Compilación TypeScript

Si encuentras errores de TypeScript:
1. Ejecuta `pnpm type-check` para ver los errores específicos
2. Verifica que todas las dependencias estén instaladas
3. Reinicia tu editor/IDE

### Problemas con i18n

Si las traducciones no funcionan:
1. Verifica que los archivos de mensajes existan en `messages/`
2. Comprueba que el locale esté configurado correctamente
3. Reinicia el servidor de desarrollo

## 📚 Recursos Adicionales

- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de Clerk](https://clerk.com/docs)
- [Documentación de Tailwind CSS](https://tailwindcss.com/docs)
- [Documentación de next-intl](https://next-intl-docs.vercel.app/)

## 🤝 ¿Necesitas Ayuda?

Si tienes problemas o preguntas:

1. Revisa la [documentación completa](/guide/installation)
2. Busca en los [issues de GitHub](https://github.com/your-username/template-trae/issues)
3. Crea un nuevo issue si no encuentras la solución

¡Estamos aquí para ayudarte a tener éxito con Template Trae!