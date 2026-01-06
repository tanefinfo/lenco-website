import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { PageHeader } from '@/components/admin/PageHeader';
import { DataTable } from '@/components/admin/DataTable';
import { Users as UsersIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import api from '@/lib/api';
import Swal from 'sweetalert2';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status?: string;
  lastActive?: string;
}

const Users: React.FC = () => {
  const { t } = useLanguage();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });

  /* ---------------- FETCH ---------------- */
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get('/users');
      setUsers(res.data.data || res.data); // handle pagination
    } catch (err) {
      Swal.fire('Error', 'Failed to fetch users', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  /* ---------------- FORM ---------------- */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const openModalForEdit = (user: User) => {
    setEditingUser(user);
    setForm({ name: user.name, email: user.email, password: '', role: user.role });
    setModalOpen(true);
  };

  const resetForm = () => {
    setForm({ name: '', email: '', password: '', role: '' });
    setEditingUser(null);
  };

  /* ---------------- SUBMIT ---------------- */
const handleSubmit = async () => {
  // Basic validation
  if (!form.name || !form.email || !form.role || (!editingUser && !form.password)) {
    Swal.fire({
      icon: 'warning',
      title: 'Validation Error',
      html: `<strong>All fields are required!</strong><br/>
             Please make sure you fill out <u>Name, Email, Role${!editingUser ? ', and Password' : ''}</u>.`,
      showCloseButton: true,
      confirmButtonText: 'Got it!',
    });
    return;
  }

  setSubmitLoading(true);

  try {
    if (editingUser) {
      // Update user
      await api.put(`/users/${editingUser.id}`, form);

      Swal.fire({
        icon: 'success',
        title: 'User Updated',
        html: `<strong>${form.name}</strong> has been updated successfully.`,
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'View Profile',
        cancelButtonText: 'Close',
      }).then((result) => {
        if (result.isConfirmed) {
          // You can redirect to profile page if needed
          window.location.href = `/users/${editingUser.id}`;
        }
      });

    } else {
      // Create user
      const response = await api.post('/users', form);

      Swal.fire({
        icon: 'success',
        title: 'User Added',
        html: `<strong>${form.name}</strong> was created successfully!`,
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'View Users',
        cancelButtonText: 'Close',
      }).then((result) => {
        if (result.isConfirmed) {
          // Redirect to users list
          window.location.href = '/users';
        }
      });
    }

    setModalOpen(false);
    resetForm();
    fetchUsers();

  } catch (err: any) {
    if (err.response?.data?.errors) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        html: Object.entries(err.response.data.errors)
          .map(([field, messages]: any) =>
            `<strong>${field}:</strong> ${messages.join(', ')}`).join('<br/>'),
        showCloseButton: true,
        confirmButtonText: 'Fix Errors',
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Operation Failed',
        text: 'Something went wrong. Please try again later.',
        showCloseButton: true,
        confirmButtonText: 'Retry',
      });
    }
  } finally {
    setSubmitLoading(false);
  }
};


  /* ---------------- DELETE ---------------- */
  const handleDelete = async (user: User) => {
    const confirm = await Swal.fire({
      title: 'Delete user?',
      text: `Delete "${user.name}"?`,
      icon: 'warning',
      showCancelButton: true,
    });

    if (!confirm.isConfirmed) return;

    try {
      await api.delete(`/users/${user.id}`);
      Swal.fire('Deleted!', 'User deleted successfully', 'success');
      fetchUsers();
    } catch {
      Swal.fire('Error', 'Failed to delete user', 'error');
    }
  };

  /* ---------------- TABLE ---------------- */
  const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  const columns = [
    {
      key: 'name' as keyof User,
      header: t.name,
      render: (item: User) => (
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="gradient-gold text-primary-foreground text-xs">{getInitials(item.name)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{item.name}</p>
            <p className="text-xs text-muted-foreground">{item.email}</p>
          </div>
        </div>
      ),
    },
    { key: 'role' as keyof User, header: 'Role' },
    {
      key: 'status' as keyof User,
      header: t.status,
      render: (item: User) => (
        <Badge variant={item.status === 'Active' ? 'default' : 'secondary'}>
          {item.status || 'Active'}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title={t.users}
        description="Manage system users"
        icon={UsersIcon}
        onAdd={() => setModalOpen(true)}
      />

      <DataTable
        data={users}
        columns={columns}
        loading={loading}
        onView={(item) => console.log('View', item)}
        onEdit={openModalForEdit}
        onDelete={handleDelete}
      />

      {/* ---------- ADD/EDIT MODAL ---------- */}
      <Dialog open={modalOpen} onOpenChange={(open) => { setModalOpen(open); if(!open) resetForm(); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingUser ? 'Edit User' : 'Add User'}</DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <Input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
            <Input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
            {!editingUser && <Input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />}
            <select name="role" value={form.role} onChange={handleChange} className="w-full border rounded px-2 py-1">
              <option value="">Select Role</option>
              <option value="Super Admin">Super Admin</option>
              <option value="Editor">Editor</option>
              <option value="Viewer">Viewer</option>
            </select>

            <Button onClick={handleSubmit} disabled={submitLoading}>
              {submitLoading ? 'Saving...' : editingUser ? 'Update User' : 'Add User'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Users;
