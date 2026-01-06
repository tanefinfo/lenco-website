import React, { useEffect, useState } from 'react';
import api from '@/lib/api';
import { useLanguage } from '@/contexts/LanguageContext';
import { PageHeader } from '@/components/admin/PageHeader';
import { DataTable } from '@/components/admin/DataTable';
import { Briefcase } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import Swal from 'sweetalert2'; // Import SweetAlert

interface Work {
  id: number;
  title: string;
  type: string;
  status: string;
  date: string;
}

const Works: React.FC = () => {
  const { t, lang } = useLanguage();
  const [works, setWorks] = useState<Work[]>([]);
  const [form, setForm] = useState<Partial<Work>>({});
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<number | null>(null);

  useEffect(() => {
    fetchWorks();
  }, [lang]);

  const fetchWorks = async () => {
    try {
      const res = await api.get('/admin/works', {
        params: { lang },
      });
      setWorks(res.data);
    } catch (error) {
      console.error('Failed to load works', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      if (editing) {
        await api.put(`/admin/works/${editing}`, form);
        Swal.fire('Updated!', 'Work has been updated.', 'success');
      } else {
        await api.post('/admin/works', form);
        Swal.fire('Created!', 'Work has been created.', 'success');
      }
      resetForm();
      fetchWorks();
      setOpen(false);
    } catch (error) {
      Swal.fire('Error!', 'Failed to save work.', 'error');
    }
  };

  const resetForm = () => {
    setForm({});
    setEditing(null);
    setOpen(false);
  };

  const handleEdit = (item: Work) => {
    setForm(item);
    setEditing(item.id);
    setOpen(true);
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: 'Delete this work?',
      text: 'Are you sure you want to delete this work?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    });

    if (result.isConfirmed) {
      await api.delete(`/admin/works/${id}`);
      Swal.fire('Deleted!', 'The work has been deleted.', 'success');
      fetchWorks();
    }
  };

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
        description="Manage projects & videos"
        icon={Briefcase}
        onAdd={() => {
          resetForm();
          setOpen(true);
        }}
      />

      <DataTable
        loading={loading}
        data={works}
        columns={columns}
        onView={(item) => console.log('View', item)}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{editing ? 'Edit Work' : 'Add Work'}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Input
              placeholder="Title"
              value={form.title || ''}
              onChange={e => setForm({ ...form, title: e.target.value })}
            />
            <Input
              placeholder="Type"
              value={form.type || ''}
              onChange={e => setForm({ ...form, type: e.target.value })}
            />
            <Input
              placeholder="Status"
              value={form.status || ''}
              onChange={e => setForm({ ...form, status: e.target.value })}
            />
            <Input
              type="date"
              value={form.date || ''}
              onChange={e => setForm({ ...form, date: e.target.value })}
            />
            <Button onClick={handleSubmit} className="w-full">
              {editing ? 'Update Work' : 'Add Work'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Works;
