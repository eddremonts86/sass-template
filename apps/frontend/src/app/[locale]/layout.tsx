import { redirect } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { isValidLocale } from '@/lib/i18n/config';
import { ThemeProvider } from '@/components/common/site/theme/providers/theme-provider';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate that the incoming `locale` parameter is valid
  if (!isValidLocale(locale)) {
    redirect('/en');
  }

  // Set the current locale for server components
  setRequestLocale(locale);

  // Get messages for the current locale
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
