'use client';

import { useTranslations } from 'next-intl';
import { useUser } from '@clerk/nextjs';
import { StatsCard } from '@/components/features/dashboard/stats-card';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Users,
  DollarSign,
  Activity,
  TrendingUp,
  Calendar,
  FileText,
  Mail,
  Settings,
} from 'lucide-react';

/**
 * Main dashboard page
 */
export default function DashboardPage() {
  const t = useTranslations();
  const { user } = useUser();

  const stats = [
    {
      title: t('dashboard.stats.totalUsers'),
      value: '2,350',
      description: t('dashboard.stats.fromLastMonth'),
      icon: <Users className="h-4 w-4" />,
      trend: { value: 20.1, isPositive: true },
    },
    {
      title: t('dashboard.stats.revenue'),
      value: '$45,231.89',
      description: t('dashboard.stats.fromLastMonth'),
      icon: <DollarSign className="h-4 w-4" />,
      trend: { value: 15.3, isPositive: true },
    },
    {
      title: t('dashboard.stats.activeUsers'),
      value: '1,234',
      description: t('dashboard.stats.fromLastMonth'),
      icon: <Activity className="h-4 w-4" />,
      trend: { value: 5.2, isPositive: false },
    },
    {
      title: t('dashboard.stats.growth'),
      value: '+12.5%',
      description: t('dashboard.stats.fromLastMonth'),
      icon: <TrendingUp className="h-4 w-4" />,
      trend: { value: 8.7, isPositive: true },
    },
  ];

  const recentActivities = [
    {
      id: 1,
      title: t('dashboard.activities.newUserRegistration'),
      description: t('dashboard.activities.newUserRegistrationDesc', {
        name: 'John Doe',
      }),
      time: t('dashboard.timeAgo.minutesAgo', { count: 2 }),
      type: 'user',
    },
    {
      id: 2,
      title: t('dashboard.activities.paymentReceived'),
      description: t('dashboard.activities.paymentReceivedDesc', {
        amount: '$299.00',
        type: 'Premium',
      }),
      time: t('dashboard.timeAgo.minutesAgo', { count: 5 }),
      type: 'payment',
    },
    {
      id: 3,
      title: t('dashboard.activities.documentUploaded'),
      description: t('dashboard.activities.documentUploadedDesc', {
        filename: 'Project proposal.pdf',
      }),
      time: t('dashboard.timeAgo.minutesAgo', { count: 10 }),
      type: 'document',
    },
    {
      id: 4,
      title: t('dashboard.activities.systemUpdate'),
      description: t('dashboard.activities.systemUpdateDesc'),
      time: t('dashboard.timeAgo.hourAgo'),
      type: 'system',
    },
  ];

  const quickActions = [
    {
      title: t('dashboard.quickActions.newUser'),
      description: t('dashboard.quickActions.newUserDesc'),
      icon: <Users className="h-5 w-5" />,
      href: '/dashboard/users/new',
    },
    {
      title: t('dashboard.quickActions.createDocument'),
      description: t('dashboard.quickActions.createDocumentDesc'),
      icon: <FileText className="h-5 w-5" />,
      href: '/dashboard/documents/new',
    },
    {
      title: t('dashboard.quickActions.sendMessage'),
      description: t('dashboard.quickActions.sendMessageDesc'),
      icon: <Mail className="h-5 w-5" />,
      href: '/dashboard/messages/new',
    },
    {
      title: t('dashboard.quickActions.settings'),
      description: t('dashboard.quickActions.settingsDesc'),
      icon: <Settings className="h-5 w-5" />,
      href: '/dashboard/settings',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {t('dashboard.welcome')},{' '}
            {user?.firstName || user?.emailAddresses[0]?.emailAddress}
          </h1>
          <p className="text-muted-foreground">
            {t('dashboard.welcomeMessage')}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="gap-1">
            <Calendar className="h-3 w-3" />
            {new Date().toLocaleDateString()}
          </Badge>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            description={stat.description}
            icon={stat.icon}
            trend={stat.trend}
          />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.recentActivity')}</CardTitle>
            <CardDescription>
              {t('dashboard.recentActivityDesc')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map(activity => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 rounded-lg border p-3"
                >
                  <div className="bg-muted flex h-8 w-8 items-center justify-center rounded-full">
                    {activity.type === 'user' && <Users className="h-4 w-4" />}
                    {activity.type === 'payment' && (
                      <DollarSign className="h-4 w-4" />
                    )}
                    {activity.type === 'document' && (
                      <FileText className="h-4 w-4" />
                    )}
                    {activity.type === 'system' && (
                      <Settings className="h-4 w-4" />
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-muted-foreground text-xs">
                      {activity.description}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.quickActions.title')}</CardTitle>
            <CardDescription>
              {t('dashboard.quickActions.description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto justify-start p-4"
                  asChild
                >
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-lg">
                      {action.icon}
                    </div>
                    <div className="text-left">
                      <p className="font-medium">{action.title}</p>
                      <p className="text-muted-foreground text-xs">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
