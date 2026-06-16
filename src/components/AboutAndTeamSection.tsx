"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { DOCTORS } from "@/data/doctors";
import { useLanguage } from "@/lib/i18n";

interface FacilitySlide {
  id?: string;
  src: string;
  label: string;
}

const DEFAULT_FACILITY_SLIDES: FacilitySlide[] = [
  { src: "/IMG_2114.jpeg", label: "In-Patient Ward" },
  { src: "/IMG_2132.jpeg", label: "Doctor Consultation Room" },
  { src: "/IMG_2059.jpeg", label: "OPD Consultation" },
  { src: "/IMG_2099.jpeg", label: "Hospital Campus" },
  { src: "/IMG_2284.jpeg", label: "Artwork & Therapy Corridor" },
  { src: "/IMG_2053.jpeg", label: "Deluxe Room" },
  { src: "/IMG_2048.png", label: "Prerna Hospital Exterior" },
];

function FacilitiesSlider() {
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
              alt={slides[current]?.label ?? "Hospital facility"}
              fill
              className="object-cover"
              unoptimized
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

interface TeamMember {
  name: string;
  role: string;
  title?: string;
  specialty?: string;
  location?: string;
  image?: string;
}

const teamMembers: TeamMember[] = DOCTORS.map((doctor) => ({
  name: doctor.name,
  role: doctor.role,
  title: doctor.title,
  specialty: doctor.Specialities.join(" • "),
  image: doctor.image
}));

export default function AboutAndTeamSection() {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const { t } = useLanguage();

  const scroll = (direction: "left" | "right") => {
    if (!sliderRef.current) return;
    const offset = direction === "left" ? -280 : 280;
    sliderRef.current.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <section className="bg-gradient-to-b from-[#F4F7FB] to-[#E8F2F7] pt-8 pb-16" id="about">
      <div className="container mx-auto px-4 md:px-8 space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-6 rounded-3xl bg-white shadow-refined border border-gray-100 px-6 py-6 md:px-8 md:py-7 space-y-5"
        >
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <span className="inline-flex rounded-full bg-[#E6F2FF] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1F4FD8]">
                {t("facilities.badge")}
              </span>
              <h3 className="mt-2 text-lg md:text-xl font-bold text-[#1A1A1A]">
                {t("facilities.heading")}
              </h3>
              <p className="mt-1 text-xs md:text-sm text-gray-600 max-w-2xl">
                {t("facilities.subtitle")}
              </p>
            </div>
          </div>

          <div className="grid gap-4 text-xs md:text-sm text-[#25324B] md:grid-cols-3">
            <div className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-[#F9FBFF] px-4 py-4">
              <div className="relative h-10 w-10 flex-shrink-0">
                <Image
                  src="/24X7%20emergency%20admission.png"
                  alt="24x7 Emergency Admission icon"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#1A1A1A]">
                  {t("facilities.emergency.title")}
                </p>
                <p className="mt-1 text-xs text-gray-600">
                  {t("facilities.emergency.description")}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-[#F9FBFF] px-4 py-4">
              <div className="relative h-10 w-10 flex-shrink-0">
                <Image
                  src="/Greener%20city%20campus.png"
                  alt="Greener City Campus icon"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#1A1A1A]">
                  {t("facilities.campus.title")}
                </p>
                <p className="mt-1 text-xs text-gray-600">
                  {t("facilities.campus.description")}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-[#F9FBFF] px-4 py-4">
              <div className="relative h-10 w-10 flex-shrink-0">
                <Image
                  src="/Delux%20In-patient%20care.png"
                  alt="Deluxe In-Patient Care icon"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#1A1A1A]">
                  {t("facilities.deluxe.title")}
                </p>
                <p className="mt-1 text-xs text-gray-600">
                  {t("facilities.deluxe.description")}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-[#F9FBFF] px-4 py-4">
              <div className="relative h-10 w-10 flex-shrink-0">
                <Image
                  src="/expert%20opd%20acess.png"
                  alt="Expert OPD Access icon"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#1A1A1A]">
                  {t("facilities.opd.title")}
                </p>
                <p className="mt-1 text-xs text-gray-600">
                  {t("facilities.opd.description")}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-[#F9FBFF] px-4 py-4">
              <div className="relative h-10 w-10 flex-shrink-0">
                <Image
                  src="/Trained%20support%20staff.png"
                  alt="Trained Support Staff icon"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#1A1A1A]">
                  {t("facilities.staff.title")}
                </p>
                <p className="mt-1 text-xs text-gray-600">
                  {t("facilities.staff.description")}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-[#F9FBFF] px-4 py-4">
              <div className="relative h-10 w-10 flex-shrink-0">
                <Image
                  src="/Advanced%20diagnostics.png"
                  alt="Advanced Diagnostics icon"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#1A1A1A]">
                  {t("facilities.diagnostics.title")}
                </p>
                <p className="mt-1 text-xs text-gray-600">
                  {t("facilities.diagnostics.description")}
                </p>
              </div>
            </div>
          </div>
          <FacilitiesSlider />
        </motion.div>

        {/* ── Our Team Photo ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-[#1A1A1A]">{t("team.heading")}</h3>
            <p className="mt-1 text-xs md:text-sm text-gray-600">
              {t("team.subtitle")}
            </p>
          </div>

          {/* Team photo */}
          <div className="w-full overflow-hidden rounded-2xl shadow-sm border border-gray-100">
            <Image
              src="/Team Prerna Hospital.JPG"
              alt="Prerna Hospital Team"
              width={1920}
              height={1080}
              className="w-full h-auto"
              unoptimized
            />
          </div>
        </motion.div>

        <div className="space-y-6" id="team">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-[#1A1A1A]">
                {t("team.specialistHeading")}
              </h3>
              <p className="text-xs md:text-sm text-gray-600">
                {t("team.specialistSubtitle")}
              </p>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <button
                type="button"
                onClick={() => scroll("left")}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-[#1F4FD8] shadow-sm hover:bg-[#F4F7FB] transition-colors"
                aria-label="Previous team members"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-[#1F4FD8] shadow-sm hover:bg-[#F4F7FB] transition-colors"
                aria-label="Next team members"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="relative">
            <div
              ref={sliderRef}
              className="flex gap-6 overflow-x-auto pb-4"
            >
              {DOCTORS.map((doctor) => (
                <Link
                  key={doctor.slug}
                  href={`/doctors/${doctor.slug}`}
                  className="outline-none"
                >
                  <motion.div
                    className="flex w-[260px] sm:w-[280px] flex-shrink-0 flex-col rounded-3xl bg-white shadow-refined border border-gray-100 overflow-hidden h-[440px]"
                    whileHover={{
                      y: -6,
                      boxShadow: "0 16px 40px rgba(31,79,216,0.14)"
                    }}
                  >
                    <div className="relative w-full h-[260px] sm:h-[280px] md:h-[300px] bg-white">
                      {doctor.image ? (
                        <Image
                          src={doctor.image}
                          alt={doctor.name}
                          fill
                          className="object-cover object-top"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-4xl font-semibold text-[#1F4FD8]">
                          {doctor.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="px-6 py-5 text-center">
                      <p className="text-sm md:text-base font-semibold text-[#00A8B5]">
                        {doctor.name}
                      </p>
                      <p className="mt-1 text-xs md:text-sm font-medium text-[#003D52]">
                        {doctor.qualifications}
                      </p>
                      <p className="mt-1 text-sm text-[#25324B]">
                        {doctor.role}
                      </p>
                      {doctor.Specialities.length > 0 && (
                        <p className="mt-1 text-[11px] font-semibold tracking-[0.14em] text-[#1F4FD8] uppercase">
                          {doctor.Specialities.join(" • ")}
                        </p>
                      )}
                      <div className="mt-3">
                        <span className="inline-flex items-center rounded-full bg-[#003D52] px-3 py-1 text-[11px] font-semibold text-white shadow-sm hover:bg-[#1F4FD8] transition-colors">
                          {t("team.moreDetails")}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Import and use HospitalUpdatesSection after AboutAndTeamSection
export { default as HospitalUpdatesSection } from "./HospitalUpdatesSection";
