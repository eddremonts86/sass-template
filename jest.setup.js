import '@testing-library/jest-dom';
import 'jest-axe/extend-expect';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    };
  },
  useSearchParams() {
    return new URLSearchParams();
  },
  usePathname() {
    return '/';
  },
}));

// Mock Next.js image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: props => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt} />;
  },
}));

// Mock Clerk
jest.mock('@clerk/nextjs', () => ({
  useUser: () => ({
    user: null,
    isLoaded: true,
    isSignedIn: false,
  }),
  useAuth: () => ({
    isLoaded: true,
    isSignedIn: false,
    signOut: jest.fn(),
  }),
  SignInButton: ({ children }) => (
    <div data-testid="sign-in-button">{children}</div>
  ),
  SignUpButton: ({ children }) => (
    <div data-testid="sign-up-button">{children}</div>
  ),
  UserButton: () => <div data-testid="user-button">User</div>,
}));

// Mock environment variables
process.env.NODE_ENV = 'test';
process.env.NEXT_PUBLIC_APP_URL = 'http://localhost:3000';

// Global test utilities
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock fetch
global.fetch = jest.fn();

// Console error suppression for known issues
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('Warning: ReactDOM.render is no longer supported') ||
        args[0].includes('Warning: An invalid form control'))
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

// Clean up after each test
afterEach(() => {
  jest.clearAllMocks();
});
