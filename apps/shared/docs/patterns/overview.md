# Design Patterns

Template Trae implements the most modern and effective design patterns for React and JavaScript, following best practices from [patterns.dev](https://patterns.dev) and community experience.

## 🎯 Pattern Philosophy

Our patterns are designed for:

- **Maintainability**: Code that is easy to understand and modify
- **Reusability**: Components and logic that can be used in multiple contexts
- **Scalability**: Architecture that grows with your application
- **Performance**: Optimizations that improve user experience
- **Testing**: Code that is easy to test and debug

## 📚 Implemented Patterns

### 🔄 React Patterns

#### 1. **Provider Pattern**

Share global state and configuration throughout the application.

```tsx
// Implementation
export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <ThemeProvider>
        <LocaleProvider>{children}</LocaleProvider>
      </ThemeProvider>
    </ClerkProvider>
  );
}

// Usage
function App() {
  return (
    <AppProvider>
      <MyApplication />
    </AppProvider>
  );
}
```

**Benefits:**

- Global state accessible from any component
- Avoids prop drilling
- Centralized configuration

#### 2. **Custom Hooks Pattern**

Encapsulate reusable logic in custom hooks.

```tsx
// Custom hook
export function useTheme() {
  const { theme, setTheme } = useAuthStore();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return { theme, setTheme, toggleTheme };
}

// Usage in component
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button onClick={toggleTheme}>{theme === 'light' ? '🌙' : '☀️'}</Button>
  );
}
```

**Benefits:**

- Reusable logic across components
- Separation of concerns
- Easy testing

#### 3. **Compound Component Pattern**

Components that work together to create complex interfaces.

```tsx
// Implementation
export function Card({ children, ...props }) {
  return <div className="card" {...props}>{children}</div>
}

Card.Header = function CardHeader({ children }) {
  return <div className="card-header">{children}</div>
}

Card.Content = function CardContent({ children }) {
  return <div className="card-content">{children}</div>
}

Card.Footer = function CardFooter({ children }) {
  return <div className="card-footer">{children}</div>
}

// Usage
<Card>
  <Card.Header>
    <h3>Title</h3>
  </Card.Header>
  <Card.Content>
    <p>Content</p>
  </Card.Content>
  <Card.Footer>
    <Button>Action</Button>
  </Card.Footer>
</Card>
```

**Benefits:**

- Intuitive and flexible API
- Cohesive components
- Easy to extend

#### 4. **Higher-Order Component (HOC) Pattern**

Add functionality to existing components.

```tsx
// HOC for authentication
export function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function AuthenticatedComponent(props: P) {
    const { user } = useAuth();

    if (!user) {
      return <LoginPrompt />;
    }

    return <Component {...props} />;
  };
}

// Usage
const ProtectedDashboard = withAuth(Dashboard);
```

**Benefits:**

- Cross-cutting functionality
- Logic reuse
- Behavior composition

#### 5. **Render Props Pattern**

Share code between components using props that are functions.

```tsx
// Component with render props
export function DataFetcher({ url, children }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData(url)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);

  return children({ data, loading, error });
}

// Usage
<DataFetcher url="/api/users">
  {({ data, loading, error }) => {
    if (loading) return <Spinner />;
    if (error) return <ErrorMessage error={error} />;
    return <UserList users={data} />;
  }}
</DataFetcher>;
```

**Benefits:**

- Maximum flexibility
- Shared logic
- Full rendering control

### 🔧 JavaScript Patterns

#### 1. **Singleton Pattern**

A single instance for global configurations.

```javascript
class ConfigManager {
  constructor() {
    if (ConfigManager.instance) {
      return ConfigManager.instance;
    }

    this.config = {};
    ConfigManager.instance = this;
  }

  get(key) {
    return this.config[key];
  }

  set(key, value) {
    this.config[key] = value;
  }
}

const config = new ConfigManager();
```

#### 2. **Observer Pattern**

Automatic change notifications.

```javascript
class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data));
    }
  }
}
```

#### 3. **Factory Pattern**

Create objects based on configuration.

```javascript
class ComponentFactory {
  static create(type, props) {
    const components = {
      button: () => new Button(props),
      input: () => new Input(props),
      modal: () => new Modal(props),
    };

    return components[type]?.() || null;
  }
}
```

#### 4. **Module Pattern**

Code encapsulation and organization.

```javascript
const ThemeManager = (function () {
  let currentTheme = 'light';

  return {
    getTheme: () => currentTheme,
    setTheme: theme => {
      currentTheme = theme;
      document.body.className = `theme-${theme}`;
    },
  };
})();
```

### 🏗️ Architectural Patterns

#### 1. **Container/Presentational Pattern**

Separation between business logic and presentation.

```tsx
// Container (logic)
function UserListContainer() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers()
      .then(setUsers)
      .finally(() => setLoading(false));
  }, []);

  const handleUserSelect = user => {
    // Selection logic
  };

  return (
    <UserListPresentation
      users={users}
      loading={loading}
      onUserSelect={handleUserSelect}
    />
  );
}

// Presentational (UI)
function UserListPresentation({ users, loading, onUserSelect }) {
  if (loading) return <Spinner />;

  return (
    <div>
      {users.map(user => (
        <UserCard
          key={user.id}
          user={user}
          onClick={() => onUserSelect(user)}
        />
      ))}
    </div>
  );
}
```

#### 2. **State Management Pattern**

State management with Zustand.

```tsx
// Store
export const useAuthStore = create(set => ({
  user: null,
  theme: 'light',
  setUser: user => set({ user }),
  setTheme: theme => set({ theme }),
  logout: () => set({ user: null }),
}));

// Usage in component
function UserProfile() {
  const { user, logout } = useAuthStore();

  return (
    <div>
      <h1>Hello, {user?.name}</h1>
      <Button onClick={logout}>Log Out</Button>
    </div>
  );
}
```

## 🚀 Patterns in Action

### Complete Example: Dashboard with Multiple Patterns

```tsx
// HOC for authentication
const withAuth = Component => props => {
  const { user } = useAuth();
  return user ? <Component {...props} /> : <LoginPage />;
};

// Custom Hook for dashboard data
function useDashboardData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}

// Container Component
function DashboardContainer() {
  const { data, loading } = useDashboardData();
  const { theme } = useTheme();

  return <DashboardPresentation data={data} loading={loading} theme={theme} />;
}

// Presentational Component with Compound Components
function DashboardPresentation({ data, loading, theme }) {
  if (loading) return <Spinner />;

  return (
    <div className={`dashboard theme-${theme}`}>
      <Card>
        <Card.Header>
          <Card.Title>Dashboard</Card.Title>
        </Card.Header>
        <Card.Content>
          <StatsGrid data={data.stats} />
          <ChartSection data={data.charts} />
        </Card.Content>
      </Card>
    </div>
  );
}

// Final component with HOC
export const Dashboard = withAuth(DashboardContainer);
```

## 📊 Pattern Benefits

### ✅ **Maintainability**

- Organized and predictable code
- Clear separation of responsibilities
- Easy bug localization

### ✅ **Reusability**

- Components that can be used in multiple contexts
- Logic shared across different parts of the app
- Less code duplication

### ✅ **Scalability**

- Architecture that grows with the application
- Easy to add new functionalities
- Consistent patterns throughout the project

### ✅ **Testing**

- Isolated components easy to test
- Logic separated from presentation
- Simplified mocks and stubs

### ✅ **Performance**

- Automatic optimizations
- Lazy loading and code splitting
- Intelligent memoization

## 🔍 When to Use Each Pattern

| Pattern                      | When to Use                 | Avoid When             |
| ---------------------------- | --------------------------- | ---------------------- | -------------------------- |
| **Provider**                 | Global state, configuration | Simple local state     |
| **Custom Hooks**             | Reusable logic              | Very specific logic    |
| **Compound Components**      | Complex APIs                | Simple components      |
| **HOC**                      | Cross-cutting functionality | Specific logic         |
| **Render Props**             | Maximum flexibility         | Simple APIs            |
| **Container/Presentational** | Separate logic from UI      | Very simple components | ## 📚 Additional Resources |

- **[Patterns.dev](https://patterns.dev)** - Complete guide to patterns
- **[React Patterns](https://reactpatterns.com)** - React-specific patterns
- **[JavaScript Patterns](https://addyosmani.com/resources/essentialjsdesignpatterns/)** - Classic JS patterns
- **[Kent C. Dodds Blog](https://kentcdodds.com/blog)** - Articles on React patterns

## 🔄 Upcoming Patterns

We are working on implementing:

1. **Command Pattern** - For undo/redo actions
2. **Strategy Pattern** - For interchangeable algorithms
3. **Decorator Pattern** - For additional functionalities
4. **State Machine Pattern** - For complex states

---

Want to dive deeper into a specific pattern? Check out our [practical examples](/patterns/react) or [JavaScript implementations](/patterns/javascript).
