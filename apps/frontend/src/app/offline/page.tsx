'use client';

import { WifiOff, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function OfflinePage() {
  const t = useTranslations('offline');

  return (
    <div className="bg-background flex min-h-screen items-center justify-center">
      <div className="mx-auto max-w-md px-4 text-center">
        <div className="mb-8">
          <WifiOff className="text-muted-foreground mx-auto mb-4 h-24 w-24" />
          <h1 className="text-foreground mb-2 text-2xl font-bold">
            {t('title')}
          </h1>
          <p className="text-muted-foreground">{t('description')}</p>
        </div>

        <div className="space-y-4">
          <Button onClick={() => window.location.reload()} className="w-full">
            <RefreshCw className="mr-2 h-4 w-4" />
            {t('tryAgain')}
          </Button>

          <Button asChild variant="outline" className="w-full">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              {t('goHome')}
            </Link>
          </Button>
        </div>

        <div className="bg-muted mt-8 rounded-lg p-4">
          <h3 className="mb-2 text-sm font-semibold">{t('whatYouCanDo')}</h3>
          <ul className="text-muted-foreground space-y-1 text-sm">
            <li>• {t('features.browsePrevious')}</li>
            <li>• {t('features.viewCached')}</li>
            <li>• {t('features.basicFeatures')}</li>
          </ul>
        </div>

        <p className="text-muted-foreground mt-6 text-xs">
          {t('connectionRestore')}
        </p>
      </div>
    </div>
  );
}
