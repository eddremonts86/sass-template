            # 🌐 Servicios Externos - Template Trae AI

## Servicios Obligatorios

### 1. Sentry (Error Tracking & Performance Monitoring)

- **Descripción**: Monitoreo de errores y rendimiento en tiempo real
- **URL de contratación**: https://sentry.io/pricing/
- **Plan recomendado**: Developer ($26/mes) o Team ($80/mes)
- **Variables de entorno necesarias**:
  - `NEXT_PUBLIC_SENTRY_DSN`
  - `SENTRY_ORG`
  - `SENTRY_PROJECT`
  - `SENTRY_AUTH_TOKEN`

### 2. Upstash Redis (Rate Limiting & Caching)

- **Descripción**: Base de datos Redis serverless para rate limiting y caché
- **URL de contratación**: https://upstash.com/pricing
- **Plan recomendado**: Pay as you go (gratis hasta 10K requests/día)
- **Variables de entorno necesarias**:
  - `UPSTASH_REDIS_REST_URL`
  - `UPSTASH_REDIS_REST_TOKEN`

### 3. Vercel Analytics (Web Analytics)

- **Descripción**: Analytics web integrado con Vercel
- **URL de contratación**: https://vercel.com/pricing (incluido en planes Pro+)
- **Plan recomendado**: Pro ($20/mes por miembro)
- **Variables de entorno necesarias**:
  - `NEXT_PUBLIC_VERCEL_ANALYTICS_ID` (automático en Vercel)

### 4. Chromatic (Visual Testing)

- **Descripción**: Testing visual automatizado para Storybook
- **URL de contratación**: https://www.chromatic.com/pricing
- **Plan recomendado**: Free (5,000 snapshots/mes) o Starter ($149/mes)
- **Variables de entorno necesarias**:
  - `CHROMATIC_PROJECT_TOKEN`

## Servicios Opcionales

### 5. Figma (Design System)

- **Descripción**: Herramienta de diseño para tokens y componentes
- **URL de contratación**: https://www.figma.com/pricing/
- **Plan recomendado**: Professional ($12/mes por editor)
- **Variables de entorno necesarias**:
  - `FIGMA_ACCESS_TOKEN` (para integración con design tokens)

### 6. Google Search Console (SEO)

- **Descripción**: Herramientas de SEO y monitoreo de búsqueda
- **URL de contratación**: https://search.google.com/search-console (gratuito)
- **Plan recomendado**: Gratuito
- **Variables de entorno necesarias**:
  - `GOOGLE_SITE_VERIFICATION` (meta tag de verificación)

### 7. axe DevTools (Accessibility Testing)

- **Descripción**: Herramientas avanzadas de testing de accesibilidad
- **URL de contratación**: https://www.deque.com/axe/devtools/pricing/
- **Plan recomendado**: Pro ($42/mes por usuario)
- **Variables de entorno necesarias**:
  - `AXE_API_KEY` (para integración CI/CD)

## Resumen de Costos Mensuales

### Configuración Mínima (Obligatorios)

- Sentry Developer: $26/mes
- Upstash Redis: $0/mes (plan gratuito)
- Vercel Pro: $20/mes
- Chromatic: $0/mes (plan gratuito)
- **Total mínimo**: $46/mes

### Configuración Completa (Obligatorios + Opcionales)

- Servicios obligatorios: $46/mes
- Figma Professional: $12/mes
- Google Search Console: $0/mes
- axe DevTools Pro: $42/mes
- **Total completo**: $100/mes

## Notas Importantes

1. **Vercel Analytics** se incluye automáticamente si despliegas en Vercel Pro+
2. **Upstash Redis** tiene un plan gratuito generoso para desarrollo
3. **Chromatic** ofrece 5,000 snapshots gratuitos mensuales
4. **Google Search Console** es completamente gratuito
5. Los precios pueden variar según la región y promociones vigentes

## Alternativas Gratuitas/Open Source

- **Sentry**: Self-hosted Sentry (requiere infraestructura propia)
- **Redis**: Redis local o Docker para desarrollo
- **Analytics**: Google Analytics 4 (gratuito)
- **Visual Testing**: Percy (plan gratuito limitado)
- **Accessibility**: Lighthouse CI (gratuito, menos funciones)
