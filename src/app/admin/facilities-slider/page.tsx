"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Trash2, ArrowUp, ArrowDown, Plus } from "lucide-react";

interface FacilitySlide {
  id: string;
  src: string;
  label: string;
}

const DEFAULT_SLIDES: FacilitySlide[] = [
  { id: "default-1", src: "/IMG_2114.jpeg", label: "In-Patient Ward" },
  { id: "default-2", src: "/IMG_2132.jpeg", label: "Doctor Consultation Room" },
  { id: "default-3", src: "/IMG_2059.jpeg", label: "OPD Consultation" },
  { id: "default-4", src: "/IMG_2099.jpeg", label: "Hospital Campus" },
  { id: "default-5", src: "/IMG_2284.jpeg", label: "Artwork & Therapy Corridor" },
  { id: "default-6", src: "/IMG_2053.jpeg", label: "Deluxe Room" },
  { id: "default-7", src: "/IMG_2048.png", label: "Prerna Hospital Exterior" },
];

const LS_KEY = "prernaFacilitySlides";

export default function FacilitiesSliderAdmin() {
  const [slides, setSlides] = useState<FacilitySlide[]>([]);
  const [labelInput, setLabelInput] = useState("");
  const [uploading, setUploading] = useState(false);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [pendingFile, setPendingFile] = useState<File | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(LS_KEY);
    if (saved) {
      try {
        setSlides(JSON.parse(saved));
      } catch {
        setSlides([...DEFAULT_SLIDES]);
      }
    } else {
      setSlides([...DEFAULT_SLIDES]);
    }
  }, []);

  const save = (next: FacilitySlide[]) => {
    setSlides(next);
    localStorage.setItem(LS_KEY, JSON.stringify(next));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPendingFile(file);
    const reader = new FileReader();
    reader.onload = (evt) => setPreviewSrc(evt.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleAdd = async () => {
    if (!pendingFile && !previewSrc) {
      alert("Please select an image first.");
      return;
    }
    const label = labelInput.trim() || "Hospital Facility";
    setUploading(true);
    let src = previewSrc as string;

    if (pendingFile) {
      try {
        const fd = new FormData();
        fd.append("file", pendingFile);
        const res = await fetch("/api/updates/upload", { method: "POST", body: fd });
        const json = await res.json();
        if (res.ok && json.url) src = json.url;
      } catch {
        // keep base64 fallback
      }
    }

    const slide: FacilitySlide = { id: Date.now().toString(), src, label };
    save([...slides, slide]);
    setLabelInput("");
    setPreviewSrc(null);
    setPendingFile(null);
    setUploading(false);
  };

  const remove = (id: string) => {
    if (!confirm("Remove this slide?")) return;
    save(slides.filter((s) => s.id !== id));
  };

  const move = (index: number, dir: "up" | "down") => {
    const next = [...slides];
    const swap = dir === "up" ? index - 1 : index + 1;
    if (swap < 0 || swap >= next.length) return;
    [next[index], next[swap]] = [next[swap], next[index]];
    save(next);
  };

  const resetToDefaults = () => {
    if (!confirm("Reset to default images? This will remove your custom slides.")) return;
    save([...DEFAULT_SLIDES]);
  };

  return (
    <div>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A1A]">Facilities Slider</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage the photos shown in the Facility Gallery on the Our Facilities section.
          </p>
        </div>
        <button
          onClick={resetToDefaults}
          className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-500 shadow-sm transition hover:border-gray-300 hover:text-gray-700"
        >
          Reset to Defaults
        </button>
      </div>

      {/* Add new slide form */}
      <div className="mb-6 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-[#1A1A1A]">Add New Photo</h2>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="flex-1">
            <label htmlFor="fac-image" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
              Image *
            </label>
            <input
              type="file"
              id="fac-image"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-[#1F4FD8]"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="fac-label" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
              Label / Caption
            </label>
            <input
              type="text"
              id="fac-label"
              value={labelInput}
              onChange={(e) => setLabelInput(e.target.value)}
              placeholder="e.g. Deluxe Room, Ward, Reception"
              className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:border-transparent focus:ring-2 focus:ring-[#1F4FD8]"
            />
          </div>
          <button
            type="button"
            onClick={handleAdd}
            disabled={uploading || !previewSrc}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#1F4FD8] to-[#1ECAD3] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:shadow-md disabled:opacity-50"
          >
            <Plus className="h-4 w-4" />
            {uploading ? "Adding..." : "Add Photo"}
          </button>
        </div>

        {previewSrc && (
          <div className="mt-4">
            <p className="mb-1.5 text-xs font-semibold text-gray-500">Preview</p>
            <div className="relative aspect-video w-52 overflow-hidden rounded-xl border border-gray-200">
              <Image src={previewSrc} alt="preview" fill className="object-cover" />
            </div>
          </div>
        )}
      </div>

      {/* Slides list */}
      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-[#1A1A1A]">
          Current Photos ({slides.length})
        </h2>
        {slides.length === 0 ? (
          <p className="py-10 text-center text-sm text-gray-400">No photos yet. Add one above.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {slides.map((slide, i) => (
              <div
                key={slide.id}
                className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-[#F9FBFF] px-4 py-3"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1F4FD8]/10 text-xs font-bold text-[#1F4FD8]">
                  {i + 1}
                </span>
                <div className="relative h-14 w-24 shrink-0 overflow-hidden rounded-xl border border-gray-200">
                  <Image src={slide.src} alt={slide.label} fill className="object-cover" />
                </div>
                <p className="flex-1 truncate text-sm font-medium text-[#1A1A1A]">{slide.label}</p>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => move(i, "up")}
                    disabled={i === 0}
                    className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-[#1F4FD8] disabled:opacity-30"
                    aria-label="Move up"
                  >
                    <ArrowUp className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => move(i, "down")}
                    disabled={i === slides.length - 1}
                    className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-[#1F4FD8] disabled:opacity-30"
                    aria-label="Move down"
                  >
                    <ArrowDown className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => remove(slide.id)}
                    className="rounded-lg p-1.5 text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                    aria-label="Delete photo"
                  >
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
