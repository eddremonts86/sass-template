import { redirect } from 'next/navigation';

/**
 * Root page that redirects to default locale
 */
export default function RootPage() {
  redirect('/en');
}
