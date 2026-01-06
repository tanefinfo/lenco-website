import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { PageHeader } from '@/components/admin/PageHeader';
import { DataTable } from '@/components/admin/DataTable';
import { Image as ImageIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { api } from '@/lib/api';
import Swal from 'sweetalert2';

const LANGS = ['en', 'am', 'or'];

interface GalleryRow {
  id: number;
  title: string;
  category: string;
  images: string[];
}

const emptyLangForm = { title: '', description: '' };

const emptyForm = {
  category: '',
  cover: null as File | null,
  images: [] as File[],
  en: { ...emptyLangForm },
  am: { ...emptyLangForm },
  or: { ...emptyLangForm },
};

const Galleries: React.FC = () => {
  const { t, language } = useLanguage();
  const [galleries, setGalleries] = useState<GalleryRow[]>([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<any>({ ...emptyForm });
  const [loading, setLoading] = useState(false);

  /* ================= LOAD ================= */
  const loadGalleries = async () => {
    const res = await api.get('/galleries', { params: { lang: language } });
    setGalleries(res.data);
  };

  useEffect(() => { loadGalleries(); }, [language]);

  /* ================= FORM ================= */
  const updateLangField = (lang: string, field: string, value: any) => {
    setForm((prev: any) => ({ ...prev, [lang]: { ...prev[lang], [field]: value } }));
  };

  const resetForm = () => {
    setForm({ ...emptyForm });
    setEditingId(null);
  };

  /* ================= SAVE ================= */
  const handleSave = async () => {
    if (!form.cover && !editingId) {
      Swal.fire({
        icon: 'warning',
        title: 'Cover image required',
        text: 'Please upload a cover image before saving.',
        confirmButtonText: 'OK',
        background: '#ffffff',
        color: '#1f2937',
        iconColor: '#f59e0b',
        confirmButtonColor: '#2563eb',
        customClass: {
          popup: 'rounded-xl shadow-lg',
          title: 'text-lg font-semibold',
          htmlContainer: 'text-sm',
          confirmButton: 'px-6 py-2 rounded-md',
        },
      });
      return;
    }

    setLoading(true);

    try {
      const fd = new FormData();
      fd.append('category', form.category);

      LANGS.forEach((l) => {
        fd.append(`title_${l}`, form[l].title);
        fd.append(`description_${l}`, form[l].description);
      });

      if (form.cover) fd.append('cover', form.cover);
      form.images.forEach((img) => fd.append('images[]', img));

      const url = editingId ? `/galleries/${editingId}?_method=PUT` : '/galleries';
      await api.post(url, fd);

      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Gallery saved successfully!',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        background: '#f0f9ff',
        color: '#065f46',
      });

      setOpen(false);
      resetForm();
      loadGalleries();
    } catch (err: any) {
      Swal.fire({
        icon: 'error',
        title: 'Save Failed',
        text: err.response?.data?.message || 'Something went wrong',
        confirmButtonColor: '#dc2626',
        background: '#fff1f2',
        color: '#991b1b',
      });
    } finally { setLoading(false); }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id: number) => {
    const res = await Swal.fire({
      title: 'Are you sure?',
      text: 'This gallery will be permanently deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      background: '#fff',
      color: '#1f2937',
    });

    if (!res.isConfirmed) return;

    try {
      await api.delete(`/galleries/${id}`);
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Gallery deleted successfully!',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        background: '#fef3c7',
        color: '#78350f',
      });
      loadGalleries();
    } catch (err: any) {
      Swal.fire({
        icon: 'error',
        title: 'Delete Failed',
        text: err.response?.data?.message || 'Could not delete gallery.',
        confirmButtonColor: '#dc2626',
        background: '#fff1f2',
        color: '#991b1b',
      });
    }
  };

  /* ================= COLUMNS ================= */
  const columns = [
    { key: 'title' as keyof GalleryRow, header: t.title },
    { key: 'category' as keyof GalleryRow, header: 'Category' },
    {
      key: 'images' as keyof GalleryRow,
      header: 'Images',
      render: (row: GalleryRow) => <Badge>{row.images?.length || 0}</Badge>,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title={t.galleries}
        description="Manage photo galleries"
        icon={ImageIcon}
        onAdd={() => setOpen(true)}
      />

      <DataTable
        data={galleries}
        columns={columns}
        onEdit={(row) => { setEditingId(row.id); setOpen(true); }}
        onDelete={(row) => handleDelete(row.id)}
      />

      {/* ================= MODAL ================= */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingId ? 'Edit Gallery' : 'Add Gallery'}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label>Category</Label>
              <Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
            </div>

            <div>
              <Label>Cover Image</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setForm({ ...form, cover: e.target.files ? e.target.files[0] : null })}
              />
            </div>

            <div>
              <Label>Gallery Images</Label>
              <Input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => setForm({ ...form, images: Array.from(e.target.files || []) })}
              />
            </div>

            <Tabs defaultValue="en">
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="en">English</TabsTrigger>
                <TabsTrigger value="am">አማርኛ</TabsTrigger>
                <TabsTrigger value="or">Afaan Oromo</TabsTrigger>
              </TabsList>

              {LANGS.map((lang) => (
                <TabsContent key={lang} value={lang} className="space-y-3">
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={form[lang].title}
                      onChange={(e) => updateLangField(lang, 'title', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label>Description</Label>
                    <Textarea
                      rows={3}
                      value={form[lang].description}
                      onChange={(e) => updateLangField(lang, 'description', e.target.value)}
                    />
                  </div>
                </TabsContent>
              ))}
            </Tabs>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={handleSave} disabled={loading}>{loading ? 'Saving...' : t.save}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Galleries;
