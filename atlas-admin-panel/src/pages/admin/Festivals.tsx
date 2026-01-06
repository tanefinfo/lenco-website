import React, { useEffect, useState } from 'react';
import api from '@/lib/api';
import { useLanguage } from '@/contexts/LanguageContext';
import { PageHeader } from '@/components/admin/PageHeader';
import { DataTable } from '@/components/admin/DataTable';
import { PartyPopper } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Festival {
  id: number;
  title: string;
  description?: string | null;
  location?: string | null;
  type: 'upcoming' | 'past';
  date: string;
  image: string;
  gallery?: string[] | null;
  spotlight?: string | null;
  link?: string | null;
}

const Festivals: React.FC = () => {
  const { t } = useLanguage();
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/festivals', { params: { lang: 'en' } })
      .then(res => setFestivals(res.data))
      .finally(() => setLoading(false));
  }, []);

  const columns = [
    { key: 'title' as keyof Festival, header: t.name },
    { key: 'location' as keyof Festival, header: 'Location' },
    { key: 'date' as keyof Festival, header: t.date },
    {
      key: 'type' as keyof Festival,
      header: t.status,
      render: (item: Festival) => (
        <Badge variant={item.type === 'upcoming' ? 'default' : 'secondary'}>
          {item.type === 'upcoming' ? 'Upcoming' : 'Past'}
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
        loading={loading}
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
