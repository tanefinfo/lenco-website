import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { PageHeader } from '@/components/admin/PageHeader';
import { DataTable } from '@/components/admin/DataTable';
import { Image } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Gallery {
  id: number;
  title: string;
  category: string;
  images: number;
  status: string;
}

const Galleries: React.FC = () => {
  const { t } = useLanguage();

  const [galleries] = useState<Gallery[]>([
    { id: 1, title: 'Traditional Costumes', category: 'Culture', images: 24, status: 'Published' },
    { id: 2, title: 'Landscape Photography', category: 'Nature', images: 36, status: 'Published' },
    { id: 3, title: 'Festival Moments', category: 'Events', images: 48, status: 'Draft' },
    { id: 4, title: 'Urban Art', category: 'Art', images: 18, status: 'Published' },
  ]);

  const columns = [
    { key: 'title' as keyof Gallery, header: t.title },
    { key: 'category' as keyof Gallery, header: 'Category' },
    { key: 'images' as keyof Gallery, header: 'Images' },
    {
      key: 'status' as keyof Gallery,
      header: t.status,
      render: (item: Gallery) => (
        <Badge variant={item.status === 'Published' ? 'default' : 'secondary'}>
          {item.status}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title={t.galleries}
        description="Manage photo galleries"
        icon={Image}
        onAdd={() => console.log('Add gallery')}
      />

      <DataTable
        data={galleries}
        columns={columns}
        onView={(item) => console.log('View', item)}
        onEdit={(item) => console.log('Edit', item)}
        onDelete={(item) => console.log('Delete', item)}
      />
    </div>
  );
};

export default Galleries;
