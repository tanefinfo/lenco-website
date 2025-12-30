import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { PageHeader } from '@/components/admin/PageHeader';
import { DataTable } from '@/components/admin/DataTable';
import { Wrench } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Service {
  id: number;
  name: string;
  category: string;
  price: string;
  status: string;
}

const Services: React.FC = () => {
  const { t } = useLanguage();

  const [services] = useState<Service[]>([
    { id: 1, name: 'Event Planning', category: 'Events', price: '$500+', status: 'Active' },
    { id: 2, name: 'Photography Session', category: 'Photography', price: '$150+', status: 'Active' },
    { id: 3, name: 'Video Production', category: 'Media', price: '$1000+', status: 'Active' },
    { id: 4, name: 'Cultural Consultation', category: 'Consulting', price: '$75/hr', status: 'Inactive' },
  ]);

  const columns = [
    { key: 'name' as keyof Service, header: t.name },
    { key: 'category' as keyof Service, header: 'Category' },
    { key: 'price' as keyof Service, header: 'Price' },
    {
      key: 'status' as keyof Service,
      header: t.status,
      render: (item: Service) => (
        <Badge variant={item.status === 'Active' ? 'default' : 'secondary'}>
          {item.status}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title={t.services}
        description="Manage your services"
        icon={Wrench}
        onAdd={() => console.log('Add service')}
      />

      <DataTable
        data={services}
        columns={columns}
        onView={(item) => console.log('View', item)}
        onEdit={(item) => console.log('Edit', item)}
        onDelete={(item) => console.log('Delete', item)}
      />
    </div>
  );
};

export default Services;
