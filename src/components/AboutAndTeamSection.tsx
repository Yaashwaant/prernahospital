"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { DOCTORS } from "@/data/doctors";

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
  specialty: doctor.specialties.join(" • "),
  image: doctor.image
}));

export default function AboutAndTeamSection() {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (!sliderRef.current) return;
    const offset = direction === "left" ? -280 : 280;
    sliderRef.current.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <section className="bg-gradient-to-b from-[#F4F7FB] to-[#E8F2F7] py-16" id="about">
      <div className="container mx-auto px-4 md:px-8 space-y-16">
        <div className="grid items-center gap-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <span className="inline-flex rounded-full bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#1F4FD8] shadow-sm">
              About Us
            </span>
            <h2 className="text-2xl md:text-3xl font-bold leading-snug text-[#1A1A1A]">
              About Prerana Hospital
            </h2>
            <p className="text-sm md:text-base font-semibold text-[#1F4FD8] leading-relaxed max-w-2xl">
              Inspiring Minds, Restoring Hope
            </p>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-2xl">
              At Prerana Hospital, we believe that mental wellness is the foundation of a
              fulfilling life. Our facility is dedicated to providing compassionate,
              evidence-based psychiatric care tailored to the unique needs of every
              individual. From advanced neuropsychiatry to specialized child guidance and
              de-addiction services, our multidisciplinary team works tirelessly to bridge
              the gap between clinical excellence and empathetic support.
            </p>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-2xl">
              We don’t just treat symptoms; we empower our patients to rediscover their
              potential and lead resilient lives. At Prerana, our mission is simple: to
              provide a safe haven for healing and to live up to our name by inspiring
              minds toward a brighter, healthier future.
            </p>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-2xl">
              We are here to listen and help, 24 hours a day, 7 days a week. Whether you
              are seeking a routine consultation or urgent support, our doors are always
              open.
            </p>
           
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl bg-white shadow-refined border border-gray-100 overflow-hidden"
          >
            <div className="relative w-full h-[260px] sm:h-[280px] md:h-[300px]">
              <Image
                src="/IMG_2058.png"
                alt="Prerana Hospital inspiring minds statistics card"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        </div>

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
                Our Facilities
              </span>
              <h3 className="mt-2 text-lg md:text-xl font-bold text-[#1A1A1A]">
                Comfortable, safe and comprehensive care environment
              </h3>
              <p className="mt-1 text-xs md:text-sm text-gray-600 max-w-2xl">
                From 24x7 emergency admission to specialised therapy and diagnostic services,
                Prerna Hospital is designed to support patients and families through every
                step of their mental health journey.
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
                  24x7 Emergency Admission
                </p>
                <p className="mt-1 text-xs text-gray-600">
                  Round-the-clock psychiatric support.
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
                  Greener City Campus
                </p>
                <p className="mt-1 text-xs text-gray-600">
                  Pleasant green open space within the heart of the city.
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
                  Deluxe In-Patient Care
                </p>
                <p className="mt-1 text-xs text-gray-600">
                  Spacious AC rooms with TV and Wi‑Fi.
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
                  Expert OPD Access
                </p>
                <p className="mt-1 text-xs text-gray-600">
                  9:00 AM to 9:00 PM OPD by consultant psychiatrists.
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
                  Trained Support Staff
                </p>
                <p className="mt-1 text-xs text-gray-600">
                  Dedicated nursing for continuous supervision.
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
                  Advanced Diagnostics
                </p>
                <p className="mt-1 text-xs text-gray-600">
                  EEG, Pulse ECT, ECG and complete pathology and lab services.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="space-y-6" id="team">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-[#1A1A1A]">
                Our Specialist Team
              </h3>
              <p className="text-xs md:text-sm text-gray-600">
                Meet the experts dedicated to your neurological and mental health.
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
                      <p className="mt-1 text-sm text-[#25324B]">
                        {doctor.role}
                      </p>
                      {doctor.specialties.length > 0 && (
                        <p className="mt-1 text-[11px] font-semibold tracking-[0.14em] text-[#1F4FD8] uppercase">
                          {doctor.specialties.join(" • ")}
                        </p>
                      )}
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
