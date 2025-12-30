import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { PageHeader } from '@/components/admin/PageHeader';
import { DataTable } from '@/components/admin/DataTable';
import { Mail } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  date: string;
  status: string;
}

const Contact: React.FC = () => {
  const { t } = useLanguage();

  const [messages] = useState<ContactMessage[]>([
    { id: 1, name: 'John Doe', email: 'john@example.com', subject: 'Event Inquiry', date: '2024-01-28', status: 'New' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', subject: 'Partnership Request', date: '2024-01-27', status: 'Read' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', subject: 'Service Question', date: '2024-01-26', status: 'Replied' },
    { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', subject: 'Booking Request', date: '2024-01-25', status: 'New' },
  ]);

  const columns = [
    { key: 'name' as keyof ContactMessage, header: t.name },
    { key: 'email' as keyof ContactMessage, header: t.email },
    { key: 'subject' as keyof ContactMessage, header: 'Subject' },
    { key: 'date' as keyof ContactMessage, header: t.date },
    {
      key: 'status' as keyof ContactMessage,
      header: t.status,
      render: (item: ContactMessage) => (
        <Badge
          variant={
            item.status === 'New' ? 'default' :
            item.status === 'Read' ? 'secondary' : 'outline'
          }
        >
          {item.status}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title={t.contact}
        description="View contact messages"
        icon={Mail}
      />

      <DataTable
        data={messages}
        columns={columns}
        onView={(item) => console.log('View', item)}
        onDelete={(item) => console.log('Delete', item)}
      />
    </div>
  );
};

export default Contact;
