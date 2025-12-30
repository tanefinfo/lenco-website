import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, LucideIcon } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  onAdd?: () => void;
  addLabel?: string;
  children?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  icon: Icon,
  onAdd,
  addLabel,
  children,
}) => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="w-10 h-10 rounded-lg gradient-gold flex items-center justify-center">
            <Icon className="w-5 h-5 text-primary-foreground" />
          </div>
        )}
        <div>
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
          {description && (
            <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3">
        {children}
        {onAdd && (
          <Button onClick={onAdd} className="gap-2 gradient-gold text-primary-foreground hover:opacity-90">
            <Plus className="w-4 h-4" />
            {addLabel || t.add}
          </Button>
        )}
      </div>
    </div>
  );
};
