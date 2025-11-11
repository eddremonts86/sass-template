# Form Components

Comprehensive form components with validation and accessibility.

## Basic Form

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
});

export function BasicForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          {...register('name')}
          className={errors.name && 'border-red-500'}
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          {...register('email')}
          className={errors.email && 'border-red-500'}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <Button type="submit">Submit</Button>
    </form>
  );
}
```

## Form with shadcn/ui Form Components

```tsx
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const profileFormSchema = z.object({
  username: z.string().min(2).max(30),
  email: z.string().email(),
  bio: z.string().max(160).optional(),
});

export function ProfileForm() {
  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: '',
      email: '',
      bio: '',
    },
  });

  function onSubmit(values: z.infer<typeof profileFormSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="email@example.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <textarea
                  className="min-h-[80px] w-full rounded-md border px-3 py-2"
                  placeholder="Tell us about yourself"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can write up to 160 characters.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Update profile</Button>
      </form>
    </Form>
  );
}
```

## Multi-Step Form

```tsx
export function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const handleNext = (data: any) => {
    setFormData({ ...formData, ...data });
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  return (
    <div className="space-y-6">
      {/* Progress indicator */}
      <div className="flex justify-between">
        {[1, 2, 3].map(s => (
          <div
            key={s}
            className={cn(
              'h-2 flex-1 rounded',
              s === step
                ? 'bg-primary'
                : s < step
                  ? 'bg-primary/50'
                  : 'bg-muted'
            )}
          />
        ))}
      </div>

      {/* Form steps */}
      {step === 1 && <Step1Form onNext={handleNext} />}
      {step === 2 && <Step2Form onNext={handleNext} onBack={handleBack} />}
      {step === 3 && <Step3Form data={formData} onBack={handleBack} />}
    </div>
  );
}
```

## Form with File Upload

```tsx
export function FileUploadForm() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    // Upload file
    await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="file">Upload File</Label>
        <Input
          id="file"
          type="file"
          onChange={handleFileChange}
          accept="image/*"
        />
        {file && (
          <p className="text-muted-foreground text-sm">Selected: {file.name}</p>
        )}
      </div>
      <Button type="submit" disabled={!file}>
        Upload
      </Button>
    </form>
  );
}
```

## Validation Schemas

### Common Patterns

```tsx
import * as z from 'zod';

// Email validation
const emailSchema = z.string().email('Invalid email address');

// Password validation
const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain an uppercase letter')
  .regex(/[a-z]/, 'Password must contain a lowercase letter')
  .regex(/[0-9]/, 'Password must contain a number');

// Phone validation
const phoneSchema = z
  .string()
  .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number');

// URL validation
const urlSchema = z.string().url('Invalid URL');

// Date validation
const dateSchema = z.string().refine(date => !isNaN(Date.parse(date)), {
  message: 'Invalid date',
});

// Confirm password
const signupSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });
```

## Accessibility

- Proper label association with `htmlFor`
- Error messages linked with `aria-describedby`
- Required fields marked with `aria-required`
- Form validation feedback announced
- Keyboard navigation support
- Focus management

## Best Practices

1. **Always validate on both client and server**
2. **Provide clear error messages**
3. **Use appropriate input types**
4. **Show loading states during submission**
5. **Disable submit button during processing**
6. **Clear sensitive data after submission**
7. **Handle network errors gracefully**
8. **Use progressive enhancement**
