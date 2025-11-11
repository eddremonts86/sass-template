# UI Components - Sass Edd Template includes a complete library of UI components built with React, TypeScript and Tailwind CSS. All components are designed to be accessible, reusable and easy to customize.

## 🎨 Design Philosophy

Our components follow these principles:

- **Accessibility**: All components comply with WCAG 2.1 guidelines
- **Composition**: Components that can be combined to create complex interfaces
- **Consistency**: Coherent design throughout the application
- **Customization**: Easy to customize with props and CSS classes

## 📦 Component Categories

### 🧱 Base Components (UI)

Fundamental components based on shadcn/ui:

- **[Button](/components/button)** - Buttons with multiple variants
- **[Input](/components/input)** - Text input fields
- **[Card](/components/card)** - Content containers
- **[Modal](/components/modal)** - Dialogs and modals
- **Badge** - Labels and badges
- **Avatar** - Profile images
- **Tooltip** - Contextual information

### 🏗️ Layout Components

Components for structuring the application:

- **[Header](/components/header)** - Application header
- **[Sidebar](/components/sidebar)** - Side navigation
- **[Footer](/components/footer)** - Page footer
- **Container** - Responsive container
- **Grid** - Grid system

### 📝 Form Components

Specialized components for forms:

- **[Form](/components/form)** - Forms with validation
- **Select** - Dropdown selectors
- **Checkbox** - Checkboxes
- **Radio** - Radio buttons
- **Switch** - Toggle switches
- **Textarea** - Text areas

### 🧭 Navigation Components

Components for navigation and routing:

- **[Navigation](/components/navigation)** - Navigation menus
- **Breadcrumb** - Breadcrumbs
- **Tabs** - Tabs
- **Pagination** - Pagination

### 🎯 Specialized Components

Application-specific components:

- **LanguageToggle** - Language selector
- **ThemeToggle** - Theme selector
- **UserMenu** - User menu
- **AuthGuard** - Route protection

## 🚀 Basic Usage

### Import

```tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
```

### Basic Example

```tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export function ExampleComponent() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Example Form</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input placeholder="Enter your name" />
        <Input type="email" placeholder="Enter your email" />
        <Button className="w-full">Submit</Button>
      </CardContent>
    </Card>
  );
}
```

## 🎨 Customization

### Component Variants

Most components include multiple variants:

```tsx
// Buttons
<Button variant="default">Default</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
```

### Custom CSS Classes

All components accept the `className` prop:

```tsx
<Button className="bg-purple-600 hover:bg-purple-700">Custom Button</Button>
```

### Themes

Components automatically respect the active theme (light/dark):

```tsx
// This component automatically adapts to the theme
<Card className="bg-background text-foreground">
  <CardContent>Content that respects the theme</CardContent>
</Card>
```

## 🔧 Advanced Composition

### Compound Components

Many components use the Compound Component pattern:

```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Main content</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### Render Props

Some components use render props for maximum flexibility:

```tsx
<AuthGuard fallback={<div>You must log in</div>}>
  <ProtectedContent />
</AuthGuard>
```

## 📱 Responsive Design

All components are designed to be responsive:

```tsx
<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
  <Card>Card 1</Card>
  <Card>Card 2</Card>
  <Card>Card 3</Card>
</div>
```

## ♿ Accessibility

### Accessibility Features

- **Keyboard navigation**: All components are keyboard navigable
- **Screen readers**: Full support for screen readers
- **ARIA labels**: Appropriate ARIA labels
- **Contrast**: Colors that meet contrast guidelines
- **Focus management**: Proper focus management

### Accessibility Example

```tsx
<Button
  aria-label="Close modal"
  aria-describedby="modal-description"
  onClick={closeModal}
>
  <X className="h-4 w-4" />
  <span className="sr-only">Close</span>
</Button>
```

## 🧪 Testing

### Component Testing

```tsx
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/ui/button';

test('renders button with text', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
});
```

### Storybook (Coming Soon)

We are working on integrating Storybook for interactive component documentation.

## 📚 Complete Examples

### Contact Form

```tsx
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Contact Us</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={e =>
                setFormData(prev => ({ ...prev, name: e.target.value }))
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={e =>
                setFormData(prev => ({ ...prev, email: e.target.value }))
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={e =>
                setFormData(prev => ({ ...prev, message: e.target.value }))
              }
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Send Message
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
```

## 🔄 Upcoming Updates

- **More components**: Datepicker, Combobox, Command palette
- **Animations**: Integration with Framer Motion
- **Storybook**: Interactive documentation
- **Testing**: More testing examples
- **Themes**: More customization options

## 🤝 Contribute

Want to add a new component or improve an existing one? Contributions are welcome!

1. Review the [contribution guidelines](https://github.com/eddremonts86/sass-template)
2. Follow existing code conventions
3. Include tests and documentation
4. Ensure it's accessible

---

Do you have questions about a specific component? Check the individual documentation for each component or [create an issue](https://github.com/eddremonts86/sass-template/issues) on GitHub.
