"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const teamMembers = [
  {
    name: "Dr. Ananya Mehta",
    role: "Senior Neurologist",
    focus: "Brain & Spine Care"
  },
  {
    name: "Dr. Rohan Kapoor",
    role: "Neurosurgeon",
    focus: "Minimal Invasive Surgery"
  },
  {
    name: "Dr. Kavya Iyer",
    role: "Pediatric Neurologist",
    focus: "Child Neuro Care"
  },
  {
    name: "Dr. Arjun Sethi",
    role: "Consultant Psychiatrist",
    focus: "Mental Wellness"
  }
];

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
              Advanced brain and spine care with a human touch
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-2xl">
              Prerna Hospital brings together experienced neurologists, neurosurgeons and
              mental health specialists under one roof. With evidence-based protocols,
              modern technology and a deeply compassionate team, we focus on complete
              recovery and long-term wellness.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl bg-white p-6 shadow-refined border border-gray-100 flex flex-col gap-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#1F4FD8]">
                  Inspiring Minds
                </p>
                <p className="text-sm text-gray-500">
                  Neurology, neurosurgery and mental wellness
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center text-sm">
              <div className="rounded-xl bg-[#F4F7FB] px-4 py-3">
                <p className="text-xs text-gray-500">Years of Experience</p>
                <p className="text-xl font-bold text-[#1F4FD8]">20+</p>
              </div>
              <div className="rounded-xl bg-[#F4F7FB] px-4 py-3">
                <p className="text-xs text-gray-500">Specialist Doctors</p>
                <p className="text-xl font-bold text-[#1F4FD8]">30+</p>
              </div>
              <div className="rounded-xl bg-[#F4F7FB] px-4 py-3">
                <p className="text-xs text-gray-500">Patients Treated</p>
                <p className="text-xl font-bold text-[#1F4FD8]">50K+</p>
              </div>
              <div className="rounded-xl bg-[#F4F7FB] px-4 py-3">
                <p className="text-xs text-gray-500">Emergency Support</p>
                <p className="text-xl font-bold text-[#1F4FD8]">24/7</p>
              </div>
            </div>
          </motion.div>
        </div>

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
              {teamMembers.map((member) => (
                <motion.div
                  key={member.name}
                  className="min-w-[260px] sm:min-w-[320px] flex-shrink-0 rounded-3xl bg-white px-6 py-6 shadow-refined border border-gray-100"
                  whileHover={{
                    y: -4,
                    boxShadow: "0 14px 35px rgba(31,79,216,0.12)"
                  }}
                >
                  <div className="flex items-center gap-5">
                    <div className="flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#1F4FD8] to-[#1ECAD3] text-white text-xl font-semibold shadow-md">
                      {member.name.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm md:text-base font-semibold text-[#1A1A1A]">
                        {member.name}
                      </span>
                      <span className="text-xs md:text-sm font-medium text-[#1F4FD8]">
                        {member.role}
                      </span>
                    </div>
                  </div>
                  <p className="mt-4 text-xs md:text-sm text-gray-600">
                    {member.focus}
                  </p>
                </motion.div>
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
