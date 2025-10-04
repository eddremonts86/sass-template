# 🚀 Setup Guide - Template Trae

## Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- A Clerk account for authentication

## 📋 Quick Start

### 1. Clone and Install Dependencies

```bash
git clone <your-repo-url>
cd sass-edd-template
pnpm install
```

### 2. Environment Configuration

#### Step 1: Copy the environment template
```bash
cp .env.example .env.local
```

#### Step 2: Configure Clerk Authentication

1. **Create a Clerk Account**: Go to [Clerk Dashboard](https://dashboard.clerk.com) <mcreference link="https://dashboard.clerk.com/last-active?path=api-keys." index="0">0</mcreference>
2. **Create a New Application** in your Clerk dashboard
3. **Get Your API Keys**: Navigate to API Keys section
4. **Update `.env.local`** with your actual keys:

```env
# Replace these with your actual Clerk keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_your_actual_publishable_key_here
CLERK_SECRET_KEY=sk_live_your_actual_secret_key_here

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

⚠️ **Important**: Never commit your `.env.local` file to version control. It's already in `.gitignore`.

### 3. Run the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix ESLint errors automatically
- `pnpm type-check` - Run TypeScript type checking

## 🌐 Internationalization

The app supports multiple languages:
- English (en) - Default
- Spanish (es)
- Danish (da)

Language files are located in `/messages/` directory.

## 🎨 UI Components

This template uses:
- **Shadcn/ui** - Modern React components
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons

## 🔐 Authentication Features

- Sign up / Sign in
- User profiles
- Protected routes
- Session management
- Multi-factor authentication (configurable in Clerk)

## 📱 Responsive Design

The template is fully responsive and includes:
- Mobile-first design
- Dark/Light theme toggle
- Language switcher
- Collapsible sidebar

## 🚨 Troubleshooting

### Clerk Authentication Error

If you see: `@clerk/nextjs: The publishableKey passed to Clerk is invalid`

**Solution**: Make sure you've replaced the example keys in `.env.local` with your actual Clerk keys.

### Build Errors

If the build fails, ensure:
1. All environment variables are set correctly
2. Run `pnpm lint` to check for code issues
3. Run `pnpm type-check` to verify TypeScript

### Development Server Issues

If the dev server won't start:
1. Check if port 3000 is available
2. Clear Next.js cache: `rm -rf .next`
3. Reinstall dependencies: `rm -rf node_modules && pnpm install`

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Shadcn/ui](https://ui.shadcn.com)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

---

**Need help?** Check the troubleshooting section above or create an issue in the repository.