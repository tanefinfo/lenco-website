import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { StatCard } from '@/components/admin/StatCard';
import { PageHeader } from '@/components/admin/PageHeader';
import {
  LayoutDashboard,
  Users,
  Calendar,
  Package,
  Wrench,
  TrendingUp,
  Image,
  PartyPopper,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Dashboard: React.FC = () => {
  const { t } = useLanguage();

  // Demo data - in real app, fetch from API
  const stats = [
    {
      title: t.totalUsers,
      value: '1,234',
      icon: Users,
      trend: { value: 12, isPositive: true },
    },
    {
      title: t.totalEvents,
      value: '56',
      icon: Calendar,
      trend: { value: 8, isPositive: true },
    },
    {
      title: t.totalProducts,
      value: '89',
      icon: Package,
      trend: { value: -3, isPositive: false },
    },
    {
      title: t.totalServices,
      value: '24',
      icon: Wrench,
      trend: { value: 15, isPositive: true },
    },
  ];

  const recentActivities = [
    { id: 1, action: 'New event created', item: 'Summer Festival 2024', time: '2 hours ago', type: 'event' },
    { id: 2, action: 'Gallery updated', item: 'Cultural Exhibition', time: '4 hours ago', type: 'gallery' },
    { id: 3, action: 'New product added', item: 'Traditional Crafts', time: '6 hours ago', type: 'product' },
    { id: 4, action: 'Festival scheduled', item: 'Meskel Celebration', time: '1 day ago', type: 'festival' },
    { id: 5, action: 'Service updated', item: 'Event Planning', time: '2 days ago', type: 'service' },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'event':
        return Calendar;
      case 'gallery':
        return Image;
      case 'product':
        return Package;
      case 'festival':
        return PartyPopper;
      default:
        return Wrench;
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t.dashboard}
        description="Welcome to your admin dashboard"
        icon={LayoutDashboard}
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">{t.recentActivity}</CardTitle>
            <button className="text-sm text-primary hover:underline">{t.viewAll}</button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const Icon = getActivityIcon(activity.type);
                return (
                  <div
                    key={activity.id}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {activity.action}
                      </p>
                      <p className="text-sm text-muted-foreground truncate">
                        {activity.item}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {activity.time}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Galleries</span>
                <span className="font-medium">45</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full gradient-gold rounded-full" style={{ width: '75%' }} />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Festivals</span>
                <span className="font-medium">12</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full gradient-gold rounded-full" style={{ width: '45%' }} />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Contact Messages</span>
                <span className="font-medium">28</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full gradient-gold rounded-full" style={{ width: '60%' }} />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Talents</span>
                <span className="font-medium">67</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full gradient-gold rounded-full" style={{ width: '85%' }} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
