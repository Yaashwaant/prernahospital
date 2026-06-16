"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useLanguage, type Locale } from "@/lib/i18n";

const LANGUAGE_OPTIONS: { code: Locale; short: string; label: string }[] = [
  { code: "en", short: "En", label: "English" },
  { code: "hi", short: "हि", label: "हिन्दी" },
  { code: "mr", short: "म", label: "मराठी" },
];

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const current = LANGUAGE_OPTIONS.find((l) => l.code === locale)!;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-full border border-[#1F4FD8]/30 bg-white px-3 py-1.5 text-[12px] font-bold text-[#1F4FD8] shadow-sm transition-all hover:border-[#1F4FD8] hover:shadow-md"
        aria-expanded={open}
        aria-label="Select language"
      >
        <div className="relative h-6 w-6 overflow-hidden rounded-full border border-gray-100 flex-shrink-0">
          <Image
            src="/langauge-svg.svg"
            alt="Language selector"
            fill
            className="object-cover"
          />
        </div>
        <span className="min-w-[18px] text-center">{current.short}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-3.5 w-3.5" />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-1.5 z-50 min-w-[130px] overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg"
          >
            {LANGUAGE_OPTIONS.map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => {
                  setLocale(lang.code);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2.5 px-3.5 py-2.5 text-[12px] font-semibold transition-colors ${
                  lang.code === locale
                    ? "bg-[#EAF1FF] text-[#1F4FD8]"
                    : "text-[#25324B] hover:bg-[#F4F7FB] hover:text-[#1F4FD8]"
                }`}
              >
                <span className="min-w-[20px] text-center text-[13px]">
                  {lang.short}
                </span>
                <span>{lang.label}</span>
                {lang.code === locale && (
                  <span className="ml-auto text-[10px] text-[#1F4FD8]">✓</span>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
