# Button Component

The Button component is a fundamental UI element that triggers actions when clicked. Built with accessibility and customization in mind.

## Import

```tsx
import { Button } from '@/components/ui/button'
```

## Usage

### Basic Example

```tsx
<Button>Click me</Button>
```

### Variants

```tsx
<Button variant="default">Default</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
```

### Sizes

```tsx
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">
  <Icon className="h-4 w-4" />
</Button>
```

### Loading State

```tsx
<Button disabled>
  <Spinner className="mr-2 h-4 w-4 animate-spin" />
  Loading...
</Button>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'destructive' \| 'outline' \| 'secondary' \| 'ghost' \| 'link'` | `'default'` | Button style variant |
| `size` | `'default' \| 'sm' \| 'lg' \| 'icon'` | `'default'` | Button size |
| `disabled` | `boolean` | `false` | Disable the button |
| `className` | `string` | - | Additional CSS classes |
| `onClick` | `() => void` | - | Click event handler |

## Accessibility

- Fully keyboard accessible
- Supports ARIA attributes
- Screen reader compatible
- Focus management

## Examples

### Submit Button

```tsx
<form onSubmit={handleSubmit}>
  <Button type="submit">
    Submit Form
  </Button>
</form>
```

### Delete Action

```tsx
<Button
  variant="destructive"
  onClick={handleDelete}
  aria-label="Delete item"
>
  Delete
</Button>
```

### With Icon

```tsx
<Button>
  <Plus className="mr-2 h-4 w-4" />
  Add New
</Button>
```
