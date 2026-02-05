"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Update {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
}

export default function UpdatesSection() {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [updates, setUpdates] = useState<Update[]>([]);

  useEffect(() => {
    // Load updates from localStorage
    const savedUpdates = localStorage.getItem("prernaUpdates");
    if (savedUpdates) {
      const allUpdates = JSON.parse(savedUpdates);
      // Show only the 5 most recent updates
      setUpdates(allUpdates.slice(0, 5));
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!sliderRef.current) return;
    const offset = direction === "left" ? -340 : 340;
    sliderRef.current.scrollBy({ left: offset, behavior: "smooth" });
  };

  if (updates.length === 0) {
    return null; // Don't render if no updates
  }

  return (
    <section className="bg-gradient-to-b from-[#F4F7FB] to-[#E8F2F7] py-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-[#1A1A1A]">
                Latest Updates
              </h3>
              <p className="text-xs md:text-sm text-gray-600">
                Stay informed about our latest developments and initiatives.
              </p>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <button
                type="button"
                onClick={() => scroll("left")}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-[#1F4FD8] shadow-sm hover:bg-[#F4F7FB] transition-colors"
                aria-label="Previous updates"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-[#1F4FD8] shadow-sm hover:bg-[#F4F7FB] transition-colors"
                aria-label="Next updates"
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
              {updates.map((update) => (
                <motion.div
                  key={update.id}
                  className="min-w-[320px] sm:min-w-[340px] flex-shrink-0 rounded-3xl bg-white overflow-hidden shadow-refined border border-gray-100"
                  whileHover={{
                    y: -4,
                    boxShadow: "0 14px 35px rgba(31,79,216,0.12)"
                  }}
                >
                  <div className="relative h-48 w-full">
                    <Image
                      src={update.image}
                      alt={update.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#1F4FD8]">
                        News
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(update.date).toLocaleDateString()}
                      </span>
                    </div>
                    <h4 className="text-base font-semibold text-[#1A1A1A] mb-2">
                      {update.title}
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {update.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}