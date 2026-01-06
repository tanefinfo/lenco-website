import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { PageHeader } from '@/components/admin/PageHeader';
import { DataTable } from '@/components/admin/DataTable';
import { Calendar, MapPin } from 'lucide-react';
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
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui/tabs';
import { api } from '@/lib/api';
import Swal from 'sweetalert2';

const LANGS = ['en', 'am', 'or'] as const;
type Lang = (typeof LANGS)[number];

interface EventRow {
  id: number;
  title: string;
  type: 'upcoming' | 'past';
  date: string;
  time: string;
  location: string;
  image?: string | null;
}

interface LangForm {
  title: string;
  description: string;
}

interface EventForm {
  type: 'upcoming' | 'past';
  date: string;
  time: string;
  location: string;
  image: File | null;
  existingImage?: string | null;
  en: LangForm;
  am: LangForm;
  or: LangForm;
}

const emptyLang: LangForm = { title: '', description: '' };

const emptyForm: EventForm = {
  type: 'upcoming',
  date: '',
  time: '',
  location: '',
  image: null,
  existingImage: null,
  en: { ...emptyLang },
  am: { ...emptyLang },
  or: { ...emptyLang },
};

const Events: React.FC = () => {
  const { t, language } = useLanguage();
  const [events, setEvents] = useState<EventRow[]>([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<EventForm>({ ...emptyForm });
  const [loading, setLoading] = useState(false);

  /* ================= LOAD ================= */
  const loadEvents = async () => {
    const res = await api.get('/events', { params: { lang: language } });
    setEvents(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    loadEvents();
  }, [language]);

  /* ================= EDIT ================= */
  const handleEdit = async (row: EventRow) => {
    const res = await api.get(`/events/${row.id}`);

    setForm({
      type: res.data.type,
      date: res.data.date,
      time: res.data.time,
      location: res.data.location,
      image: null,
      existingImage: res.data.image,
      en: { title: res.data.title_en, description: res.data.description_en || '' },
      am: { title: res.data.title_am, description: res.data.description_am || '' },
      or: { title: res.data.title_or, description: res.data.description_or || '' },
    });

    setEditingId(row.id);
    setOpen(true);
  };

  /* ================= SAVE ================= */
  const handleSave = async () => {
    if (!form.image && !editingId) {
      Swal.fire({
        icon: 'warning',
        title: 'Image required',
        text: 'Please upload an event image',
      });
      return;
    }

    setLoading(true);

    try {
      const fd = new FormData();

      fd.append('type', form.type);
      fd.append('date', form.date);
      fd.append('time', form.time);
      fd.append('location', form.location);

      LANGS.forEach((l) => {
        fd.append(`title_${l}`, form[l].title);
        fd.append(`description_${l}`, form[l].description);
      });

      if (form.image) fd.append('image', form.image);

      const url = editingId
        ? `/events/${editingId}?_method=PUT`
        : '/events';

      await api.post(url, fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: editingId ? 'Event updated' : 'Event created',
        showConfirmButton: false,
        timer: 2500,
      });

      setOpen(false);
      setEditingId(null);
      setForm({ ...emptyForm });
      loadEvents();
    } catch (err: any) {
      Swal.fire({
        icon: 'error',
        title: 'Save failed',
        text: err.response?.data?.message || 'Something went wrong',
      });
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id: number) => {
    const res = await Swal.fire({
      title: 'Delete event?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
    });

    if (!res.isConfirmed) return;

    await api.delete(`/events/${id}`);
    loadEvents();
  };

  /* ================= COLUMNS ================= */
 const columns = [
  {
    key: 'image' as keyof EventRow,
    header: 'Image',
    render: (row: EventRow) =>
      row.image ? (
        <img
          src={row.image}
          alt={row.title}
          className="h-12 w-12 rounded-md object-cover border"
        />
      ) : (
        <div className="h-12 w-12 rounded-md bg-muted" />
      ),
  },

  {
    key: 'title' as keyof EventRow,
    header: t.title,
    render: (row: EventRow) => (
      <div className="font-medium">{row.title}</div>
    ),
  },

  {
    key: 'location' as keyof EventRow,
    header: 'Location',
    render: (row: EventRow) => (
      <div className="flex items-center gap-1 text-sm text-muted-foreground">
        <MapPin className="h-4 w-4" />
        <span>{row.location || '—'}</span>
      </div>
    ),
  },

  {
    key: 'date' as keyof EventRow,
    header: t.date,
    render: (row: EventRow) => (
      <span className="text-sm">
        {new Date(row.date).toLocaleDateString()}
      </span>
    ),
  },

  {
    key: 'type' as keyof EventRow,
    header: t.status,
    render: (row: EventRow) => (
      <Badge
        className="capitalize"
        variant={row.type === 'upcoming' ? 'default' : 'secondary'}
      >
        {row.type}
      </Badge>
    ),
  },
];


  return (
    <div className="space-y-6">
      <PageHeader
        title={t.events}
        description="Manage events"
        icon={Calendar}
        onAdd={() => {
          setEditingId(null);
          setForm({ ...emptyForm });
          setOpen(true);
        }}
      />

      <DataTable
        data={events}
        columns={columns}
        onEdit={handleEdit}
        onDelete={(row) => handleDelete(row.id)}
      />

      {/* ================= MODAL ================= */}
    <Dialog open={open} onOpenChange={setOpen}>
  <DialogContent
    className="
      max-w-2xl w-full
      max-h-[90vh]
      overflow-hidden
      flex flex-col
      p-0
    "
  >
    {/* Header */}
    <DialogHeader className="px-6 py-4 border-b">
      <DialogTitle className="flex items-center gap-2">
        {editingId ? 'Edit Event' : 'Add Event'}
        {editingId && (
          <Badge variant="secondary" className="text-xs">
            ID #{editingId}
          </Badge>
        )}
      </DialogTitle>
    </DialogHeader>

    {/* Scrollable Content */}
    <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
      {/* Status */}
      <div>
        <Label>Status</Label>
        <select
          value={form.type}
          onChange={(e) =>
            setForm({ ...form, type: e.target.value as 'upcoming' | 'past' })
          }
          className="w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-primary"
        >
          <option value="upcoming">Upcoming Event</option>
          <option value="past">Past Event</option>
        </select>
      </div>

      {/* Date / Time */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label>Date</Label>
          <Input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
        </div>
        <div>
          <Label>Time</Label>
          <Input
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
          />
        </div>
      </div>

      {/* Location */}
      <div>
        <Label>Location</Label>
        <Input
          placeholder="Addis Ababa, Ethiopia"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />
      </div>

      {/* Image */}
      <div className="space-y-1">
        <Label>Event Image</Label>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setForm({ ...form, image: e.target.files?.[0] || null })
          }
        />
        {editingId && (
          <p className="text-xs text-muted-foreground">
            Upload only if you want to replace the current image
          </p>
        )}
      </div>

      {editingId && form.existingImage && (
        <img
          src={form.existingImage}
          className="h-40 w-full rounded-md border object-cover"
        />
      )}

      {/* Multilingual Tabs */}
      <Tabs defaultValue="en" className="w-full">
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="en">English</TabsTrigger>
          <TabsTrigger value="am">አማርኛ</TabsTrigger>
          <TabsTrigger value="or">Afaan Oromo</TabsTrigger>
        </TabsList>

        {LANGS.map((lang) => (
          <TabsContent key={lang} value={lang} className="space-y-3 mt-4">
            <Input
              placeholder="Title"
              value={form[lang].title}
              onChange={(e) =>
                setForm({
                  ...form,
                  [lang]: { ...form[lang], title: e.target.value },
                })
              }
            />
            <Textarea
              rows={4}
              placeholder="Description"
              value={form[lang].description}
              onChange={(e) =>
                setForm({
                  ...form,
                  [lang]: { ...form[lang], description: e.target.value },
                })
              }
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>

    {/* Footer Actions */}
    <div className="px-6 py-4 border-t flex justify-end gap-2 bg-background">
      <Button variant="outline" onClick={() => setOpen(false)}>
        Cancel
      </Button>
      <Button onClick={handleSave} disabled={loading}>
        {loading ? 'Saving...' : t.save}
      </Button>
    </div>
  </DialogContent>
</Dialog>

    </div>
  );
};

export default Events;
