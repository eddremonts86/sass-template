# Input Component

A text input component for forms with support for various types and validation states.

## Import

```tsx
import { Input } from '@/components/ui/input';
```

## Usage

### Basic Example

```tsx
<Input placeholder="Enter your name" />
```

### Input Types

```tsx
<Input type="text" placeholder="Text input" />
<Input type="email" placeholder="Email input" />
<Input type="password" placeholder="Password input" />
<Input type="number" placeholder="Number input" />
<Input type="search" placeholder="Search input" />
```

### With Label

```tsx
<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="Enter your email" />
</div>
```

### Disabled State

```tsx
<Input disabled placeholder="Disabled input" />
```

### With Error

```tsx
<div className="space-y-2">
  <Input
    type="email"
    placeholder="Enter your email"
    className="border-red-500"
  />
  <p className="text-sm text-red-500">Invalid email address</p>
</div>
```

## Props

| Prop          | Type          | Default  | Description                              |
| ------------- | ------------- | -------- | ---------------------------------------- |
| `type`        | `string`      | `'text'` | Input type (text, email, password, etc.) |
| `placeholder` | `string`      | -        | Placeholder text                         |
| `disabled`    | `boolean`     | `false`  | Disable the input                        |
| `className`   | `string`      | -        | Additional CSS classes                   |
| `value`       | `string`      | -        | Controlled value                         |
| `onChange`    | `(e) => void` | -        | Change event handler                     |

## Accessibility

- Proper label association with `htmlFor`
- Keyboard navigation support
- Screen reader compatible
- Error state announcements

## Form Integration

```tsx
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export function ContactForm() {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input {...register('name')} id="name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input {...register('email')} id="email" type="email" />
        </div>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}
```
