import type { Metadata } from "next";
import Link from "next/link";
import { DOCTORS } from "@/data/doctors";

export const metadata: Metadata = {
  title: "About Prerna Hospital – Our Mission & Doctors",
  description:
    "Prerna Hospital LLP in Chhatrapati Sambhajinagar offers expert neuropsychiatry, de-addiction & mental health care. Meet our specialist doctors.",
  alternates: { canonical: "/about" },
  openGraph: {
    url: "https://www.prernahospital.com/about",
    title: "About Prerna Hospital – Our Mission & Doctors",
    description:
      "Expert neuropsychiatry & mental health care in Chhatrapati Sambhajinagar. Meet our specialist doctors.",
  },
};

// Article-level structured data for E-E-A-T (author byline + datePublished)
const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Prerna Hospital LLP",
  url: "https://www.prernahospital.com/about",
  datePublished: "2024-01-01",
  dateModified: "2026-05-01",
  author: {
    "@type": "Organization",
    name: "Prerna Hospital LLP",
    url: "https://www.prernahospital.com",
  },
  publisher: {
    "@type": "Organization",
    name: "Prerna Hospital LLP",
    logo: { "@type": "ImageObject", url: "https://www.prernahospital.com/logo.svg" },
  },
  description:
    "Prerna Hospital LLP is a premier centre for neuropsychiatry, de-addiction, and mental health care in Chhatrapati Sambhajinagar, Maharashtra.",
};

export default function AboutPage() {
  return (
    <main id="main-content" className="min-h-screen bg-[#F3F7FA]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#003D52] via-[#005A73] to-[#1F4FD8] px-4 py-16 text-white md:py-24">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#1ECAD3]">
            About Us
          </p>
          <h1 className="text-3xl font-bold leading-tight md:text-5xl">
            Transforming Mental Illness to{" "}
            <span className="italic text-[#FFD166]">Mental Wellness</span>
          </h1>
          <p className="mt-5 text-base text-white/80 md:text-lg">
            Prerna Hospital LLP is a premier centre for neuropsychiatry,
            de-addiction, and mental health care in Chhatrapati Sambhajinagar,
            Maharashtra — founded on the belief that every mind deserves
            compassionate, expert care.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-4xl">
          <h2 className="mb-6 text-2xl font-bold text-[#003D52] md:text-3xl">
            Our Mission
          </h2>
          <p className="text-gray-700 leading-relaxed">
            At Prerna Hospital, we bridge the gap between clinical excellence
            and compassionate support. We are committed to delivering
            evidence-based psychiatric care, de-addiction treatment, and
            psychological therapy that empower individuals to lead healthier,
            fuller lives. We operate with a patient-first philosophy, ensuring
            that every treatment plan is tailored to the unique needs of each
            individual.
          </p>
          <p className="mt-4 text-gray-700 leading-relaxed">
            Mental health is not a luxury — it is a necessity. Our team of
            experienced psychiatrists, psychologists, and pathologists work in a
            multi-disciplinary environment to provide holistic care that
            addresses the mind, body, and social well-being of every patient.
            We serve patients across Marathwada and the broader Maharashtra
            region, offering both in-patient and out-patient services under one
            roof.
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-4xl">
          <h2 className="mb-6 text-2xl font-bold text-[#003D52] md:text-3xl">
            Why Prerna Hospital?
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {[
              {
                title: "Expert Medical Team",
                body: "Our doctors are trained at premier institutes across India and bring decades of combined experience in neuropsychiatry, addiction medicine, and clinical psychology.",
              },
              {
                title: "Patient-First Approach",
                body: "We believe in dignity, confidentiality, and individualized care. Every patient's journey is unique, and our team crafts personalised treatment plans accordingly.",
              },
              {
                title: "Holistic Recovery",
                body: "Beyond medication, we offer counselling, behavioural therapy, family education, and relapse prevention support for complete, long-term recovery.",
              },
              {
                title: "Accessible & Affordable Care",
                body: "Located in the heart of CIDCO, Chhatrapati Sambhajinagar, we are accessible to patients from across Marathwada with flexible appointment timings.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-[#1F4FD8]/20 bg-[#F4F7FB] p-5"
              >
                <h3 className="mb-2 font-bold text-[#003D52]">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-4xl">
          <h2 className="mb-8 text-2xl font-bold text-[#003D52] md:text-3xl">
            Our Services
          </h2>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              "Neuropsychiatry",
              "De-Addiction Services",
              "Child & Adolescent Psychiatry",
              "Sexual Medicine",
              "Psychological Therapy & Assessment",
              "Pathology & Lab Services",
              "Geriatric Mental Health",
            ].map((service) => (
              <li
                key={service}
                className="flex items-center gap-3 rounded-2xl border border-[#1F4FD8]/20 bg-white px-5 py-3 text-sm font-medium text-[#1F4FD8]"
              >
                <span className="h-2 w-2 rounded-full bg-[#1F4FD8]" />
                {service}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Team */}
      <section className="bg-white px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-4xl">
          <h2 className="mb-8 text-2xl font-bold text-[#003D52] md:text-3xl">
            Meet Our Doctors
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {DOCTORS.map((doctor) => (
              <Link
                key={doctor.slug}
                href={`/doctors/${doctor.slug}`}
                className="rounded-2xl border border-gray-100 bg-[#F4F7FB] p-5 shadow-sm transition hover:shadow-md hover:border-[#1F4FD8]/40"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-[#1ECAD3]">
                  {doctor.role}
                </p>
                <h3 className="mt-1 text-base font-bold text-[#003D52]">
                  {doctor.name}
                </h3>
                <p className="mt-1 text-xs text-gray-500">
                  {doctor.qualifications}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Back home */}
      <section className="px-4 pb-16 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-[#1F4FD8] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#003D52]"
        >
          ← Back to Home
        </Link>
      </section>
    </main>
  );
}
