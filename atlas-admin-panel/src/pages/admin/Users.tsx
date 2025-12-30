import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { PageHeader } from '@/components/admin/PageHeader';
import { DataTable } from '@/components/admin/DataTable';
import { Users as UsersIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastActive: string;
}

const Users: React.FC = () => {
  const { t } = useLanguage();

  const [users] = useState<User[]>([
    { id: 1, name: 'Admin User', email: 'admin@example.com', role: 'Super Admin', status: 'Active', lastActive: '2 min ago' },
    { id: 2, name: 'Editor One', email: 'editor1@example.com', role: 'Editor', status: 'Active', lastActive: '1 hour ago' },
    { id: 3, name: 'Editor Two', email: 'editor2@example.com', role: 'Editor', status: 'Inactive', lastActive: '2 days ago' },
    { id: 4, name: 'Viewer User', email: 'viewer@example.com', role: 'Viewer', status: 'Active', lastActive: '5 hours ago' },
  ]);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const columns = [
    {
      key: 'name' as keyof User,
      header: t.name,
      render: (item: User) => (
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="gradient-gold text-primary-foreground text-xs">
              {getInitials(item.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{item.name}</p>
            <p className="text-xs text-muted-foreground">{item.email}</p>
          </div>
        </div>
      ),
    },
    { key: 'role' as keyof User, header: 'Role' },
    { key: 'lastActive' as keyof User, header: 'Last Active' },
    {
      key: 'status' as keyof User,
      header: t.status,
      render: (item: User) => (
        <Badge variant={item.status === 'Active' ? 'default' : 'secondary'}>
          {item.status}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title={t.users}
        description="Manage system users"
        icon={UsersIcon}
        onAdd={() => console.log('Add user')}
      />

      <DataTable
        data={users}
        columns={columns}
        onView={(item) => console.log('View', item)}
        onEdit={(item) => console.log('Edit', item)}
        onDelete={(item) => console.log('Delete', item)}
      />
    </div>
  );
};

export default Users;
