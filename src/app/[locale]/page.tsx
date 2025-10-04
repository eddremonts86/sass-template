import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { FEATURES } from '@/lib/constants';
import Link from 'next/link';
import { 
  ArrowRight,
  CheckCircle
} from 'lucide-react';

/**
 * Landing page component with hero section and features
 */
export default function HomePage() {
  const t = useTranslations('landing');
  const tCommon = useTranslations('common');

  const features = FEATURES.main.map(feature => ({
    icon: feature.icon,
    title: t(feature.translationKey.title as any),
    description: t(feature.translationKey.description as any),
  }));

  const benefits = [
    t('benefits.items.nextjs'),
    t('benefits.items.typescript'),
    t('benefits.items.tailwind'),
    t('benefits.items.shadcn'),
    t('benefits.items.clerk'),
    t('benefits.items.zustand'),
    t('benefits.items.intl'),
    t('benefits.items.tools'),
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="mx-auto flex max-w-[980px] flex-col items-center gap-2 text-center">
            <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
              {t('hero.title')}
            </h1>
            <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
              {t('hero.subtitle')}
            </p>
            <div className="flex gap-4 mt-6">
              <Button size="lg" asChild>
                <Link href="/dashboard">
                  {t('hero.cta')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="#features">
                  {t('hero.learnMore')}
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="container space-y-6 py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[980px] flex-col items-center gap-2 text-center">
            <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl">
              {t('features.title')}
            </h2>
            <p className="max-w-[600px] text-lg text-muted-foreground sm:text-xl">
              {t('features.subtitle')}
            </p>
          </div>
          
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="relative overflow-hidden">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="container space-y-6 py-8 md:py-12 lg:py-24 bg-muted/50">
          <div className="mx-auto flex max-w-[980px] flex-col items-center gap-2 text-center">
            <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl">
              {t('benefits.title')}
            </h2>
            <p className="max-w-[600px] text-lg text-muted-foreground sm:text-xl">
              {t('benefits.subtitle')}
            </p>
          </div>
          
          <div className="mx-auto max-w-[64rem]">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container space-y-6 py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[980px] flex-col items-center gap-2 text-center">
            <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl">
              {t('cta.title')}
            </h2>
            <p className="max-w-[600px] text-lg text-muted-foreground sm:text-xl">
              {t('cta.subtitle')}
            </p>
            <div className="flex gap-4 mt-6">
              <Button size="lg" asChild>
                <Link href="/sign-up">
                  {t('cta.signup')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/dashboard">
                  {t('cta.demo')}
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
