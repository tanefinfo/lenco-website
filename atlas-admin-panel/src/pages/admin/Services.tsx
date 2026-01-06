import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { PageHeader } from '@/components/admin/PageHeader';
import { DataTable } from '@/components/admin/DataTable';
import { Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import api from '@/lib/api';
import Swal from 'sweetalert2';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string | null;
  features: string[];
}

const Services: React.FC = () => {
  const { t, lang } = useLanguage();

  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [submitLoading, setSubmitLoading] = useState(false);

  const [form, setForm] = useState({
    title_en: '',
    description_en: '',
    icon: null as File | null,
    features: '',
  });

  /* ---------------- FETCH ---------------- */
  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await api.get('/services', { params: { lang } });
      setServices(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Failed to fetch services', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [lang]);

  /* ---------------- MODAL ---------------- */
  const openModal = (service?: Service) => {
    if (service) {
      setEditingService(service);
      setForm({
        title_en: service.title,
        description_en: service.description,
        icon: null,
        features: service.features.join(', '),
      });
    } else {
      setEditingService(null);
      setForm({
        title_en: '',
        description_en: '',
        icon: null,
        features: '',
      });
    }
    setModalOpen(true);
  };

  /* ---------------- CHANGE ---------------- */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (e.target instanceof HTMLInputElement && e.target.type === 'file') {
      setForm(prev => ({ ...prev, icon: e.target.files?.[0] || null }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async () => {
    if (!form.title_en || !form.description_en) {
      Swal.fire('Validation Error', 'Title and Description are required', 'error');
      return;
    }

    setSubmitLoading(true);

    const formData = new FormData();
    formData.append('title_en', form.title_en);
    formData.append('description_en', form.description_en);

    // IMPORTANT: backend expects array
   form.features
  .split(',')
  .map(f => f.trim())
  .filter(Boolean)
  .forEach(feature => {
    formData.append('features[]', feature);
  });


    if (form.icon) {
      formData.append('icon', form.icon);
    }

    try {
      if (editingService) {
        await api.post(`/services/${editingService.id}`, formData, {
          headers: { 'X-HTTP-Method-Override': 'PUT' },
        });

        Swal.fire('Updated!', 'Service updated successfully', 'success');
      } else {
        await api.post('/services', formData);
        Swal.fire('Added!', 'Service added successfully', 'success');
      }

      setModalOpen(false);
      fetchServices();
    } catch (err: any) {
      if (err.response?.data?.errors) {
        Swal.fire({
          icon: 'error',
          title: 'Validation Error',
          html: Object.values(err.response.data.errors).flat().join('<br/>'),
        });
      } else {
        Swal.fire('Error', 'Failed to save service', 'error');
      }
    } finally {
      setSubmitLoading(false);
    }
  };

  /* ---------------- DELETE ---------------- */
  const handleDelete = async (service: Service) => {
    const confirm = await Swal.fire({
      title: 'Delete?',
      text: `Delete "${service.title}"?`,
      icon: 'warning',
      showCancelButton: true,
    });

    if (!confirm.isConfirmed) return;

    await api.delete(`/services/${service.id}`);
    fetchServices();
  };

  /* ---------------- TABLE ---------------- */
  const columns = [
    { key: 'title', header: t.name },
    { key: 'description', header: t.description },
    {
      key: 'features',
      header: 'Features',
      render: (s: Service) => s.features.join(', '),
    },
    {
      key: 'icon',
      header: 'Icon',
      render: (s: Service) =>
        s.icon ? <img src={s.icon} className="h-6 w-6" /> : '—',
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title={t.services}
        description="Manage your services"
        icon={Wrench}
        onAdd={() => openModal()}
      />

      <DataTable
        data={services}
        columns={columns}
        loading={loading}
        onEdit={openModal}
        onDelete={handleDelete}
      />

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingService ? 'Edit Service' : 'Add Service'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <Input
              name="title_en"
              placeholder="Title"
              value={form.title_en}
              onChange={handleChange}
            />
            <Textarea
              name="description_en"
              placeholder="Description"
              value={form.description_en}
              onChange={handleChange}
            />
            <Input type="file" onChange={handleChange} />
            <Input
              name="features"
              placeholder="Features (comma separated)"
              value={form.features}
              onChange={handleChange}
            />
            <Button onClick={handleSubmit} disabled={submitLoading}>
              {submitLoading
                ? 'Saving...'
                : editingService
                ? 'Update'
                : 'Add'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Services;
