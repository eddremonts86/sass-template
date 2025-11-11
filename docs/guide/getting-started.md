# Getting Started

Welcome to Sass Edd Template! This guide will help you set up and run the project in your local environment.

## 📋 Prerequisites

Before starting, make sure you have installed:

- **Node.js** (version 18 or higher)
- **pnpm** (recommended) or npm/yarn
- **Git**
- A [Clerk](https://clerk.com) account for authentication

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/eddremonts86/sass-template.git
cd sass-template
```

### 2. Install Dependencies

```bash
# Using pnpm (recommended)
pnpm install

# Or using npm
npm install

# Or using yarn
yarn install
```

### 3. Configure Environment Variables

Copy the example file and configure the necessary variables:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your values:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
CLERK_SECRET_KEY=sk_test_your_secret_key_here

# Next.js Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Database (optional)
DATABASE_URL=your_database_url_here

# Other configurations
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id_here
```

### 4. Configure Clerk

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Create a new application
3. Copy the API keys to your `.env.local` file
4. Configure allowed URLs:
   - **Frontend API**: `http://localhost:3000`
   - **Homepage URL**: `http://localhost:3000`

### 5. Start the Development Server

```bash
pnpm dev
```

Ready! Your application will be available at `http://localhost:3000`.

## 🏭️ Project Structure

```
template-trae/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── [locale]/          # Internationalized routes
│   │   ├── globals.css        # Global styles
│   │   └── layout.tsx         # Root layout
│   ├── components/            # React components
│   │   ├── ui/               # Base components (shadcn/ui)
│   │   ├── common/           # Common components
│   │   ├── dashboard/        # Dashboard components
│   │   ├── forms/            # Form components
│   │   └── layout/           # Layout components
│   ├── hooks/                # Custom hooks
│   ├── lib/                  # Utilities and configurations
│   │   ├── auth/            # Authentication configuration
│   │   ├── i18n/            # i18n configuration
│   │   └── utils/           # Utility functions
│   ├── stores/              # State management (Zustand)
│   ├── styles/              # Additional styles
│   ├── types/               # TypeScript type definitions
│   └── utils/               # Additional utilities
├── messages/                # Translation files
├── public/                  # Static files
├── docs/                    # Documentation (VitePress)
└── tests/                   # Tests
```

## 🎯 Next Steps

Now that you have the project running, you can:

1. **[Explore Components](/components/overview)** - Learn about the available component library
2. **[Configure Authentication](/guide/authentication)** - Customize the authentication flow
3. **[Add Languages](/guide/i18n)** - Configure additional languages
4. **[Customize Themes](/guide/theming)** - Modify colors and styles

## 🔧 Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start the development server |
| `pnpm build` | Build the application for production |
| `pnpm start` | Start the production server |
| `pnpm lint` | Run ESLint |
| `pnpm lint:fix` | Fix linting errors automatically |
| `pnpm type-check` | Verify TypeScript types |
| `pnpm docs:dev` | Start the documentation server |
| `pnpm docs:build` | Build the documentation |

## 🐛 Troubleshooting

### Error: "Invalid publishableKey"

If you see this error, verify that:

1. You have correctly configured the Clerk keys in `.env.local`
2. The keys don't contain extra spaces
3. You have restarted the server after changing environment variables

### TypeScript Compilation Error

If you encounter TypeScript errors:

1. Run `pnpm type-check` to see specific errors
2. Verify that all dependencies are installed
3. Restart your editor/IDE

### i18n Problems

If translations don't work:

1. Verify that message files exist in `messages/`
2. Check that the locale is configured correctly
3. Restart the development server

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)

## 🤝 Need Help?

If you have problems or questions:

1. Review the [complete documentation](/guide/getting-started)
2. Search in [GitHub issues](https://github.com/eddremonts86/sass-template/issues)
3. Create a new issue if you don't find the solution

We're here to help you succeed with Template Trae!
