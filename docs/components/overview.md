# Componentes UI - Sass Edd Template incluye una biblioteca completa de componentes UI construidos con React, TypeScript y Tailwind CSS. Todos los componentes están diseñados para ser accesibles, reutilizables y fáciles de personalizar.

## 🎨 Filosofía de Diseño

Nuestros componentes siguen estos principios:

- **Accesibilidad**: Todos los componentes cumplen con las pautas WCAG 2.1
- **Composición**: Componentes que se pueden combinar para crear interfaces complejas
- **Consistencia**: Diseño coherente en toda la aplicación
- **Personalización**: Fácil de personalizar con props y clases CSS

## 📦 Categorías de Componentes

### 🧱 Componentes Base (UI)

Componentes fundamentales basados en shadcn/ui:

- **[Button](/components/button)** - Botones con múltiples variantes
- **[Input](/components/input)** - Campos de entrada de texto
- **[Card](/components/card)** - Contenedores de contenido
- **[Modal](/components/modal)** - Diálogos y modales
- **Badge** - Etiquetas y badges
- **Avatar** - Imágenes de perfil
- **Tooltip** - Información contextual

### 🏗️ Componentes de Layout

Componentes para estructurar la aplicación:

- **[Header](/components/header)** - Cabecera de la aplicación
- **[Sidebar](/components/sidebar)** - Navegación lateral
- **[Footer](/components/footer)** - Pie de página
- **Container** - Contenedor responsivo
- **Grid** - Sistema de rejilla

### 📝 Componentes de Formulario

Componentes especializados para formularios:

- **[Form](/components/form)** - Formularios con validación
- **Select** - Selectores desplegables
- **Checkbox** - Casillas de verificación
- **Radio** - Botones de radio
- **Switch** - Interruptores
- **Textarea** - Áreas de texto

### 🧭 Componentes de Navegación

Componentes para navegación y routing:

- **[Navigation](/components/navigation)** - Menús de navegación
- **Breadcrumb** - Migas de pan
- **Tabs** - Pestañas
- **Pagination** - Paginación

### 🎯 Componentes Especializados

Componentes específicos de la aplicación:

- **LanguageToggle** - Selector de idioma
- **ThemeToggle** - Selector de tema
- **UserMenu** - Menú de usuario
- **AuthGuard** - Protección de rutas

## 🚀 Uso Básico

### Importación

```tsx
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
```

### Ejemplo Básico

```tsx
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export function ExampleComponent() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Formulario de Ejemplo</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input placeholder="Ingresa tu nombre" />
        <Input type="email" placeholder="Ingresa tu email" />
        <Button className="w-full">
          Enviar
        </Button>
      </CardContent>
    </Card>
  )
}
```

## 🎨 Personalización

### Variantes de Componentes

La mayoría de componentes incluyen múltiples variantes:

```tsx
// Botones
<Button variant="default">Default</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Tamaños
<Button size="sm">Pequeño</Button>
<Button size="default">Default</Button>
<Button size="lg">Grande</Button>
```

### Clases CSS Personalizadas

Todos los componentes aceptan la prop `className`:

```tsx
<Button className="bg-purple-600 hover:bg-purple-700">
  Botón Personalizado
</Button>
```

### Temas

Los componentes respetan automáticamente el tema activo (claro/oscuro):

```tsx
// Este componente se adapta automáticamente al tema
<Card className="bg-background text-foreground">
  <CardContent>
    Contenido que respeta el tema
  </CardContent>
</Card>
```

## 🔧 Composición Avanzada

### Compound Components

Muchos componentes utilizan el patrón Compound Component:

```tsx
<Card>
  <CardHeader>
    <CardTitle>Título</CardTitle>
    <CardDescription>Descripción</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Contenido principal</p>
  </CardContent>
  <CardFooter>
    <Button>Acción</Button>
  </CardFooter>
</Card>
```

### Render Props

Algunos componentes utilizan render props para máxima flexibilidad:

```tsx
<AuthGuard
  fallback={<div>Debes iniciar sesión</div>}
>
  <ProtectedContent />
</AuthGuard>
```

## 📱 Responsive Design

Todos los componentes están diseñados para ser responsivos:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <Card>Tarjeta 1</Card>
  <Card>Tarjeta 2</Card>
  <Card>Tarjeta 3</Card>
</div>
```

## ♿ Accesibilidad

### Características de Accesibilidad

- **Navegación por teclado**: Todos los componentes son navegables por teclado
- **Screen readers**: Soporte completo para lectores de pantalla
- **ARIA labels**: Etiquetas ARIA apropiadas
- **Contraste**: Colores que cumplen con las pautas de contraste
- **Focus management**: Gestión adecuada del foco

### Ejemplo con Accesibilidad

```tsx
<Button
  aria-label="Cerrar modal"
  aria-describedby="modal-description"
  onClick={closeModal}
>
  <X className="h-4 w-4" />
  <span className="sr-only">Cerrar</span>
</Button>
```

## 🧪 Testing

### Testing de Componentes

```tsx
import { render, screen } from '@testing-library/react'
import { Button } from '@/components/ui/button'

test('renders button with text', () => {
  render(<Button>Click me</Button>)
  expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
})
```

### Storybook (Próximamente)

Estamos trabajando en integrar Storybook para documentación interactiva de componentes.

## 📚 Ejemplos Completos

### Formulario de Contacto

```tsx
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Contáctanos</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">Mensaje</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              required
            />
          </div>
          
          <Button type="submit" className="w-full">
            Enviar Mensaje
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
```

## 🔄 Próximas Actualizaciones

- **Más componentes**: Datepicker, Combobox, Command palette
- **Animaciones**: Integración con Framer Motion
- **Storybook**: Documentación interactiva
- **Testing**: Más ejemplos de testing
- **Temas**: Más opciones de personalización

## 🤝 Contribuir

¿Quieres añadir un nuevo componente o mejorar uno existente? ¡Las contribuciones son bienvenidas!

1. Revisa las [guías de contribución](https://github.com/your-username/template-trae/blob/main/CONTRIBUTING.md)
2. Sigue las convenciones de código existentes
3. Incluye tests y documentación
4. Asegúrate de que sea accesible

---

¿Tienes preguntas sobre algún componente específico? Consulta la documentación individual de cada componente o [crea un issue](https://github.com/your-username/template-trae/issues) en GitHub.