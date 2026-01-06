import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:8000/api/awards"; // adjust if needed

const LANGS = [
  { key: "en", label: "English" },
  { key: "am", label: "Amharic" },
  { key: "or", label: "Oromifa" },
];

export default function AwardsCrudForm() {
  const [activeLang, setActiveLang] = useState("en");
  const [awards, setAwards] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const emptyForm = {
    year: "",
    category: "",
    placement: "",
    issuer: "",
    project: "",
    image: "",
    title_en: "",
    title_am: "",
    title_or: "",
    description_en: "",
    description_am: "",
    description_or: "",
  };

  const [form, setForm] = useState(emptyForm);

  /* =====================
     API CALLS
  ======================*/
  const fetchAwards = async () => {
    const res = await axios.get(`${API}?lang=${activeLang}`);
    setAwards(res.data);
  };

  const createAward = async () => {
    await axios.post(API, form);
    resetForm();
    fetchAwards();
  };

  const updateAward = async () => {
    await axios.put(`${API}/${editingId}`, form);
    resetForm();
    fetchAwards();
  };

  const deleteAward = async (id) => {
    if (!confirm("Delete this award?")) return;
    await axios.delete(`${API}/${id}`);
    fetchAwards();
  };

  const editAward = async (id) => {
    const res = await axios.get(`${API}/${id}`);
    setForm(res.data);
    setEditingId(id);
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  useEffect(() => {
    fetchAwards();
  }, [activeLang]);

  /* =====================
     UI
  ======================*/
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Awards Management</h1>

      {/* Language Tabs */}
      <div className="flex gap-2">
        {LANGS.map((l) => (
          <button
            key={l.key}
            onClick={() => setActiveLang(l.key)}
            className={`px-4 py-2 rounded ${
              activeLang === l.key
                ? "bg-black text-white"
                : "bg-gray-200"
            }`}
          >
            {l.label}
          </button>
        ))}
      </div>

      {/* FORM */}
      <div className="bg-white shadow rounded p-6 space-y-4">
        <h2 className="font-semibold">
          {editingId ? "Edit Award" : "Create Award"}
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <input placeholder="Year" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} className="input" />
          <input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="input" />
          <input placeholder="Placement" value={form.placement} onChange={(e) => setForm({ ...form, placement: e.target.value })} className="input" />
          <input placeholder="Issuer" value={form.issuer} onChange={(e) => setForm({ ...form, issuer: e.target.value })} className="input" />
          <input placeholder="Project" value={form.project} onChange={(e) => setForm({ ...form, project: e.target.value })} className="input" />
          <input placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="input" />
        </div>

        {/* Multilingual Inputs */}
        <div className="border-t pt-4 space-y-3">
          <h3 className="font-medium">{LANGS.find(l => l.key === activeLang)?.label} Content</h3>

          <input
            placeholder="Title"
            value={form[`title_${activeLang}`]}
            onChange={(e) => setForm({ ...form, [`title_${activeLang}`]: e.target.value })}
            className="input"
          />

          <textarea
            placeholder="Description"
            value={form[`description_${activeLang}`]}
            onChange={(e) => setForm({ ...form, [`description_${activeLang}`]: e.target.value })}
            className="input h-24"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={editingId ? updateAward : createAward}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            {editingId ? "Update" : "Create"}
          </button>

          {editingId && (
            <button onClick={resetForm} className="px-4 py-2 bg-gray-400 text-white rounded">
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* LIST */}
      <div className="bg-white shadow rounded p-6">
        <h2 className="font-semibold mb-4">Awards List</h2>

        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Year</th>
              <th className="p-2">Title</th>
              <th className="p-2">Category</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {awards.map((a) => (
              <tr key={a.id} className="border-t">
                <td className="p-2">{a.year}</td>
                <td className="p-2">{a.title}</td>
                <td className="p-2">{a.category}</td>
                <td className="p-2 flex gap-2">
                  <button onClick={() => editAward(a.id)} className="text-blue-600">Edit</button>
                  <button onClick={() => deleteAward(a.id)} className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
