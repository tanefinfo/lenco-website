import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { PageHeader } from '@/components/admin/PageHeader';
import { Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { api } from '@/lib/api'; // Axios instance
import Swal from 'sweetalert2';


const emptyForm = {
  hero_title: '',
  hero_subtitle: '',
  portrait_local: '',
  portrait_url: '',
  full_name: '',
  role: '',
  bio_short: '',
  bio_long_1: '',
  bio_long_2: '',
  background_title: '',
  background_p1: '',
  background_p2: '',
  oromo_work_title: '',
  oromo_work_p1: '',
  oromo_work_p2: '',
  vision_title: '',
  vision_description: '',
  achievement_points: [],
  social_links: {},
  philosophies: [],
  achievement_stats: [],
  milestones: [],
  portrait_preview: '',
};

const LANGS = ['en', 'om', 'am'];

const About: React.FC = () => {
  const { t, language } = useLanguage();
  const [forms, setForms] = useState<any>({
    en: { ...emptyForm },
    om: { ...emptyForm },
    am: { ...emptyForm },
  });
  const [loading, setLoading] = useState(false);

  // Load data from backend
  useEffect(() => {
    const loadAbout = async () => {
      for (const lang of LANGS) {
        try {
          const res = await api.get(`/about`, { params: { lang } });
          setForms((prev: any) => ({
            ...prev,
            [lang]: {
              ...emptyForm,
              ...res.data,
              portrait_preview: res.data.portrait_local || '',
            },
          }));
        } catch (error) {
          console.warn(`No about data for ${lang}`);
        }
      }
    };
    loadAbout();
  }, []);

  const updateField = (lang: string, field: string, value: any) => {
    setForms((prev: any) => ({
      ...prev,
      [lang]: { ...prev[lang], [field]: value },
    }));
  };

const handleSave = async (lang: string) => {
  setLoading(true);

  try {
    const formData = new FormData();

    Object.entries(forms[lang]).forEach(([key, value]) => {
      if (key === 'portrait_local') {
        if (value instanceof File) {
          formData.append(key, value);
        }
      } else if (key === 'portrait_preview') {
        return;
      } else {
        formData.append(
          key,
          typeof value === 'string' ? value : JSON.stringify(value)
        );
      }
    });

    await api.put(`/about/${lang}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    Swal.fire({
      icon: 'success',
      title: 'Saved!',
      text: `Content for ${lang.toUpperCase()} has been saved successfully.`,
      timer: 2000,
      showConfirmButton: false,
    });

  } catch (error: any) {
    // 🔴 Laravel validation errors
    if (error.response?.status === 422) {
      const errors = error.response.data.errors;

      const errorHtml = Object.entries(errors)
        .map(([field, messages]: any) => {
          return `<p><strong>${field}</strong>: ${messages.join(', ')}</p>`;
        })
        .join('');

      Swal.fire({
        icon: 'error',
        title: 'Validation Errors',
        html: errorHtml,
      });

    // 🔴 Backend returned a custom message
    } else if (error.response?.data?.message) {
      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: error.response.data.message,
      });

    // 🔴 Network / unknown error
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Unexpected Error',
        text: 'Something went wrong. Please try again.',
      });
    }
  } finally {
    setLoading(false);
  }
};




const renderJSONField = (lang: string, field: string, label: string) => {
  const value = forms[lang][field];

  // Array of strings
  if (Array.isArray(value) && typeof value[0] === 'string') {
    return (
      <div>
        <Label>{label}</Label>
        {value.map((item: string, index: number) => (
          <Input
            key={index}
            value={item}
            onChange={(e) => {
              const newArr = [...value];
              newArr[index] = e.target.value;
              updateField(lang, field, newArr);
            }}
            className="mb-1"
          />
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={() => updateField(lang, field, [...value, ''])}
        >
          Add Item
        </Button>
      </div>
    );
  }

  // Object with key-value pairs (like social_links)
  if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
    return (
      <div>
        <Label>{label}</Label>
        {Object.entries(value).map(([key, val]) => (
          <Input
            key={key}
            value={val as string}
            onChange={(e) => {
              const newObj = { ...value, [key]: e.target.value };
              updateField(lang, field, newObj);
            }}
            placeholder={key}
            className="mb-1"
          />
        ))}
      </div>
    );
  }

  // Array of objects (like philosophies, achievement_stats, milestones)
  if (Array.isArray(value) && typeof value[0] === 'object') {
    return (
      <div>
        <Label>{label}</Label>
        {value.map((item: any, index: number) => (
          <div key={index} className="flex gap-2 mb-1">
            {Object.entries(item).map(([k, v]) => (
              <Input
                key={k}
                value={v as string}
                onChange={(e) => {
                  const newArr = [...value];
                  newArr[index] = { ...newArr[index], [k]: e.target.value };
                  updateField(lang, field, newArr);
                }}
                placeholder={k}
              />
            ))}
          </div>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={() => updateField(lang, field, [...value, {}])}
        >
          Add Item
        </Button>
      </div>
    );
  }

  return null;
};



  return (
    <div className="space-y-6">
      <PageHeader title={t.about} description="Manage About page content" icon={Info} />

      <Tabs defaultValue={language}>
        <TabsList className="grid max-w-md grid-cols-3">
          <TabsTrigger value="en">English</TabsTrigger>
          <TabsTrigger value="om">Afaan Oromo</TabsTrigger>
          <TabsTrigger value="am">አማርኛ</TabsTrigger>
        </TabsList>

        {LANGS.map((lang) => (
          <TabsContent key={lang} value={lang}>
            <Card>
              <CardHeader>
                <CardTitle>About ({lang.toUpperCase()})</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Hero */}
                <div>
                  <Label>Hero Title</Label>
                  <Input value={forms[lang].hero_title} onChange={(e) => updateField(lang, 'hero_title', e.target.value)} />
                </div>
                <div>
                  <Label>Hero Subtitle</Label>
                  <Textarea value={forms[lang].hero_subtitle} onChange={(e) => updateField(lang, 'hero_subtitle', e.target.value)} />
                </div>

                {/* Portrait */}
               {/* Portrait */}
{/* Portrait */}
<div>
  <Label>Portrait Local</Label>
  <input
    type="file"
    accept="image/*"
    onChange={(e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // Update form state with the File object
      updateField(lang, 'portrait_local', file);

      // Generate preview URL
      const previewUrl = URL.createObjectURL(file);
      updateField(lang, 'portrait_preview', previewUrl);
    }}
  />

  {/* Show preview if available */}
  {forms[lang].portrait_preview && (
    <img
      src={forms[lang].portrait_preview}
      alt="Preview"
      className="mt-2 w-32 h-32 object-cover rounded"
    />
  )}
</div>



                {/* Profile */}
                <div>
                  <Label>Full Name</Label>
                  <Input value={forms[lang].full_name} onChange={(e) => updateField(lang, 'full_name', e.target.value)} />
                </div>
                <div>
                  <Label>Role</Label>
                  <Input value={forms[lang].role} onChange={(e) => updateField(lang, 'role', e.target.value)} />
                </div>
                <div>
                  <Label>Short Bio</Label>
                  <Textarea rows={3} value={forms[lang].bio_short} onChange={(e) => updateField(lang, 'bio_short', e.target.value)} />
                </div>
                <div>
                  <Label>Bio Long 1</Label>
                  <Textarea rows={3} value={forms[lang].bio_long_1} onChange={(e) => updateField(lang, 'bio_long_1', e.target.value)} />
                </div>
                <div>
                  <Label>Bio Long 2</Label>
                  <Textarea rows={3} value={forms[lang].bio_long_2} onChange={(e) => updateField(lang, 'bio_long_2', e.target.value)} />
                </div>

                {/* Background */}
                <div>
                  <Label>Background Title</Label>
                  <Input value={forms[lang].background_title} onChange={(e) => updateField(lang, 'background_title', e.target.value)} />
                </div>
                <div>
                  <Label>Background P1</Label>
                  <Textarea rows={2} value={forms[lang].background_p1} onChange={(e) => updateField(lang, 'background_p1', e.target.value)} />
                </div>
                <div>
                  <Label>Background P2</Label>
                  <Textarea rows={2} value={forms[lang].background_p2} onChange={(e) => updateField(lang, 'background_p2', e.target.value)} />
                </div>

                {/* Oromo Work */}
                <div>
                  <Label>Oromo Work Title</Label>
                  <Input value={forms[lang].oromo_work_title} onChange={(e) => updateField(lang, 'oromo_work_title', e.target.value)} />
                </div>
                <div>
                  <Label>Oromo Work P1</Label>
                  <Textarea rows={2} value={forms[lang].oromo_work_p1} onChange={(e) => updateField(lang, 'oromo_work_p1', e.target.value)} />
                </div>
                <div>
                  <Label>Oromo Work P2</Label>
                  <Textarea rows={2} value={forms[lang].oromo_work_p2} onChange={(e) => updateField(lang, 'oromo_work_p2', e.target.value)} />
                </div>

                {/* Vision */}
                <div>
                  <Label>Vision Title</Label>
                  <Input value={forms[lang].vision_title} onChange={(e) => updateField(lang, 'vision_title', e.target.value)} />
                </div>
                <div>
                  <Label>Vision Description</Label>
                  <Textarea rows={3} value={forms[lang].vision_description} onChange={(e) => updateField(lang, 'vision_description', e.target.value)} />
                </div>

                {/* JSON Fields */}
                {renderJSONField(lang, 'achievement_points', 'Achievement Points')}
                {renderJSONField(lang, 'social_links', 'Social Links')}
                {renderJSONField(lang, 'philosophies', 'Philosophies')}
                {renderJSONField(lang, 'achievement_stats', 'Achievement Stats')}
                {renderJSONField(lang, 'milestones', 'Milestones')}

                <div className="flex justify-end pt-4">
                 <Button
  onClick={() => handleSave(lang)} // pass the current tab language
  disabled={loading}
  className="gradient-gold"
>
  {loading ? 'Saving...' : t.save}
</Button>

                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default About;
