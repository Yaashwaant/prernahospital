"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface Update {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
}

export default function HospitalUpdatesSection() {
  const [updates, setUpdates] = useState<Update[]>([]);
  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  const isDataUrl = (src: string) => src?.startsWith("data:");
  const DISPLAY_LIMIT = 8;

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/updates", { cache: "no-store" });
        const json = await res.json();
        const data = Array.isArray(json.updates) ? json.updates : [];
        setUpdates(data.slice(0, DISPLAY_LIMIT));
      } catch {
        const saved = localStorage.getItem("prernaUpdates");
        if (saved) {
          const all = JSON.parse(saved);
          setUpdates(all.slice(0, DISPLAY_LIMIT));
        }
      }
    };
    load();
  }, []);

  const hasUpdates = updates.length > 0;

  return (
    <section className="bg-gradient-to-b from-[#F4F7FB] to-[#E8F2F7] py-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h3 className="text-xl md:text-2xl font-bold text-[#1A1A1A]">
              Latest Updates
            </h3>
            <p className="text-sm md:text-base text-gray-600 mt-2">
              Stay informed about our latest developments and initiatives
            </p>
          </motion.div>

          {hasUpdates ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {updates.map((update) => (
                <motion.div
                  key={update.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="group bg-white rounded-2xl shadow-refined ring-1 ring-gray-100 overflow-hidden hover:shadow-lg hover:ring-[#1F4FD8]/20 transition-all"
                >
                  <div className="px-4 pt-4">
                    <div className="relative h-36 md:h-40 rounded-xl overflow-hidden bg-white ring-1 ring-gray-200">
                      {update.image ? (
                        isDataUrl(update.image) ? (
                          <img
                            src={update.image}
                            alt={update.title}
                            className="absolute inset-0 h-full w-full object-cover group-hover:scale-[1.03] transition-transform"
                          />
                        ) : (
                          <Image
                            src={update.image}
                            alt={update.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 400px"
                            className="object-cover group-hover:scale-[1.03] transition-transform"
                          />
                        )
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#EAF4FF] to-[#D6EEF7]">
                          <div className="flex items-center gap-3 text-[#003D52]/70">
                            <ImageIcon className="h-6 w-6" />
                            <span className="text-sm font-medium">
                              No image provided
                            </span>
                          </div>
                        </div>
                      )}
                      <div className="absolute top-2 right-2 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm ring-1 ring-gray-200">
                        <span className="text-[11px] font-semibold text-[#003D52]">
                          {update.date?.trim() ? formatDate(update.date) : "Date TBA"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 pb-4 pt-3">
                    <h4
                      className="text-sm md:text-base font-semibold text-[#003D52] group-hover:text-[#1F4FD8] transition-colors"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden"
                      }}
                    >
                      {update.title?.trim() ? update.title : "Hospital Update"}
                    </h4>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No updates available yet.</p>
              <p className="text-sm text-gray-400">
                Visit <a href="/admin/dashboard" className="text-[#1F4FD8] hover:underline">admin dashboard</a> to add updates.
              </p>
              <p className="text-xs text-gray-400 mt-2">
                Login: admin / admin@prerna2026
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
