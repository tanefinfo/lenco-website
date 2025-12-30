import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { PageHeader } from '@/components/admin/PageHeader';
import { DataTable } from '@/components/admin/DataTable';
import { PartyPopper } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Festival {
  id: number;
  name: string;
  location: string;
  date: string;
  status: string;
}

const Festivals: React.FC = () => {
  const { t } = useLanguage();

  const [festivals] = useState<Festival[]>([
    { id: 1, name: 'Meskel Festival', location: 'Addis Ababa', date: '2024-09-27', status: 'Upcoming' },
    { id: 2, name: 'Irreecha Festival', location: 'Bishoftu', date: '2024-10-05', status: 'Upcoming' },
    { id: 3, name: 'Timkat Festival', location: 'Gondar', date: '2024-01-19', status: 'Completed' },
    { id: 4, name: 'Genna Festival', location: 'Lalibela', date: '2024-01-07', status: 'Completed' },
  ]);

  const columns = [
    { key: 'name' as keyof Festival, header: t.name },
    { key: 'location' as keyof Festival, header: 'Location' },
    { key: 'date' as keyof Festival, header: t.date },
    {
      key: 'status' as keyof Festival,
      header: t.status,
      render: (item: Festival) => (
        <Badge variant={item.status === 'Upcoming' ? 'default' : 'secondary'}>
          {item.status}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title={t.festivals}
        description="Manage cultural festivals"
        icon={PartyPopper}
        onAdd={() => console.log('Add festival')}
      />

      <DataTable
        data={festivals}
        columns={columns}
        onView={(item) => console.log('View', item)}
        onEdit={(item) => console.log('Edit', item)}
        onDelete={(item) => console.log('Delete', item)}
      />
    </div>
  );
};

export default Festivals;
