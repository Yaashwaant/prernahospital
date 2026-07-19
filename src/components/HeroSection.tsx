"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/i18n";

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
  const { t } = useLanguage();

  useEffect(() => {
    fetch("/api/hero-slides", { cache: "no-store" })
      .then((r) => r.json())
      .then((json) => {
        const data: HeroSlide[] = Array.isArray(json.slides) ? json.slides : [];
        if (data.length > 0) setSlides(data);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isHovered) setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isHovered, slides.length]);

  return (
    <section
      className="relative w-full overflow-hidden px-3 pt-3 pb-3 mb-4 md:mb-8 md:px-6 md:h-[calc(100vh-72px)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="container mx-auto h-full">
        <div className="relative flex h-full flex-col overflow-hidden rounded-[20px] bg-gradient-to-br from-[#1F4FD8] via-[#1ECAD3] to-[#1F4FD8] px-5 pt-5 pb-4 shadow-2xl sm:rounded-[28px] sm:px-8 sm:pt-7 md:rounded-[36px] md:px-14 md:pt-10">

          {/* Glow overlay */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.12)_0%,transparent_65%)]" />

          {/* Content wrapper */}
          <div className="relative flex flex-col gap-4 w-full h-full">

            {/* ── Heading ── left on mobile, center on desktop */}
            <motion.div
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="flex flex-col items-start text-left text-white w-full md:items-center md:text-center"
            >
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.05 }}
                className="text-[0.7rem] font-medium tracking-widest text-white/80 uppercase mb-1.5 md:text-xs md:mb-2 bg-white/10 px-3 py-1 rounded-full border border-white/20 backdrop-blur-sm shadow-sm"
              >
                {t("hero.seoSubtitle")}
              </motion.h2>
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-[1.35rem] font-semibold leading-snug tracking-[-0.3px] text-white sm:text-2xl md:text-[2.25rem] lg:text-[2.75rem] md:leading-[1.15] md:tracking-[-0.5px]"
              >
                {t("hero.titlePart1")}{" "}
                <span className="italic text-[#FFD166] font-semibold">{t("hero.titleHighlight")}</span>
              </motion.h1>
            </motion.div>

            {/* ── Image card ──
                Mobile:  full-width, fixed aspect-video height
                Desktop: centers with max-width, flex-1 fills remaining height
            */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
              className="relative w-full md:mx-auto md:flex-1 md:min-h-0 md:max-w-[820px] md:flex md:flex-col"
            >
              {/* Card frame */}
              <div className="relative overflow-hidden rounded-[14px] border-[4px] border-white/90 bg-white/10 shadow-[0_16px_48px_rgba(0,0,0,0.3)] sm:rounded-[18px] md:rounded-[22px] md:flex-1 md:min-h-0">
                {/* Mobile: aspect-video | Desktop: h-full (flex-1 parent) */}
                <div className="relative aspect-video w-full md:aspect-auto md:h-full">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={slides[index]?.src ?? DEFAULT_SLIDES[0].src}
                        alt={`${slides[index]?.alt ?? "Hospital photo"} - Prerna Hospital, Chhatrapati Sambhajinagar (Aurangabad)`}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Dot indicators */}
              <div className="mt-2.5 flex items-center justify-center gap-1.5 md:mt-3">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    aria-label={`Go to image ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === index ? "w-5 bg-white" : "w-1.5 bg-white/45 hover:bg-white/70"
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
