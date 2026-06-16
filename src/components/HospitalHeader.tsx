"use client";

import { MapPin, Phone, ChevronDown } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/lib/i18n";
import LanguageSwitcher from "@/components/LanguageSwitcher";

// ─── Nav config (translation keys mapped per item) ────────────────────────────
const NAV_ITEMS = [
  { id: "home",       tKey: "header.home",           href: "/" },
  { id: "facilities", tKey: "header.ourFacilities",   href: "/#about" },
  { id: "our-team",   tKey: "header.ourTeam",         href: "/#team" },
] as const;

const MORE_ITEMS = [
  { id: "contact-page", tKey: "header.contactUs",     href: "/contact" },
  { id: "updates",      tKey: "header.updates",       href: "/#updates" },
  { id: "privacy",      tKey: "header.privacyPolicy", href: "/privacy" },
] as const;

// ─── Mobile quick-action bar ───────────────────────────────────────────────────
const MobileQuickActions = () => {
  const { t } = useLanguage();
  return (
    <div className="border-b border-gray-100 bg-[#F4F7FB] md:hidden">
      <div className="container mx-auto px-3 py-1.5">
        <div className="grid grid-cols-3 gap-1.5">
          <motion.a
            href="https://www.google.com/maps/dir/?api=1&destination=PRERNA%20HOSPITAL%20Inspiring%20Minds...."
            target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-1 rounded-full bg-gradient-to-r from-[#1ECAD3] to-[#1F4FD8] px-2 py-1.5 text-[10px] font-bold text-white shadow-[0_2px_8px_0_rgba(30,202,211,0.35)]"
            whileTap={{ scale: 0.95 }} aria-label="Directions"
          >
            <MapPin className="h-3 w-3" /> {t("header.directions")}
          </motion.a>

          <motion.a
            href="tel:07887888865"
            className="flex items-center justify-center gap-1 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#1F4FD8] px-2 py-1.5 text-[10px] font-bold text-white shadow-[0_2px_8px_0_rgba(31,79,216,0.35)]"
            whileTap={{ scale: 0.95 }} aria-label="Call"
          >
            <Phone className="h-3 w-3" /> {t("header.call")}
          </motion.a>

          <motion.a
            href="https://wa.me/917887888865?text=Hello%20Prerna%20Hospital"
            target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-1 rounded-full bg-gradient-to-r from-[#20CAD3] to-[#008489] px-2 py-1.5 text-[10px] font-bold text-white shadow-[0_2px_8px_0_rgba(0,132,137,0.35)]"
            whileTap={{ scale: 0.95 }} aria-label="WhatsApp"
          >
            <FaWhatsapp className="h-3.5 w-3.5" /> {t("header.whatsapp")}
          </motion.a>
        </div>
      </div>
    </div>
  );
};

// ─── Logo ──────────────────────────────────────────────────────────────────────
const HospitalLogo = ({ animated = false }: { animated?: boolean }) => {
  const { t } = useLanguage();
  const component = (
    <div className="flex items-center gap-2">
      <div className="relative h-10 w-10 md:h-16 md:w-16">
        <Image src="/logo.svg" alt="Prerna Hospital logo - Chhatrapati Sambhajinagar" fill className="object-contain" priority />
      </div>
      <div className="flex flex-col">
        <span className="text-base font-bold leading-none tracking-tight text-[#1F4FD8] md:text-2xl">
          {t("header.hospitalName")}
        </span>
        <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-gray-500 md:text-sm">
          {t("header.tagline")}
        </span>
      </div>
    </div>
  );
  return animated ? <motion.div whileHover={{ scale: 1.02 }}>{component}</motion.div> : component;
};

// ─── Desktop "More" dropdown ───────────────────────────────────────────────────
const MoreDropdown = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 py-1 text-[11px] font-bold uppercase tracking-wider text-[#1F4FD8] hover:text-[#FFB703] transition-colors"
        aria-expanded={open}
      >
        {t("header.more")}
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="h-3.5 w-3.5" />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 top-full mt-2 z-50 min-w-[160px] overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg"
          >
            {MORE_ITEMS.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-2.5 text-[12px] font-semibold uppercase tracking-wider text-[#1F4FD8] hover:bg-[#F4F7FB] hover:text-[#FFB703] transition-colors"
              >
                {t(item.tKey)}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Desktop header row ────────────────────────────────────────────────────────
const MainHeaderContent = () => {
  const { t } = useLanguage();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto flex flex-col items-center justify-between gap-1 px-3 py-1.5 lg:flex-row md:px-8 lg:gap-4 lg:py-3"
    >
      <div className="flex w-full items-center justify-center lg:w-auto lg:justify-start">
        <HospitalLogo animated />
      </div>

      {/* Desktop nav links */}
      <motion.ul
        className="hidden items-center justify-center gap-x-4 gap-y-2 text-[11px] font-bold uppercase tracking-wider md:gap-8 lg:flex lg:flex-1 lg:justify-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {NAV_ITEMS.map((item) => (
          <motion.li
            key={item.id}
            className={`flex items-center transition-colors ${
              item.id === "home" ? "text-[#FFB703]" : "text-[#1F4FD8] hover:text-[#FFB703]"
            }`}
            variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }}
          >
            <Link href={item.href} className="relative block py-1">
              {t(item.tKey)}
              {item.id === "home" && (
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#FFB703]"
                  layoutId="activeTab-desktop"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </Link>
          </motion.li>
        ))}

        {/* More dropdown */}
        <motion.li
          variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }}
        >
          <MoreDropdown />
        </motion.li>
      </motion.ul>

      {/* Desktop CTA buttons + Language Switcher */}
      <motion.div
        className="hidden items-center gap-4 xl:flex lg:flex"
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.1 }}
      >
        <LanguageSwitcher />

        <motion.a
          href="https://www.google.com/maps/dir/?api=1&destination=PRERNA%20HOSPITAL%20Inspiring%20Minds...."
          target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#1ECAD3] to-[#1F4FD8] px-6 py-2.5 text-[13px] font-bold text-white shadow-[0_4px_14px_0_rgba(30,202,211,0.39)]"
          whileHover={{ scale: 1.05, boxShadow: "0 6px 20px rgba(30,202,211,0.6)" }}
          whileTap={{ scale: 0.95 }} aria-label="Directions to Prerna Hospital"
        >
          <MapPin className="h-4 w-4" />
          <span className="hidden xl:inline">{t("header.directions")}</span>
        </motion.a>

        <motion.a
          href="tel:07887888865"
          className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#1F4FD8] px-6 py-2.5 text-[13px] font-bold text-white shadow-[0_4px_14px_0_rgba(31,79,216,0.39)]"
          whileHover={{ scale: 1.05, boxShadow: "0 6px 20px rgba(31,79,216,0.6)" }}
          whileTap={{ scale: 0.95 }} aria-label="Call Prerna Hospital"
        >
          <Phone className="h-4 w-4" />
          <span className="hidden xl:inline">{t("header.call")}</span>
        </motion.a>

        <motion.a
          href="https://wa.me/917887888865?text=Hello%20Prerna%20Hospital"
          target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#20CAD3] to-[#008489] px-6 py-2.5 text-[13px] font-bold text-white shadow-[0_4px_14px_0_rgba(0,132,137,0.39)]"
          whileHover={{ scale: 1.05, boxShadow: "0 6px 20px rgba(0,132,137,0.6)" }}
          whileTap={{ scale: 0.95 }} aria-label="Chat on WhatsApp"
        >
          <FaWhatsapp className="h-[18px] w-[18px]" />
          <span className="hidden xl:inline">{t("header.whatsapp")}</span>
        </motion.a>
      </motion.div>
    </motion.div>
  );
};

// ─── Mobile nav bar ────────────────────────────────────────────────────────────
const MobileNavContent = () => {
  const [moreOpen, setMoreOpen] = useState(false);
  const { t } = useLanguage();
  const allItems = [...NAV_ITEMS];

  return (
    <nav className="w-full bg-[#F4F7FB] border-t border-gray-100 lg:hidden px-4">
      <div className="container mx-auto">
        {/* Main nav row — 5 items (nav + lang switcher) */}
        <ul className="grid w-full grid-cols-5 justify-items-center gap-x-1 py-2 text-[10px] font-bold uppercase tracking-wider">
          {allItems.map((item) => (
            <li key={item.id} className={`w-full text-center ${item.id === "home" ? "text-[#FFB703]" : "text-[#1F4FD8]"}`}>
              <Link href={item.href} className="block py-1.5">
                {t(item.tKey)}
              </Link>
            </li>
          ))}

          {/* "More" toggle */}
          <li className="w-full text-center text-[#1F4FD8]">
            <button
              onClick={() => setMoreOpen((v) => !v)}
              className="flex w-full items-center justify-center gap-0.5 py-1.5"
            >
              {t("header.more")}
              <motion.span animate={{ rotate: moreOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown className="h-3 w-3" />
              </motion.span>
            </button>
          </li>

          {/* Language Switcher in mobile nav */}
          <li className="w-full flex items-center justify-center">
            <LanguageSwitcher />
          </li>
        </ul>

        {/* Expandable "More" section */}
        <AnimatePresence>
          {moreOpen && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-t border-gray-100 grid grid-cols-2 gap-x-2 pb-2 pt-1 text-[10px] font-bold uppercase tracking-wider"
            >
              {MORE_ITEMS.map((item) => (
                <li key={item.id} className="text-center text-[#1F4FD8]">
                  <Link href={item.href} onClick={() => setMoreOpen(false)} className="block py-1.5">
                    {t(item.tKey)}
                  </Link>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

// ─── Root export ──────────────────────────────────────────────────────────────
export default function HospitalHeader() {
  return (
    <>
      <header className="w-full bg-[#F4F7FB]/95 font-sans shadow-sm backdrop-blur-md sticky top-0 z-50">
        <MobileQuickActions />
        <MainHeaderContent />
      </header>
      <MobileNavContent />
    </>
  );
}
