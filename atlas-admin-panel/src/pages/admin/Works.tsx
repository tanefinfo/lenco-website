import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { PageHeader } from '@/components/admin/PageHeader';
import { DataTable } from '@/components/admin/DataTable';
import { Briefcase } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Work {
  id: number;
  title: string;
  type: string;
  status: string;
  date: string;
}

const Works: React.FC = () => {
  const { t } = useLanguage();

  const [works] = useState<Work[]>([
    { id: 1, title: 'Documentary Film', type: 'Film', status: 'Published', date: '2024-01-15' },
    { id: 2, title: 'Music Video Production', type: 'Video', status: 'Draft', date: '2024-01-10' },
    { id: 3, title: 'Cultural Photography', type: 'Photography', status: 'Published', date: '2024-01-05' },
    { id: 4, title: 'Art Exhibition', type: 'Exhibition', status: 'Published', date: '2023-12-20' },
  ]);

  const columns = [
    { key: 'title' as keyof Work, header: t.title },
    { key: 'type' as keyof Work, header: 'Type' },
    {
      key: 'status' as keyof Work,
      header: t.status,
      render: (item: Work) => (
        <Badge variant={item.status === 'Published' ? 'default' : 'secondary'}>
          {item.status}
        </Badge>
      ),
    },
    { key: 'date' as keyof Work, header: t.date },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title={t.works}
        description="Manage your portfolio works"
        icon={Briefcase}
        onAdd={() => console.log('Add work')}
      />

      <DataTable
        data={works}
        columns={columns}
        onView={(item) => console.log('View', item)}
        onEdit={(item) => console.log('Edit', item)}
        onDelete={(item) => console.log('Delete', item)}
      />
    </div>
  );
};

export default Works;
