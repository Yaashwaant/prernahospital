import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

import { SERVICES_DATA } from "@/data/services";
import HospitalHeader from "@/components/HospitalHeader";
import HospitalFooter from "@/components/HospitalFooter";
import FloatingChatPrompt from "@/components/FloatingChatPrompt";

const BASE_URL = "https://www.prernahospital.com";

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return SERVICES_DATA.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata(
  { params }: ServicePageProps
): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES_DATA.find((s) => s.slug === slug);
  if (!service) return {};

  const url = `${BASE_URL}/services/${service.slug}`;

  return {
    title: service.seoTitle,
    description: service.seoDescription,
    keywords: service.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: service.seoTitle,
      description: service.seoDescription,
      images: [{ url: `${BASE_URL}${service.icon}`, alt: service.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: service.seoTitle,
      description: service.seoDescription,
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = SERVICES_DATA.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": ["WebPage", "MedicalSpecialty"],
    name: service.title,
    description: service.seoDescription,
    url: `${BASE_URL}/services/${service.slug}`,
    provider: {
      "@type": "Hospital",
      name: "Prerna Hospital LLP",
      alternateName: "Prerna Hospital Aurangabad",
      url: BASE_URL,
    }
  };

  return (
    <main id="main-content" className="min-h-screen bg-[#F3F7FA]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <HospitalHeader />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-[#003D52] via-[#005A73] to-[#007C88] pt-32 pb-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mb-6">
            <Link
              href="/#services"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur hover:bg-white/20 transition"
            >
              <ArrowLeft className="h-4 w-4" />
              All Services
            </Link>
          </div>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="flex-shrink-0 relative w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-white p-6 shadow-2xl flex items-center justify-center">
              <Image 
                src={service.icon} 
                alt={`${service.title} - Prerna Hospital`}
                fill
                className="object-contain p-4"
              />
            </div>
            <div className="text-center md:text-left text-white max-w-3xl">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">{service.title}</h1>
              <p className="text-lg md:text-xl text-white/90 font-medium">{service.shortDescription}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 md:px-8 py-16">
        <div className="max-w-4xl mx-auto bg-white rounded-[32px] shadow-refined border border-gray-100 p-8 md:p-12">
          <div className="prose prose-lg prose-blue max-w-none">
            {service.content.map((paragraph, index) => (
              <p key={index} className="text-gray-700 leading-relaxed mb-6 text-base md:text-lg">
                {paragraph}
              </p>
            ))}
          </div>
          
          <div className="mt-12 p-6 bg-[#F4F7FB] rounded-2xl border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">Need to Consult an Expert?</h3>
              <p className="text-sm text-gray-600">Book an appointment with our specialists in Chhatrapati Sambhajinagar.</p>
            </div>
            <a
              href="tel:07887888865"
              className="whitespace-nowrap inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#1F4FD8] to-[#1ECAD3] px-8 py-4 text-sm font-bold text-white shadow-lg transition-all hover:shadow-xl hover:scale-105"
            >
              Call 07887 888865
            </a>
          </div>
        </div>
      </div>

      <HospitalFooter />
      <FloatingChatPrompt />
    </main>
  );
}
