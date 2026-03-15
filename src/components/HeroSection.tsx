"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Hospital } from "lucide-react";

const IMAGES = [
  
  {
    src: "/IMG_2048.png",
    alt: "Prerna Hospital building"
  },
  
  {
    src: "/IMG_2059.jpeg",
    alt: "Doctor consultation room"
  },
  {
    src: "/IMG_2114.jpeg",
    alt: "In-patient ward with beds"
  },
  {
    src: "/IMG_2132.jpeg",
    alt: "Doctor counselling patient"
  },
  {
    src: "/IMG_2284.jpeg",
    alt: "Hospital corridor and artwork wall"
  }
];

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
          className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#1F4FD8]/90 via-[#1ECAD3]/90 to-[#1F4FD8]/90 px-5 py-8 shadow-refined transition-all duration-700 before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)] sm:rounded-[34px] sm:px-6 sm:py-12 md:rounded-[40px] md:px-16 md:py-24 md:shadow-deep"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
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
                className="mb-1 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                Welcome to Prerna Hospital
              </motion.h1>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-6 text-lg font-semibold leading-relaxed text-white/90 sm:text-xl md:text-2xl lg:text-3xl">
                Innovating Healthcare, Inspiring Wellness
              </motion.h2>

              <div className="mb-5 h-px w-16 rounded-full bg-white/55" />

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex max-w-md items-start gap-2 text-base leading-relaxed text-white/80 sm:text-lg md:text-xl"
              >
                <Hospital className="mt-1 h-5 w-5 shrink-0 text-[#FFB703]" />
                <span>
                  Our integrated approach continues to evolve for a healthier tomorrow
                </span>
              </motion.p>
            </motion.div>

            <div className="relative flex min-h-[280px] items-center justify-center sm:min-h-[320px] lg:justify-end">
              <div className="relative h-[270px] w-full max-w-[380px] sm:h-[300px] sm:max-w-[410px] md:h-[320px] md:max-w-[440px]">
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="absolute top-[22%] left-0 z-10 h-[96px] w-[132px] overflow-hidden rounded-[18px] border-[4px] border-white/40 bg-white/10 shadow-refined sm:h-[104px] sm:w-[144px] md:h-[112px] md:w-[156px]"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={(index + 0) % IMAGES.length}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6 }}
                      className="relative h-full w-full"
                    >
                      <Image
                        src={IMAGES[(index + 0) % IMAGES.length].src}
                        alt={IMAGES[(index + 0) % IMAGES.length].alt}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: -15, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="absolute left-1/2 top-0 z-20 h-[190px] w-[260px] -translate-x-1/2 overflow-hidden rounded-[22px] border-[8px] border-white bg-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] sm:h-[208px] sm:w-[284px] md:h-[220px] md:w-[300px]"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={(index + 1) % IMAGES.length}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.7 }}
                      className="relative h-full w-full"
                    >
                      <Image
                        src={IMAGES[(index + 1) % IMAGES.length].src}
                        alt={IMAGES[(index + 1) % IMAGES.length].alt}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="absolute top-[26%] right-0 z-10 h-[96px] w-[132px] overflow-hidden rounded-[18px] border-[4px] border-white/40 bg-white/10 shadow-refined sm:h-[104px] sm:w-[144px] md:h-[112px] md:w-[156px]"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={(index + 2) % IMAGES.length}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6 }}
                      className="relative h-full w-full"
                    >
                      <Image
                        src={IMAGES[(index + 2) % IMAGES.length].src}
                        alt={IMAGES[(index + 2) % IMAGES.length].alt}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}
