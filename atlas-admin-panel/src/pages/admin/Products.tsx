import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { PageHeader } from '@/components/admin/PageHeader';
import { DataTable } from '@/components/admin/DataTable';
import { Package } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  stock: number;
  status: string;
}

const Products: React.FC = () => {
  const { t } = useLanguage();

  const [products] = useState<Product[]>([
    { id: 1, name: 'Traditional Coffee Set', category: 'Home', price: '$45.00', stock: 25, status: 'In Stock' },
    { id: 2, name: 'Handwoven Basket', category: 'Crafts', price: '$35.00', stock: 12, status: 'In Stock' },
    { id: 3, name: 'Ethiopian Art Print', category: 'Art', price: '$85.00', stock: 0, status: 'Out of Stock' },
    { id: 4, name: 'Cultural Music Album', category: 'Music', price: '$15.00', stock: 100, status: 'In Stock' },
  ]);

  const columns = [
    { key: 'name' as keyof Product, header: t.name },
    { key: 'category' as keyof Product, header: 'Category' },
    { key: 'price' as keyof Product, header: 'Price' },
    { key: 'stock' as keyof Product, header: 'Stock' },
    {
      key: 'status' as keyof Product,
      header: t.status,
      render: (item: Product) => (
        <Badge variant={item.status === 'In Stock' ? 'default' : 'destructive'}>
          {item.status}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title={t.products}
        description="Manage your products"
        icon={Package}
        onAdd={() => console.log('Add product')}
      />

      <DataTable
        data={products}
        columns={columns}
        onView={(item) => console.log('View', item)}
        onEdit={(item) => console.log('Edit', item)}
        onDelete={(item) => console.log('Delete', item)}
      />
    </div>
  );
};

export default Products;
