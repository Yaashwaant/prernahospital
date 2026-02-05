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
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isHovered) {
        setIndex((prev) => (prev + 1) % IMAGES.length);
      }
    }, 4000);
    return () => clearInterval(timer);
  }, [isHovered]);

  return (
    <section className="relative w-full overflow-hidden px-4 pt-4 pb-10 md:px-8">
      <div className="container mx-auto">
        <div 
          className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-[#1F4FD8]/90 via-[#1ECAD3]/90 to-[#1F4FD8]/90 px-6 py-16 md:px-16 md:py-24 shadow-refined md:shadow-deep transition-all duration-700 before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            {/* Left Content Column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-start text-white">

                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="mb-3 text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight text-white">
                  Welcome to Prerna Hospital
                </motion.h1>
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="mb-2 text-xl md:text-2xl lg:text-3xl font-semibold text-white/90 leading-relaxed">
                  Innovating Healthcare, Inspiring Wellness
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="max-w-md text-lg md:text-xl leading-relaxed text-white/80">
                  Our integrated approach continues to evolve for a healthier tomorrow
                </motion.p>
            </motion.div>

            {/* Right Image Column - Tightened Layout */}
            <div className="relative flex min-h-[350px] items-center justify-center lg:justify-end">
              <div className="relative h-[350px] w-full max-w-[400px]">
                {/* Left Image (Horizontal) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="absolute left-0 top-[25%] z-10 h-[100px] w-[150px] overflow-hidden rounded-[20px] border-[5px] border-white/30 bg-[#F5F9FB]/10 backdrop-blur-sm shadow-refined md:h-[120px] md:w-[170px]">
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
                  initial={{ opacity: 0, y: -20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.7 }}
                  className="absolute left-[25%] top-0 z-20 h-[280px] w-[160px] overflow-hidden rounded-[28px] border-[6px] border-white/90 shadow-deep md:h-[320px] md:w-[190px]">
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
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="absolute right-0 top-[30%] z-10 h-[100px] w-[150px] overflow-hidden rounded-[20px] border-[5px] border-white/30 bg-[#F5F9FB]/10 backdrop-blur-sm shadow-refined md:h-[120px] md:w-[170px]">
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
                  className="absolute left-[12%] top-[15%] z-30 flex h-16 w-16 flex-col items-center justify-center rounded-full border-4 border-white bg-[#FFB703] text-center shadow-2xl">

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
                  className="absolute right-[12%] top-[10%] z-30 flex h-16 w-16 flex-col items-center justify-center rounded-full border-4 border-white bg-[#FFFFFF] text-center shadow-2xl">

                  <span className="text-xs font-black text-[#1F4FD8] leading-none">5M+</span>
                  <span className="mt-0.5 text-[7px] font-bold uppercase tracking-tighter text-[#1F4FD8]">
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
