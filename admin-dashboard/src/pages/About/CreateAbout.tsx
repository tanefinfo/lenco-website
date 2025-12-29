import React, { useState } from "react";
import api from "../../api";
import Swal from "sweetalert2"; // Make sure you installed sweetalert2

export default function CreateAbout() {
  const [form, setForm] = useState({
    lang: "en",
    hero_title: "",
    hero_subtitle: "",
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
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const response = await api.post("/about", form);

    Swal.fire({
      icon: "success",
      title: "Success!",
      text: response.data.message || "About content saved successfully!",
    });

    // Reset some fields if needed
    setForm({
      ...form,
      hero_title: "",
      hero_subtitle: "",
    });

  } catch (error) {
    let errorMsg = "Something went wrong. Please try again.";

    // Laravel validation errors (422)
    if (error.response?.status === 422) {
      const errors = error.response.data.errors;
      // Combine all field errors into a single string
      errorMsg = Object.values(errors).flat().join("\n");
    } else if (error.response?.data?.message) {
      errorMsg = error.response.data.message;
    }

    Swal.fire({
      icon: "error",
      title: "Error",
      html: errorMsg.replace(/\n/g, "<br/>"), // support multiline errors
    });
  } finally {
    setLoading(false);
  }
};


  const inputClass =
    "w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition";

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        Create About Page Content
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Language */}
        <div>
          <label className="block font-medium mb-2 text-gray-700 dark:text-gray-200">
            Language
          </label>
          <select
            name="lang"
            value={form.lang}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="en">English</option>
            <option value="am">Amharic</option>
            <option value="om">Oromo</option>
          </select>
        </div>

        {/* Hero */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="hero_title"
            placeholder="Hero Title"
            className={inputClass}
            onChange={handleChange}
          />
          <input
            name="hero_subtitle"
            placeholder="Hero Subtitle"
            className={inputClass}
            onChange={handleChange}
          />
        </div>

        {/* Profile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="full_name"
            placeholder="Full Name"
            className={inputClass}
            onChange={handleChange}
          />
          <input
            name="role"
            placeholder="Role / Position"
            className={inputClass}
            onChange={handleChange}
          />
        </div>

        <textarea
          name="bio_short"
          placeholder="Short Bio"
          className={inputClass + " resize-none"}
          onChange={handleChange}
        />
        <textarea
          name="bio_long_1"
          placeholder="Biography Paragraph 1"
          className={inputClass + " resize-none"}
          onChange={handleChange}
        />
        <textarea
          name="bio_long_2"
          placeholder="Biography Paragraph 2"
          className={inputClass + " resize-none"}
          onChange={handleChange}
        />

        {/* Background */}
        <input
          name="background_title"
          placeholder="Background Title"
          className={inputClass}
          onChange={handleChange}
        />
        <textarea
          name="background_p1"
          placeholder="Background Paragraph 1"
          className={inputClass + " resize-none"}
          onChange={handleChange}
        />
        <textarea
          name="background_p2"
          placeholder="Background Paragraph 2"
          className={inputClass + " resize-none"}
          onChange={handleChange}
        />

        {/* Oromo Work */}
        <input
          name="oromo_work_title"
          placeholder="Oromo Work Title"
          className={inputClass}
          onChange={handleChange}
        />
        <textarea
          name="oromo_work_p1"
          placeholder="Oromo Work Paragraph 1"
          className={inputClass + " resize-none"}
          onChange={handleChange}
        />
        <textarea
          name="oromo_work_p2"
          placeholder="Oromo Work Paragraph 2"
          className={inputClass + " resize-none"}
          onChange={handleChange}
        />

        {/* Vision */}
        <input
          name="vision_title"
          placeholder="Vision Title"
          className={inputClass}
          onChange={handleChange}
        />
        <textarea
          name="vision_description"
          placeholder="Vision Description"
          className={inputClass + " resize-none"}
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition"
        >
          {loading ? "Saving..." : "Save About Content"}
        </button>
      </form>
    </div>
  );
}
