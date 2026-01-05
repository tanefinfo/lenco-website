import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  LayoutDashboard,
  Info,
  Briefcase,
  PartyPopper,
  Image,
  Calendar,
  Wrench,
  Mail,
  Package,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface AdminSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

interface NavItem {
  key: keyof typeof import('@/lib/i18n').translations.en;
  path: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { key: 'home', path: '/admin', icon: LayoutDashboard },
  { key: 'about', path: '/admin/about', icon: Info },
  { key: 'works', path: '/admin/works', icon: Briefcase },
  { key: 'festivals', path: '/admin/festivals', icon: PartyPopper },
  { key: 'galleries', path: '/admin/galleries', icon: Image },
  { key: 'events', path: '/admin/events', icon: Calendar },
  { key: 'services', path: '/admin/services', icon: Wrench },
  { key: 'contact', path: '/admin/contact', icon: Mail },
  { key: 'products', path: '/admin/products', icon: Package },
  { key: 'awards', path: '/admin/awards', icon: Sparkles }, // <-- added
];


const secondaryItems: NavItem[] = [
  { key: 'talents', path: '/admin/talents', icon: Sparkles },
  { key: 'users', path: '/admin/users', icon: Users },
  { key: 'settings', path: '/admin/settings', icon: Settings },
];

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ collapsed, onToggle }) => {
  const { t } = useLanguage();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  const renderNavItem = (item: NavItem) => {
    const Icon = item.icon;
    const active = isActive(item.path);

    return (
      <NavLink
        key={item.path}
        to={item.path}
        className={cn(
          'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group',
          'hover:bg-sidebar-accent',
          active
            ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-lg shadow-primary/20'
            : 'text-sidebar-foreground/70 hover:text-sidebar-foreground'
        )}
      >
        <Icon
          className={cn(
            'w-5 h-5 flex-shrink-0 transition-transform duration-200',
            !collapsed && 'group-hover:scale-110',
            active && 'text-sidebar-primary-foreground'
          )}
        />
        {!collapsed && (
          <span className="text-sm font-medium truncate animate-fade-in">
            {t[item.key as keyof typeof t] || item.key}
          </span>
        )}
      </NavLink>
    );
  };

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 h-full bg-sidebar border-r border-sidebar-border z-40',
        'flex flex-col transition-all duration-300 ease-in-out',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Logo Section */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-2 animate-fade-in">
            <div className="w-8 h-8 rounded-lg gradient-gold flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-sidebar-foreground">Admin Panel</span>
          </div>
        )}
        {collapsed && (
          <div className="w-8 h-8 rounded-lg gradient-gold flex items-center justify-center mx-auto">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
        )}
      </div>

      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggle}
        className={cn(
          'absolute -right-3 top-20 w-6 h-6 rounded-full',
          'bg-sidebar border border-sidebar-border shadow-lg',
          'hover:bg-sidebar-accent text-sidebar-foreground',
          'z-50'
        )}
      >
        {collapsed ? (
          <ChevronRight className="w-3 h-3" />
        ) : (
          <ChevronLeft className="w-3 h-3" />
        )}
      </Button>

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        <div className="space-y-1">
          {navItems.map(renderNavItem)}
        </div>

        {/* Divider */}
        <div className="my-4 border-t border-sidebar-border" />

        {/* Secondary Navigation */}
        <div className="space-y-1">
          {secondaryItems.map(renderNavItem)}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        {!collapsed && (
          <p className="text-xs text-sidebar-foreground/50 text-center animate-fade-in">
            © 2024 Admin Dashboard
          </p>
        )}
      </div>
    </aside>
  );
};
