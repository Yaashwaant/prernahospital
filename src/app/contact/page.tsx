import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Prerna Hospital | Book a Psychiatrist Consultation",
  description:
    "Contact Prerna Hospital in Chhatrapati Sambhajinagar. Call +91-7887888865 to book your psychiatric or de-addiction appointment today.",
  alternates: { canonical: "/contact" },
  openGraph: {
    url: "https://www.prernahospital.com/contact",
    title: "Contact Prerna Hospital | Book a Psychiatrist Consultation",
    description:
      "Contact Prerna Hospital in Chhatrapati Sambhajinagar. Call +91-7887888865 to book your psychiatric or de-addiction appointment today.",
  },
};

const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Prerna Hospital LLP",
  url: "https://www.prernahospital.com/contact",
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
};

export default function ContactPage() {
  return (
    <main id="main-content" className="min-h-screen bg-[#F3F7FA]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#003D52] via-[#005A73] to-[#1F4FD8] px-4 py-16 text-white md:py-24">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#1ECAD3]">
            Get in Touch
          </p>
          <h1 className="text-3xl font-bold md:text-5xl">Contact Us</h1>
          <p className="mt-4 text-base text-white/80 md:text-lg">
            We are here to help. Reach out to book an appointment or ask any
            questions about our services in Chhatrapati Sambhajinagar.
          </p>
        </div>
      </section>

      {/* Contact Details */}
      <section className="px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-4xl">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Address */}
            <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
              <h2 className="mb-4 text-xl font-bold text-[#003D52]">
                Hospital Address
              </h2>
              <address className="not-italic text-gray-700 leading-relaxed">
                <strong>Prerna Hospital LLP</strong>
                <br />
                G47, Town Center N-6, Connaught Place,
                <br />
                Near Ganesh Temple &amp; Varsha Palace Hotel,
                <br />
                CIDCO, Chhatrapati Sambhajinagar,
                <br />
                Maharashtra 431003, India
              </address>

              <h2 className="mb-3 mt-8 text-xl font-bold text-[#003D52]">
                Phone Numbers
              </h2>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  <a href="tel:+917887888865" className="font-semibold text-[#1F4FD8] hover:underline">
                    +91 7887888865
                  </a>{" "}
                  (OPD &amp; Appointments)
                </li>
                <li>
                  <a href="tel:+912403591167" className="font-semibold text-[#1F4FD8] hover:underline">
                    0240-3591167
                  </a>{" "}
                  (Landline)
                </li>
                <li>
                  <a href="tel:+919325358630" className="font-semibold text-[#1F4FD8] hover:underline">
                    +91 9325358630
                  </a>{" "}
                  (Alternate)
                </li>
              </ul>

              <h2 className="mb-3 mt-8 text-xl font-bold text-[#003D52]">
                Email
              </h2>
              <a
                href="mailto:prernahospitalllp@gmail.com"
                className="text-sm text-[#1F4FD8] hover:underline"
              >
                prernahospitalllp@gmail.com
              </a>

              <h2 className="mb-3 mt-8 text-xl font-bold text-[#003D52]">
                OPD Hours
              </h2>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>Monday – Saturday: 9:00 AM – 8:00 PM</li>
                <li>Sunday: By appointment only</li>
              </ul>
            </div>

            {/* Appointment + Emergency */}
            <div className="flex flex-col gap-6">
              <div className="rounded-3xl border border-[#1F4FD8]/20 bg-gradient-to-br from-[#EAF4FF] to-white p-8">
                <h2 className="mb-3 text-lg font-bold text-[#003D52]">
                  Book an Appointment
                </h2>
                <p className="text-sm text-gray-700 leading-relaxed">
                  To schedule a consultation with one of our specialist doctors,
                  please call us directly on our helpline. Our team will help
                  match you with the right specialist — whether it is
                  neuropsychiatry, de-addiction, child psychiatry, or
                  pathology. We offer both in-person and follow-up consultations
                  for all registered patients.
                </p>
                <a
                  href="tel:+917887888865"
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#1F4FD8] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#003D52]"
                >
                  📞 Call to Book — +91 7887888865
                </a>
              </div>

              <div className="rounded-3xl border border-red-100 bg-red-50 p-6">
                <h2 className="mb-2 text-base font-bold text-red-700">
                  Psychiatric Emergency?
                </h2>
                <p className="text-sm text-red-600 leading-relaxed">
                  If you or someone you know is in immediate psychiatric
                  distress — including suicidal thoughts, acute psychosis, or a
                  mental health crisis — please call us immediately or go to
                  the nearest emergency room. We are here to help around the
                  clock for emergencies.
                </p>
                <a
                  href="tel:+917887888865"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                >
                  Emergency Contact
                </a>
              </div>

              <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                <h2 className="mb-3 text-base font-bold text-[#003D52]">
                  Find Us on Google Maps
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                  We are located in the CIDCO area of Chhatrapati Sambhajinagar,
                  easily accessible from the main Connaught Place road. Free
                  parking is available nearby.
                </p>
                <a
                  href="https://maps.app.goo.gl/4rHqXdsxhdwryAUV9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[#1F4FD8] px-5 py-2 text-sm font-semibold text-[#1F4FD8] transition hover:bg-[#1F4FD8] hover:text-white"
                >
                  Open in Maps ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white px-4 py-14">
        <div className="container mx-auto max-w-4xl">
          <h2 className="mb-6 text-2xl font-bold text-[#003D52]">Frequently Asked Questions About Appointments</h2>
          <div className="space-y-4">
            <div className="rounded-2xl border border-gray-100 bg-[#F4F7FB] p-6">
              <h3 className="font-bold text-[#1A1A1A]">Do I need to book an appointment before visiting?</h3>
              <p className="mt-2 text-sm text-gray-700 leading-relaxed">Yes, we highly recommend booking an appointment before you visit Prerna Hospital. This helps us ensure that the right specialist is available to see you without long waiting times. However, in case of a psychiatric emergency, you can walk in immediately for urgent care.</p>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-[#F4F7FB] p-6">
              <h3 className="font-bold text-[#1A1A1A]">What should I bring to my first consultation?</h3>
              <p className="mt-2 text-sm text-gray-700 leading-relaxed">For your first visit, please bring any previous medical records, past prescriptions, and details of any current medications. If you have been referred by another doctor, please bring the referral letter. This helps our psychiatrists understand your complete medical history and provide the best possible treatment.</p>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-[#F4F7FB] p-6">
              <h3 className="font-bold text-[#1A1A1A]">Is my treatment and consultation confidential?</h3>
              <p className="mt-2 text-sm text-gray-700 leading-relaxed">Absolutely. We take patient privacy very seriously at Prerna Hospital. All consultations, medical records, and personal details are kept strictly confidential. We follow all medical privacy laws to ensure your information is safe and secure with us.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy link footer note */}
      <section className="bg-white px-4 py-6 text-center text-sm text-gray-500">
        By contacting us you agree to our{" "}
        <Link href="/privacy" className="text-[#1F4FD8] underline hover:no-underline">
          Privacy Policy
        </Link>
        .
      </section>

      <section className="px-4 pb-16 text-center mt-8">
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
