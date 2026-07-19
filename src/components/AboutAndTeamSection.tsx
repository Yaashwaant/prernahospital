"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { DOCTORS } from "@/data/doctors";
import { useLanguage } from "@/lib/i18n";
import { FacilitiesSlider } from "./FacilitiesSlider";



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
              <h2 className="mt-2 text-lg md:text-xl font-bold text-[#1A1A1A]">
                {t("facilities.heading")}
              </h2>
              <p className="mt-1 text-xs md:text-sm text-gray-600 max-w-2xl">
                {t("facilities.subtitle")}
              </p>
            </div>
          </div>

          <div className="grid gap-4 text-xs md:text-sm text-[#25324B] md:grid-cols-3">
            <div className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-[#F9FBFF] px-4 py-4">
              <div className="relative h-10 w-10 flex-shrink-0">
                <Image
                  src="/24x7-emergency-admission.png"
                  alt="24x7 Emergency Admission icon - Prerna Hospital, Chhatrapati Sambhajinagar"
                  fill
                  sizes="40px"
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
                  src="/greener-city-campus.png"
                  alt="Greener City Campus icon - Prerna Hospital, Chhatrapati Sambhajinagar"
                  fill
                  sizes="40px"
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
                  src="/deluxe-inpatient-care.png"
                  alt="Deluxe In-Patient Care icon - Prerna Hospital, Chhatrapati Sambhajinagar"
                  fill
                  sizes="40px"
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
                  src="/expert-opd-access.png"
                  alt="Expert OPD Access icon - Prerna Hospital, Chhatrapati Sambhajinagar"
                  fill
                  sizes="40px"
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
                  src="/trained-support-staff.png"
                  alt="Trained Support Staff icon - Prerna Hospital, Chhatrapati Sambhajinagar"
                  fill
                  sizes="40px"
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
                  src="/advanced-diagnostics.png"
                  alt="Advanced Diagnostics icon - Prerna Hospital, Chhatrapati Sambhajinagar"
                  fill
                  sizes="40px"
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
            <h2 className="text-xl md:text-2xl font-bold text-[#1A1A1A]">{t("team.heading")}</h2>
            <p className="mt-1 text-xs md:text-sm text-gray-600">
              {t("team.subtitle")}
            </p>
          </div>

          {/* Team photo */}
          <div className="w-full overflow-hidden rounded-2xl shadow-sm border border-gray-100">
            <Image
              src="/team-prerna-hospital.jpg"
              alt="Prerna Hospital Specialist Team - Chhatrapati Sambhajinagar"
              width={1920}
              height={1080}
              className="w-full h-auto"
            />
          </div>
        </motion.div>

        <div className="space-y-6" id="team">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#1A1A1A]">
                {t("team.specialistHeading")}
              </h2>
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
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
