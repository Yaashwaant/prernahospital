"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";


interface HeroSlide {
  id: string;
  src: string;
  alt: string;
}

const DEFAULT_SLIDES: HeroSlide[] = [
  { id: "d1", src: "/IMG_2059.jpeg", alt: "Doctor Consultation Room" },
  { id: "d2", src: "/IMG_2048.png", alt: "Prerna Hospital Building" },
  { id: "d3", src: "/IMG_2114.jpeg", alt: "In-Patient Ward" },
  { id: "d4", src: "/IMG_2132.jpeg", alt: "Doctor Counselling Patient" },
  { id: "d5", src: "/IMG_2284.jpeg", alt: "Hospital Corridor and Artwork Wall" },
];

export default function HeroSection() {
  const [slides, setSlides] = useState<HeroSlide[]>(DEFAULT_SLIDES);
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Fetch slides from Supabase (via API). Fall back to defaults if empty/error.
  useEffect(() => {
    fetch("/api/hero-slides", { cache: "no-store" })
      .then((r) => r.json())
      .then((json) => {
        const data: HeroSlide[] = Array.isArray(json.slides) ? json.slides : [];
        if (data.length > 0) setSlides(data);
      })
      .catch(() => {
        // silently fall back to defaults
      });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isHovered) {
        setIndex((prev) => (prev + 1) % slides.length);
      }
    }, 4000);
    return () => clearInterval(timer);
  }, [isHovered, slides.length]);

  return (
    <section className="relative w-full overflow-hidden px-3 pt-3 pb-3 mb-6 md:mb-8 md:px-6" style={{ height: 'calc(100vh - 72px)' }}>
      <div className="container mx-auto h-full">
        <div
          className="relative flex h-full overflow-hidden rounded-[24px] bg-gradient-to-br from-[#1F4FD8] via-[#1ECAD3] to-[#1F4FD8] px-6 pt-6 pb-4 shadow-2xl sm:rounded-[30px] sm:px-10 sm:pt-8 md:rounded-[36px] md:px-14 md:pt-10"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Subtle radial glow overlay */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.12)_0%,transparent_65%)]" />

          <div className="relative flex flex-col gap-4 w-full h-full">
            {/* Text Block — center-aligned */}
            <motion.div
              initial={{ opacity: 0, y: -18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: "easeOut" }}
              className="flex flex-col items-center text-center text-white w-full"
            >
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.1 }}
                className="mb-3 text-2xl font-semibold leading-[1.15] tracking-[-0.5px] text-white sm:text-3xl md:text-[2.25rem] lg:text-[2.75rem]"
              >
                Transforming Mental Illness to{" "}
                <span className="italic text-[#FFD166] font-semibold">Mental Wellness.</span>
              </motion.h1>

            </motion.div>

            {/* Single Large Image Card — centered */}
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
              className="relative mx-auto w-full flex-1 min-h-0 max-w-[620px] sm:max-w-[700px] md:max-w-[820px] flex flex-col"
            >
              <div className="relative flex-1 min-h-0 overflow-hidden rounded-[16px] border-[5px] border-white/90 bg-white/10 shadow-[0_20px_56px_rgba(0,0,0,0.35)] sm:rounded-[20px] md:rounded-[24px]">
                <div className="relative h-full w-full">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.65 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={slides[index]?.src ?? DEFAULT_SLIDES[0].src}
                        alt={slides[index]?.alt ?? "Hospital photo"}
                        fill
                        className="object-cover"
                        priority
                        unoptimized
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Dot indicators */}
              <div className="mt-3 flex items-center justify-center gap-1.5">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    aria-label={`Go to image ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${i === index
                      ? "w-5 bg-white"
                      : "w-1.5 bg-white/45 hover:bg-white/70"
                      }`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
