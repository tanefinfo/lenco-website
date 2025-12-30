import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { PageHeader } from '@/components/admin/PageHeader';
import { DataTable } from '@/components/admin/DataTable';
import { Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Event {
  id: number;
  title: string;
  venue: string;
  date: string;
  attendees: number;
  status: string;
}

const Events: React.FC = () => {
  const { t } = useLanguage();

  const [events] = useState<Event[]>([
    { id: 1, title: 'Art Exhibition Opening', venue: 'National Museum', date: '2024-02-15', attendees: 150, status: 'Upcoming' },
    { id: 2, title: 'Music Concert', venue: 'Millennium Hall', date: '2024-02-20', attendees: 500, status: 'Upcoming' },
    { id: 3, title: 'Cultural Workshop', venue: 'Community Center', date: '2024-01-28', attendees: 50, status: 'Completed' },
    { id: 4, title: 'Film Premiere', venue: 'Edna Mall Cinema', date: '2024-01-20', attendees: 200, status: 'Completed' },
  ]);

  const columns = [
    { key: 'title' as keyof Event, header: t.title },
    { key: 'venue' as keyof Event, header: 'Venue' },
    { key: 'date' as keyof Event, header: t.date },
    { key: 'attendees' as keyof Event, header: 'Attendees' },
    {
      key: 'status' as keyof Event,
      header: t.status,
      render: (item: Event) => (
        <Badge variant={item.status === 'Upcoming' ? 'default' : 'secondary'}>
          {item.status}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title={t.events}
        description="Manage events and shows"
        icon={Calendar}
        onAdd={() => console.log('Add event')}
      />

      <DataTable
        data={events}
        columns={columns}
        onView={(item) => console.log('View', item)}
        onEdit={(item) => console.log('Edit', item)}
        onDelete={(item) => console.log('Delete', item)}
      />
    </div>
  );
};

export default Events;
