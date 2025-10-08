'use client';

import { WifiOff, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function OfflinePage() {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center">
      <div className="mx-auto max-w-md px-4 text-center">
        <div className="mb-8">
          <WifiOff className="text-muted-foreground mx-auto mb-4 h-24 w-24" />
          <h1 className="text-foreground mb-2 text-2xl font-bold">
            You&apos;re Offline
          </h1>
          <p className="text-muted-foreground">
            It looks like you&apos;ve lost your internet connection. Don&apos;t
            worry, you can still browse some content that&apos;s been cached.
          </p>
        </div>

        <div className="space-y-4">
          <Button onClick={() => window.location.reload()} className="w-full">
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>

          <Button asChild variant="outline" className="w-full">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Link>
          </Button>
        </div>

        <div className="bg-muted mt-8 rounded-lg p-4">
          <h3 className="mb-2 text-sm font-semibold">
            What you can do offline:
          </h3>
          <ul className="text-muted-foreground space-y-1 text-sm">
            <li>• Browse previously visited pages</li>
            <li>• View cached content</li>
            <li>• Use basic app features</li>
          </ul>
        </div>

        <p className="text-muted-foreground mt-6 text-xs">
          Your connection will be restored automatically when you&apos;re back
          online.
        </p>
      </div>
    </div>
  );
}
