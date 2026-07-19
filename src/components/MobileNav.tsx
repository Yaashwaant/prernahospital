"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { NAV_ITEMS, MORE_ITEMS } from "./navConfig";

export function MobileNavContent() {
  const [moreOpen, setMoreOpen] = useState(false);
  const { t } = useLanguage();
  const allItems = [...NAV_ITEMS];

  return (
    <nav className="w-full bg-[#F4F7FB] border-t border-gray-100 lg:hidden px-4">
      <div className="container mx-auto">
        <ul className="grid w-full grid-cols-5 justify-items-center gap-x-1 py-2 text-[10px] font-bold uppercase tracking-wider">
          {allItems.map((item) => (
            <li key={item.id} className={`w-full text-center ${item.id === "home" ? "text-[#FFB703]" : "text-[#1F4FD8]"}`}>
              <Link href={item.href} className="block py-1.5">
                {t(item.tKey)}
              </Link>
            </li>
          ))}

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

          <li className="w-full flex items-center justify-center">
            <LanguageSwitcher />
          </li>
        </ul>

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
}
