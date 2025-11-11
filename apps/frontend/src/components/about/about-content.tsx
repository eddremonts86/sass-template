'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { GeometricIcons } from './geometric-icons';
import { useTranslations } from 'next-intl';

interface AboutContentProps {
  className?: string;
}

export const AboutContent: React.FC<AboutContentProps> = ({
  className = '',
}) => {
  const t = useTranslations('pages.about');

  return (
    <div className={`space-y-16 ${className}`}>
      {/* Hero Section */}
      <section className="space-y-6 text-center">
        <h1 className="text-foreground text-4xl font-bold md:text-5xl">
          {t('hero.title')}
        </h1>
        <p className="text-muted-foreground mx-auto max-w-2xl text-lg leading-relaxed">
          {t('hero.subtitle')}
        </p>
      </section>

      {/* Geometric Icons Grid */}
      <section className="py-8">
        <GeometricIcons className="" />
      </section>

      {/* Our Vision & Our Creators Sections */}
      <section className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
        {/* Our Vision */}
        <div className="space-y-6">
          <h2 className="text-foreground text-2xl font-bold">
            {t('vision.title')}
          </h2>
          <div className="text-muted-foreground space-y-4 leading-relaxed">
            <p>{t('vision.description1')}</p>
            <p>{t('vision.description2')}</p>
            <p>{t('vision.description3')}</p>
          </div>
        </div>

        {/* Our Creators */}
        <div className="space-y-6">
          <h2 className="text-foreground text-2xl font-bold">
            {t('creators.title')}
          </h2>
          <div className="text-muted-foreground space-y-4 leading-relaxed">
            <p>{t('creators.description1')}</p>
            <p>{t('creators.description2')}</p>
            <p>{t('creators.description3')}</p>
          </div>
        </div>
      </section>

      {/* Part of Our Global Team Section */}
      <section className="bg-muted space-y-6 rounded-2xl p-8 text-center md:p-12">
        <div className="space-y-4">
          <h2 className="text-foreground text-2xl font-bold">
            {t('globalTeam.title')}
          </h2>
          <h3 className="text-foreground text-xl font-semibold">
            {t('globalTeam.subtitle')}
          </h3>
        </div>
        <Button
          className="bg-foreground hover:bg-foreground/90 text-background rounded-lg px-6 py-3 font-medium transition-colors duration-200"
          onClick={() => window.open('#', '_blank')}
        >
          {t('globalTeam.cta')}
        </Button>
      </section>
    </div>
  );
};

export default AboutContent;
