"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { SOCIAL } from "@/data/social";

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
  return (
    <section className="py-10 md:py-16">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-6 md:space-y-8"
        >
          {/* ── Section heading ── */}
          <div className="text-center space-y-2">
            <span className="inline-flex rounded-full bg-[#E6F2FF] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1F4FD8]">
              Our Social Handles
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-[#1A1A1A]">
              Stay connected with Prerna Hospital
            </h3>
            <p className="text-xs md:text-sm text-gray-600 max-w-2xl mx-auto">
              Watch expert talks, follow our updates and explore life at Prerna
              Hospital across platforms.
            </p>
          </div>

          {/* ── Two-column layout (stacks on mobile) ── */}
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">

            {/* ── LEFT: YouTube card ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl bg-white shadow-refined border border-gray-100 p-4 md:p-6 flex flex-col gap-4"
            >
              {/* Card header */}
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full overflow-hidden">
                    <Image src="/Youtube_logo.avif" alt="YouTube" width={36} height={36} className="object-contain" unoptimized />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1F4FD8]">
                      Featured YouTube Video
                    </span>
                    <span className="text-sm md:text-base font-semibold text-[#1A1A1A] truncate">
                      Latest from our YouTube channel
                    </span>
                  </div>
                </div>
                <Link
                  href={SOCIAL.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center rounded-full bg-[#FF0000] px-4 py-1.5 text-[11px] font-semibold text-white shadow-sm hover:bg-[#e00000] transition-colors"
                >
                  Visit YouTube ↗
                </Link>
              </div>

              <p className="text-xs md:text-sm text-gray-600">
                Talks, patient education videos and expert sessions to help you
                understand mental health and treatment better.
              </p>

              {/* Featured video — fluid aspect-ratio box */}
              <div className="relative w-full overflow-hidden rounded-2xl bg-black aspect-video">
                {SOCIAL.youtubeFeaturedVideoId ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${SOCIAL.youtubeFeaturedVideoId}`}
                    title="Prerna Hospital featured video"
                    className="absolute inset-0 h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : SOCIAL.youtubeUploadsPlaylistId ? (
                  <iframe
                    src={`https://www.youtube.com/embed/videoseries?list=${SOCIAL.youtubeUploadsPlaylistId}`}
                    title="Prerna Hospital YouTube uploads"
                    className="absolute inset-0 h-full w-full"
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
                      <p className="text-sm md:text-base font-semibold">Open our YouTube channel</p>
                      <span className="text-[11px] text-white/80">Click to view latest uploads</span>
                    </div>
                  </Link>
                )}
              </div>

              {/* ── More Videos horizontal scroll strip ── */}
              <div className="space-y-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1F4FD8]">More Videos</p>
                <div className="flex gap-2.5 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-thin">
                  {MORE_VIDEOS.map((v) => (
                    <a
                      key={v.id}
                      href={`https://www.youtube.com/watch?v=${v.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      /* Responsive card width: smaller on mobile, bigger on md+ */
                      className="group relative flex-none w-[140px] sm:w-[155px] md:w-[165px] snap-start rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                      aria-label={v.title}
                    >
                      <div className="relative w-full aspect-video bg-gray-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`https://img.youtube.com/vi/${v.id}/mqdefault.jpg`}
                          alt={v.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FF0000] shadow-lg">
                            <svg viewBox="0 0 24 24" fill="white" className="h-3.5 w-3.5 ml-0.5">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white px-2 py-1.5">
                        <p className="text-[10px] font-medium text-[#1A1A1A] leading-tight line-clamp-2">{v.title}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* ── RIGHT: Facebook + Instagram (stacks on mobile too) ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1"
            >
              {/* Facebook card */}
              <div className="rounded-3xl bg-white shadow-refined border border-gray-100 p-4 md:p-5 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full overflow-hidden">
                    <Image src="/Facebook_logo.avif" alt="Facebook" width={32} height={32} className="object-contain" unoptimized />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-semibold text-[#1A1A1A]">Facebook</span>
                    <span className="text-[11px] text-[#1F4FD8] truncate">Community stories and photos</span>
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
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full overflow-hidden">
                        <Image src="/Facebook_logo.avif" alt="Facebook" width={40} height={40} className="object-contain" unoptimized />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#1A1A1A]">Open our Facebook page</p>
                        <p className="text-[11px] text-gray-600">Tap to view recent posts</p>
                      </div>
                    </div>
                  </Link>
                ) : (
                  /* Fluid iframe wrapper with proper min-height */
                  <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
                    <div className="relative w-full" style={{ paddingBottom: "56.25%", minHeight: "200px" }}>
                      <iframe
                        title="Facebook Page Plugin"
                        src={`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(
                          SOCIAL.facebookPage
                        )}&tabs=timeline&width=380&height=220&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true&lazy=1`}
                        className="absolute inset-0 w-full h-full"
                        style={{ border: "none", overflow: "hidden" } as React.CSSProperties}
                        scrolling="no"
                        frameBorder={0}
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      />
                    </div>
                  </div>
                )}

                <Link
                  href={SOCIAL.facebookPage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-[11px] font-semibold text-[#1F4FD8] hover:text-[#FFB703] transition-colors"
                >
                  Visit Facebook <span className="ml-1 text-xs">↗</span>
                </Link>
              </div>

              {/* Instagram card */}
              <div className="rounded-3xl bg-white shadow-refined border border-gray-100 p-4 md:p-5 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full overflow-hidden">
                    <Image src="/Instagram_logo.avif" alt="Instagram" width={32} height={32} className="object-contain" unoptimized />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-semibold text-[#1A1A1A]">Instagram</span>
                    <span className="text-[11px] text-[#1F4FD8] truncate">Photo highlights from our campus</span>
                  </div>
                </div>

                {/* Fluid Instagram embed */}
                <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
                  <div className="relative w-full" style={{ paddingBottom: "56.25%", minHeight: "200px" }}>
                    <iframe
                      title="Instagram Profile"
                      src={`${SOCIAL.instagram.split("?")[0]}/embed`}
                      className="absolute inset-0 w-full h-full block"
                      scrolling="no"
                      frameBorder={0}
                    />
                  </div>
                </div>

                <p className="text-[11px] text-gray-600">
                  Snapshots from our campus and awareness campaigns.
                </p>

                <Link
                  href={SOCIAL.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-[11px] font-semibold text-[#1F4FD8] hover:text-[#FFB703] transition-colors"
                >
                  Visit Instagram <span className="ml-1 text-xs">↗</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
