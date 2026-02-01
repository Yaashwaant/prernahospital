"use client";

import { Search, Phone, Clock, Calendar, ChevronDown } from "lucide-react";
import Link from "next/link";

export default function HospitalHeader() {
  return (
    <header className="w-full bg-white font-sans">
      {/* Top Bar */}
      <div className="container mx-auto flex items-center justify-between px-4 py-3 md:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#008489]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-8 w-8"
            >
              <path d="M12 2v20M2 12h20M7 7l10 10M7 17l10-10" />
            </svg>
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold leading-none tracking-tight text-[#003D52]">
              PRERNA
            </h1>
            <h1 className="text-lg font-bold leading-none tracking-tight text-[#008489]">
              HOSPITAL
            </h1>
          </div>
        </div>

        <div className="hidden items-center gap-8 md:flex">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E6F3F3]">
              <Clock className="h-4 w-4 text-[#008489]" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-500">Open 24/7</span>
              <span className="text-xs font-semibold text-[#003D52]">88888 7777</span>
            </div>
          </div>
          
          <button className="flex items-center gap-2 rounded-full bg-[#008489] px-5 py-2 text-[12px] font-semibold text-white transition-colors hover:bg-[#006F73]">
            <Calendar className="h-3.5 w-3.5" />
            Book Appointment Now
          </button>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="border-t border-gray-100 bg-white shadow-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-3 md:px-8">
          <ul className="flex flex-wrap items-center gap-5 text-[11px] font-bold uppercase tracking-wider text-[#003D52]">
            <li className="text-[#008489]">
              <Link href="/">Home</Link>
            </li>
            <li className="flex items-center gap-1">
              <Link href="#">About Us</Link>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </li>
            <li className="flex items-center gap-1">
              <Link href="#">Specialities</Link>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </li>
            <li className="flex items-center gap-1">
              <Link href="#">Speciality Units</Link>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </li>
            <li className="flex items-center gap-1">
              <Link href="#">Doctors</Link>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </li>
            <li className="flex items-center gap-1">
              <Link href="#">Patient Info</Link>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </li>
            <li>
              <Link href="#">Contact Us</Link>
            </li>
            <li>
              <Link href="#">News</Link>
            </li>
          </ul>
          <div className="hidden md:block">
            <Search className="h-5 w-5 text-[#003D52]" />
          </div>
        </div>
      </nav>
    </header>
  );
}
