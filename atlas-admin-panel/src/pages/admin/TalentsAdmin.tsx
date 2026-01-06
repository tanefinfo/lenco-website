import React, { useEffect, useState } from 'react';
import api from '@/lib/api';
import { PageHeader } from '@/components/admin/PageHeader';
import { DataTable } from '@/components/admin/DataTable';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface Talent {
  id: number;
  title: string;
  category: string;
  deadline: string;
  applications_count: number;
  cover_image?: string;
}

const TalentsAdmin: React.FC = () => {
  const [talents, setTalents] = useState<Talent[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<any>({
    title_en: '',
    title_am: '',
    title_or: '',
    description_en: '',
    description_am: '',
    description_or: '',
    category: '',
    deadline: '',
    cover_image: null,
  });

  /** Fetch talents */
  const fetchTalents = async () => {
    const res = await api.get('/talents');
    setTalents(res.data);
  };

  useEffect(() => {
    fetchTalents();
  }, []);

  /** Submit (Create / Update) */
  const submitTalent = async () => {
    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => v && data.append(k, v as any));

    try {
      setLoading(true);
      editing
        ? await api.post(`/talents/${editing}?_method=PUT`, data)
        : await api.post('/talents', data);

      toast.success(editing ? 'Talent updated' : 'Talent created');
      setOpen(false);
      setEditing(null);
      resetForm();
      fetchTalents();
    } catch (err: any) {
      toast.error('Failed to save talent');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({
      title_en: '',
      title_am: '',
      title_or: '',
      description_en: '',
      description_am: '',
      description_or: '',
      category: '',
      deadline: '',
      cover_image: null,
    });
  };

  const editTalent = async (id: number) => {
    const res = await api.get(`/talents/${id}`);
    setForm(res.data);
    setEditing(id);
    setOpen(true);
  };

  const deleteTalent = async (id: number) => {
    if (!confirm('Delete this talent post?')) return;
    await api.delete(`/talents/${id}`);
    toast.success('Talent deleted');
    fetchTalents();
  };

  const columns = [
    { key: 'title' as keyof Talent, header: 'Title' },
    { key: 'category' as keyof Talent, header: 'Category' },
    {
      key: 'applications_count' as keyof Talent,
      header: 'Applications',
      render: (row: Talent) => <Badge>{row.applications_count}</Badge>,
    },
    {
      key: 'deadline' as keyof Talent,
      header: 'Deadline',
      render: (row: Talent) => new Date(row.deadline).toLocaleDateString(),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Talents"
        description="Create and manage talent posts"
        icon={Sparkles}
        onAdd={() => {
          resetForm();
          setEditing(null);
          setOpen(true);
        }}
      />

      <DataTable
        data={talents}
        columns={columns}
        onEdit={(row) => editTalent(row.id)}
        onDelete={(row) => deleteTalent(row.id)}
      />

      {/* Create / Edit Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editing ? 'Edit Talent' : 'Create Talent'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {['en', 'am', 'or'].map((lang) => (
              <div key={lang} className="space-y-2">
                <Label>Title ({lang.toUpperCase()})</Label>
                <Input
                  value={form[`title_${lang}`]}
                  onChange={(e) =>
                    setForm({ ...form, [`title_${lang}`]: e.target.value })
                  }
                />

                <Label>Description ({lang.toUpperCase()})</Label>
                <Textarea
                  value={form[`description_${lang}`]}
                  onChange={(e) =>
                    setForm({ ...form, [`description_${lang}`]: e.target.value })
                  }
                />
              </div>
            ))}

            <div>
              <Label>Category</Label>
              <Input
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              />
            </div>

            <div>
              <Label>Deadline</Label>
              <Input
                type="date"
                value={form.deadline}
                onChange={(e) => setForm({ ...form, deadline: e.target.value })}
              />
            </div>

            <div>
              <Label>Cover Image</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setForm({ ...form, cover_image: e.target.files?.[0] })
                }
              />
            </div>

            <Button onClick={submitTalent} disabled={loading} className="w-full">
              {loading ? 'Saving...' : 'Save Talent'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TalentsAdmin;
