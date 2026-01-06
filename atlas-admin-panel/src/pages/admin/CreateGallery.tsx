// CreateGallery.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';


interface CreateGalleryProps {
onSuccess?: () => void;
}


const CreateGallery: React.FC<CreateGalleryProps> = ({ onSuccess }) => {
const [form, setForm] = useState({
category: '',
title_en: '',
title_am: '',
title_or: '',
description_en: '',
description_am: '',
description_or: '',
cover: '',
images: [] as string[],
});


const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
const { name, value } = e.target;
setForm(prev => ({ ...prev, [name]: value }));
};


const handleImages = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
setForm(prev => ({ ...prev, images: e.target.value.split(',').map(i => i.trim()) }));
};


const submit = async (e: React.FormEvent) => {
e.preventDefault();
await axios.post('/api/gallery', form);
onSuccess?.();
};


return (
<Card className="shadow-xl rounded-2xl">
<CardContent className="p-8 space-y-6">
<h1 className="text-3xl font-bold">Create Gallery</h1>
<form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
<Input placeholder="Category" name="category" onChange={handleChange} required />
<Input placeholder="Cover Image URL" name="cover" onChange={handleChange} required />
<Input placeholder="Title (English)" name="title_en" onChange={handleChange} required />
<Input placeholder="Title (Amharic)" name="title_am" onChange={handleChange} required />
<Input placeholder="Title (Oromo)" name="title_or" onChange={handleChange} required />
<Textarea placeholder="Description (English)" name="description_en" onChange={handleChange} />
<Textarea placeholder="Description (Amharic)" name="description_am" onChange={handleChange} />
<Textarea placeholder="Description (Oromo)" name="description_or" onChange={handleChange} />
<Textarea className="md:col-span-2" placeholder="Gallery Images URLs (comma separated)" onChange={handleImages} required />
<div className="md:col-span-2 flex justify-end">
<Button type="submit" className="px-8">Save Gallery</Button>
</div>
</form>
</CardContent>
</Card>
);
};


export default CreateGallery;