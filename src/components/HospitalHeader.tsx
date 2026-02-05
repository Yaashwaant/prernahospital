"use client";

import { Search, Clock, Calendar, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useToggle } from "@/hooks/useToggle";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { useMemo, useState } from "react";

/**
 * Navigation menu items configuration
 * Extracted to separate constant for maintainability
 */
const NAV_ITEMS = [
  { id: "home", label: "Home", href: "/" },
  { id: "about", label: "About Us", href: "#", hasDropdown: true },
  { id: "specialities", label: "Specialities", href: "#", hasDropdown: true },
  { id: "units", label: "Speciality Units", href: "#", hasDropdown: true },
  { id: "doctors", label: "Doctors", href: "#", hasDropdown: true },
  { id: "patient-info", label: "Patient Info", href: "#", hasDropdown: true },
  { id: "contact", label: "Contact Us", href: "#" },
  { id: "news", label: "News", href: "#" }
] as const;

/**
 * Reusable logo component
 */
const HospitalLogo = ({ animated = false }: { animated?: boolean }) => {
  const component = (
    <div className="flex items-center gap-2">
      <div className="relative h-12 w-12 md:w-14">
        <Image
          src="/logo.svg"
          alt="Prerna Hospital logo"
          fill
          className="object-contain"
          priority
        />
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-bold leading-none tracking-tight text-[#1F4FD8]">
          Prerna Hospital
        </span>
        <span className="text-xs font-medium uppercase tracking-[0.18em] text-gray-500">
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
const NavItem = ({ item, isActive }: { item: typeof NAV_ITEMS[number]; isActive: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.li
       className={`flex items-center gap-1 transition-colors ${
         isActive ? "text-[#FFB703]" : "text-[#1F4FD8] hover:text-[#FFB703]"
      }`}
      variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={item.href} className="relative">
        {item.label}
        {isActive && (
          <motion.div
             className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#FFB703]"
            layoutId="activeTab"
            initial={false}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        )}
      </Link>
      {("hasDropdown" in item && item.hasDropdown) && (
        <motion.div
          animate={{ rotate: isHovered ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-4 w-4 text-[#1F4FD8]" />
        </motion.div>
      )}
    </motion.li>
  );
};

/**
 * Top bar with contact info and CTA button
 */
const TopBar = () => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="container mx-auto flex items-center justify-between px-4 py-3 md:px-8"
  >
    <HospitalLogo animated />

    <motion.div
      className="hidden items-center gap-8 md:flex"
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.1 }}
    >
      {/* Contact Info */}
      <motion.div
        className="flex items-center gap-3"
        variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }}
      >
        <motion.div
          className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#1ECAD3] to-[#1F4FD8] shadow-refined"
          whileHover={{ scale: 1.1 }}
        >
          <Clock className="h-4 w-4 text-white" />
        </motion.div>
        <div className="flex flex-col">
          <span className="text-[10px] text-gray-500">Open 24/7</span>
          <span className="text-xs font-semibold text-[#1F4FD8]">88888 7777</span>
        </div>
      </motion.div>

      {/* Appointment Button */}
      <motion.button
        className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#EAF4FF] to-[#d0e4ff] px-5 py-2 text-[12px] font-bold text-[#1F4FD8] shadow-refined transition-all"
        whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(0, 132, 137, 0.3)" }}
        whileTap={{ scale: 0.95 }}
        aria-label="Book an appointment"
      >
        <Calendar className="h-3.5 w-3.5" />
        Book Appointment Now
      </motion.button>
    </motion.div>
  </motion.div>
);

/**
 * Navigation bar with menu items
 */
const NavigationBar = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  return (
    <nav className="border-t border-gray-100 bg-[#F4F7FB] shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-3 md:px-8">
        <motion.ul
          className="flex flex-wrap items-center gap-5 text-[11px] font-bold uppercase tracking-wider"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {NAV_ITEMS.map((item) => (
            <NavItem key={item.id} item={item} isActive={item.id === "home"} />
          ))}
        </motion.ul>

        {/* Search Icon */}
        <motion.div
          className="hidden md:block"
          whileHover={{ scale: 1.2 }}
          transition={{ type: "spring", stiffness: 300 }}
          role="button"
          tabIndex={0}
          aria-label="Search"
        >
          <Search className="h-5 w-5 text-[#1F4FD8]" />
        </motion.div>
      </div>
    </nav>
  );
};

export default function HospitalHeader() {
  return (
    <header className="w-full bg-[#F4F7FB] font-sans shadow-sm">
      <TopBar />
      <NavigationBar />
    </header>
  );
}
