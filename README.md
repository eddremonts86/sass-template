# 🚀 Template Trae - Modern Next.js Starter

A comprehensive Next.js 15 template with authentication, internationalization, and modern UI components.

## ✨ Features

- 🔐 **Authentication** - Clerk.js integration with sign-up/sign-in
- 🌍 **Internationalization** - Multi-language support (EN, ES, FR)
- 🎨 **Modern UI** - Shadcn/ui components with Tailwind CSS
- 🌙 **Dark Mode** - Theme switching with system preference
- 📱 **Responsive** - Mobile-first design
- 🔒 **Protected Routes** - Authentication guards
- 📊 **Dashboard** - Complete dashboard layout
- 🧪 **Testing** - Jest and React Testing Library setup
- 📝 **TypeScript** - Full type safety
- 🎯 **ESLint & Prettier** - Code quality and formatting

## 🚀 Quick Start

### 1. Setup Environment

```bash
# Copy environment template
cp .env.example .env.local
```

### 2. Configure Clerk Authentication

**⚠️ IMPORTANT**: You need to set up Clerk authentication before the app will work.

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Create a new application
3. Get your API keys from the API Keys section
4. Update `.env.local` with your actual keys:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_your_actual_key_here
CLERK_SECRET_KEY=sk_live_your_actual_key_here
```

### 3. Install and Run

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## 📖 Documentation

For detailed setup instructions, see [SETUP.md](./SETUP.md)

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Authentication**: Clerk.js
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **Icons**: Lucide React
- **Internationalization**: next-intl
- **State Management**: Zustand
- **Type Safety**: TypeScript
- **Code Quality**: ESLint, Prettier
- **Testing**: Jest, React Testing Library

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── [locale]/       # Internationalized routes
│   └── globals.css     # Global styles
├── components/         # React components
│   ├── ui/            # Shadcn/ui components
│   ├── common/        # Shared components
│   ├── dashboard/     # Dashboard components
│   └── layout/        # Layout components
├── lib/               # Utilities and configurations
├── hooks/             # Custom React hooks
├── stores/            # Zustand stores
└── types/             # TypeScript type definitions
```

## 🔧 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm test` - Run tests

## 🌐 Internationalization

Supports multiple languages out of the box:

- English (en) - Default
- Spanish (es)
- Danish (da)

Add new languages by creating message files in `/messages/` directory.

## 🎨 Customization

### Theme

- Modify `src/app/globals.css` for global styles
- Update theme colors in `tailwind.config.js`
- Customize Shadcn/ui components in `src/components/ui/`

### Authentication

- Configure Clerk settings in `src/lib/auth/clerk-provider.tsx`
- Customize auth pages styling
- Add custom user fields

## 🚨 Troubleshooting

### Authentication Error

If you see Clerk authentication errors, ensure you've:

1. Set up your Clerk application
2. Added the correct API keys to `.env.local`
3. Restarted the development server

### Build Issues

- Run `pnpm lint` to check for code issues
- Ensure all environment variables are set
- Clear Next.js cache: `rm -rf .next`

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Clerk Authentication](https://clerk.com/docs)
- [Shadcn/ui Components](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

**Made with ❤️ using Next.js 15 and modern web technologies**
