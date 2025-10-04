/**
 * Navigation Configuration Constants
 * Centralized navigation structure and routing
 */

import { 
  BarChart3, 
  Calendar, 
  FileText, 
  HelpCircle, 
  Home, 
  MessageSquare, 
  Settings, 
  Users 
} from 'lucide-react'

export const NAVIGATION = {
  // Main navigation items
  main: [
    {
      key: 'overview',
      href: '/dashboard',
      icon: Home,
      translationKey: 'dashboard.nav.overview',
    },
    {
      key: 'analytics',
      href: '/dashboard/analytics',
      icon: BarChart3,
      translationKey: 'dashboard.nav.analytics',
    },
    {
      key: 'users',
      href: '/dashboard/users',
      icon: Users,
      translationKey: 'dashboard.nav.users',
    },
    {
      key: 'documents',
      href: '/dashboard/documents',
      icon: FileText,
      translationKey: 'dashboard.nav.documents',
    },
    {
      key: 'calendar',
      href: '/dashboard/calendar',
      icon: Calendar,
      translationKey: 'dashboard.nav.calendar',
    },
    {
      key: 'messages',
      href: '/dashboard/messages',
      icon: MessageSquare,
      translationKey: 'dashboard.nav.messages',
    },
  ],
  
  // Secondary navigation items
  secondary: [
    {
      key: 'settings',
      href: '/dashboard/settings',
      icon: Settings,
      translationKey: 'dashboard.nav.settings',
    },
    {
      key: 'help',
      href: '/dashboard/help',
      icon: HelpCircle,
      translationKey: 'dashboard.nav.help',
    },
  ],
  
  // Footer navigation
  footer: {
    navigation: [
      {
        key: 'home',
        href: '/',
        translationKey: 'navigation.home',
      },
      {
        key: 'about',
        href: '/about',
        translationKey: 'navigation.about',
      },
      {
        key: 'contact',
        href: '/contact',
        translationKey: 'navigation.contact',
      },
    ],
    resources: [
      {
        key: 'documentation',
        href: '/docs',
        translationKey: 'footer.resources.documentation',
      },
      {
        key: 'support',
        href: '/support',
        translationKey: 'footer.resources.support',
      },
      {
        key: 'api',
        href: '/api-docs',
        translationKey: 'footer.resources.api',
      },
    ],
  },
  
  // Header navigation
  header: [
    {
      key: 'features',
      href: '/#features',
      translationKey: 'navigation.features',
    },
    {
      key: 'pricing',
      href: '/pricing',
      translationKey: 'navigation.pricing',
    },
    {
      key: 'docs',
      href: '/docs',
      translationKey: 'navigation.docs',
    },
  ],
  
  // Breadcrumb configurations
  breadcrumbs: {
    dashboard: {
      translationKey: 'dashboard.title',
      href: '/dashboard',
    },
    analytics: {
      translationKey: 'dashboard.nav.analytics',
      href: '/dashboard/analytics',
    },
    users: {
      translationKey: 'dashboard.nav.users',
      href: '/dashboard/users',
    },
    documents: {
      translationKey: 'dashboard.nav.documents',
      href: '/dashboard/documents',
    },
    calendar: {
      translationKey: 'dashboard.nav.calendar',
      href: '/dashboard/calendar',
    },
    messages: {
      translationKey: 'dashboard.nav.messages',
      href: '/dashboard/messages',
    },
    settings: {
      translationKey: 'dashboard.nav.settings',
      href: '/dashboard/settings',
    },
    help: {
      translationKey: 'dashboard.nav.help',
      href: '/dashboard/help',
    },
  },
} as const

export type Navigation = typeof NAVIGATION