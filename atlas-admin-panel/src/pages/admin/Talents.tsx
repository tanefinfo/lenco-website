import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { PageHeader } from '@/components/admin/PageHeader';
import { DataTable } from '@/components/admin/DataTable';
import { Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Talent {
  id: number;
  name: string;
  skill: string;
  experience: string;
  status: string;
  date: string;
}

const Talents: React.FC = () => {
  const { t } = useLanguage();

  const [talents] = useState<Talent[]>([
    { id: 1, name: 'Abebe Kebede', skill: 'Traditional Dance', experience: '10 years', status: 'Approved', date: '2024-01-28' },
    { id: 2, name: 'Tigist Haile', skill: 'Music & Vocals', experience: '8 years', status: 'Pending', date: '2024-01-27' },
    { id: 3, name: 'Dawit Mekonnen', skill: 'Visual Arts', experience: '5 years', status: 'Approved', date: '2024-01-25' },
    { id: 4, name: 'Hana Girma', skill: 'Photography', experience: '6 years', status: 'Under Review', date: '2024-01-24' },
  ]);

  const columns = [
    { key: 'name' as keyof Talent, header: t.name },
    { key: 'skill' as keyof Talent, header: 'Skill' },
    { key: 'experience' as keyof Talent, header: 'Experience' },
    { key: 'date' as keyof Talent, header: 'Applied' },
    {
      key: 'status' as keyof Talent,
      header: t.status,
      render: (item: Talent) => (
        <Badge
          variant={
            item.status === 'Approved' ? 'default' :
            item.status === 'Pending' ? 'secondary' : 'outline'
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
        title={t.talents}
        description="Manage talent applications"
        icon={Sparkles}
        onAdd={() => console.log('Add talent')}
      />

      <DataTable
        data={talents}
        columns={columns}
        onView={(item) => console.log('View', item)}
        onEdit={(item) => console.log('Edit', item)}
        onDelete={(item) => console.log('Delete', item)}
      />
    </div>
  );
};

export default Talents;
