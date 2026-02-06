"use client";

import { MapPin, Phone, MessageCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

/**
 * Navigation menu items configuration
 * Extracted to separate constant for maintainability
 */
const NAV_ITEMS = [
  { id: "home", label: "Home", href: "/" },
  { id: "about", label: "About Us", href: "#about" },
  { id: "our-team", label: "Our Team", href: "#team" },
  { id: "contact", label: "Contact Us", href: "#contact" }
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
  return (
    <motion.li
      className={`flex items-center gap-1 transition-colors ${
        isActive ? "text-[#FFB703]" : "text-[#1F4FD8] hover:text-[#FFB703]"
      }`}
      variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }}
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
      className="hidden items-center gap-4 md:flex"
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.1 }}
    >
      <motion.a
        href="https://www.google.com/maps/dir/?api=1&destination=PRERNA%20HOSPITAL%20Inspiring%20Minds...."
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#1ECAD3] to-[#1F4FD8] px-5 py-2 text-[12px] font-bold text-white shadow-refined transition-all"
        whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(0, 132, 137, 0.3)" }}
        whileTap={{ scale: 0.95 }}
        aria-label="Directions to Prerna Hospital"
      >
        <MapPin className="h-3.5 w-3.5" />
        Directions
      </motion.a>

      <motion.a
        href="tel:07887888865"
        className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#EAF4FF] to-[#d0e4ff] px-5 py-2 text-[12px] font-bold text-[#1F4FD8] shadow-refined transition-all"
        whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(0, 132, 137, 0.3)" }}
        whileTap={{ scale: 0.95 }}
        aria-label="Call Prerna Hospital"
      >
        <Phone className="h-3.5 w-3.5" />
        Call
      </motion.a>

      <motion.a
        href="https://wa.me/917887888865?text=Hello%20Prerna%20Hospital"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#E9FBEF] to-[#D4F7E0] px-5 py-2 text-[12px] font-bold text-[#008489] shadow-refined transition-all"
        whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(0, 132, 137, 0.3)" }}
        whileTap={{ scale: 0.95 }}
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-3.5 w-3.5" />
        WhatsApp
      </motion.a>
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
      <div className="container mx-auto flex items-center justify-center px-4 py-3 md:px-8">
        <motion.ul
          className="flex flex-wrap items-center gap-10 text-[11px] font-bold uppercase tracking-wider"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {NAV_ITEMS.map((item) => (
            <NavItem key={item.id} item={item} isActive={item.id === "home"} />
          ))}
        </motion.ul>
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
