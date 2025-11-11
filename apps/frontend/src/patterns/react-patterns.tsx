/**
 * 🎯 React Design Patterns - Practical Examples
 *
 * This file contains example implementations of the most important
 * design patterns used in Template Trae.
 */

import { useTranslations } from 'next-intl';
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';

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
 * Provider Pattern - Share global state
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
  const t = useTranslations('patterns.examples');
  const context = useContext(AppContext);
  if (!context) {
    throw new Error(t('contextError'));
  }
  return context;
}

// ============================================================================
// 2. CUSTOM HOOKS PATTERN
// ============================================================================

/**
 * Custom Hook - Encapsulate reusable logic
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const t = useTranslations('patterns.examples');
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (typeof window === 'undefined') return initialValue;
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`${t('localStorageError')} "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`${t('setLocalStorageError')} "${key}":`, error);
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
 * Compound Component Pattern - Components that work together
 */
export function Card({
  children,
  variant = 'default',
  className = '',
}: {
  children: ReactNode;
  variant?: 'default' | 'outlined' | 'elevated';
  className?: string;
}) {
  const baseClasses = 'rounded-lg p-4';
  const variantClasses = {
    default: 'bg-white',
    outlined: 'border border-gray-200',
    elevated: 'shadow-lg bg-white',
  };

  return (
    <CardContext.Provider value={{ variant }}>
      <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
        {children}
      </div>
    </CardContext.Provider>
  );
}

Card.Header = function CardHeader({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`mb-4 ${className}`}>{children}</div>;
};

Card.Title = function CardTitle({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>;
};

Card.Content = function CardContent({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`${className}`}>{children}</div>;
};

Card.Footer = function CardFooter({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mt-4 border-t border-gray-100 pt-4 ${className}`}>
      {children}
    </div>
  );
};

// ============================================================================
// 4. HIGHER-ORDER COMPONENT (HOC) PATTERN
// ============================================================================

/**
 * HOC Pattern - Add functionality to components
 */
export function withLoading<P extends object>(
  Component: React.ComponentType<P>,
  loadingComponent?: ReactNode
) {
  return function WithLoadingComponent(props: P & { isLoading?: boolean }) {
    const { isLoading, ...restProps } = props;
    const t = useTranslations('patterns.examples');

    if (isLoading) {
      return loadingComponent || <div>{t('loading')}</div>;
    }

    return <Component {...(restProps as P)} />;
  };
}

/**
 * HOC for authentication
 */
export function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function WithAuthComponent(props: P) {
    const { user } = useAppContext();
    const t = useTranslations('patterns.examples');

    if (!user) {
      return <div>{t('auth.loginRequired')}</div>;
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
 * Render Props Pattern - Share logic through functions
 */
export function FetchData<T>({ url, children }: FetchDataProps<T>) {
  const t = useTranslations('patterns.examples');
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(url);
      if (!response.ok) throw new Error(t('failedToFetch'));
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('errorOccurred'));
    } finally {
      setLoading(false);
    }
  }, [url, t]);

  React.useEffect(() => {
    fetchData();
  }, [url, fetchData]);

  return <>{children({ data, loading, error, refetch: fetchData })}</>;
}

// ============================================================================
// 6. CONTAINER/PRESENTATIONAL PATTERN
// ============================================================================

/**
 * Presentational Component - Only handles UI
 */
export function UserListPresentation({
  users,
  onUserClick,
}: {
  users: Array<{ id: string; name: string; email: string }>;
  onUserClick: (id: string) => void;
}) {
  return (
    <div className="space-y-2">
      {users.map(user => (
        <div
          key={user.id}
          className="cursor-pointer rounded border p-3 hover:bg-gray-50"
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
 * Container Component - Handles business logic
 */
export function UserListContainer() {
  const t = useTranslations('patterns.examples');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  // Data simulation - in a real app this would come from an API
  const users = [
    { id: '1', name: 'Juan Pérez', email: 'juan@example.com' },
    { id: '2', name: 'María García', email: 'maria@example.com' },
    { id: '3', name: 'Carlos López', email: 'carlos@example.com' },
  ];

  const handleUserClick = (id: string) => {
    setSelectedUserId(id);
    console.log(t('userSelected'), id);
  };

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">{t('userList.title')}</h2>
      <UserListPresentation users={users} onUserClick={handleUserClick} />
      {selectedUserId && (
        <p className="mt-4 text-sm text-blue-600">
          {t('userList.selectedUser')}: {selectedUserId}
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
 * Factory Pattern - Create components based on configuration
 */
export function createButton(config: ButtonConfig) {
  const baseClasses = 'font-medium rounded focus:outline-none focus:ring-2';

  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary:
      'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return function Button() {
    return (
      <button
        className={`${baseClasses} ${variantClasses[config.variant]} ${sizeClasses[config.size]} ${
          config.disabled ? 'cursor-not-allowed opacity-50' : ''
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
 * Example of using all patterns
 */
export function PatternExamples() {
  const t = useTranslations('patterns.examples');
  const { toggle, value: showCard } = useToggle(false);
  const [theme] = useLocalStorage('theme', 'light');

  // Factory Pattern in action
  const PrimaryButton = createButton({
    variant: 'primary',
    size: 'md',
    children: t('buttons.clickMe'),
    onClick: toggle,
  });

  const SecondaryButton = createButton({
    variant: 'secondary',
    size: 'sm',
    children: t('buttons.toggleCard'),
    onClick: toggle,
  });

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">{t('title')}</h1>

      {/* Factory Pattern */}
      <div className="space-x-2">
        <PrimaryButton />
        <SecondaryButton />
      </div>

      {/* Compound Component Pattern */}
      {showCard && (
        <Card variant="elevated">
          <Card.Header>
            <Card.Title>{t('card.title')}</Card.Title>
          </Card.Header>
          <Card.Content>
            <p>{t('card.description')}</p>
            <p>
              {t('card.currentTheme')}: {theme}
            </p>
          </Card.Content>
          <Card.Footer>
            <button
              onClick={toggle}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              {t('buttons.close')}
            </button>
          </Card.Footer>
        </Card>
      )}

      {/* Render Props Pattern */}
      <FetchData<{ message: string }> url="/api/example">
        {({ data, loading, error, refetch }) => (
          <div className="rounded border p-4">
            <h3 className="mb-2 font-semibold">{t('fetchData.title')}</h3>
            {loading && <p>{t('fetchData.loading')}</p>}
            {error && (
              <p className="text-red-600">
                {t('fetchData.error')}: {error}
              </p>
            )}
            {data && (
              <p>
                {t('fetchData.data')}: {data.message}
              </p>
            )}
            <button
              onClick={refetch}
              className="mt-2 rounded bg-blue-500 px-3 py-1 text-sm text-white"
            >
              {t('buttons.refetch')}
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
