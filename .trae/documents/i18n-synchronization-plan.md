# Plan de Sincronización de Traducciones - Sistema de Internacionalización

## 1. Análisis de Claves de Traducción Faltantes o Desincronizadas

### 1.1 Estado Actual de las Traducciones

#### Claves Identificadas como Faltantes o Inconsistentes:

**Páginas About:**

- `pages.about.hero.title` ✅ (Existe en ES)
- `pages.about.hero.subtitle` ✅ (Existe en ES)
- `pages.about.vision.title` ✅ (Existe en ES)
- `pages.about.vision.description1` ✅ (Existe en ES)
- `pages.about.vision.description2` ✅ (Existe en ES)
- `pages.about.vision.description3` ✅ (Existe en ES)
- `pages.about.creators.title` ✅ (Existe en ES)
- `pages.about.creators.description1` ✅ (Existe en ES)
- `pages.about.creators.description2` ✅ (Existe en ES)
- `pages.about.creators.description3` ✅ (Existe en ES)
- `pages.about.globalTeam.title` ✅ (Existe en ES)
- `pages.about.globalTeam.subtitle` ✅ (Existe en ES)
- `pages.about.globalTeam.cta` ✅ (Existe en ES)

**Páginas Features y Contact:**

- `pages.features.title` ❌ (Falta en todos los idiomas)
- `pages.features.description` ❌ (Falta en todos los idiomas)
- `pages.features.backToHome` ❌ (Falta en todos los idiomas)
- `pages.contact.backToHome` ❌ (Falta en todos los idiomas)

**Dashboard:**

- `dashboard.welcome` ❌ (Falta en todos los idiomas)
- `dashboard.recentActivity` ✅ (Existe parcialmente)
- `dashboard.recentActivityDesc` ❌ (Falta en todos los idiomas)
- `dashboard.activities.newUserRegistration` ❌ (Falta en todos los idiomas)
- `dashboard.activities.newUserRegistrationDesc` ❌ (Falta en todos los idiomas)
- `dashboard.activities.paymentReceived` ❌ (Falta en todos los idiomas)
- `dashboard.activities.paymentReceivedDesc` ❌ (Falta en todos los idiomas)
- `dashboard.activities.documentUploaded` ❌ (Falta en todos los idiomas)
- `dashboard.activities.documentUploadedDesc` ❌ (Falta en todos los idiomas)
- `dashboard.activities.systemUpdate` ❌ (Falta en todos los idiomas)
- `dashboard.activities.systemUpdateDesc` ❌ (Falta en todos los idiomas)
- `dashboard.timeAgo.minutesAgo` ❌ (Falta en todos los idiomas)
- `dashboard.timeAgo.hourAgo` ❌ (Falta en todos los idiomas)
- `dashboard.quickActions.title` ❌ (Falta en todos los idiomas)
- `dashboard.quickActions.description` ❌ (Falta en todos los idiomas)
- `dashboard.quickActions.newUser` ❌ (Falta en todos los idiomas)
- `dashboard.quickActions.newUserDesc` ❌ (Falta en todos los idiomas)
- `dashboard.quickActions.createDocument` ❌ (Falta en todos los idiomas)
- `dashboard.quickActions.createDocumentDesc` ❌ (Falta en todos los idiomas)
- `dashboard.quickActions.sendMessage` ❌ (Falta en todos los idiomas)
- `dashboard.quickActions.sendMessageDesc` ❌ (Falta en todos los idiomas)
- `dashboard.quickActions.settings` ❌ (Falta en todos los idiomas)
- `dashboard.quickActions.settingsDesc` ❌ (Falta en todos los idiomas)

### 1.2 Componentes Afectados

**Componentes que requieren actualización:**

1. `/src/components/about/about-content.tsx` - ✅ Ya usa las claves correctas
2. `/src/app/[locale]/features/page.tsx` - ❌ Necesita claves faltantes
3. `/src/app/[locale]/contact/page.tsx` - ❌ Necesita claves faltantes
4. `/src/app/[locale]/(dashboard)/dashboard/page.tsx` - ❌ Necesita múltiples claves faltantes

## 2. Plan de Implementación

### 2.1 Fase 1: Completar Traducciones Faltantes

#### Archivo EN (Inglés)

```json
{
  "pages": {
    "about": {
      "hero": {
        "title": "About Us",
        "subtitle": "Meet our team, discover our values, and learn how we balance work, life, and everything in between."
      },
      "vision": {
        "title": "Our Vision",
        "description1": "For years, the process of building custom software has been challenging. Today, companies need technical expertise and a lot of time. This requires companies and individuals to hire expensive developers.",
        "description2": "What if you could create custom software without writing a single line of code? What if you could build your own work?",
        "description3": "We believe everyone should be able to build their own solutions, regardless of their technical experience."
      },
      "creators": {
        "title": "Our Creators",
        "description1": "Our company has been building with tools for over a decade, focusing on making each project unique. We know that the best software is what you can create yourself.",
        "description2": "We have specifically developed these solutions for our team, and now everyone can benefit from them. We are proud to offer a platform that is truly superior.",
        "description3": "Our team is made up of talented individuals who are passionate about creating tools that really work with your goals, and we can't wait to see what you build."
      },
      "globalTeam": {
        "title": "Part of",
        "subtitle": "Our Global Team",
        "cta": "Join Our Team"
      }
    },
    "features": {
      "title": "Features",
      "description": "Discover all the powerful features we offer",
      "backToHome": "Back to Home"
    },
    "contact": {
      "backToHome": "Back to Home"
    }
  },
  "dashboard": {
    "welcome": "Welcome",
    "recentActivityDesc": "Your latest activity and updates",
    "activities": {
      "newUserRegistration": "New User Registration",
      "newUserRegistrationDesc": "User {name} has registered",
      "paymentReceived": "Payment Received",
      "paymentReceivedDesc": "Received {amount} for {type} plan",
      "documentUploaded": "Document Uploaded",
      "documentUploadedDesc": "File {filename} was uploaded",
      "systemUpdate": "System Update",
      "systemUpdateDesc": "System has been updated successfully"
    },
    "timeAgo": {
      "minutesAgo": "{count} minutes ago",
      "hourAgo": "1 hour ago"
    },
    "quickActions": {
      "title": "Quick Actions",
      "description": "Frequently used actions for faster workflow",
      "newUser": "Create New User",
      "newUserDesc": "Add a new user to the system",
      "createDocument": "Create Document",
      "createDocumentDesc": "Create a new document or file",
      "sendMessage": "Send Message",
      "sendMessageDesc": "Send a message to users or team",
      "settings": "Settings",
      "settingsDesc": "Manage system and user settings"
    }
  }
}
```

#### Archivo ES (Español)

```json
{
  "pages": {
    "features": {
      "title": "Características",
      "description": "Descubre todas las características poderosas que ofrecemos",
      "backToHome": "Volver al Inicio"
    },
    "contact": {
      "backToHome": "Volver al Inicio"
    }
  },
  "dashboard": {
    "welcome": "Bienvenido",
    "recentActivityDesc": "Tu actividad más reciente y actualizaciones",
    "activities": {
      "newUserRegistration": "Nuevo Registro de Usuario",
      "newUserRegistrationDesc": "El usuario {name} se ha registrado",
      "paymentReceived": "Pago Recibido",
      "paymentReceivedDesc": "Recibido {amount} por plan {type}",
      "documentUploaded": "Documento Subido",
      "documentUploadedDesc": "El archivo {filename} fue subido",
      "systemUpdate": "Actualización del Sistema",
      "systemUpdateDesc": "El sistema se ha actualizado exitosamente"
    },
    "timeAgo": {
      "minutesAgo": "hace {count} minutos",
      "hourAgo": "hace 1 hora"
    },
    "quickActions": {
      "title": "Acciones Rápidas",
      "description": "Acciones frecuentes para un flujo de trabajo más rápido",
      "newUser": "Crear Nuevo Usuario",
      "newUserDesc": "Agregar un nuevo usuario al sistema",
      "createDocument": "Crear Documento",
      "createDocumentDesc": "Crear un nuevo documento o archivo",
      "sendMessage": "Enviar Mensaje",
      "sendMessageDesc": "Enviar un mensaje a usuarios o equipo",
      "settings": "Configuración",
      "settingsDesc": "Gestionar configuración del sistema y usuario"
    }
  }
}
```

#### Archivo DA (Danés)

```json
{
  "pages": {
    "about": {
      "hero": {
        "title": "Om Os",
        "subtitle": "Mød vores team, oplev vores værdier, og lær hvordan vi balancerer arbejde, liv og alt derimellem."
      },
      "vision": {
        "title": "Vores Vision",
        "description1": "I årevis har processen med at bygge tilpasset software været udfordrende. I dag har virksomheder brug for teknisk ekspertise og meget tid. Dette kræver at virksomheder og enkeltpersoner ansætter dyre udviklere.",
        "description2": "Hvad hvis du kunne skabe tilpasset software uden at skrive en eneste linje kode? Hvad hvis du kunne bygge dit eget arbejde?",
        "description3": "Vi tror på, at alle skal kunne bygge deres egne løsninger, uanset deres tekniske erfaring."
      },
      "creators": {
        "title": "Vores Skabere",
        "description1": "Vores virksomhed har bygget med værktøjer i over et årti, med fokus på at gøre hvert projekt unikt. Vi ved, at den bedste software er det, du selv kan skabe.",
        "description2": "Vi har specifikt udviklet disse løsninger til vores team, og nu kan alle drage fordel af dem. Vi er stolte af at tilbyde en platform, der virkelig er overlegen.",
        "description3": "Vores team består af talentfulde individer, der brænder for at skabe værktøjer, der virkelig fungerer med dine mål, og vi kan ikke vente med at se, hvad du bygger."
      },
      "globalTeam": {
        "title": "Del af",
        "subtitle": "Vores Globale Team",
        "cta": "Bliv en del af vores team"
      }
    },
    "features": {
      "title": "Funktioner",
      "description": "Oplev alle de kraftfulde funktioner vi tilbyder",
      "backToHome": "Tilbage til hjem"
    },
    "contact": {
      "backToHome": "Tilbage til hjem"
    }
  },
  "dashboard": {
    "welcome": "Velkommen",
    "recentActivityDesc": "Din seneste aktivitet og opdateringer",
    "activities": {
      "newUserRegistration": "Ny Brugerregistrering",
      "newUserRegistrationDesc": "Bruger {name} har registreret sig",
      "paymentReceived": "Betaling Modtaget",
      "paymentReceivedDesc": "Modtaget {amount} for {type} plan",
      "documentUploaded": "Dokument Uploadet",
      "documentUploadedDesc": "Fil {filename} blev uploadet",
      "systemUpdate": "Systemopdatering",
      "systemUpdateDesc": "Systemet er blevet opdateret succesfuldt"
    },
    "timeAgo": {
      "minutesAgo": "{count} minutter siden",
      "hourAgo": "1 time siden"
    },
    "quickActions": {
      "title": "Hurtige Handlinger",
      "description": "Hyppigt brugte handlinger for hurtigere workflow",
      "newUser": "Opret Ny Bruger",
      "newUserDesc": "Tilføj en ny bruger til systemet",
      "createDocument": "Opret Dokument",
      "createDocumentDesc": "Opret et nyt dokument eller fil",
      "sendMessage": "Send Besked",
      "sendMessageDesc": "Send en besked til brugere eller team",
      "settings": "Indstillinger",
      "settingsDesc": "Administrer system- og brugerindstillinger"
    }
  }
}
```

### 2.2 Fase 2: Verificación de Componentes

#### Componentes que necesitan actualización:

1. **Dashboard Page** (`/src/app/[locale]/(dashboard)/dashboard/page.tsx`)
   - Línea 103: Cambiar `t('dashboard.welcome')` por `t('dashboard.welcome')`
   - Línea 106: Agregar `t('dashboard.welcomeMessage')` o usar `t('dashboard.recentActivityDesc')`
   - Líneas 55-78: Actualizar todas las referencias de actividades
   - Líneas 80-100: Actualizar todas las referencias de quickActions

2. **Features Page** (`/src/app/[locale]/features/page.tsx`)
   - Verificar que use `t('title')`, `t('description')`, `t('backToHome')`

3. **Contact Page** (`/src/app/[locale]/contact/page.tsx`)
   - Agregar `t('backToHome')` para consistencia

### 2.3 Fase 3: Implementación de Proceso de Sincronización

#### Script de Verificación de Traducciones

```bash
#!/bin/bash
# check-translations.sh

echo "🔍 Verificando sincronización de traducciones..."

# Verificar que todas las claves existan en todos los idiomas
node scripts/verify-translations.js

# Ejecutar linting para verificar hardcoded strings
pnpm lint

echo "✅ Verificación completada"
```

#### Script Node.js para Verificación

```javascript
// scripts/verify-translations.js
const fs = require('fs');
const path = require('path');

const locales = ['en', 'es', 'da'];
const localeDir = path.join(__dirname, '../src/lib/i18n/locales');

function getAllKeys(obj, prefix = '') {
  let keys = [];
  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      keys = keys.concat(getAllKeys(obj[key], fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

function verifyTranslations() {
  const translations = {};
  const allKeys = new Set();

  // Cargar todas las traducciones
  for (const locale of locales) {
    const filePath = path.join(localeDir, `${locale}.json`);
    translations[locale] = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const keys = getAllKeys(translations[locale]);
    keys.forEach(key => allKeys.add(key));
  }

  // Verificar claves faltantes
  let hasErrors = false;
  for (const locale of locales) {
    const localeKeys = new Set(getAllKeys(translations[locale]));
    const missingKeys = [...allKeys].filter(key => !localeKeys.has(key));

    if (missingKeys.length > 0) {
      console.error(`❌ Claves faltantes en ${locale}:`, missingKeys);
      hasErrors = true;
    }
  }

  if (!hasErrors) {
    console.log('✅ Todas las traducciones están sincronizadas');
  }

  return !hasErrors;
}

verifyTranslations();
```

## 3. Estrategia de Mantenimiento

### 3.1 Flujo de Desarrollo Actualizado

**Antes de Crear/Modificar Componentes:**

1. Identificar todos los textos que necesitan traducción
2. Agregar claves de traducción a TODOS los archivos de idioma simultáneamente
3. Implementar componente usando `useTranslations()`
4. Verificar con `pnpm run check:translations`
5. Ejecutar `pnpm lint` para verificar hardcoded strings

### 3.2 Herramientas de Automatización

#### Pre-commit Hook

```bash
#!/bin/sh
# .husky/pre-commit

echo "🔍 Verificando traducciones antes del commit..."

# Verificar sincronización de traducciones
npm run check:translations

# Verificar linting
npm run lint

if [ $? -ne 0 ]; then
  echo "❌ Error: Las traducciones no están sincronizadas o hay errores de linting"
  exit 1
fi

echo "✅ Traducciones verificadas correctamente"
```

#### Scripts en package.json

```json
{
  "scripts": {
    "check:translations": "node scripts/verify-translations.js",
    "sync:translations": "node scripts/sync-translations.js",
    "lint:translations": "eslint --ext .tsx,.ts src/ --rule 'custom/no-hardcoded-strings: error'"
  }
}
```

### 3.3 Documentación de Convenciones

#### Estructura de Claves de Traducción

```
pages.{pageName}.{section}.{element}
dashboard.{section}.{element}
common.{element}
navigation.{element}
auth.{element}
```

#### Ejemplos de Buenas Prácticas

```typescript
// ✅ CORRECTO - Estructura clara y consistente
const t = useTranslations('pages.about');
<h1>{t('hero.title')}</h1>
<p>{t('hero.subtitle')}</p>

// ✅ CORRECTO - Uso de parámetros
const tDashboard = useTranslations('dashboard');
<p>{tDashboard('activities.newUserRegistrationDesc', { name: 'John' })}</p>

// ❌ INCORRECTO - Texto hardcodeado
<h1>About Us</h1>
<p>Welcome to our platform</p>
```

## 4. Cronograma de Implementación

### Semana 1: Completar Traducciones

- [ ] Actualizar archivo `en.json` con claves faltantes
- [ ] Actualizar archivo `es.json` con claves faltantes
- [ ] Actualizar archivo `da.json` con claves faltantes
- [ ] Verificar que todas las claves estén sincronizadas

### Semana 2: Actualizar Componentes

- [ ] Actualizar `dashboard/page.tsx` con nuevas claves
- [ ] Actualizar `features/page.tsx` con nuevas claves
- [ ] Actualizar `contact/page.tsx` con nuevas claves
- [ ] Verificar que no hay hardcoded strings

### Semana 3: Implementar Herramientas

- [ ] Crear script de verificación de traducciones
- [ ] Configurar pre-commit hooks
- [ ] Actualizar documentación de desarrollo
- [ ] Entrenar al equipo en nuevos procesos

### Semana 4: Testing y Validación

- [ ] Ejecutar tests completos de internacionalización
- [ ] Verificar funcionalidad en todos los idiomas
- [ ] Documentar proceso de mantenimiento
- [ ] Establecer métricas de calidad

## 5. Criterios de Éxito

### Métricas de Calidad

- ✅ 0 errores de `custom/no-hardcoded-strings` en linting
- ✅ 100% de claves sincronizadas entre idiomas
- ✅ Todos los componentes UI usan traducciones
- ✅ Funcionalidad de cambio de idioma operativa
- ✅ Tests de internacionalización pasando

### Proceso de Verificación Continua

1. **Pre-commit**: Verificación automática de traducciones
2. **CI/CD**: Validación en pipeline de integración
3. **Code Review**: Revisión manual de nuevas claves
4. **Testing**: Pruebas funcionales en todos los idiomas

Este plan asegura una sincronización completa y mantenimiento sostenible del sistema de internacionalización.
