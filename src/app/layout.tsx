import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ClerkAuthProvider } from '@/lib/auth/clerk-provider';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Template Trae - Modern Next.js Template',
  description:
    'A modern Next.js template with authentication, internationalization, and beautiful UI components.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // For root layout, we'll use a default locale for messages
  const messages = await getMessages({ locale: 'en' });

  return (
    <ClerkAuthProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </body>
      </html>
    </ClerkAuthProvider>
  );
}
