# Patrones de Diseño

Template Trae implementa los patrones de diseño más modernos y efectivos para React y JavaScript, siguiendo las mejores prácticas de [patterns.dev](https://patterns.dev) y la experiencia de la comunidad.

## 🎯 Filosofía de Patrones

Nuestros patrones están diseñados para:

- **Mantenibilidad**: Código fácil de entender y modificar
- **Reutilización**: Componentes y lógica que se pueden usar en múltiples contextos
- **Escalabilidad**: Arquitectura que crece con tu aplicación
- **Performance**: Optimizaciones que mejoran la experiencia del usuario
- **Testing**: Código que es fácil de testear y debuggear

## 📚 Patrones Implementados

### 🔄 React Patterns

#### 1. **Provider Pattern**
Compartir estado y configuración global a través de la aplicación.

```tsx
// Implementación
export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <ThemeProvider>
        <LocaleProvider>
          {children}
        </LocaleProvider>
      </ThemeProvider>
    </ClerkProvider>
  )
}

// Uso
function App() {
  return (
    <AppProvider>
      <MyApplication />
    </AppProvider>
  )
}
```

**Beneficios:**
- Estado global accesible desde cualquier componente
- Evita prop drilling
- Configuración centralizada

#### 2. **Custom Hooks Pattern**
Encapsular lógica reutilizable en hooks personalizados.

```tsx
// Hook personalizado
export function useTheme() {
  const { theme, setTheme } = useAuthStore()
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }
  
  return { theme, setTheme, toggleTheme }
}

// Uso en componente
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  
  return (
    <Button onClick={toggleTheme}>
      {theme === 'light' ? '🌙' : '☀️'}
    </Button>
  )
}
```

**Beneficios:**
- Lógica reutilizable entre componentes
- Separación de concerns
- Fácil testing

#### 3. **Compound Component Pattern**
Componentes que trabajan juntos para crear interfaces complejas.

```tsx
// Implementación
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

// Uso
<Card>
  <Card.Header>
    <h3>Título</h3>
  </Card.Header>
  <Card.Content>
    <p>Contenido</p>
  </Card.Content>
  <Card.Footer>
    <Button>Acción</Button>
  </Card.Footer>
</Card>
```

**Beneficios:**
- API intuitiva y flexible
- Componentes cohesivos
- Fácil de extender

#### 4. **Higher-Order Component (HOC) Pattern**
Agregar funcionalidad a componentes existentes.

```tsx
// HOC para autenticación
export function withAuth<P extends object>(
  Component: React.ComponentType<P>
) {
  return function AuthenticatedComponent(props: P) {
    const { user } = useAuth()
    
    if (!user) {
      return <LoginPrompt />
    }
    
    return <Component {...props} />
  }
}

// Uso
const ProtectedDashboard = withAuth(Dashboard)
```

**Beneficios:**
- Funcionalidad transversal
- Reutilización de lógica
- Composición de comportamientos

#### 5. **Render Props Pattern**
Compartir código entre componentes usando props que son funciones.

```tsx
// Componente con render props
export function DataFetcher({ url, children }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    fetchData(url).then(setData).catch(setError).finally(() => setLoading(false))
  }, [url])
  
  return children({ data, loading, error })
}

// Uso
<DataFetcher url="/api/users">
  {({ data, loading, error }) => {
    if (loading) return <Spinner />
    if (error) return <ErrorMessage error={error} />
    return <UserList users={data} />
  }}
</DataFetcher>
```

**Beneficios:**
- Máxima flexibilidad
- Lógica compartida
- Control total del renderizado

### 🔧 JavaScript Patterns

#### 1. **Singleton Pattern**
Una sola instancia para configuraciones globales.

```javascript
class ConfigManager {
  constructor() {
    if (ConfigManager.instance) {
      return ConfigManager.instance
    }
    
    this.config = {}
    ConfigManager.instance = this
  }
  
  get(key) {
    return this.config[key]
  }
  
  set(key, value) {
    this.config[key] = value
  }
}

const config = new ConfigManager()
```

#### 2. **Observer Pattern**
Notificación automática de cambios.

```javascript
class EventEmitter {
  constructor() {
    this.events = {}
  }
  
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = []
    }
    this.events[event].push(callback)
  }
  
  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data))
    }
  }
}
```

#### 3. **Factory Pattern**
Crear objetos basados en configuración.

```javascript
class ComponentFactory {
  static create(type, props) {
    const components = {
      button: () => new Button(props),
      input: () => new Input(props),
      modal: () => new Modal(props)
    }
    
    return components[type]?.() || null
  }
}
```

#### 4. **Module Pattern**
Encapsulación y organización del código.

```javascript
const ThemeManager = (function() {
  let currentTheme = 'light'
  
  return {
    getTheme: () => currentTheme,
    setTheme: (theme) => {
      currentTheme = theme
      document.body.className = `theme-${theme}`
    }
  }
})()
```

### 🏗️ Architectural Patterns

#### 1. **Container/Presentational Pattern**
Separación entre lógica de negocio y presentación.

```tsx
// Container (lógica)
function UserListContainer() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    fetchUsers().then(setUsers).finally(() => setLoading(false))
  }, [])
  
  const handleUserSelect = (user) => {
    // Lógica de selección
  }
  
  return (
    <UserListPresentation 
      users={users}
      loading={loading}
      onUserSelect={handleUserSelect}
    />
  )
}

// Presentational (UI)
function UserListPresentation({ users, loading, onUserSelect }) {
  if (loading) return <Spinner />
  
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
  )
}
```

#### 2. **State Management Pattern**
Gestión de estado con Zustand.

```tsx
// Store
export const useAuthStore = create((set) => ({
  user: null,
  theme: 'light',
  setUser: (user) => set({ user }),
  setTheme: (theme) => set({ theme }),
  logout: () => set({ user: null })
}))

// Uso en componente
function UserProfile() {
  const { user, logout } = useAuthStore()
  
  return (
    <div>
      <h1>Hola, {user?.name}</h1>
      <Button onClick={logout}>Cerrar Sesión</Button>
    </div>
  )
}
```

## 🚀 Patrones en Acción

### Ejemplo Completo: Dashboard con Múltiples Patrones

```tsx
// HOC para autenticación
const withAuth = (Component) => (props) => {
  const { user } = useAuth()
  return user ? <Component {...props} /> : <LoginPage />
}

// Custom Hook para datos del dashboard
function useDashboardData() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    fetchDashboardData().then(setData).finally(() => setLoading(false))
  }, [])
  
  return { data, loading }
}

// Container Component
function DashboardContainer() {
  const { data, loading } = useDashboardData()
  const { theme } = useTheme()
  
  return (
    <DashboardPresentation 
      data={data}
      loading={loading}
      theme={theme}
    />
  )
}

// Presentational Component con Compound Components
function DashboardPresentation({ data, loading, theme }) {
  if (loading) return <Spinner />
  
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
  )
}

// Componente final con HOC
export const Dashboard = withAuth(DashboardContainer)
```

## 📊 Beneficios de los Patrones

### ✅ **Mantenibilidad**
- Código organizado y predecible
- Separación clara de responsabilidades
- Fácil localización de bugs

### ✅ **Reutilización**
- Componentes que se pueden usar en múltiples contextos
- Lógica compartida entre diferentes partes de la app
- Menos duplicación de código

### ✅ **Escalabilidad**
- Arquitectura que crece con la aplicación
- Fácil añadir nuevas funcionalidades
- Patrones consistentes en todo el proyecto

### ✅ **Testing**
- Componentes aislados fáciles de testear
- Lógica separada de la presentación
- Mocks y stubs simplificados

### ✅ **Performance**
- Optimizaciones automáticas
- Lazy loading y code splitting
- Memoización inteligente

## 🔍 Cuándo Usar Cada Patrón

| Patrón | Cuándo Usar | Evitar Cuando |
|--------|-------------|---------------|
| **Provider** | Estado global, configuración | Estado local simple |
| **Custom Hooks** | Lógica reutilizable | Lógica muy específica |
| **Compound Components** | APIs complejas | Componentes simples |
| **HOC** | Funcionalidad transversal | Lógica específica |
| **Render Props** | Máxima flexibilidad | APIs simples |
| **Container/Presentational** | Separar lógica de UI | Componentes muy simples |

## 📚 Recursos Adicionales

- **[Patterns.dev](https://patterns.dev)** - Guía completa de patrones
- **[React Patterns](https://reactpatterns.com)** - Patrones específicos de React
- **[JavaScript Patterns](https://addyosmani.com/resources/essentialjsdesignpatterns/)** - Patrones clásicos de JS
- **[Kent C. Dodds Blog](https://kentcdodds.com/blog)** - Artículos sobre patrones React

## 🔄 Próximos Patrones

Estamos trabajando en implementar:

1. **Command Pattern** - Para acciones deshacer/rehacer
2. **Strategy Pattern** - Para algoritmos intercambiables
3. **Decorator Pattern** - Para funcionalidades adicionales
4. **State Machine Pattern** - Para estados complejos

---

¿Quieres profundizar en algún patrón específico? Consulta nuestros [ejemplos prácticos](/patterns/react) o [implementaciones en JavaScript](/patterns/javascript).