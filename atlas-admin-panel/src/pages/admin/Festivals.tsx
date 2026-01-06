// Festivals.tsx
import React, { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { useLanguage } from '@/contexts/LanguageContext';
import { PageHeader } from '@/components/admin/PageHeader';
import { DataTable } from '@/components/admin/DataTable';
import { PartyPopper } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

interface Festival {
  id: number;
  category?: string;
  title_en: string;
  title_am: string;
  title_or: string;
  description_en?: string;
  description_am?: string;
  description_or?: string;
  location?: string;
  type: 'upcoming' | 'past';
  date: string;
  image: string;
  gallery?: string[];
}

const emptyFestival = {
  category: '',
  title_en: '',
  title_am: '',
  title_or: '',
  description_en: '',
  description_am: '',
  description_or: '',
  location: '',
  type: 'upcoming' as 'upcoming' | 'past',
  date: '',
  image: '',
  gallery: [] as File[],
};

const Festivals: React.FC = () => {
  const { t, language } = useLanguage();
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ ...emptyFestival });
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [previewGallery, setPreviewGallery] = useState<string[]>([]);
  const [activeLang, setActiveLang] = useState<'en' | 'am' | 'or'>('en');

  // Load festivals
  const loadFestivals = async () => {
    setLoading(true);
    try {
      const res = await api.get('/festivals', { params: { lang: language } });
      setFestivals(res.data);
    } catch (err) {
      Swal.fire('Error', 'Failed to load festivals. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFestivals();
  }, [language]);

  // Image handlers
  const handleImageChange = (file?: File) => {
    if (!file) {
      setForm({ ...form, image: '' });
      setPreviewImage(null);
      return;
    }
    setForm({ ...form, image: file as any });
    const reader = new FileReader();
    reader.onload = () => setPreviewImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleGalleryChange = (files: FileList | null) => {
    if (!files) return;
    const arr = Array.from(files);
    setForm({ ...form, gallery: arr });
    const previews: string[] = [];
    arr.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        previews.push(reader.result as string);
        setPreviewGallery([...previews]);
      };
      reader.readAsDataURL(file);
    });
  };

  // Save
const handleSave = async () => {
  if (!form[`title_${activeLang}`]) {
    Swal.fire('Validation Error', 'Title is required for the selected language.', 'warning');
    return;
  }

  const fd = new FormData();
  fd.append('title_en', form.title_en);
  fd.append('title_am', form.title_am);
  fd.append('title_or', form.title_or);
  fd.append('description_en', form.description_en || '');
  fd.append('description_am', form.description_am || '');
  fd.append('description_or', form.description_or || '');
  fd.append('location', form.location || '');
  fd.append('type', form.type);
  fd.append('date', form.date);
  if (form.spotlight) fd.append('spotlight', form.spotlight);
  if (form.link) fd.append('link', form.link);

  if (form.image instanceof File) fd.append('image', form.image as File);
  form.gallery.forEach((file: File) => fd.append('gallery[]', file));

  try {
    if (editingId) {
      await api.post(`/festivals/${editingId}?_method=PUT`, fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      Swal.fire('Updated!', 'Festival updated successfully.', 'success');
    } else {
      await api.post('/festivals', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      Swal.fire('Created!', 'Festival created successfully.', 'success');
    }

    setOpen(false);
    setEditingId(null);
    setForm({ ...emptyFestival });
    setPreviewImage(null);
    setPreviewGallery([]);
    loadFestivals();
  } catch (err: any) {
    const errors = err.response?.data?.errors;
    if (errors) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        html: Object.values(errors).flat().join('<br />'),
      });
    } else {
      Swal.fire('Error', err.response?.data?.message || 'Something went wrong.', 'error');
    }
  }
};



  // Edit
  const handleEdit = (festival: Festival) => {
    setEditingId(festival.id);
    setForm({ ...festival, gallery: [] });
    setPreviewImage(festival.image);
    setPreviewGallery(festival.gallery || []);
    setOpen(true);
  };

  // Delete
  const handleDelete = async (id: number) => {
    const res = await Swal.fire({
      title: 'Are you sure?',
      text: 'This festival will be permanently deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });
    if (!res.isConfirmed) return;

    try {
      await api.delete(`/festivals/${id}`);
      Swal.fire('Deleted!', 'Festival has been deleted.', 'success');
      loadFestivals();
    } catch (err) {
      Swal.fire('Error', 'Failed to delete festival.', 'error');
    }
  };

  // Columns
 const columns = [
  {
    key: 'image' as keyof Festival,
    header: 'Image',
    render: (item: Festival) => item.image ? (
      <img
        src={item.image}
        className="h-16 w-16 object-cover rounded-md border"
        alt={item.title_en}
      />
    ) : (
      <span className="text-gray-400">No Image</span>
    ),
  },
  { key: 'title_en' as keyof Festival, header: 'Title' },
  { key: 'location' as keyof Festival, header: 'Location' },
  { key: 'date' as keyof Festival, header: 'Date' },
  {
    key: 'type' as keyof Festival,
    header: 'Status',
    render: (item: Festival) => (
      <Badge variant={item.type === 'upcoming' ? 'default' : 'secondary'}>
        {item.type === 'upcoming' ? 'Upcoming' : 'Past'}
      </Badge>
    ),
  },
];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Festivals"
        description="Manage cultural festivals"
        icon={PartyPopper}
        onAdd={() => {
          setEditingId(null);
          setForm({ ...emptyFestival });
          setPreviewImage(null);
          setPreviewGallery([]);
          setOpen(true);
        }}
      />

      <DataTable
        loading={loading}
        data={festivals}
        columns={columns}
        onView={(item) => console.log('View', item)}
        onEdit={handleEdit}
        onDelete={(item) => handleDelete(item.id)}
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col p-0">
          <DialogHeader className="px-6 py-4 border-b">
            <DialogTitle>{editingId ? 'Edit Festival' : 'Add Festival'}</DialogTitle>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {/* Category */}
            <Input
              placeholder="Category"
              value={form.category || ''}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />

            {/* Cover Image */}
            <div className="space-y-2">
              <label className="font-medium">Cover Image</label>
              <Input type="file" accept="image/*" onChange={(e) => handleImageChange(e.target.files?.[0])} />
              {previewImage && <img src={previewImage} className="h-40 w-full object-cover rounded-md border" />}
            </div>

            {/* Gallery Images */}
            <div className="space-y-2">
              <label className="font-medium">Gallery Images</label>
              <Input type="file" multiple accept="image/*" onChange={(e) => handleGalleryChange(e.target.files)} />
              {previewGallery.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {previewGallery.map((src, idx) => <img key={idx} src={src} className="h-24 w-24 object-cover rounded-md border" />)}
                </div>
              )}
            </div>

            {/* Language Tabs */}
            <div className="flex gap-2 mb-2">
              <button onClick={() => setActiveLang('en')} className={`px-4 py-2 rounded ${activeLang === 'en' ? 'bg-primary text-white' : 'bg-gray-200'}`}>English</button>
              <button onClick={() => setActiveLang('am')} className={`px-4 py-2 rounded ${activeLang === 'am' ? 'bg-primary text-white' : 'bg-gray-200'}`}>አማርኛ</button>
              <button onClick={() => setActiveLang('or')} className={`px-4 py-2 rounded ${activeLang === 'or' ? 'bg-primary text-white' : 'bg-gray-200'}`}>Afaan Oromo</button>
            </div>

            {/* Title & Description for active language */}
            <Input
              placeholder="Title"
              value={form[`title_${activeLang}`]}
              onChange={(e) => setForm({ ...form, [`title_${activeLang}`]: e.target.value })}
            />
            <Textarea
              placeholder="Description"
              value={form[`description_${activeLang}`]}
              onChange={(e) => setForm({ ...form, [`description_${activeLang}`]: e.target.value })}
            />

            {/* Location */}
            <Input
              placeholder="Location"
              value={form.location || ''}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            />

            {/* Date */}
            <Input
              type="date"
              placeholder="Date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />

            {/* Type */}
            <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as 'upcoming' | 'past' })} className="w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-primary">
              <option value="upcoming">Upcoming</option>
              <option value="past">Past</option>
            </select>
          </div>

          <div className="px-6 py-4 border-t flex justify-end gap-2 bg-background">
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>{editingId ? 'Update' : 'Save'}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Festivals;
