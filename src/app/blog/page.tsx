import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { BLOGS } from "@/data/blogs";
import { getDoctorBySlug } from "@/data/doctors";
import HospitalHeader from "@/components/HospitalHeader";
import HospitalFooter from "@/components/HospitalFooter";
import FloatingChatPrompt from "@/components/FloatingChatPrompt";

export const metadata: Metadata = {
  title: "Blog | Prerna Hospital",
  description: "Read the latest insights and expert guides on mental health, de-addiction, and wellness from the specialists at Prerna Hospital.",
  alternates: { canonical: "/blog" },
};

export default function BlogListingPage() {
  return (
    <main id="main-content" className="min-h-screen bg-[#F3F7FA]">
      <HospitalHeader />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#003D52] via-[#005A73] to-[#007C88] px-4 py-16 text-center text-white md:py-24">
        <div className="container mx-auto max-w-4xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#1ECAD3]">
            Mental Health Insights
          </p>
          <h1 className="text-3xl font-bold leading-tight tracking-tight md:text-5xl">
            Health & Wellness <span className="italic text-[#FFD166]">Insights</span>
          </h1>
          <p className="mt-5 text-base text-white/80 md:text-lg">
            Expert guides, clinical insights, and practical advice on navigating mental health, de-addiction, and holistic wellness.
          </p>
        </div>
      </section>

      {/* Blog Cards Grid */}
      <section className="container mx-auto px-4 py-16 md:px-8 md:py-24">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {BLOGS.map((blog) => {
            const author = getDoctorBySlug(blog.authorSlug);
            const date = new Date(blog.publishedAt).toLocaleDateString("en-IN", {
              month: "long",
              day: "numeric",
              year: "numeric",
            });

            return (
              <article
                key={blog.slug}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-lg hover:border-[#1F4FD8]/30"
              >
                <div className="relative h-56 w-full overflow-hidden bg-[#E9F4FF]">
                  <Image
                    src={blog.thumbnail}
                    alt={blog.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6 md:p-8">
                  <div className="mb-3 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#008489]">
                    <span>{date}</span>
                    <span className="text-gray-400">•</span>
                    <span>{blog.readingTime}</span>
                  </div>
                  <h2 className="mb-3 text-xl font-bold leading-tight text-[#003D52] group-hover:text-[#1F4FD8]">
                    <Link href={`/blog/${blog.slug}`} className="focus:outline-none">
                      <span className="absolute inset-0" aria-hidden="true" />
                      {blog.title}
                    </Link>
                  </h2>
                  <p className="mb-6 flex-1 text-sm text-gray-600 leading-relaxed line-clamp-3">
                    {blog.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between border-t border-gray-100 pt-5 mt-auto">
                    <div className="flex items-center gap-2">
                      <div className="relative h-8 w-8 overflow-hidden rounded-full border border-gray-200">
                        {author ? (
                          <Image src={author.image} alt={author.name} fill className="object-cover" />
                        ) : (
                          <div className="h-full w-full bg-gray-200" />
                        )}
                      </div>
                      <span className="text-xs font-semibold text-[#003D52]">
                        {author ? author.name : "Prerna Hospital"}
                      </span>
                    </div>
                    
                    <Link 
                      href={`/blog/${blog.slug}`}
                      className="relative z-10 inline-flex items-center justify-center rounded-full bg-[#1A202C] px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#1F4FD8] group-hover:bg-[#1F4FD8]"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <HospitalFooter />
      <FloatingChatPrompt />
    </main>
  );
}
