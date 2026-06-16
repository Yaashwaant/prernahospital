import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy – Prerna Hospital LLP",
  description:
    "Read the Privacy Policy of Prerna Hospital LLP. We protect your personal health information per applicable Indian law.",
  alternates: { canonical: "https://www.prernahospital.com/privacy" },
  openGraph: {
    url: "https://www.prernahospital.com/privacy",
    title: "Privacy Policy – Prerna Hospital LLP",
    description: "Prerna Hospital LLP privacy policy – how we collect, use, and protect your personal information.",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main id="main-content" className="min-h-screen bg-[#F3F7FA]">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#003D52] to-[#1F4FD8] px-4 py-14 text-white md:py-20">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold md:text-4xl">Privacy Policy</h1>
          <p className="mt-3 text-white/70 text-sm">
            Last updated: May 2026
          </p>
        </div>
      </section>

      {/* Policy Content */}
      <section className="px-4 py-12">
        <div className="container mx-auto max-w-3xl">
          <div className="rounded-3xl bg-white p-8 shadow-sm space-y-8 text-gray-700 text-sm leading-relaxed">

            <div>
              <h2 className="mb-3 text-lg font-bold text-[#003D52]">1. Introduction</h2>
              <p>
                Prerna Hospital LLP (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is committed to protecting the
                privacy and confidentiality of your personal and health information. This
                Privacy Policy describes how we collect, use, store, and disclose information
                when you interact with our website (www.prernahospital.com) or avail our services.
              </p>
            </div>

            <div>
              <h2 className="mb-3 text-lg font-bold text-[#003D52]">2. Information We Collect</h2>
              <p>We may collect the following categories of information:</p>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>Personal identification information (name, phone number, email address)</li>
                <li>Health-related information provided during consultations or form submissions</li>
                <li>Technical information such as IP address, browser type, and pages visited</li>
                <li>Communication records (queries submitted via contact forms or chatbot)</li>
              </ul>
            </div>

            <div>
              <h2 className="mb-3 text-lg font-bold text-[#003D52]">3. How We Use Your Information</h2>
              <ul className="list-disc space-y-2 pl-5">
                <li>To respond to appointment requests and patient enquiries</li>
                <li>To provide and improve our medical services</li>
                <li>To send relevant health information and updates (with your consent)</li>
                <li>To comply with legal and regulatory requirements under Indian law</li>
                <li>To maintain the security and functionality of our website</li>
              </ul>
            </div>

            <div>
              <h2 className="mb-3 text-lg font-bold text-[#003D52]">4. Health Information Confidentiality</h2>
              <p>
                All health and medical information shared with Prerna Hospital is treated as
                strictly confidential. We adhere to professional medical ethics and applicable
                Indian laws, including the Information Technology (Amendment) Act, 2008. Patient
                health records are not disclosed to any third party without explicit consent,
                except as required by law or medical emergency.
              </p>
            </div>

            <div>
              <h2 className="mb-3 text-lg font-bold text-[#003D52]">5. Data Storage & Security</h2>
              <p>
                Your data is stored on secure, encrypted servers provided by Supabase
                (hosted infrastructure). We implement appropriate technical and organisational
                measures to protect your information from unauthorised access, loss, or
                disclosure. However, no method of transmission over the Internet is 100% secure.
              </p>
            </div>

            <div>
              <h2 className="mb-3 text-lg font-bold text-[#003D52]">6. Cookies & Analytics</h2>
              <p>
                Our website may use cookies and similar tracking technologies to enhance your
                browsing experience and understand how visitors interact with our site. You can
                control cookie preferences through your browser settings.
              </p>
            </div>

            <div>
              <h2 className="mb-3 text-lg font-bold text-[#003D52]">7. Third-Party Services</h2>
              <p>
                We use third-party services including YouTube (for embedded videos) and Supabase
                (for data storage). These providers have their own privacy policies and we
                encourage you to review them. We are not responsible for the privacy practices
                of these third parties.
              </p>
            </div>

            <div>
              <h2 className="mb-3 text-lg font-bold text-[#003D52]">8. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>Request access to your personal data we hold</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your data (subject to legal obligations)</li>
                <li>Withdraw consent at any time for non-essential communications</li>
              </ul>
            </div>

            <div>
              <h2 className="mb-3 text-lg font-bold text-[#003D52]">9. Contact Us</h2>
              <p>
                If you have any questions or concerns about this Privacy Policy or how your
                information is handled, please contact us:
              </p>
              <address className="mt-3 not-italic">
                <strong>Prerna Hospital LLP</strong><br />
                Chhatrapati Sambhajinagar, Maharashtra, India<br />
                Phone:{" "}
                <a href="tel:+917887888865" className="text-[#1F4FD8] underline">
                  +91-7887888865
                </a>
              </address>
            </div>

            <div>
              <h2 className="mb-3 text-lg font-bold text-[#003D52]">10. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Any changes will be posted
                on this page with an updated &quot;Last updated&quot; date. We encourage you to review
                this policy periodically.
              </p>
            </div>
          </div>
        </div>
      </section>

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
