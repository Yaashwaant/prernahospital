"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

const IMAGES = [
{
  src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800",
  alt: "Patients"
},
{
  src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
  alt: "Doctors"
},
{
  src: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=800",
  alt: "Medical Consultation"
}];


export default function HeroSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-white px-4 pt-4 md:px-8">
      <div className="container mx-auto">
        <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-r from-[#003D52] to-[#008489] px-6 py-16 md:px-16 md:py-24">
          <div className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            {/* Left Content Column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-start text-white">

                <h1 className="mb-4 text-2xl font-bold leading-tight md:text-4xl lg:text-5xl">
                Welcome to Prerna Hospital
              </h1>
              <h2 className="mb-6 text-xl font-medium text-white/90 md:text-3xl">
                Innovating Healthcare, Inspiring Wellness
              </h2>
              <p className="max-w-md text-base text-white/80">
                Our integrated approach continues to evolve for a healthier tomorrow
              </p>
            </motion.div>

            {/* Right Image Column - Tightened Layout */}
            <div className="relative flex min-h-[350px] items-center justify-center lg:justify-end">
              <div className="relative h-[350px] w-full max-w-[400px]">
                {/* Left Image (Horizontal) */}
                <motion.div
                  className="absolute left-0 top-[25%] z-10 h-[100px] w-[150px] overflow-hidden rounded-[20px] border-[5px] border-white/20 bg-white/10 backdrop-blur-sm shadow-xl md:h-[120px] md:w-[170px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={(index + 0) % IMAGES.length}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8 }}
                      className="relative h-full w-full">

                      <Image
                        src={IMAGES[(index + 0) % IMAGES.length].src}
                        alt={IMAGES[(index + 0) % IMAGES.length].alt}
                        fill
                        className="object-cover" />

                    </motion.div>
                  </AnimatePresence>
                </motion.div>

                {/* Center Image (Tall Vertical - "The Phone Frame") */}
                <motion.div
                  className="absolute left-[25%] top-0 z-20 h-[280px] w-[160px] overflow-hidden rounded-[28px] border-[6px] border-white shadow-2xl md:h-[320px] md:w-[190px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={(index + 1) % IMAGES.length}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8 }}
                      className="relative h-full w-full">

                      <Image
                        src={IMAGES[(index + 1) % IMAGES.length].src}
                        alt={IMAGES[(index + 1) % IMAGES.length].alt}
                        fill
                        className="object-cover" />

                    </motion.div>
                  </AnimatePresence>
                </motion.div>

                {/* Right Image (Horizontal) */}
                <motion.div
                  className="absolute right-0 top-[30%] z-10 h-[100px] w-[150px] overflow-hidden rounded-[20px] border-[5px] border-white/20 bg-white/10 backdrop-blur-sm shadow-xl md:h-[120px] md:w-[170px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={(index + 2) % IMAGES.length}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8 }}
                      className="relative h-full w-full">

                      <Image
                        src={IMAGES[(index + 2) % IMAGES.length].src}
                        alt={IMAGES[(index + 2) % IMAGES.length].alt}
                        fill
                        className="object-cover" />

                    </motion.div>
                  </AnimatePresence>
                </motion.div>

                {/* Badge 1: 15+ Years (Overlaps Left/Center) */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
                  className="absolute left-[12%] top-[15%] z-30 flex h-16 w-16 flex-col items-center justify-center rounded-full border-4 border-white bg-[#008489] text-center shadow-2xl">

                  <span className="text-lg font-bold text-white leading-none">15+</span>
                  <span className="mt-0.5 text-[7px] font-bold uppercase tracking-tighter text-white/90">
                    Years of<br />Trust
                  </span>
                </motion.div>

                {/* Badge 2: 5 Million+ (Overlaps Center/Right) */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.7, type: "spring", stiffness: 260, damping: 20 }}
                  className="absolute right-[12%] top-[10%] z-30 flex h-16 w-16 flex-col items-center justify-center rounded-full border-4 border-white bg-white text-center shadow-2xl">

                  <span className="text-xs font-black text-[#003D52] leading-none">5M+</span>
                  <span className="mt-0.5 text-[7px] font-bold uppercase tracking-tighter text-[#003D52]">
                    Lives<br />Impacted
                  </span>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}