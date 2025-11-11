# Card Component

A versatile card component for displaying content in a contained, elevated surface.

## Import

```tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
```

## Usage

### Basic Card

```tsx
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description goes here</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### Simple Card

```tsx
<Card>
  <CardContent className="pt-6">
    <p>Simple card with just content</p>
  </CardContent>
</Card>
```

### Product Card Example

```tsx
<Card>
  <CardHeader>
    <img
      src="/product.jpg"
      alt="Product"
      className="h-48 w-full rounded-t-lg object-cover"
    />
  </CardHeader>
  <CardContent>
    <CardTitle>Product Name</CardTitle>
    <CardDescription>$99.99</CardDescription>
    <p className="text-muted-foreground mt-2 text-sm">
      Product description and details
    </p>
  </CardContent>
  <CardFooter>
    <Button className="w-full">Add to Cart</Button>
  </CardFooter>
</Card>
```

### Stats Card

```tsx
<Card>
  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
    <DollarSign className="text-muted-foreground h-4 w-4" />
  </CardHeader>
  <CardContent>
    <div className="text-2xl font-bold">$45,231.89</div>
    <p className="text-muted-foreground text-xs">+20.1% from last month</p>
  </CardContent>
</Card>
```

## Components

### Card

Main container component.

### CardHeader

Header section of the card, typically contains title and description.

### CardTitle

Title text for the card.

### CardDescription

Descriptive text for the card.

### CardContent

Main content area of the card.

### CardFooter

Footer section, typically contains actions.

## Styling

All card components accept `className` prop for custom styling:

```tsx
<Card className="max-w-md">
  <CardHeader className="bg-muted">
    <CardTitle className="text-2xl">Custom Styled Card</CardTitle>
  </CardHeader>
  <CardContent className="space-y-4">Content with spacing</CardContent>
</Card>
```

## Accessibility

- Semantic HTML structure
- Proper heading hierarchy
- Color contrast compliance
- Keyboard navigation support
