# React Patterns

Modern React patterns and best practices implemented in this template.

## Custom Hooks Pattern

### useTheme Hook

```tsx
export function useTheme() {
  const { theme, setTheme } = useAuthStore();

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }, [theme, setTheme]);

  return { theme, setTheme, toggleTheme };
}
```

### useLocalStorage Hook

```tsx
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}
```

## Provider Pattern

### Multi-Provider Setup

```tsx
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <NextIntlClientProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </NextIntlClientProvider>
    </ClerkProvider>
  );
}
```

## Compound Components Pattern

### Example Implementation

```tsx
export function Card({ children, ...props }: CardProps) {
  return (
    <div className="card" {...props}>
      {children}
    </div>
  );
}

Card.Header = function CardHeader({ children }: { children: ReactNode }) {
  return <div className="card-header">{children}</div>;
};

Card.Content = function CardContent({ children }: { children: ReactNode }) {
  return <div className="card-content">{children}</div>;
};

Card.Footer = function CardFooter({ children }: { children: ReactNode }) {
  return <div className="card-footer">{children}</div>;
};
```

### Usage

```tsx
<Card>
  <Card.Header>
    <h2>Title</h2>
  </Card.Header>
  <Card.Content>
    <p>Content</p>
  </Card.Content>
  <Card.Footer>
    <Button>Action</Button>
  </Card.Footer>
</Card>
```

## Container/Presentational Pattern

### Container Component

```tsx
function UserListContainer() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers()
      .then(setUsers)
      .finally(() => setLoading(false));
  }, []);

  return <UserListPresentation users={users} loading={loading} />;
}
```

### Presentational Component

```tsx
function UserListPresentation({ users, loading }) {
  if (loading) return <Spinner />;

  return (
    <div className="grid gap-4">
      {users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
```

## State Management with Zustand

### Creating a Store

```tsx
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    set => ({
      user: null,
      theme: 'system',
      locale: 'en',
      setUser: user => set({ user }),
      setTheme: theme => set({ theme }),
      setLocale: locale => set({ locale }),
    }),
    {
      name: 'auth-store',
      partialize: state => ({
        theme: state.theme,
        locale: state.locale,
      }),
    }
  )
);
```

### Using the Store

```tsx
function UserProfile() {
  const { user, setUser } = useAuthStore();

  return (
    <div>
      <h1>Hello, {user?.name}</h1>
      <Button onClick={() => setUser(null)}>Logout</Button>
    </div>
  );
}
```

## Performance Optimization Patterns

### Memoization

```tsx
const MemoizedComponent = React.memo(({ data }) => {
  return <ExpensiveComponent data={data} />;
});

function ParentComponent() {
  const [count, setCount] = useState(0);
  const data = useMemo(() => computeExpensiveValue(), []);

  return <MemoizedComponent data={data} />;
}
```

### useCallback for Event Handlers

```tsx
function TodoList({ todos }) {
  const handleToggle = useCallback(id => {
    toggleTodo(id);
  }, []);

  return (
    <div>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onToggle={handleToggle} />
      ))}
    </div>
  );
}
```

## Best Practices

1. **Always specify dependencies** in useEffect, useMemo, and useCallback
2. **Use TypeScript** for type safety
3. **Separate concerns** with container/presentational pattern
4. **Memoize expensive computations** and stable callbacks
5. **Use custom hooks** for reusable logic
6. **Keep components small** and focused
7. **Follow the single responsibility principle**
8. **Test your components** with React Testing Library

## Anti-Patterns to Avoid

❌ **Don't set state in render**

```tsx
function Bad() {
  const [count, setCount] = useState(0);
  setCount(1); // ❌ Infinite loop!
  return <div>{count}</div>;
}
```

❌ **Don't use array index as key**

```tsx
// ❌ Bad
{
  items.map((item, index) => <Item key={index} />);
}

// ✅ Good
{
  items.map(item => <Item key={item.id} />);
}
```

❌ **Don't omit dependencies**

```tsx
// ❌ Bad
useEffect(() => {
  fetchData(userId);
}, []); // Missing userId

// ✅ Good
useEffect(() => {
  fetchData(userId);
}, [userId]);
```
