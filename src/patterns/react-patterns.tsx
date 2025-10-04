/**
 * 🎯 React Design Patterns - Ejemplos Prácticos
 * 
 * Este archivo contiene implementaciones de ejemplo de los patrones de diseño
 * más importantes utilizados en Template Trae.
 */

import React, { createContext, useContext, useState, ReactNode } from 'react';

// ============================================================================
// 1. PROVIDER PATTERN
// ============================================================================

interface AppContextType {
  user: string | null;
  setUser: (user: string | null) => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

/**
 * Provider Pattern - Compartir estado global
 */
export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  return (
    <AppContext.Provider value={{ user, setUser, theme, setTheme }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
}

// ============================================================================
// 2. CUSTOM HOOKS PATTERN
// ============================================================================

/**
 * Custom Hook - Encapsular lógica reutilizable
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (typeof window === 'undefined') return initialValue;
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
}

/**
 * Custom Hook - Toggle state
 */
export function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  
  const toggle = () => setValue(prev => !prev);
  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);
  
  return { value, toggle, setTrue, setFalse, setValue };
}

// ============================================================================
// 3. COMPOUND COMPONENT PATTERN
// ============================================================================

interface CardContextType {
  variant: 'default' | 'outlined' | 'elevated';
}

const CardContext = createContext<CardContextType>({ variant: 'default' });

/**
 * Compound Component Pattern - Componentes que trabajan juntos
 */
export function Card({ 
  children, 
  variant = 'default',
  className = '' 
}: { 
  children: ReactNode;
  variant?: 'default' | 'outlined' | 'elevated';
  className?: string;
}) {
  const baseClasses = 'rounded-lg p-4';
  const variantClasses = {
    default: 'bg-white',
    outlined: 'border border-gray-200',
    elevated: 'shadow-lg bg-white'
  };

  return (
    <CardContext.Provider value={{ variant }}>
      <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
        {children}
      </div>
    </CardContext.Provider>
  );
}

Card.Header = function CardHeader({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`mb-4 ${className}`}>
      {children}
    </div>
  );
};

Card.Title = function CardTitle({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <h3 className={`text-lg font-semibold ${className}`}>
      {children}
    </h3>
  );
};

Card.Content = function CardContent({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`${className}`}>
      {children}
    </div>
  );
};

Card.Footer = function CardFooter({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`mt-4 pt-4 border-t border-gray-100 ${className}`}>
      {children}
    </div>
  );
};

// ============================================================================
// 4. HIGHER-ORDER COMPONENT (HOC) PATTERN
// ============================================================================

/**
 * HOC Pattern - Agregar funcionalidad a componentes
 */
export function withLoading<P extends object>(
  Component: React.ComponentType<P>,
  loadingComponent?: ReactNode
) {
  return function WithLoadingComponent(props: P & { isLoading?: boolean }) {
    const { isLoading, ...restProps } = props;
    
    if (isLoading) {
      return loadingComponent || <div>Loading...</div>;
    }
    
    return <Component {...(restProps as P)} />;
  };
}

/**
 * HOC para autenticación
 */
export function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function WithAuthComponent(props: P) {
    const { user } = useAppContext();
    
    if (!user) {
      return <div>Please log in to access this content.</div>;
    }
    
    return <Component {...props} />;
  };
}

// ============================================================================
// 5. RENDER PROPS PATTERN
// ============================================================================

interface FetchDataProps<T> {
  url: string;
  children: (data: {
    data: T | null;
    loading: boolean;
    error: string | null;
    refetch: () => void;
  }) => ReactNode;
}

/**
 * Render Props Pattern - Compartir lógica mediante funciones
 */
export function FetchData<T>({ url, children }: FetchDataProps<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch');
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, [url]);

  return <>{children({ data, loading, error, refetch: fetchData })}</>;
}

// ============================================================================
// 6. CONTAINER/PRESENTATIONAL PATTERN
// ============================================================================

/**
 * Presentational Component - Solo se encarga de la UI
 */
export function UserListPresentation({ 
  users, 
  onUserClick 
}: { 
  users: Array<{ id: string; name: string; email: string }>;
  onUserClick: (id: string) => void;
}) {
  return (
    <div className="space-y-2">
      {users.map(user => (
        <div 
          key={user.id}
          className="p-3 border rounded cursor-pointer hover:bg-gray-50"
          onClick={() => onUserClick(user.id)}
        >
          <h4 className="font-medium">{user.name}</h4>
          <p className="text-sm text-gray-600">{user.email}</p>
        </div>
      ))}
    </div>
  );
}

/**
 * Container Component - Maneja la lógica de negocio
 */
export function UserListContainer() {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  
  // Simulación de datos - en una app real vendría de una API
  const users = [
    { id: '1', name: 'Juan Pérez', email: 'juan@example.com' },
    { id: '2', name: 'María García', email: 'maria@example.com' },
    { id: '3', name: 'Carlos López', email: 'carlos@example.com' },
  ];

  const handleUserClick = (id: string) => {
    setSelectedUserId(id);
    console.log('Usuario seleccionado:', id);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Lista de Usuarios</h2>
      <UserListPresentation users={users} onUserClick={handleUserClick} />
      {selectedUserId && (
        <p className="mt-4 text-sm text-blue-600">
          Usuario seleccionado: {selectedUserId}
        </p>
      )}
    </div>
  );
}

// ============================================================================
// 7. FACTORY PATTERN
// ============================================================================

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success';

interface ButtonConfig {
  variant: ButtonVariant;
  size: 'sm' | 'md' | 'lg';
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

/**
 * Factory Pattern - Crear componentes basados en configuración
 */
export function createButton(config: ButtonConfig) {
  const baseClasses = 'font-medium rounded focus:outline-none focus:ring-2';
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500'
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  return function Button() {
    return (
      <button
        className={`${baseClasses} ${variantClasses[config.variant]} ${sizeClasses[config.size]} ${
          config.disabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={config.onClick}
        disabled={config.disabled}
      >
        {config.children}
      </button>
    );
  };
}

// ============================================================================
// 8. EJEMPLOS DE USO
// ============================================================================

/**
 * Ejemplo de uso de todos los patrones
 */
export function PatternExamples() {
  const { toggle, value: showCard } = useToggle(false);
  const [theme] = useLocalStorage('theme', 'light');

  // Factory Pattern en acción
  const PrimaryButton = createButton({
    variant: 'primary',
    size: 'md',
    children: 'Click me!',
    onClick: toggle
  });

  const SecondaryButton = createButton({
    variant: 'secondary',
    size: 'sm',
    children: 'Toggle Card',
    onClick: toggle
  });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">React Design Patterns Examples</h1>
      
      {/* Factory Pattern */}
      <div className="space-x-2">
        <PrimaryButton />
        <SecondaryButton />
      </div>

      {/* Compound Component Pattern */}
      {showCard && (
        <Card variant="elevated">
          <Card.Header>
            <Card.Title>Ejemplo de Card</Card.Title>
          </Card.Header>
          <Card.Content>
            <p>Este es un ejemplo del patrón Compound Component.</p>
            <p>Tema actual: {theme}</p>
          </Card.Content>
          <Card.Footer>
            <button 
              onClick={toggle}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Cerrar
            </button>
          </Card.Footer>
        </Card>
      )}

      {/* Render Props Pattern */}
      <FetchData<{ message: string }> url="/api/example">
        {({ data, loading, error, refetch }) => (
          <div className="border p-4 rounded">
            <h3 className="font-semibold mb-2">Fetch Data Example</h3>
            {loading && <p>Cargando...</p>}
            {error && <p className="text-red-600">Error: {error}</p>}
            {data && <p>Datos: {data.message}</p>}
            <button 
              onClick={refetch}
              className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-sm"
            >
              Refetch
            </button>
          </div>
        )}
      </FetchData>

      {/* Container/Presentational Pattern */}
      <UserListContainer />
    </div>
  );
}

export default PatternExamples;