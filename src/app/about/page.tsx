import type { Metadata } from "next";
import Link from "next/link";
import { DOCTORS } from "@/data/doctors";

export const metadata: Metadata = {
  title: "About Prerna Hospital | Top Psychiatrists in Sambhaji Nagar",
  description:
    "Prerna Hospital in Chhatrapati Sambhajinagar offers expert neuropsychiatry & de-addiction care. Book a consultation today.",
  alternates: { canonical: "/about" },
  openGraph: {
    url: "https://www.prernahospital.com/about",
    title: "About Prerna Hospital | Top Psychiatrists in Sambhaji Nagar",
    description:
      "Prerna Hospital in Chhatrapati Sambhajinagar offers expert neuropsychiatry & de-addiction care. Book a consultation today.",
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
          <p className="text-gray-700 leading-relaxed text-base md:text-lg">
            At Prerna Hospital, our mission is simple: we want to help you feel better. We know that dealing with mental health issues or addiction can be hard. That is why we offer a safe, welcoming place for treatment. We use proven medical treatments to help you overcome these challenges so you can live a happy and healthy life. We always put our patients first. This means we listen to you and create a treatment plan that is made just for you.
          </p>
          <p className="mt-4 text-gray-700 leading-relaxed text-base md:text-lg">
            Mental health care is a basic need, not a luxury. Our team includes expert psychiatrists, psychologists, and lab technicians. We all work together to care for your mind and body at the same time. We are proud to help patients from all over the Marathwada region. Whether you need to stay at the hospital or just visit for a quick appointment, we have everything you need right here under one roof.
          </p>
        </div>
      </section>

      {/* Our History */}
      <section className="bg-[#E8F2F7] px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-4xl">
          <h2 className="mb-6 text-2xl font-bold text-[#003D52] md:text-3xl">
            Our History and Commitment
          </h2>
          <p className="text-gray-700 leading-relaxed text-base md:text-lg">
            Prerna Hospital started with a clear goal: to bring the best mental health care to Chhatrapati Sambhajinagar (Aurangabad). For many years, patients in our region had to travel very far to get specialized psychiatric help. We built Prerna Hospital so that top-quality care is available right close to home. 
          </p>
          <p className="mt-4 text-gray-700 leading-relaxed text-base md:text-lg">
            Our modern building is designed to make you feel calm and safe. From our bright, clean rooms to our friendly staff, every detail is made with your comfort in mind. We are very proud to serve our community. We promise to keep improving our services every day to give you the best care possible.
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
                body: "Our doctors are highly trained and have years of experience treating mental health conditions and addiction.",
              },
              {
                title: "Patient-First Approach",
                body: "We treat everyone with respect and keep your information completely private. Your treatment is built around your specific needs.",
              },
              {
                title: "Complete Recovery",
                body: "We do not just give medicine. We offer talking therapies, family support, and plans to help you stay healthy for the long term.",
              },
              {
                title: "Easy to Reach",
                body: "Located right in CIDCO, Chhatrapati Sambhajinagar, our hospital is easy to reach. We also offer flexible appointment times.",
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
