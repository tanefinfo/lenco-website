import React, { useEffect, useState } from 'react';
import api from '@/lib/api';
import { useLanguage } from '@/contexts/LanguageContext';
import { PageHeader } from '@/components/admin/PageHeader';
import { DataTable } from '@/components/admin/DataTable';
import { Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface TalentApplication {
  id: number;
  full_name: string;
  email: string;
  location?: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  talent?: {
    id: number;
    title_en: string;
    title_am: string;
    title_or: string;
  };
}

const Talents: React.FC = () => {
  const { t, lang } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [applications, setApplications] = useState<TalentApplication[]>([]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await api.get('/talent-applications');
      setApplications(res.data);
    } catch (err) {
      toast.error('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const updateStatus = async (id: number, status: TalentApplication['status']) => {
    try {
      await api.put(`/talent-applications/${id}`, { status });
      toast.success('Application updated');
      fetchApplications();
    } catch {
      toast.error('Failed to update status');
    }
  };

  const deleteApplication = async (id: number) => {
    if (!confirm('Delete this application?')) return;

    try {
      await api.delete(`/talent-applications/${id}`);
      toast.success('Application deleted');
      fetchApplications();
    } catch {
      toast.error('Failed to delete');
    }
  };

  const columns = [
    {
      key: 'full_name' as keyof TalentApplication,
      header: t.name,
    },
    {
      header: 'Talent',
      render: (row: TalentApplication) =>
        row.talent ? row.talent[`title_${lang}` as keyof typeof row.talent] : '—',
    },
    {
      key: 'email' as keyof TalentApplication,
      header: 'Email',
    },
    {
      key: 'created_at' as keyof TalentApplication,
      header: 'Applied',
      render: (row: TalentApplication) =>
        new Date(row.created_at).toLocaleDateString(),
    },
    {
      key: 'status' as keyof TalentApplication,
      header: t.status,
      render: (row: TalentApplication) => (
        <Badge
          variant={
            row.status === 'approved'
              ? 'default'
              : row.status === 'pending'
              ? 'secondary'
              : 'destructive'
          }
        >
          {row.status}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title={t.talents}
        description="Review and manage talent applications"
        icon={Sparkles}
      />

      <DataTable
        loading={loading}
        data={applications}
        columns={columns}
        onView={(row) => console.log('VIEW', row)}
        onEdit={(row) => updateStatus(row.id, 'approved')}
        onDelete={(row) => deleteApplication(row.id)}
        extraActions={[
          {
            label: 'Approve',
            onClick: (row) => updateStatus(row.id, 'approved'),
          },
          {
            label: 'Reject',
            onClick: (row) => updateStatus(row.id, 'rejected'),
          },
        ]}
      />
    </div>
  );
};

export default Talents;
