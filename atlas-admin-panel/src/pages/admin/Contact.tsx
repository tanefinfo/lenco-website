import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { PageHeader } from '@/components/admin/PageHeader';
import { DataTable } from '@/components/admin/DataTable';
import { Mail } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { api } from '@/lib/api';

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
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch messages from backend
  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await api.get('/contact', { params: { lang: 'en' } });
      const data: ContactMessage[] = response.data.map((item: any) => ({
        id: item.id,
        name: item.name,
        email: item.email,
        subject: item.type,  // Laravel uses `type` field
        date: new Date(item.created_at).toLocaleDateString(),
        status: 'New', // You can enhance later based on additional backend field
      }));
      setMessages(data);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Delete message
  const handleDelete = async (item: ContactMessage) => {
    if (!window.confirm(`Are you sure you want to delete message from ${item.name}?`)) return;
    try {
      await api.delete(`/contact/${item.id}`);
      setMessages(prev => prev.filter(m => m.id !== item.id));
    } catch (error) {
      console.error('Failed to delete message:', error);
    }
  };

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

      {loading ? (
        <div>Loading messages...</div>
      ) : (
        <DataTable
          data={messages}
          columns={columns}
          onView={(item) => alert(JSON.stringify(item, null, 2))}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Contact;
