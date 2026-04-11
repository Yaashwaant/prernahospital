"use client";

import { MapPin, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

/**
 * Navigation menu items configuration
 * Extracted to separate constant for maintainability
 */
const NAV_ITEMS = [
  { id: "home", label: "Home", href: "/" },
  { id: "our-team", label: "Our Team", href: "#team" },
  { id: "contact", label: "Contact Us", href: "#contact" }
] as const;

const MobileQuickActions = () => {
  return (
    <div className="border-b border-gray-100 bg-[#F4F7FB] md:hidden">
      <div className="container mx-auto px-3 py-1.5">
        <div className="grid grid-cols-3 gap-1.5">
          <motion.a
            href="https://www.google.com/maps/dir/?api=1&destination=PRERNA%20HOSPITAL%20Inspiring%20Minds...."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1 rounded-full bg-gradient-to-r from-[#1ECAD3] to-[#1F4FD8] px-2 py-1.5 text-[10px] font-bold text-white shadow-[0_2px_8px_0_rgba(30,202,211,0.35)] transition-all"
            whileTap={{ scale: 0.95 }}
            aria-label="Directions"
          >
            <MapPin className="h-3 w-3" />
            Directions
          </motion.a>

          <motion.a
            href="tel:07887888865"
            className="flex items-center justify-center gap-1 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#1F4FD8] px-2 py-1.5 text-[10px] font-bold text-white shadow-[0_2px_8px_0_rgba(31,79,216,0.35)] transition-all"
            whileTap={{ scale: 0.95 }}
            aria-label="Call"
          >
            <Phone className="h-3 w-3" />
            Call
          </motion.a>

          <motion.a
            href="https://wa.me/917887888865?text=Hello%20Prerna%20Hospital"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1 rounded-full bg-gradient-to-r from-[#20CAD3] to-[#008489] px-2 py-1.5 text-[10px] font-bold text-white shadow-[0_2px_8px_0_rgba(0,132,137,0.35)] transition-all"
            whileTap={{ scale: 0.95 }}
            aria-label="WhatsApp"
          >
            <FaWhatsapp className="h-3.5 w-3.5" />
            WhatsApp
          </motion.a>
        </div>
      </div>
    </div>
  );
};

/**
 * Reusable logo component
 */
const HospitalLogo = ({ animated = false }: { animated?: boolean }) => {
  const component = (
    <div className="flex items-center gap-2">
      <div className="relative h-10 w-10 md:h-16 md:w-16">
        <Image
          src="/logo.svg"
          alt="Prerna Hospital logo"
          fill
          className="object-contain"
          priority
        />
      </div>
      <div className="flex flex-col">
        <span className="text-base font-bold leading-none tracking-tight text-[#1F4FD8] md:text-2xl">
          Prerna Hospital
        </span>
        <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-gray-500 md:text-sm">
          Inspiring Minds
        </span>
      </div>
    </div>
  );

  if (!animated) return component;

  return (
    <motion.div whileHover={{ scale: 1.02 }}>
      {component}
    </motion.div>
  );
};

/**
 * Navigation menu item component
 */
const NavItem = ({ item, isActive, layoutPrefix = "desktop" }: { item: typeof NAV_ITEMS[number]; isActive: boolean; layoutPrefix?: string }) => {
  return (
    <motion.li
      className={`flex w-full items-center justify-center gap-1 transition-colors md:w-auto md:justify-start ${
        isActive ? "text-[#FFB703]" : "text-[#1F4FD8] hover:text-[#FFB703]"
      }`}
      variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }}
    >
      <Link href={item.href} className="relative block w-full py-2 text-center md:w-auto md:text-left md:py-1">
        {item.label}
        {isActive && (
          <motion.div
            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#FFB703]"
            layoutId={`activeTab-${layoutPrefix}`}
            initial={false}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        )}
      </Link>
    </motion.li>
  );
};

/**
 * Main Header Content with Logo, Nav Items, and CTAs inline
 */
const MainHeaderContent = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.1 } }
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

      <motion.ul
        className="hidden items-center justify-center gap-x-4 gap-y-2 text-[11px] font-bold uppercase tracking-wider md:gap-8 lg:flex lg:flex-1 lg:justify-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {NAV_ITEMS.map((item) => (
          <NavItem key={item.id} item={item} isActive={item.id === "home"} layoutPrefix="desktop" />
        ))}
      </motion.ul>

      <motion.div
        className="hidden items-center gap-4 xl:flex lg:flex"
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.1 }}
      >
        <motion.a
          href="https://www.google.com/maps/dir/?api=1&destination=PRERNA%20HOSPITAL%20Inspiring%20Minds...."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#1ECAD3] to-[#1F4FD8] px-6 py-2.5 text-[13px] font-bold text-white shadow-[0_4px_14px_0_rgba(30,202,211,0.39)] transition-all"
          whileHover={{ scale: 1.05, boxShadow: "0 6px 20px rgba(30,202,211,0.6)" }}
          whileTap={{ scale: 0.95 }}
          aria-label="Directions to Prerna Hospital"
        >
          <MapPin className="h-4 w-4" />
          <span className="hidden xl:inline">Directions</span>
        </motion.a>

        <motion.a
          href="tel:07887888865"
          className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#1F4FD8] px-6 py-2.5 text-[13px] font-bold text-white shadow-[0_4px_14px_0_rgba(31,79,216,0.39)] transition-all"
          whileHover={{ scale: 1.05, boxShadow: "0 6px 20px rgba(31,79,216,0.6)" }}
          whileTap={{ scale: 0.95 }}
          aria-label="Call Prerna Hospital"
        >
          <Phone className="h-4 w-4" />
          <span className="hidden xl:inline">Call</span>
        </motion.a>

        <motion.a
          href="https://wa.me/917887888865?text=Hello%20Prerna%20Hospital"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#20CAD3] to-[#008489] px-6 py-2.5 text-[13px] font-bold text-white shadow-[0_4px_14px_0_rgba(0,132,137,0.39)] transition-all"
          whileHover={{ scale: 1.05, boxShadow: "0 6px 20px rgba(0,132,137,0.6)" }}
          whileTap={{ scale: 0.95 }}
          aria-label="Chat on WhatsApp"
        >
          <FaWhatsapp className="h-[18px] w-[18px]" />
          <span className="hidden xl:inline">WhatsApp</span>
        </motion.a>
      </motion.div>
    </motion.div>
  );
};

/**
 * Mobile Navigation Menu (Non-Sticky)
 */
const MobileNavContent = () => {
  return (
    <nav className="w-full bg-[#F4F7FB] border-t border-gray-100 lg:hidden px-4">
      <motion.ul
        className="container mx-auto grid w-full grid-cols-3 justify-items-center gap-x-1 gap-y-1 py-2 text-[11px] font-bold uppercase tracking-wider"
        initial="hidden"
        animate="visible"
      >
        {NAV_ITEMS.map((item) => (
          <NavItem key={item.id} item={item} isActive={item.id === "home"} layoutPrefix="mobile" />
        ))}
      </motion.ul>
    </nav>
  );
};

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
