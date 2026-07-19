import { DOCTORS, getDoctorBySlug } from "@/data/doctors";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { DoctorProfileHeader } from "@/components/doctors/DoctorProfileHeader";
import { DoctorTabs } from "@/components/doctors/DoctorTabs";

const BASE_URL = "https://www.prernahospital.com";

interface DoctorPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return DOCTORS.map((doctor) => ({ slug: doctor.slug }));
}

export async function generateMetadata(
  { params }: DoctorPageProps
): Promise<Metadata> {
  const { slug } = await params;
  const doctor = getDoctorBySlug(slug);
  if (!doctor) return {};

  const title = `${doctor.name} – ${doctor.role} | Prerna Hospital`;
  const description = `${doctor.name} is a ${doctor.role} at Prerna Hospital, Chhatrapati Sambhajinagar. Specialities: ${doctor.Specialities.slice(0, 2).join(", ")}. Book an appointment today.`.slice(0, 155);
  const url = `${BASE_URL}/doctors/${doctor.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "profile",
      url,
      title,
      description,
      images: [{ url: `${BASE_URL}${doctor.image}`, alt: doctor.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function DoctorPage({ params }: DoctorPageProps) {
  const { slug } = await params;
  const doctor = getDoctorBySlug(slug);

  if (!doctor) {
    notFound();
  }

  const physicianJsonLd = {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: doctor.name,
    jobTitle: `${doctor.role} in Chhatrapati Sambhajinagar (Aurangabad)`,
    description: doctor.overview[0] ?? `${doctor.name} is a ${doctor.role} at Prerna Hospital, Chhatrapati Sambhajinagar. Specialities: ${doctor.Specialities.slice(0, 2).join(", ")}.`,
    image: `${BASE_URL}${doctor.image}`,
    url: `${BASE_URL}/doctors/${doctor.slug}`,
    worksFor: {
      "@type": "Hospital",
      name: "Prerna Hospital LLP",
      alternateName: "Prerna Hospital Aurangabad",
      url: BASE_URL,
    },
    medicalSpecialty: doctor.Specialities,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Chhatrapati Sambhajinagar",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    telephone: "+91-7887888865",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "250",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: doctor.qualifications
    }
  };

  return (
    <main id="main-content" className="min-h-screen bg-[#F3F7FA] pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(physicianJsonLd) }}
      />
      <DoctorProfileHeader doctor={doctor} />
      <DoctorTabs doctor={doctor} />
    </main>
  );
}
