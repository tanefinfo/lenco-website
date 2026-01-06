import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { PageHeader } from '@/components/admin/PageHeader';
import { DataTable } from '@/components/admin/DataTable';
import { Image as ImageIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { api } from '@/lib/api';
import Swal from 'sweetalert2';

const LANGS = ['en', 'am', 'or'] as const;
type Lang = (typeof LANGS)[number];

interface GalleryRow {
  id: number;
  title: string;
  category: string;
  cover: string;
  images: string[];
}

interface LangForm {
  title: string;
  description: string;
}

interface GalleryForm {
  category: string;
  cover: File | null;
  images: File[];
  existingCover?: string;
  existingImages?: string[];
  en: LangForm;
  am: LangForm;
  or: LangForm;
}

const emptyLangForm: LangForm = { title: '', description: '' };
const emptyForm: GalleryForm = {
  category: '',
  cover: null,
  images: [],
  en: { ...emptyLangForm },
  am: { ...emptyLangForm },
  or: { ...emptyLangForm },
};

const Galleries: React.FC = () => {
  const { t, language } = useLanguage();
  const [galleries, setGalleries] = useState<GalleryRow[]>([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<GalleryForm>({ ...emptyForm });
  const [loading, setLoading] = useState(false);

  /** ================= LOAD ================= */
  const loadGalleries = async () => {
    try {
      const res = await api.get('/galleries', { params: { lang: language } });
      setGalleries(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadGalleries();
  }, [language]);

  /** ================= EDIT ================= */
  const handleEdit = async (row: GalleryRow) => {
    const res = await api.get(`/galleries/${row.id}`);
    const data = res.data;

    setForm({
      category: data.category,
      cover: null,
      images: [],
      existingCover: data.cover,
      existingImages: data.images || [],
      en: { title: data.title_en, description: data.description_en || '' },
      am: { title: data.title_am, description: data.description_am || '' },
      or: { title: data.title_or, description: data.description_or || '' },
    });

    setEditingId(row.id);
    setOpen(true);
  };

  /** ================= FORM ================= */
  const updateLangField = (lang: Lang, field: keyof LangForm, value: string) => {
    setForm((prev) => ({ ...prev, [lang]: { ...prev[lang], [field]: value } }));
  };

  const resetForm = () => {
    setForm({ ...emptyForm });
    setEditingId(null);
  };

  /** ================= SAVE ================= */
  const handleSave = async () => {
    if (!form.cover && !editingId && !form.existingCover) {
      return Swal.fire({
        icon: 'warning',
        title: 'Cover image required',
        text: 'Please upload a cover image.',
      });
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
        title: 'Gallery saved successfully',
        showConfirmButton: false,
        timer: 2000,
      });

      setOpen(false);
      resetForm();
      loadGalleries();
    } catch (err: any) {
      Swal.fire({
        icon: 'error',
        title: 'Save Failed',
        text: err.response?.data?.message || 'Something went wrong',
      });
    } finally {
      setLoading(false);
    }
  };

  /** ================= DELETE ================= */
  const handleDelete = async (id: number) => {
    const res = await Swal.fire({
      title: 'Are you sure?',
      text: 'This gallery will be permanently deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
    });
    if (!res.isConfirmed) return;

    await api.delete(`/galleries/${id}`);
    loadGalleries();

    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Gallery deleted',
      showConfirmButton: false,
      timer: 2000,
    });
  };

  /* ================= COLUMNS ================= */
 const columns = [
  {
    key: 'cover' as keyof GalleryRow,
    header: 'Cover',
    render: (row: GalleryRow) => (
      <img
        src={row.cover}
        alt={row.title}
        className="h-12 w-12 rounded object-cover border"
      />
    ),
  },
  { key: 'title' as keyof GalleryRow, header: t.title },
  { key: 'category' as keyof GalleryRow, header: 'Category' },
  {
    key: 'images' as keyof GalleryRow,
    header: 'Gallery',
    render: (row: GalleryRow) => (
      <div className="flex items-center gap-2">
        {row.images?.slice(0, 3).map((img, i) => (
          <img
            key={i}
            src={img}
            alt=""
            className="h-8 w-8 rounded object-cover border"
          />
        ))}
        {row.images.length > 3 && (
          <Badge variant="secondary">+{row.images.length - 3}</Badge>
        )}
      </div>
    ),
  },
];
const CATEGORY_MAP: Record<string, string> = {
  portraits: "Portraits",
  bts: "Behind the Scenes",
  onset: "On Set",
  events: "Events",
};


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
        onEdit={handleEdit}
        onDelete={(row) => handleDelete(row.id)}
      />

      {/* ================= MODAL ================= */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl w-full sm:w-11/12 md:w-3/4 overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? 'Edit Gallery' : 'Add Gallery'}</DialogTitle>
          </DialogHeader>
        <div>
  <Label>Category</Label>
  <select
    className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
    value={form.category}
    onChange={(e) =>
      setForm({ ...form, category: e.target.value })
    }
  >
    <option value="" disabled>
      Select category
    </option>

    {Object.entries(CATEGORY_MAP).map(([key, label]) => (
      <option key={key} value={key}>
        {label}
      </option>
    ))}
  </select>
          


            <div>
              <Label>Cover Image</Label>
              {form.existingCover && !form.cover && (
                <img
                  src={form.existingCover}
                  alt="Existing Cover"
                  className="mb-2 h-20 w-20 object-cover rounded border"
                />
              )}
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setForm({ ...form, cover: e.target.files?.[0] || null })}
              />
            </div>

            <div>
              <Label>Gallery Images</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {form.existingImages?.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt=""
                    className="h-16 w-16 object-cover rounded border"
                  />
                ))}
              </div>
              <Input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) =>
                  setForm({ ...form, images: Array.from(e.target.files || []) })
                }
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
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={loading}>
                {loading ? 'Saving...' : t.save}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Galleries;
