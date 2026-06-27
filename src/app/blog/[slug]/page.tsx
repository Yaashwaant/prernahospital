import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Phone, Calendar, Clock, MapPin, Share2 } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import type { Metadata } from "next";

import { BLOGS, getBlogBySlug } from "@/data/blogs";
import { getDoctorBySlug } from "@/data/doctors";
import HospitalHeader from "@/components/HospitalHeader";
import HospitalFooter from "@/components/HospitalFooter";
import FloatingChatPrompt from "@/components/FloatingChatPrompt";

const BASE_URL = "https://www.prernahospital.com";

interface BlogPostProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return BLOGS.map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);
  if (!blog) return {};

  const url = `${BASE_URL}/blog/${slug}`;

  return {
    title: blog.seo.title,
    description: blog.seo.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: blog.seo.title,
      description: blog.seo.description,
      images: [{ url: `${BASE_URL}${blog.thumbnail}`, alt: blog.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.seo.title,
      description: blog.seo.description,
      images: [`${BASE_URL}${blog.thumbnail}`],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostProps) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const author = getDoctorBySlug(blog.authorSlug);
  const dateStr = new Date(blog.publishedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.title,
    image: [`${BASE_URL}${blog.thumbnail}`],
    datePublished: blog.publishedAt,
    author: {
      "@type": "Person",
      name: author ? author.name : "Prerna Hospital",
      url: author ? `${BASE_URL}/doctors/${author.slug}` : BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Prerna Hospital LLP",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.svg`,
      },
    },
  };

  return (
    <main id="main-content" className="min-h-screen bg-white pb-16 font-sans selection:bg-teal-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <HospitalHeader />

      <article className="mx-auto max-w-[700px] px-5 pt-10 md:pt-16">
        
        {/* Title & Subtitle */}
        <h1 className="text-[32px] leading-[40px] md:text-[44px] md:leading-[52px] font-extrabold tracking-tight text-[#242424] mb-4 text-balance">
          {blog.title}
        </h1>
        <p className="text-[20px] md:text-[22px] text-[#6B6B6B] mb-8 leading-snug">
          {blog.excerpt}
        </p>

        {/* Author Block */}
        <div className="flex items-center justify-between py-6 mb-8 border-y border-gray-100">
          <div className="flex items-center gap-4">
            {author ? (
              <Link href={`/doctors/${author.slug}`} className="relative h-12 w-12 overflow-hidden rounded-full bg-gray-100 block shrink-0">
                <Image src={author.image} alt={author.name} fill className="object-cover" />
              </Link>
            ) : (
              <div className="relative h-12 w-12 overflow-hidden rounded-full bg-gray-200 shrink-0" />
            )}
            <div className="flex flex-col">
              <div className="text-[16px] font-medium text-[#242424]">
                {author ? (
                  <Link href={`/doctors/${author.slug}`} className="hover:underline hover:text-black">
                    {author.name}
                  </Link>
                ) : (
                  "Prerna Hospital"
                )}
              </div>
              <div className="text-[14px] text-[#6B6B6B] flex items-center gap-2">
                <span>{blog.readingTime}</span>
                <span>·</span>
                <span>{dateStr}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="text-gray-400 hover:text-gray-900 transition-colors" aria-label="Share article">
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Hero Image */}
        <figure className="mb-14 relative w-full overflow-hidden">
          <div className="relative aspect-[16/9] w-full rounded bg-gray-50">
            <Image
              src={blog.thumbnail}
              alt={blog.title}
              fill
              priority
              className="object-cover"
            />
          </div>
        </figure>

        {/* Content */}
        <div className="prose prose-lg max-w-none
          prose-p:font-serif prose-p:text-[20px] prose-p:leading-[32px] prose-p:text-[#242424] prose-p:mb-8
          prose-headings:font-sans prose-headings:font-bold prose-headings:text-[#242424] prose-headings:tracking-tight
          prose-h2:text-[24px] md:prose-h2:text-[26px] prose-h2:mt-14 prose-h2:mb-6
          prose-h3:text-[20px] md:prose-h3:text-[22px] prose-h3:mt-10 prose-h3:mb-4
          prose-a:text-[#1A8917] prose-a:underline hover:prose-a:text-[#115C0F]
          prose-blockquote:border-l-4 prose-blockquote:border-[#242424] prose-blockquote:pl-6 prose-blockquote:font-serif prose-blockquote:text-[22px] prose-blockquote:leading-[34px] prose-blockquote:italic prose-blockquote:text-[#6B6B6B] prose-blockquote:my-12
          prose-li:font-serif prose-li:text-[20px] prose-li:leading-[32px] prose-li:text-[#242424] prose-li:mb-2
          prose-ul:my-8
          prose-ol:my-8
          prose-strong:font-bold prose-strong:text-[#242424]
        ">
          
          {/* Subtle Top CTA */}
          <div className="not-prose mb-12 bg-[#F9F9F9] rounded-sm p-6 border-l-4 border-teal-500 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h4 className="font-sans font-bold text-[#242424] text-base mb-1">Expert psychiatric care is just a call away.</h4>
              <p className="font-sans text-[#6B6B6B] text-sm">Consult our specialists at Prerna Hospital, Chhatrapati Sambhajinagar.</p>
            </div>
            <div className="flex shrink-0 gap-3">
              <a href="tel:7887888865" className="inline-flex items-center gap-2 rounded-full bg-white border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:border-gray-400 hover:text-black transition">
                <Phone className="h-4 w-4" /> Call
              </a>
              <a href="https://wa.me/917887888865" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-medium text-white hover:bg-[#1EBE5D] transition">
                <FaWhatsapp className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          </div>

          <ReactMarkdown>{blog.content}</ReactMarkdown>

        </div>

        {/* Footer Tags & Bottom CTA */}
        <div className="mt-16 pt-8 border-t border-gray-100">
          <div className="bg-teal-900 rounded-xl p-8 text-center text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 opacity-10 pointer-events-none transform translate-x-4 -translate-y-4">
              <MapPin className="h-32 w-32" />
            </div>
            <h3 className="mb-3 text-2xl font-bold font-sans relative z-10">Start Your Journey to Wellness</h3>
            <p className="text-base text-white/80 mb-6 max-w-md mx-auto font-sans relative z-10">
              Our expert psychiatrists are here to help with private, judgement-free, and effective care.
            </p>
            <div className="flex flex-wrap justify-center gap-4 relative z-10">
              <a
                href="tel:7887888865"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-teal-900 hover:bg-teal-50 transition-colors"
              >
                <Phone className="h-4 w-4" />
                Book an Appointment
              </a>
            </div>
          </div>
        </div>

      </article>

      <div className="mt-20">
        <HospitalFooter />
      </div>
      <FloatingChatPrompt />
    </main>
  );
}
