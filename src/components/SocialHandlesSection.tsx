"use client";
import React from "react";

import { motion } from "framer-motion";
import { Phone, Clock, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SOCIAL } from "@/data/social";
import { useLanguage } from "@/lib/i18n";

const MORE_VIDEOS = [
  { id: "wdgzvHS_kVA", title: "स्किझोफ्रेनिया विषयी माहिती | Schizophrenia" },
  { id: "HIqW5WycPJQ", title: "डिप्रेशन विषयी माहिती | Depression" },
  { id: "k4y9ZKAVv4Q", title: "Bipolar Disorder – Dr Sadeq Qureshi" },
  { id: "pJJEJPB6UoM", title: "आटिज्म ने ग्रासलेला मेंदू – Dr Manik Bhise" },
  { id: "aF3Y90FL3Uk", title: "Suicide बद्दल बोलूया – Dr Ashish Mohide" },
  { id: "4RWgzRSfWlo", title: "नींद नहीं आती – Sleep Hygiene Tips" },
  { id: "11NzHvcs9vI", title: "बायपोलार आजार काय असतो?" },
  { id: "Ft_DV9HuhJQ", title: "व्यसनमुक्त समाज निर्माण करूयात" },
];

export default function SocialHandlesSection() {
  const { t } = useLanguage();
  return (
    <section className="py-12 md:py-16 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 max-w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div className="text-center space-y-2">
            <span className="inline-flex rounded-full bg-[#E6F2FF] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1F4FD8]">
              {t("social.badge")}
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-[#1A1A1A]">
              {t("social.heading")}
            </h2>
            <p className="text-xs md:text-sm text-gray-600 max-w-2xl mx-auto">
              {t("social.subtitle")}
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl bg-white shadow-refined border border-gray-100 p-4 md:p-6 flex flex-col gap-4 min-w-0 overflow-hidden"
            >
              <div className="flex items-center justify-between gap-3 min-w-0">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex-shrink-0 flex h-9 w-9 items-center justify-center rounded-full overflow-hidden">
                    <Image src="/Youtube_logo.avif" alt="YouTube" width={36} height={36} className="object-contain" unoptimized />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1F4FD8] truncate">
                      {t("social.youtube.featured")}
                    </span>
                    <span className="text-sm font-semibold text-[#1A1A1A] truncate">
                      {t("social.youtube.latest")}
                    </span>
                  </div>
                </div>
                <Link
                  href={SOCIAL.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden md:inline-flex flex-shrink-0 items-center rounded-full bg-[#FF0000] px-4 py-1.5 text-[11px] font-semibold text-white shadow-sm hover:bg-[#e00000] transition-colors"
                >
                  {t("social.youtube.visitChannel")}
                </Link>
              </div>

              <p className="text-xs text-gray-600 w-full break-words">
                {t("social.youtube.talks")}
              </p>

              <div className="relative mt-2 w-full max-w-full overflow-hidden rounded-2xl bg-black aspect-video">
                {SOCIAL.youtubeFeaturedVideoId ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${SOCIAL.youtubeFeaturedVideoId}`}
                    title="Prerna Hospital featured video"
                    className="absolute inset-0 h-full w-full"
                    width="560"
                    height="315"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : SOCIAL.youtubeUploadsPlaylistId ? (
                  <iframe
                    src={`https://www.youtube.com/embed/videoseries?list=${SOCIAL.youtubeUploadsPlaylistId}`}
                    title="Prerna Hospital YouTube uploads"
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <Link
                    href={SOCIAL.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block h-full w-full"
                    aria-label="Open YouTube Channel"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1F4FD8]/30 via-[#1ECAD3]/20 to-black/70" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full overflow-hidden shadow-lg transition-transform group-hover:scale-105">
                        <Image src="/Youtube_logo.avif" alt="YouTube" width={64} height={64} className="object-contain" unoptimized />
                      </div>
                      <p className="text-sm md:text-base font-semibold">{t("social.youtube.openChannel")}</p>
                      <span className="text-[11px] text-white/80">{t("social.youtube.clickToView")}</span>
                    </div>
                  </Link>
                )}
              </div>

              {/* ── More Videos strip ── */}
              <div className="mt-2 space-y-2 min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1F4FD8]">{t("social.youtube.moreVideos")}</p>
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin -mx-1 px-1">
                  {MORE_VIDEOS.map((v) => (
                    <a
                      key={v.id}
                      href={`https://www.youtube.com/watch?v=${v.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative flex-shrink-0 w-[140px] sm:w-[160px] rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                      aria-label={v.title}
                    >
                      {/* Thumbnail */}
                      <div className="relative w-full aspect-video bg-gray-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`https://img.youtube.com/vi/${v.id}/mqdefault.jpg`}
                          alt={v.title}
                          width={320}
                          height={180}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        {/* Play overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FF0000] shadow-lg">
                            <svg viewBox="0 0 24 24" fill="white" className="h-4 w-4 ml-0.5">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      {/* Title */}
                      <div className="bg-white px-2 py-2">
                        <p className="text-[10px] font-medium text-[#1A1A1A] leading-tight line-clamp-2">{v.title}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="mt-2 md:hidden">
                <Link
                  href={SOCIAL.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-full bg-[#FF0000] px-4 py-1.5 text-[11px] font-semibold text-white shadow-sm hover:bg-[#e00000] transition-colors"
                >
                  {t("social.youtube.visitChannel")}
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col gap-4 min-w-0"
            >
              {/* ── Facebook Card ── */}
              <div className="rounded-3xl bg-white shadow-refined border border-gray-100 p-4 md:p-5 flex flex-col gap-3 min-w-0 overflow-hidden">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full overflow-hidden flex-shrink-0">
                    <Image src="/Facebook_logo.avif" alt="Facebook" width={32} height={32} className="object-contain" unoptimized />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-semibold text-[#1A1A1A]">{t("social.facebook.title")}</span>
                    <span className="text-[11px] text-[#1F4FD8]">{t("social.facebook.subtitle")}</span>
                  </div>
                </div>

                {SOCIAL.facebookPage.includes("/share/") ? (
                  <Link
                    href={SOCIAL.facebookPage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block rounded-2xl border border-gray-200 bg-gradient-to-br from-[#1877F2]/10 to-white p-5 hover:shadow-md transition-shadow"
                    aria-label="Open Facebook Page"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full overflow-hidden">
                        <Image src="/Facebook_logo.avif" alt="Facebook" width={40} height={40} className="object-contain" unoptimized />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#1A1A1A]">{t("social.facebook.openPage")}</p>
                        <p className="text-[11px] text-gray-600">{t("social.facebook.tapToView")}</p>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div className="rounded-xl border border-gray-100 overflow-hidden">
                    <iframe
                      title="Facebook Page Plugin"
                      src={`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(
                        SOCIAL.facebookPage
                      )}&tabs=timeline&width=340&height=220&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false&lazy=1`}
                      width="100%"
                      height="220"
                      style={{ border: "none", overflow: "hidden", maxWidth: "100%", display: "block" } as any}
                      scrolling="no"
                      frameBorder="0"
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    />
                  </div>
                )}

                <Link
                  href={SOCIAL.facebookPage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-[11px] font-semibold text-[#1877F2] hover:text-[#1F4FD8] transition-colors"
                >
                  {t("social.facebook.visitFacebook")} <span className="ml-1">↗</span>
                </Link>
              </div>

              {/* ── Instagram Card ── */}
              <div className="rounded-3xl bg-white shadow-refined border border-gray-100 p-4 md:p-5 flex flex-col gap-3 min-w-0 overflow-hidden">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full overflow-hidden flex-shrink-0">
                    <Image src="/Instagram_logo.avif" alt="Instagram" width={32} height={32} className="object-contain" unoptimized />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-semibold text-[#1A1A1A]">{t("social.instagram.title")}</span>
                    <span className="text-[11px] text-[#1F4FD8]">{t("social.instagram.subtitle")}</span>
                  </div>
                </div>

                <div className="relative rounded-xl border border-gray-100 overflow-hidden">
                  <iframe
                    title="Instagram Profile"
                    src={`${SOCIAL.instagram.split("?")[0]}/embed`}
                    width="100%"
                    height="320"
                    className="block w-full"
                    style={{ overscrollBehavior: "contain" } as React.CSSProperties}
                    scrolling="yes"
                    frameBorder="0"
                    allow="clipboard-write; encrypted-media; picture-in-picture; web-share"
                  />
                  <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent" />
                </div>

                <div className="flex items-center justify-between gap-2">
                  <p className="text-[11px] text-gray-500">{t("social.instagram.scrollExplore")}</p>
                  <Link
                    href={SOCIAL.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] px-3.5 py-1.5 text-[11px] font-semibold text-white shadow-sm hover:opacity-90 transition-opacity"
                  >
                    {t("social.instagram.viewProfile")}
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
