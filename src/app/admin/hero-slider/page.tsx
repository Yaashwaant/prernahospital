"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Trash2, ArrowUp, ArrowDown, Plus } from "lucide-react";

interface HeroSlide {
  id: string;
  src: string;
  alt: string;
  order_index: number;
}

export default function HeroSliderAdmin() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [altInput, setAltInput] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [pendingFile, setPendingFile] = useState<File | null>(null);

  const loadSlides = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/hero-slides", { cache: "no-store" });
      const json = await res.json();
      setSlides(Array.isArray(json.slides) ? json.slides : []);
    } catch {
      setError("Failed to load slides. Check your Supabase configuration.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadSlides(); }, [loadSlides]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPendingFile(file);
    const reader = new FileReader();
    reader.onload = (evt) => setPreviewSrc(evt.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleAdd = async () => {
    if (!pendingFile) { alert("Please select an image first."); return; }
    const label = altInput.trim() || "Hospital Photo";
    setUploading(true);
    try {
      // 1. Upload image to Supabase Storage
      const fd = new FormData();
      fd.append("file", pendingFile);
      const uploadRes = await fetch("/api/updates/upload?folder=hero", { method: "POST", body: fd });
      const uploadJson = await uploadRes.json();
      if (!uploadRes.ok) throw new Error(uploadJson.error || "Upload failed");

      // 2. Save slide record in DB
      const saveRes = await fetch("/api/hero-slides", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ src: uploadJson.url, alt: label }),
      });
      const saveJson = await saveRes.json();
      if (!saveRes.ok || !saveJson.ok) throw new Error(saveJson.error || "Failed to save slide");

      // 3. Refresh
      await loadSlides();
      setAltInput("");
      setPreviewSrc(null);
      setPendingFile(null);
      // Reset file input
      const input = document.getElementById("hero-image") as HTMLInputElement;
      if (input) input.value = "";
    } catch (e: any) {
      alert("Error: " + e.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this slide? The image will also be deleted from storage.")) return;
    try {
      const res = await fetch(`/api/hero-slides/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Delete failed");
      setSlides((prev) => prev.filter((s) => s.id !== id));
    } catch (e: any) {
      alert("Delete failed: " + e.message);
    }
  };

  const move = async (index: number, dir: "up" | "down") => {
    const next = [...slides];
    const swap = dir === "up" ? index - 1 : index + 1;
    if (swap < 0 || swap >= next.length) return;
    [next[index], next[swap]] = [next[swap], next[index]];
    setSlides(next); // optimistic
    // Persist new order
    setSaving(true);
    try {
      await fetch("/api/hero-slides", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: next.map((s) => s.id) }),
      });
    } catch {
      // If save fails, reload from server
      await loadSlides();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A1A]">Hero Slider</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage the images shown in the hero section slideshow on the homepage.
            {saving && <span className="ml-2 text-[#1F4FD8]">Saving order…</span>}
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-sm text-red-600">
          ⚠️ {error}
        </div>
      )}

      {/* Add new slide */}
      <div className="mb-6 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-[#1A1A1A]">Add New Slide</h2>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="flex-1">
            <label htmlFor="hero-image" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
              Image *
            </label>
            <input
              type="file" id="hero-image" accept="image/*"
              onChange={handleFileChange} disabled={uploading}
              className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-[#1F4FD8] disabled:opacity-50"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="hero-alt" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
              Caption / Label
            </label>
            <input
              type="text" id="hero-alt"
              value={altInput}
              onChange={(e) => setAltInput(e.target.value)}
              placeholder="e.g. Doctor Consultation Room"
              className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:border-transparent focus:ring-2 focus:ring-[#1F4FD8]"
            />
          </div>
          <button
            type="button" onClick={handleAdd}
            disabled={uploading || !previewSrc}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#1F4FD8] to-[#1ECAD3] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:shadow-md disabled:opacity-50"
          >
            <Plus className="h-4 w-4" />
            {uploading ? "Uploading…" : "Add Slide"}
          </button>
        </div>
        {previewSrc && (
          <div className="mt-4">
            <p className="mb-1.5 text-xs font-semibold text-gray-500">Preview</p>
            <div className="relative h-32 w-52 overflow-hidden rounded-xl border border-gray-200">
              <Image src={previewSrc} alt="preview" fill className="object-cover" unoptimized />
            </div>
          </div>
        )}
      </div>

      {/* Slides list */}
      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-[#1A1A1A]">
          Current Slides ({slides.length})
        </h2>
        {loading ? (
          <div className="flex h-32 items-center justify-center">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#1F4FD8] border-t-transparent" />
          </div>
        ) : slides.length === 0 ? (
          <p className="py-10 text-center text-sm text-gray-400">No slides yet. Add one above.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {slides.map((slide, i) => (
              <div key={slide.id} className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-[#F9FBFF] px-4 py-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1F4FD8]/10 text-xs font-bold text-[#1F4FD8]">
                  {i + 1}
                </span>
                <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-xl border border-gray-200">
                  <Image src={slide.src} alt={slide.alt} fill className="object-cover" unoptimized />
                </div>
                <p className="flex-1 truncate text-sm font-medium text-[#1A1A1A]">{slide.alt}</p>
                <div className="flex items-center gap-1">
                  <button onClick={() => move(i, "up")} disabled={i === 0} className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-[#1F4FD8] disabled:opacity-30" aria-label="Move up">
                    <ArrowUp className="h-4 w-4" />
                  </button>
                  <button onClick={() => move(i, "down")} disabled={i === slides.length - 1} className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-[#1F4FD8] disabled:opacity-30" aria-label="Move down">
                    <ArrowDown className="h-4 w-4" />
                  </button>
                  <button onClick={() => handleDelete(slide.id)} className="rounded-lg p-1.5 text-gray-400 transition hover:bg-red-50 hover:text-red-500" aria-label="Delete slide">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
