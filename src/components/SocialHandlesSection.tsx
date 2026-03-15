"use client";

import { motion } from "framer-motion";
import { Facebook, Instagram, Youtube, Phone, Clock, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import { SOCIAL } from "@/data/social";

export default function SocialHandlesSection() {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
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

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl bg-white shadow-refined border border-gray-100 p-4 md:p-6 flex flex-col gap-4"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FF0000]/10 text-[#FF0000]">
                    <Youtube className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1F4FD8]">
                      Featured YouTube Video
                    </span>
                    <span className="text-sm md:text-base font-semibold text-[#1A1A1A]">
                      Latest from our YouTube channel
                    </span>
                  </div>
                </div>
                <Link
                  href={SOCIAL.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden md:inline-flex items-center rounded-full bg-[#FF0000] px-4 py-1.5 text-[11px] font-semibold text-white shadow-sm hover:bg-[#e00000] transition-colors"
                >
                  Visit YouTube Channel
                </Link>
              </div>

              <p className="text-xs md:text-sm text-gray-600 max-w-xl">
                Talks, patient education videos and expert sessions to help you
                understand mental health and treatment better.
              </p>

              <div className="relative mt-2 w-full overflow-hidden rounded-2xl bg-black aspect-video">
                {SOCIAL.youtubeFeaturedVideoId ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${SOCIAL.youtubeFeaturedVideoId}`}
                    title="Prerna Hospital featured video"
                    className="h-full w-full"
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
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FF0000] shadow-lg transition-transform group-hover:scale-105">
                        <Youtube className="h-8 w-8" />
                      </div>
                      <p className="text-sm md:text-base font-semibold">Open our YouTube channel</p>
                      <span className="text-[11px] text-white/80">Click to view latest uploads</span>
                    </div>
                  </Link>
                )}
              </div>

              <div className="mt-2 md:hidden">
                <Link
                  href={SOCIAL.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-full bg-[#FF0000] px-4 py-1.5 text-[11px] font-semibold text-white shadow-sm hover:bg-[#e00000] transition-colors"
                >
                  Visit YouTube Channel
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col gap-4"
            >
              <div className="flex-1 rounded-3xl bg-white shadow-refined border border-gray-100 p-4 md:p-5 flex flex-col gap-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1877F2]/10 text-[#1877F2]">
                      <Facebook className="h-4 w-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-[#1A1A1A]">
                        Facebook
                      </span>
                      <span className="text-[11px] text-[#1F4FD8]">
                        Community stories and photos
                      </span>
                    </div>
                  </div>
                </div>

                {SOCIAL.facebookPage.includes("/share/") ? (
                  <Link
                    href={SOCIAL.facebookPage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-2 block rounded-2xl border border-gray-200 bg-gradient-to-br from-[#1877F2]/10 to-white p-5 hover:shadow-md transition-shadow"
                    aria-label="Open Facebook Page"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1877F2] text-white">
                        <Facebook className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#1A1A1A]">Open our Facebook page</p>
                        <p className="text-[11px] text-gray-600">Tap to view recent posts</p>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div className="mt-2 rounded-2xl border border-gray-200 bg-white p-0 overflow-hidden">
                    <div className="relative h-56 w-full">
                      <iframe
                        title="Facebook Page Plugin"
                        src={`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(
                          SOCIAL.facebookPage
                        )}&tabs=timeline&width=380&height=220&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true&lazy=1`}
                        width="100%"
                        height="100%"
                        style={{ border: "none", overflow: "hidden" } as any}
                        scrolling="no"
                        frameBorder="0"
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <Link
                    href={SOCIAL.facebookPage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[11px] font-semibold text-[#1F4FD8] hover:text-[#FFB703] transition-colors"
                  >
                    Visit Facebook
                    <span className="ml-1 text-xs">↗</span>
                  </Link>
                </div>
              </div>

              <div className="flex-1 rounded-3xl bg-white shadow-refined border border-gray-100 p-4 md:p-5 flex flex-col gap-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E1306C]/10 text-[#E1306C]">
                      <Instagram className="h-4 w-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-[#1A1A1A]">
                        Instagram
                      </span>
                      <span className="text-[11px] text-[#1F4FD8]">
                        Photo highlights from our campus
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-2 rounded-2xl border border-gray-200 bg-white p-0 overflow-hidden">
                  <div className="relative h-56 w-full">
                    <iframe
                      title="Instagram Profile"
                      src={`${SOCIAL.instagram.split("?")[0]}/embed`}
                      width="100%"
                      height="100%"
                      className="block"
                      scrolling="no"
                      frameBorder="0"
                    />
                  </div>
                </div>

                <p className="mt-2 text-[11px] text-gray-600">
                  Snapshots from our campus and awareness campaigns.
                </p>

                <div>
                  <Link
                    href={SOCIAL.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[11px] font-semibold text-[#1F4FD8] hover:text-[#FFB703] transition-colors"
                  >
                    Visit Instagram
                    <span className="ml-1 text-xs">↗</span>
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
