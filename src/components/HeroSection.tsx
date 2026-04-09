"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Hospital } from "lucide-react";

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

  // Load slides from localStorage (set by admin)
  useEffect(() => {
    const saved = localStorage.getItem("prernaHeroSlides");
    if (saved) {
      try {
        const parsed: HeroSlide[] = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSlides(parsed);
        }
      } catch {
        // keep defaults
      }
    }
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
    <section className="relative w-full overflow-hidden px-4 pt-4 pb-4 md:px-8">
      <div className="container mx-auto">
        <div
          className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#1F4FD8] via-[#1ECAD3] to-[#1F4FD8] px-6 pt-8 pb-8 shadow-2xl sm:rounded-[34px] sm:px-10 sm:pt-10 md:rounded-[40px] md:px-14 md:pt-12 md:pb-12"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Subtle radial glow overlay */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.12)_0%,transparent_65%)]" />

          <div className="relative flex flex-col gap-6 w-full">
            {/* Text Block — left-aligned */}
            <motion.div
              initial={{ opacity: 0, y: -18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: "easeOut" }}
              className="flex flex-col items-start text-left text-white max-w-3xl"
            >
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.1 }}
                className="mb-4 text-xl font-bold leading-tight tracking-tight text-white sm:text-xl md:text-2xl lg:text-2xl"
              >
                Transforming Mental Illness to Mental Wellness
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.25 }}
                className="flex flex-row items-start gap-2.5 text-sm leading-relaxed text-white/90 sm:text-base md:text-lg"
              >
                <Hospital className="mt-0.5 h-5 w-5 shrink-0 text-[#FFD166]" />
                <p>
                  Compassionate, evidence-based care across neuropsychiatry,
                  child &amp; adolescent guidance, and de-addiction—personalized
                  treatment in a safe, supportive setting. Open 24×7.
                </p>
              </motion.div>
            </motion.div>

            {/* Single Large Image Card — centered */}
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
              className="relative mx-auto w-full max-w-[520px] sm:max-w-[560px] md:max-w-[600px]"
            >
              <div className="relative overflow-hidden rounded-[20px] border-[6px] border-white/90 bg-white/10 shadow-[0_24px_64px_rgba(0,0,0,0.35)] sm:rounded-[24px] md:rounded-[28px]">
                <div className="relative h-[220px] w-full sm:h-[260px] md:h-[300px]">
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
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === index
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
