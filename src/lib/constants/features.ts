/**
 * Features Configuration Constants
 * Centralized feature definitions and landing page content
 */

import {
  Globe,
  Palette,
  Shield,
  Zap,
  Users,
  BarChart3,
  Lock,
  Smartphone,
  Cloud,
  Code,
} from 'lucide-react';

export const FEATURES = {
  // Main features for landing page
  main: [
    {
      key: 'internationalization',
      icon: Globe,
      translationKey: {
        title: 'features.internationalization.title',
        description: 'features.internationalization.description',
      },
    },
    {
      key: 'theming',
      icon: Palette,
      translationKey: {
        title: 'features.theming.title',
        description: 'features.theming.description',
      },
    },
    {
      key: 'authentication',
      icon: Shield,
      translationKey: {
        title: 'features.authentication.title',
        description: 'features.authentication.description',
      },
    },
    {
      key: 'performance',
      icon: Zap,
      translationKey: {
        title: 'features.performance.title',
        description: 'features.performance.description',
      },
    },
    {
      key: 'userManagement',
      icon: Users,
      translationKey: {
        title: 'features.userManagement.title',
        description: 'features.userManagement.description',
      },
    },
    {
      key: 'analytics',
      icon: BarChart3,
      translationKey: {
        title: 'features.analytics.title',
        description: 'features.analytics.description',
      },
    },
  ],

  // Additional features
  additional: [
    {
      key: 'security',
      icon: Lock,
      translationKey: {
        title: 'features.security.title',
        description: 'features.security.description',
      },
    },
    {
      key: 'responsive',
      icon: Smartphone,
      translationKey: {
        title: 'features.responsive.title',
        description: 'features.responsive.description',
      },
    },
    {
      key: 'cloud',
      icon: Cloud,
      translationKey: {
        title: 'features.cloud.title',
        description: 'features.cloud.description',
      },
    },
    {
      key: 'developer',
      icon: Code,
      translationKey: {
        title: 'features.developer.title',
        description: 'features.developer.description',
      },
    },
  ],

  // Hero section
  hero: {
    translationKeys: {
      title: 'hero.title',
      subtitle: 'hero.subtitle',
      description: 'hero.description',
      primaryCta: 'hero.primaryCta',
      secondaryCta: 'hero.secondaryCta',
    },
  },

  // Stats section
  stats: [
    {
      key: 'users',
      translationKey: {
        value: '10,000+',
        label: 'stats.users',
      },
    },
    {
      key: 'countries',
      translationKey: {
        value: '50+',
        label: 'stats.countries',
      },
    },
    {
      key: 'uptime',
      translationKey: {
        value: '99.9%',
        label: 'stats.uptime',
      },
    },
    {
      key: 'satisfaction',
      translationKey: {
        value: '4.9/5',
        label: 'stats.satisfaction',
      },
    },
  ],

  // Testimonials section
  testimonials: [
    {
      key: 'testimonial1',
      rating: 5,
      translationKey: {
        content: 'testimonials.testimonial1.content',
        author: 'testimonials.testimonial1.author',
        role: 'testimonials.testimonial1.role',
        company: 'testimonials.testimonial1.company',
      },
    },
    {
      key: 'testimonial2',
      rating: 5,
      translationKey: {
        content: 'testimonials.testimonial2.content',
        author: 'testimonials.testimonial2.author',
        role: 'testimonials.testimonial2.role',
        company: 'testimonials.testimonial2.company',
      },
    },
    {
      key: 'testimonial3',
      rating: 5,
      translationKey: {
        content: 'testimonials.testimonial3.content',
        author: 'testimonials.testimonial3.author',
        role: 'testimonials.testimonial3.role',
        company: 'testimonials.testimonial3.company',
      },
    },
  ],

  // Call to action section
  cta: {
    primary: {
      translationKeys: {
        title: 'cta.primary.title',
        description: 'cta.primary.description',
        button: 'cta.primary.button',
      },
    },
    secondary: {
      translationKeys: {
        title: 'cta.secondary.title',
        description: 'cta.secondary.description',
        button: 'cta.secondary.button',
      },
    },
  },
} as const;

export type Features = typeof FEATURES;
