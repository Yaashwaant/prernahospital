"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function FloatingChatPrompt() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="fixed bottom-6 right-6 z-50"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative">
        <div className="absolute right-0 bottom-full mb-2">
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-none select-none"
          >
            <div className="rounded-2xl bg-white px-3.5 py-2 text-[12px] font-semibold text-[#003D52] shadow-refined whitespace-nowrap">
              Feeling unwell? <span className="text-[#1F4FD8]">Share with me!</span>
            </div>
          </motion.div>
        </div>

        <button
          type="button"
          aria-label="Open assistant"
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-deep ring-1 ring-gray-200 transition hover:shadow-[0_12px_30px_rgba(31,79,216,0.25)]"
        >
          <Image
            src="/Chatboticon%20Background%20Removed.png"
            alt="Assistant icon"
            width={40}
            height={40}
            className="object-contain transition-transform group-hover:scale-105"
            priority
          />
        </button>
      </div>
    </div>
  );
}
