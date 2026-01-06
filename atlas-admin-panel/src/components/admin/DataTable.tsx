import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Eye, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface Column<T> {
  key: keyof T | string;
  header?: React.ReactNode; // ✅ SAFE
  render?: (item: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T extends { id: number | string }> {
  data?: T[];
  columns: Column<T>[];
  isLoading?: boolean;
  onView?: (item: T) => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
}

export function DataTable<T extends { id: number | string }>({
  data = [],
  columns,
  isLoading,
  onView,
  onEdit,
  onDelete,
}: DataTableProps<T>) {
  const { t } = useLanguage();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        {t?.noData ?? 'No data'}
      </div>
    );
  }

  const getValue = (item: T, key: keyof T | string) => {
    if (typeof key === 'string' && key.includes('.')) {
      return key.split('.').reduce<any>((acc, k) => acc?.[k], item);
    }
    return item[key as keyof T];
  };

  return (
    <div className="rounded-lg border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map(col => (
              <TableHead key={String(col.key)}>
                {col.header ?? ''}
              </TableHead>
            ))}
            {(onView || onEdit || onDelete) && (
              <TableHead className="text-right">
                {t?.actions ?? 'Actions'}
              </TableHead>
            )}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map(item => (
            <TableRow key={item.id}>
              {columns.map(col => (
                <TableCell key={`${item.id}-${String(col.key)}`}>
                  {col.render
                    ? col.render(item)
                    : String(getValue(item, col.key) ?? '—')}
                </TableCell>
              ))}
              {(onView || onEdit || onDelete) && (
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    {onEdit && (
                      <Button size="icon" variant="ghost" onClick={() => onEdit(item)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                    )}
                    {onDelete && (
                      <Button size="icon" variant="ghost" onClick={() => onDelete(item)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
