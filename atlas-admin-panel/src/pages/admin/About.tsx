 import React, { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { PageHeader } from "@/components/admin/PageHeader";
import { Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/lib/api";
import Swal from "sweetalert2";

const emptyForm = {
    hero_title: "",
    hero_subtitle: "",
    portrait_local: "",
    full_name: "",
    role: "",
    bio_short: "",
    bio_long_1: "",
    bio_long_2: "",
    background_title: "",
    background_p1: "",
    background_p2: "",
    oromo_work_title: "",
    oromo_work_p1: "",
    oromo_work_p2: "",
    vision_title: "",
    vision_description: "",
    achievement_points: [],
    social_links: {},
    philosophies: [],
    achievement_stats: [],
    milestones: [],
    portrait_preview: "",
};

const LANGS = ["en", "om", "am"];

const About: React.FC = () => {
    const { t, language } = useLanguage();
    const [forms, setForms] = useState<any>({
        en: { ...emptyForm },
        om: { ...emptyForm },
        am: { ...emptyForm },
    });
    const [exists, setExists] = useState<Record<string, boolean>>({
        en: false,
        om: false,
        am: false,
    });
    const [loading, setLoading] = useState(false);
    useEffect(() => {
  const loadAbout = async () => {
    for (const lang of LANGS) {
      try {
        const res = await api.get("/about", { params: { lang } });

        setForms((prev: any) => ({
          ...prev,
          [lang]: {
            ...emptyForm,
            ...res.data,

            // keep DB value
            portrait_local: res.data.portrait_local || "",

            // ✅ use backend-generated URL
            portrait_preview: res.data.portrait_url || "",
          },
        }));

        setExists((prev) => ({ ...prev, [lang]: true }));
      } catch (error) {
        console.error(`Failed to load about (${lang})`, error);
        setExists((prev) => ({ ...prev, [lang]: false }));
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
            if (key === "portrait_preview") return;

            if (key === "portrait_local" && value instanceof File) {
                formData.append(key, value);
                return;
            }

            const isPlainObject =
                typeof value === "object" &&
                value !== null &&
                value.constructor === Object;

            if (
                value === "" ||
                value === null ||
                value === undefined ||
                (Array.isArray(value) && value.length === 0) ||
                (isPlainObject && Object.keys(value).length === 0)
            )
                return;

            formData.append(
                key,
                typeof value === "string" ? value : JSON.stringify(value)
            );
        });

        if (exists[lang]) {
            formData.append("_method", "PUT");
            await api.post(`/about/${lang}`, formData);
        } else {
            formData.append("lang", lang);
            await api.post("/about", formData);
            setExists((prev) => ({ ...prev, [lang]: true }));
        }

        Swal.fire({
            icon: "success",
            title: "Saved!",
            text: `Content for ${lang.toUpperCase()} saved successfully.`,
            timer: 2000,
            showConfirmButton: false,
        });
    } catch (error: any) {
        if (error.response?.status === 422) {
            const errors = error.response.data.errors;
            const errorHtml = Object.entries(errors)
                .map(
                    ([field, messages]: any) =>
                        `<p><strong>${field}</strong>: ${messages.join(
                            ", "
                        )}</p>`
                )
                .join("");

            Swal.fire({
                icon: "error",
                title: "Validation Errors",
                html: errorHtml,
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Failed",
                text:
                    error.response?.data?.message || "Something went wrong",
            });
        }
    } finally {
        setLoading(false);
    }
};


    return (
        <div className="space-y-6">
            <PageHeader
                title={t.about}
                description="Manage About page content"
                icon={Info}
            />
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
                                <CardTitle>
               xampp                     About ({lang.toUpperCase()})
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Hero */}
                                <Label>Hero Title</Label>
                                <Input
                                    value={forms[lang].hero_title}
                                    onChange={(e) =>
                                        updateField(
                                            lang,
                                            "hero_title",
                                            e.target.value
                                        )
                                    }
                                />
                                <Label>Hero Subtitle</Label>
                                <Textarea
                                    value={forms[lang].hero_subtitle}
                                    onChange={(e) =>
                                        updateField(
                                            lang,
                                            "hero_subtitle",
                                            e.target.value
                                        )
                                    }
                                />

                                {/* Portrait */}
                                <div>
  <Label>Portrait Local</Label>

  <input
    type="file"
    accept="image/*"
    onChange={(e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // send file to backend
      updateField(lang, "portrait_local", file);

      // local preview
      updateField(
        lang,
        "portrait_preview",
        URL.createObjectURL(file)
      );
    }}
  />

  {(forms[lang].portrait_preview || forms[lang].portrait_local) && (
    <img
      src={
        forms[lang].portrait_preview ||
        `${import.meta.env.VITE_API_URL?.replace(
          "/api",
          ""
        )}/storage/${forms[lang].portrait_local}`
      }
      alt={forms[lang].full_name || "Portrait"}
      className="mt-2 w-32 h-32 object-cover rounded transition-transform group-hover:scale-105"
      onError={(e) =>
        ((e.target as HTMLImageElement).src =
          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            forms[lang].full_name || "User"
          )}&background=c9a227&color=0f0f12&size=400`)
      }
    />
  )}
</div>


                                {/* Profile */}
                                <Label>Full Name</Label>
                                <Input
                                    value={forms[lang].full_name}
                                    onChange={(e) =>
                                        updateField(
                                            lang,
                                            "full_name",
                                            e.target.value
                                        )
                                    }
                                />
                                <Label>Role</Label>
                                <Input
                                    value={forms[lang].role}
                                    onChange={(e) =>
                                        updateField(
                                            lang,
                                            "role",
                                            e.target.value
                                        )
                                    }
                                />
                                <Label>Short Bio</Label>
                                <Textarea
                                    rows={3}
                                    value={forms[lang].bio_short}
                                    onChange={(e) =>
                                        updateField(
                                            lang,
                                            "bio_short",
                                            e.target.value
                                        )
                                    }
                                />
                                <Label>Bio Long 1</Label>
                                <Textarea
                                    rows={3}
                                    value={forms[lang].bio_long_1}
                                    onChange={(e) =>
                                        updateField(
                                            lang,
                                            "bio_long_1",
                                            e.target.value
                                        )
                                    }
                                />
                                <Label>Bio Long 2</Label>
                                <Textarea
                                    rows={3}
                                    value={forms[lang].bio_long_2}
                                    onChange={(e) =>
                                        updateField(
                                            lang,
                                            "bio_long_2",
                                            e.target.value
                                        )
                                    }
                                />

                                {/* Background */}
                                <Label>Background Title</Label>
                                <Input
                                    value={forms[lang].background_title}
                                    onChange={(e) =>
                                        updateField(
                                            lang,
                                            "background_title",
                                            e.target.value
                                        )
                                    }
                                />
                                <Label>Background P1</Label>
                                <Textarea
                                    rows={2}
                                    value={forms[lang].background_p1}
                                    onChange={(e) =>
                                        updateField(
                                            lang,
                                            "background_p1",
                                            e.target.value
                                        )
                                    }
                                />
                                <Label>Background P2</Label>
                                <Textarea
                                    rows={2}
                                    value={forms[lang].background_p2}
                                    onChange={(e) =>
                                        updateField(
                                            lang,
                                            "background_p2",
                                            e.target.value
                                        )
                                    }
                                />

                                {/* Oromo Work */}
                                <Label>Oromo Work Title</Label>
                                <Input
                                    value={forms[lang].oromo_work_title}
                                    onChange={(e) =>
                                        updateField(
                                            lang,
                                            "oromo_work_title",
                                            e.target.value
                                        )
                                    }
                                />
                                <Label>Oromo Work P1</Label>
                                <Textarea
                                    rows={2}
                                    value={forms[lang].oromo_work_p1}
                                    onChange={(e) =>
                                        updateField(
                                            lang,
                                            "oromo_work_p1",
                                            e.target.value
                                        )
                                    }
                                />
                                <Label>Oromo Work P2</Label>
                                <Textarea
                                    rows={2}
                                    value={forms[lang].oromo_work_p2}
                                    onChange={(e) =>
                                        updateField(
                                            lang,
                                            "oromo_work_p2",
                                            e.target.value
                                        )
                                    }
                                />

                                {/* Vision */}
                                <Label>Vision Title</Label>
                                <Input
                                    value={forms[lang].vision_title}
                                    onChange={(e) =>
                                        updateField(
                                            lang,
                                            "vision_title",
                                            e.target.value
                                        )
                                    }
                                />
                                <Label>Vision Description</Label>
                                <Textarea
                                    rows={3}
                                    value={forms[lang].vision_description}
                                    onChange={(e) =>
                                        updateField(
                                            lang,
                                            "vision_description",
                                            e.target.value
                                        )
                                    }
                                />

                                {/* JSON Fields Inline Rendering */}
                                <div>
                                    <Label>Achievement Points</Label>
                                    {forms[lang].achievement_points.map(
                                        (item: string, idx: number) => (
                                            <Input
                                                key={idx}
                                                value={item}
                                                onChange={(e) => {
                                                    const arr = [
                                                        ...forms[lang]
                                                            .achievement_points,
                                                    ];
                                                    arr[idx] = e.target.value;
                                                    updateField(
                                                        lang,
                                                        "achievement_points",
                                                        arr
                                                    );
                                                }}
                                                className="mb-1"
                                            />
                                        )
                                    )}
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            updateField(
                                                lang,
                                                "achievement_points",
                                                [
                                                    ...forms[lang]
                                                        .achievement_points,
                                                    "",
                                                ]
                                            )
                                        }
                                    >
                                        Add Item
                                    </Button>
                                </div>

                                <div>
                                    <Label>Social Links</Label>

                                    {Object.entries(
                                        forms[lang].social_links
                                    ).map(([key, val], idx) => (
                                        <div
                                            key={idx}
                                            className="flex gap-2 mb-1"
                                        >
                                            <Input
                                                placeholder="Platform (e.g., Twitter)"
                                                value={key}
                                                onChange={(e) => {
                                                    const newKey =
                                                        e.target.value;
                                                    const obj = {
                                                        ...forms[lang]
                                                            .social_links,
                                                    };
                                                    const oldValue = obj[key];
                                                    delete obj[key];
                                                    obj[newKey] = oldValue;
                                                    updateField(
                                                        lang,
                                                        "social_links",
                                                        obj
                                                    );
                                                }}
                                                className="w-1/3"
                                            />
                                            <Input
                                                placeholder="URL"
                                                value={val as string}
                                                onChange={(e) => {
                                                    const obj = {
                                                        ...forms[lang]
                                                            .social_links,
                                                        [key]: e.target.value,
                                                    };
                                                    updateField(
                                                        lang,
                                                        "social_links",
                                                        obj
                                                    );
                                                }}
                                                className="w-2/3"
                                            />
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => {
                                                    const obj = {
                                                        ...forms[lang]
                                                            .social_links,
                                                    };
                                                    delete obj[key];
                                                    updateField(
                                                        lang,
                                                        "social_links",
                                                        obj
                                                    );
                                                }}
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    ))}

                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            updateField(lang, "social_links", {
                                                ...forms[lang].social_links,
                                                "": "",
                                            })
                                        }
                                    >
                                        Add Link
                                    </Button>
                                </div>

                                <div>
                                    <Label>Philosophies</Label>
                                    {forms[lang].philosophies.map(
                                        (item: any, idx: number) => (
                                            <Input
                                                key={idx}
                                                value={item.text || ""}
                                                onChange={(e) => {
                                                    const arr = [
                                                        ...forms[lang]
                                                            .philosophies,
                                                    ];
                                                    arr[idx] = {
                                                        ...arr[idx],
                                                        text: e.target.value,
                                                    };
                                                    updateField(
                                                        lang,
                                                        "philosophies",
                                                        arr
                                                    );
                                                }}
                                                className="mb-1"
                                            />
                                        )
                                    )}
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            updateField(lang, "philosophies", [
                                                ...forms[lang].philosophies,
                                                {},
                                            ])
                                        }
                                    >
                                        Add Item
                                    </Button>
                                </div>

                                <div>
                                    <Label>Achievement Stats</Label>
                                    {forms[lang].achievement_stats.map(
                                        (item: any, idx: number) => (
                                            <div
                                                key={idx}
                                                className="flex gap-2 mb-1"
                                            >
                                                {Object.entries(item).map(
                                                    ([k, v]) => (
                                                        <Input
                                                            key={k}
                                                            placeholder={k}
                                                            value={v as string}
                                                            onChange={(e) => {
                                                                const arr = [
                                                                    ...forms[
                                                                        lang
                                                                    ]
                                                                        .achievement_stats,
                                                                ];
                                                                arr[idx] = {
                                                                    ...arr[idx],
                                                                    [k]: e
                                                                        .target
                                                                        .value,
                                                                };
                                                                updateField(
                                                                    lang,
                                                                    "achievement_stats",
                                                                    arr
                                                                );
                                                            }}
                                                        />
                                                    )
                                                )}
                                            </div>
                                        )
                                    )}
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            updateField(
                                                lang,
                                                "achievement_stats",
                                                [
                                                    ...forms[lang]
                                                        .achievement_stats,
                                                    {},
                                                ]
                                            )
                                        }
                                    >
                                        Add Item
                                    </Button>
                                </div>

                                <div>
                                    <Label>Milestones</Label>
                                    {forms[lang].milestones.map(
                                        (item: any, idx: number) => (
                                            <div
                                                key={idx}
                                                className="flex gap-2 mb-1"
                                            >
                                                {Object.entries(item).map(
                                                    ([k, v]) => (
                                                        <Input
                                                            key={k}
                                                            placeholder={k}
                                                            value={v as string}
                                                            onChange={(e) => {
                                                                const arr = [
                                                                    ...forms[
                                                                        lang
                                                                    ]
                                                                        .milestones,
                                                                ];
                                                                arr[idx] = {
                                                                    ...arr[idx],
                                                                    [k]: e
                                                                        .target
                                                                        .value,
                                                                };
                                                                updateField(
                                                                    lang,
                                                                    "milestones",
                                                                    arr
                                                                );
                                                            }}
                                                        />
                                                    )
                                                )}
                                            </div>
                                        )
                                    )}
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            updateField(lang, "milestones", [
                                                ...forms[lang].milestones,
                                                {},
                                            ])
                                        }
                                    >
                                        Add Item
                                    </Button>
                                </div>

                                <div className="flex justify-end pt-4">
                                    <Button
                                        onClick={() => handleSave(lang)}
                                        disabled={loading}
                                        className="gradient-gold"
                                    >
                                        {loading ? "Saving..." : t.save}
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
