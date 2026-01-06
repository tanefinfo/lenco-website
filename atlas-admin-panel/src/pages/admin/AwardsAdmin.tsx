import React, { useEffect, useState } from 'react';
import api from '@/lib/api';
import { PageHeader } from '@/components/admin/PageHeader';
import { DataTable } from '@/components/admin/DataTable';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Trophy } from 'lucide-react';
import Swal from 'sweetalert2'; // Import SweetAlert

interface Award {
  id: number;
  title: string;
  year: string;
  category: string;
  placement?: string;
  issuer?: string;
  project?: string;
  image?: string; // Ensure image is defined
}

const AwardsAdmin: React.FC = () => {
  const [awards, setAwards] = useState<Award[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<any>({
    year: '',
    category: '',
    placement: '',
    issuer: '',
    project: '',
    title_en: '',
    title_am: '',
    title_or: '',
    description_en: '',
    description_am: '',
    description_or: '',
    image: null,
  });

  const fetchAwards = async () => {
    const res = await api.get('/awards');
    setAwards(res.data);
  };

  useEffect(() => {
    fetchAwards();
  }, []);

  const submit = async () => {
    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => v && data.append(k, v));

    try {
      setLoading(true);
      editing
        ? await api.post(`/awards/${editing}?_method=PUT`, data)
        : await api.post('/awards', data);

      Swal.fire({
        icon: 'success',
        title: editing ? 'Award updated!' : 'Award created!',
        text: editing ? 'The award has been successfully updated.' : 'The award has been successfully created.',
      });

      setOpen(false);
      setEditing(null);
      resetForm();
      fetchAwards();
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Failed to save award',
        text: 'There was an error saving the award.',
      });
    } finally {
      setLoading(false);
    }
  };

  const edit = async (id: number) => {
    const res = await api.get(`/awards/${id}`);
    setForm(res.data);
    setEditing(id);
    setOpen(true);
  };

  const remove = async (id: number) => {
    const result = await Swal.fire({
      title: 'Delete this award?',
      text: 'Are you sure you want to delete this award?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    });

    if (result.isConfirmed) {
      await api.delete(`/awards/${id}`);
      Swal.fire('Deleted!', 'The award has been deleted.', 'success');
      fetchAwards();
    }
  };

  const resetForm = () => {
    setForm({
      year: '',
      category: '',
      placement: '',
      issuer: '',
      project: '',
      title_en: '',
      title_am: '',
      title_or: '',
      description_en: '',
      description_am: '',
      description_or: '',
      image: null,
    });
  };

  const columns = [
    { key: 'title' as keyof Award, header: 'Title' },
    { key: 'year' as keyof Award, header: 'Year' },
    { key: 'category' as keyof Award, header: 'Category' },
    { key: 'placement' as keyof Award, header: 'Placement' },
    {
      key: 'image' as keyof Award,
      header: 'Image',
      render: (award: Award) => (
        <img src={award.image} alt={award.title} className="h-16 w-16 object-cover rounded" />
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Awards"
        description="Manage awards & recognitions"
        icon={Trophy}
        onAdd={() => {
          resetForm();
          setEditing(null);
          setOpen(true);
        }}
      />

      <DataTable
        data={awards}
        columns={columns}
        onEdit={(row) => edit(row.id)}
        onDelete={(row) => remove(row.id)}
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? 'Edit Award' : 'Create Award'}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Input placeholder="Year" value={form.year} onChange={e => setForm({ ...form, year: e.target.value })} />
            <Input placeholder="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
            <Input placeholder="Placement" value={form.placement} onChange={e => setForm({ ...form, placement: e.target.value })} />
            <Input placeholder="Issuer" value={form.issuer} onChange={e => setForm({ ...form, issuer: e.target.value })} />
            <Input placeholder="Project" value={form.project} onChange={e => setForm({ ...form, project: e.target.value })} />

            {['en','am','or'].map(l => (
              <div key={l} className="space-y-2">
                <Label>Title ({l.toUpperCase()})</Label>
                <Input value={form[`title_${l}`]} onChange={e => setForm({ ...form, [`title_${l}`]: e.target.value })} />
                <Label>Description ({l.toUpperCase()})</Label>
                <Textarea value={form[`description_${l}`]} onChange={e => setForm({ ...form, [`description_${l}`]: e.target.value })} />
              </div>
            ))}

            <Input type="file" accept="image/*" onChange={e => setForm({ ...form, image: e.target.files?.[0] })} />

            <Button onClick={submit} disabled={loading} className="w-full">
              {loading ? 'Saving...' : 'Save Award'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AwardsAdmin;
