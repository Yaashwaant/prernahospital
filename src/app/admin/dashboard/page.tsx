"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface Update {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
}

export default function AdminDashboard() {
  const [updates, setUpdates] = useState<Update[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    date: new Date().toISOString().split("T")[0],
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const loadUpdates = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/updates", { cache: "no-store" });
      const json = await res.json();
      const list: Update[] = Array.isArray(json.updates) ? json.updates : [];
      // Filter out demo placeholders
      setUpdates(list.filter((u) => !u.id.startsWith("demo-")));
    } catch (e) {
      setError("Failed to load updates. Check your Supabase configuration.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { loadUpdates(); }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/updates/upload?folder=updates", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Upload failed");
      setImagePreview(json.url);
      setFormData((p) => ({ ...p, image: json.url }));
    } catch (e: any) {
      alert("Image upload failed: " + e.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.image) {
      alert("Please fill in all fields and upload an image.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/updates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error?.message || "Failed to save update");
      await loadUpdates();
      setFormData({ title: "", description: "", image: "", date: new Date().toISOString().split("T")[0] });
      setImagePreview(null);
      setShowForm(false);
    } catch (e: any) {
      alert("Error: " + e.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This will also remove the image from storage.`)) return;
    try {
      const res = await fetch(`/api/updates/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Delete failed");
      setUpdates((prev) => prev.filter((u) => u.id !== id));
    } catch (e: any) {
      alert("Delete failed: " + e.message);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#1F4FD8] border-t-transparent" />
      </div>
    );
  }

  return (
    <main id="main-content">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1A1A1A]">Updates Management</h1>
        <p className="mt-1 text-sm text-gray-500">Add and manage hospital news &amp; announcements shown on the homepage.</p>
      </div>

      {error && (
        <div className="mb-6 rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-sm text-red-600">
          ⚠️ {error}
        </div>
      )}

      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#1A1A1A]">All Updates</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="rounded-xl bg-gradient-to-r from-[#1F4FD8] to-[#1ECAD3] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:shadow-md"
          >
            {showForm ? "Cancel" : "+ Add New Update"}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="mb-8 rounded-2xl bg-[#F4F7FB] p-6">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label htmlFor="upd-title" className="mb-1.5 block text-sm font-semibold text-gray-700">Title *</label>
                <input
                  type="text" id="upd-title"
                  value={formData.title}
                  onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))}
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-transparent focus:ring-2 focus:ring-[#1F4FD8]"
                  placeholder="Enter update title" required
                />
              </div>
              <div>
                <label htmlFor="upd-date" className="mb-1.5 block text-sm font-semibold text-gray-700">Date *</label>
                <input
                  type="date" id="upd-date"
                  value={formData.date}
                  onChange={(e) => setFormData((p) => ({ ...p, date: e.target.value }))}
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-transparent focus:ring-2 focus:ring-[#1F4FD8]"
                  required
                />
              </div>
              <div>
                <label htmlFor="upd-image" className="mb-1.5 block text-sm font-semibold text-gray-700">
                  Image * {uploading && <span className="text-[#1F4FD8]">(uploading...)</span>}
                </label>
                <input
                  type="file" id="upd-image" accept="image/*"
                  onChange={handleImageUpload} disabled={uploading}
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-transparent focus:ring-2 focus:ring-[#1F4FD8] disabled:opacity-50"
                  required
                />
                {imagePreview && (
                  <div className="relative mt-3 h-24 w-36 overflow-hidden rounded-xl border border-gray-200">
                    <Image src={imagePreview} alt="Preview" fill className="object-cover" unoptimized />
                  </div>
                )}
              </div>
              <div>
                <label htmlFor="upd-desc" className="mb-1.5 block text-sm font-semibold text-gray-700">Description *</label>
                <textarea
                  id="upd-desc"
                  value={formData.description}
                  onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
                  rows={3}
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-transparent focus:ring-2 focus:ring-[#1F4FD8]"
                  placeholder="Enter update description" required
                />
              </div>
            </div>
            <button
              type="submit" disabled={submitting || uploading}
              className="mt-5 rounded-xl bg-gradient-to-r from-[#1F4FD8] to-[#1ECAD3] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:shadow-md disabled:opacity-50"
            >
              {submitting ? "Saving..." : "Add Update"}
            </button>
          </form>
        )}

        {updates.length === 0 ? (
          <div className="py-12 text-center text-gray-400">No updates yet. Add your first update!</div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {updates.map((update) => (
              <div key={update.id} className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                <div className="relative h-44 w-full bg-gray-100">
                  <Image src={update.image} alt={update.title} fill className="object-cover" unoptimized />
                </div>
                <div className="p-4">
                  <h3 className="mb-1 text-sm font-semibold text-[#1A1A1A] line-clamp-2">{update.title}</h3>
                  <p className="mb-3 text-xs text-gray-500 line-clamp-2">{update.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">
                      {new Date(update.date).toLocaleDateString()}
                    </span>
                    <button
                      onClick={() => handleDelete(update.id, update.title)}
                      className="rounded-lg px-2 py-1 text-xs font-medium text-red-500 transition-colors hover:bg-red-50 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
