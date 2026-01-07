import React, { useEffect, useState } from "react";
import api from "@/lib/api";
import { useLanguage } from "@/contexts/LanguageContext";
import { PageHeader } from "@/components/admin/PageHeader";
import { DataTable } from "@/components/admin/DataTable";
import { Briefcase, Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";

/* ================= TYPES ================= */

interface Work {
  id: number;
  title: string;
  description: string;
  section: "projects" | "videos";
  type?: string;
  thumbnail?: string;
  embed_url?: string;
  video_url?: string;
  category_id?: number;
  date: string;
}

interface Category {
  id: number;
  name: string;
}

interface WorkForm {
  section: "" | "projects" | "videos";
  title: string;
  description: string;
  category_id?: number;
  type?: string;
  thumbnail?: File | null;
  embed_url?: string;
  video_file?: File | null;
}

/* ================= DEFAULT ================= */

const emptyForm: WorkForm = {
  section: "",
  title: "",
  description: "",
};

/* ================= COMPONENT ================= */

const Works: React.FC = () => {
  const { t, lang } = useLanguage();

  const [currentLang, setCurrentLang] = useState(lang ?? "en");
  const safeLang = currentLang ?? "en";

  const [works, setWorks] = useState<Work[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState<WorkForm>(emptyForm);
  const [editing, setEditing] = useState<Work | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH ================= */

  const fetchWorks = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/works", {
        params: { lang: safeLang },
      });
      setWorks(Array.isArray(res.data) ? res.data : []);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    const res = await api.get("/admin/categories", {
      params: { lang: safeLang },
    });
    setCategories(Array.isArray(res.data) ? res.data : []);
  };

  useEffect(() => {
    fetchWorks();
    fetchCategories();
  }, [safeLang]);

  /* ================= CREATE / UPDATE ================= */

 const submit = async () => {
  if (!form.section || !form.title) {
    Swal.fire("Validation", "Section and title are required", "error");
    return;
  }

  const fd = new FormData();

  // ✅ ALWAYS SEND THESE
  fd.append("section", form.section);
  fd.append("lang", safeLang);
  fd.append("title", form.title);
  fd.append("description", form.description || "");

  // ✅ UPDATE METHOD
  if (editing) {
    fd.append("_method", "PUT");
  }

  // ---------- PROJECT ----------
  if (form.section === "projects") {
    fd.append("category_id", String(form.category_id));

    // ✅ thumbnail ONLY if changed
    if (form.thumbnail instanceof File) {
      fd.append("thumbnail", form.thumbnail);
    }
  }

  // ---------- VIDEO ----------
  if (form.section === "videos") {
    fd.append("type", form.type);

    if (form.embed_url) {
      fd.append("embed_url", form.embed_url);
    }

    if (form.video_file instanceof File) {
      fd.append("video_file", form.video_file);
    }
  }

  try {
    if (editing) {
      await api.post(`/admin/works/${editing.id}`, fd);
      Swal.fire("Updated", "Work updated successfully", "success");
    } else {
      await api.post("/admin/works", fd);
      Swal.fire("Created", "Work created successfully", "success");
    }

    setOpen(false);
    setEditing(null);
    setForm(emptyForm);
    fetchWorks();
  } catch (err: any) {
    Swal.fire(
      "Error",
      err.response?.data?.message ?? "Operation failed",
      "error"
    );
  }
};


  /* ================= EDIT ================= */

  const editWork = (work: Work) => {
    setEditing(work);
    setForm({
      section: work.section,
      title: work.title,
      description: work.description,
      category_id: work.category_id,
      type: work.type,
    });
    setOpen(true);
  };

  /* ================= DELETE ================= */

  const remove = async (work: Work) => {
    const confirm = await Swal.fire({
      title: "Delete this work?",
      icon: "warning",
      showCancelButton: true,
    });

    if (!confirm.isConfirmed) return;

    await api.delete(`/admin/works/${work.id}`, {
      data: { section: work.section },
    });

    Swal.fire("Deleted", "Work removed", "success");
    fetchWorks();
  };

  /* ================= TABLE ================= */

  const columns = [
    {
      key: "media",
      header: "Media",
      render: (w: Work) =>
        w.section === "projects" && w.thumbnail ? (
          <img
            src={w.thumbnail}
            className="h-12 w-12 object-cover rounded"
          />
        ) : w.section === "videos" ? (
          w.embed_url ? (
            <a
              href={w.embed_url}
              target="_blank"
              className="text-blue-600 underline"
            >
              View
            </a>
          ) : w.video_url ? (
            <video src={w.video_url} className="h-12" />
          ) : (
            "-"
          )
        ) : (
          "-"
        ),
    },
    { key: "title", header: t?.title ?? "Title" },
    { key: "section", header: "Section" },
    { key: "date", header: t?.date ?? "Date" },
    {
      key: "actions",
      header: "Actions",
      render: (w: Work) => (
        <Button
          size="sm"
          variant="outline"
          onClick={() => editWork(w)}
        >
          <Pencil className="h-4 w-4" />
        </Button>
      ),
    },
  ];

  /* ================= RENDER ================= */

  return (
    <div className="space-y-6">
      <PageHeader
        title={t?.works ?? "Works"}
        icon={Briefcase}
        onAdd={() => {
          setEditing(null);
          setForm(emptyForm);
          setOpen(true);
        }}
        right={
          <select
            className="border rounded p-2"
            value={safeLang}
            onChange={(e) => setCurrentLang(e.target.value)}
          >
            <option value="en">EN</option>
            <option value="fr">FR</option>
            <option value="ar">AR</option>
          </select>
        }
      />

      <DataTable
        loading={loading}
        data={works}
        columns={columns}
        onDelete={remove}
      />

      {/* ================= MODAL ================= */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg space-y-4">
          <DialogHeader>
            <DialogTitle>
              {editing ? "Edit Work" : "Add Work"} ({safeLang.toUpperCase()})
            </DialogTitle>
          </DialogHeader>

          <select
            className="border rounded p-2 w-full"
            value={form.section}
            onChange={(e) =>
              setForm({ ...form, section: e.target.value as any })
            }
            disabled={!!editing}
          >
            <option value="">Select section</option>
            <option value="projects">Project</option>
            <option value="videos">Video</option>
          </select>

          <Input
            placeholder="Title"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />

          <Textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          {form.section === "projects" && (
            <>
              <select
                className="border rounded p-2 w-full"
                value={form.category_id ?? ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    category_id: Number(e.target.value),
                  })
                }
              >
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>

              <Input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setForm({
                    ...form,
                    thumbnail: e.target.files?.[0] ?? null,
                  })
                }
              />
            </>
          )}

          {form.section === "videos" && (
            <>
              <select
                className="border rounded p-2 w-full"
                value={form.type ?? ""}
                onChange={(e) =>
                  setForm({ ...form, type: e.target.value })
                }
              >
                <option value="">Select video type</option>
                <option value="music-video">Music Video</option>
                <option value="movie-trailer">Movie Trailer</option>
              </select>

              <Input
                placeholder="Embed URL"
                value={form.embed_url ?? ""}
                onChange={(e) =>
                  setForm({ ...form, embed_url: e.target.value })
                }
              />

              <Input
                type="file"
                accept="video/*"
                onChange={(e) =>
                  setForm({
                    ...form,
                    video_file: e.target.files?.[0] ?? null,
                  })
                }
              />
            </>
          )}

          <Button onClick={submit} className="w-full">
            {editing ? "Update Work" : "Create Work"}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Works;
