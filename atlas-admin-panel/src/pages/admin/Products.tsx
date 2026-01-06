import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { PageHeader } from '@/components/admin/PageHeader';
import { DataTable } from '@/components/admin/DataTable';
import { Package } from 'lucide-react';
import api from '@/lib/api';
import Swal from 'sweetalert2';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

/* ---------------- TYPES ---------------- */

interface ProductApi {
  id: number;
  name_en: string;
  name_am?: string | null;
  name_or?: string | null;
  category: string;
  price?: string | null;
  image: string | null;
}

interface ProductRow {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string | null;
}

/* ---------------- COMPONENT ---------------- */

const Products: React.FC = () => {
  const { t, lang } = useLanguage();

  const [products, setProducts] = useState<ProductRow[]>([]);
  const [loading, setLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [submitLoading, setSubmitLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const [form, setForm] = useState({
    name_en: '',
    category: '',
    price: '',
    image: null as File | null,
  });

  /* ---------------- FETCH ---------------- */

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get<ProductApi[]>('/products');

      const mapped = res.data.map(p => ({
        id: p.id,
        name:
          lang === 'am'
            ? p.name_am || p.name_en
            : lang === 'or'
            ? p.name_or || p.name_en
            : p.name_en,
        category: p.category,
        price: p.price ?? '—',
        image: p.image,
      }));

      setProducts(mapped);
    } catch {
      Swal.fire('Error', 'Failed to load products', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [lang]);

  /* ---------------- FORM HANDLERS ---------------- */

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files, value } = e.target;

    if (name === 'image' && files?.[0]) {
      setForm(prev => ({ ...prev, image: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const openCreate = () => {
    setEditingId(null);
    setForm({ name_en: '', category: '', price: '', image: null });
    setPreview(null);
    setModalOpen(true);
  };

  const openEdit = (p: ProductRow) => {
    setEditingId(p.id);
    setForm({
      name_en: p.name,
      category: p.category,
      price: p.price === '—' ? '' : p.price,
      image: null,
    });
    setPreview(p.image);
    setModalOpen(true);
  };

  /* ---------------- SUBMIT ---------------- */

  const handleSubmit = async () => {
    if (!form.name_en || !form.category) {
      Swal.fire('Validation Error', 'Name and Category are required', 'error');
      return;
    }

    setSubmitLoading(true);

    try {
      const fd = new FormData();
      fd.append('name_en', form.name_en);
      fd.append('category', form.category);
      if (form.price) fd.append('price', form.price);
      if (form.image) fd.append('image', form.image);

      if (editingId) {
        fd.append('_method', 'PUT');
        await api.post(`/products/${editingId}`, fd);
        Swal.fire('Updated!', 'Product updated successfully', 'success');
      } else {
        await api.post('/products', fd);
        Swal.fire('Created!', 'Product added successfully', 'success');
      }

      setModalOpen(false);
      setEditingId(null);
      setPreview(null);
      setForm({ name_en: '', category: '', price: '', image: null });
      fetchProducts();
    } catch {
      Swal.fire('Error', 'Failed to save product', 'error');
    } finally {
      setSubmitLoading(false);
    }
  };

  /* ---------------- DELETE ---------------- */

  const handleDelete = async (p: ProductRow) => {
    const res = await Swal.fire({
      title: 'Delete product?',
      text: `Delete "${p.name}"?`,
      icon: 'warning',
      showCancelButton: true,
    });

    if (!res.isConfirmed) return;

    await api.delete(`/products/${p.id}`);
    fetchProducts();
  };

  /* ---------------- TABLE ---------------- */

  const columns = [
    { key: 'name', header: t.name },
    { key: 'category', header: 'Category' },
    { key: 'price', header: 'Price' },
    {
      key: 'image',
      header: 'Image',
      render: (p: ProductRow) =>
        p.image ? (
          <img
            src={p.image}
            className="h-10 w-10 rounded object-cover border"
            alt={p.name}
          />
        ) : (
          <span className="text-xs text-muted-foreground">No image</span>
        ),
    },
  ];

  /* ---------------- RENDER ---------------- */

  return (
    <div className="space-y-6">
      <PageHeader
        title={t.products}
        description="Manage your products"
        icon={Package}
        onAdd={openCreate}
      />

      <DataTable
        data={products}
        columns={columns}
        loading={loading}
        onEdit={openEdit}
        onDelete={handleDelete}
      />

      {/* ---------- MODAL ---------- */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingId ? 'Edit Product' : 'Add Product'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <Input
              name="name_en"
              placeholder="Product name"
              value={form.name_en}
              onChange={handleChange}
            />

            <Input
              name="category"
              placeholder="Category"
              value={form.category}
              onChange={handleChange}
            />

            <Input
              name="price"
              placeholder="Price (optional)"
              value={form.price}
              onChange={handleChange}
            />

            <Input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
            />

            {preview && (
              <img
                src={preview}
                className="h-32 w-full rounded object-cover border"
                alt="Preview"
              />
            )}

            <Button
              onClick={handleSubmit}
              disabled={submitLoading}
              className="w-full"
            >
              {submitLoading
                ? 'Saving...'
                : editingId
                ? 'Update Product'
                : 'Add Product'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Products;
