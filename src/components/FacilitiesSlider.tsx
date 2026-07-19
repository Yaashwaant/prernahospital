"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n";

export interface FacilitySlide {
  id?: string;
  src: string;
  label: string;
}

export const DEFAULT_FACILITY_SLIDES: FacilitySlide[] = [
  { src: "/IMG_2114.jpeg", label: "In-Patient Ward" },
  { src: "/IMG_2132.jpeg", label: "Doctor Consultation Room" },
  { src: "/IMG_2059.jpeg", label: "OPD Consultation" },
  { src: "/IMG_2099.jpeg", label: "Hospital Campus" },
  { src: "/IMG_2284.jpeg", label: "Artwork & Therapy Corridor" },
  { src: "/IMG_2053.jpeg", label: "Deluxe Room" },
  { src: "/IMG_2048.png", label: "Prerna Hospital Exterior" },
];

export function FacilitiesSlider() {
  const [slides, setSlides] = useState<FacilitySlide[]>(DEFAULT_FACILITY_SLIDES);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const { t } = useLanguage();

  // Fetch slides from Supabase via API; fall back to defaults if empty/error
  useEffect(() => {
    fetch("/api/facility-slides", { cache: "no-store" })
      .then((r) => r.json())
      .then((json) => {
        const data: FacilitySlide[] = Array.isArray(json.slides) ? json.slides : [];
        if (data.length > 0) setSlides(data);
      })
      .catch(() => { /* keep defaults */ });
  }, []);

  const total = slides.length;
  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total]);
  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 3500);
    return () => clearInterval(t);
  }, [paused, next]);

  return (
    <div
      className="mt-6 w-full md:max-w-[640px] md:mx-auto"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#1F4FD8]">
          {t("facilities.galleryTitle")}
        </p>
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous facility image"
            className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 bg-white text-[#1F4FD8] shadow-sm hover:bg-[#F4F7FB] transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next facility image"
            className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 bg-white text-[#1F4FD8] shadow-sm hover:bg-[#F4F7FB] transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="relative w-full overflow-hidden rounded-2xl bg-gray-100 shadow-inner aspect-video">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={slides[current]?.src ?? DEFAULT_FACILITY_SLIDES[0].src}
              alt={`${slides[current]?.label ?? "Hospital facility"} - Prerna Hospital, Chhatrapati Sambhajinagar`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
            {/* Label overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/55 to-transparent px-4 py-3">
              <p className="text-sm font-semibold text-white">
                {slides[current]?.label}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dot indicators */}
      <div className="mt-3 flex items-center justify-center gap-1.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === current
              ? "w-5 bg-[#1F4FD8]"
              : "w-1.5 bg-gray-300 hover:bg-gray-400"
              }`}
          />
        ))}
      </div>
    </div>
  );
}
