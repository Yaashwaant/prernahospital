import type { Metadata } from "next";
import "./globals.css";
import DoctorChatbot from "@/components/DoctorChatbot";
import Providers from "@/components/Providers";

const BASE_URL = "https://prernahospital.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Prerna Hospital – Neuropsychiatry & Mental Health Care",
    template: "%s | Prerna Hospital",
  },
  description:
    "Expert neuropsychiatry, de-addiction, child psychiatry & pathology in Chhatrapati Sambhajinagar. Book with our specialist doctors today.",
  keywords: [
    "psychiatrist",
    "neuropsychiatry",
    "de-addiction",
    "mental health",
    "Chhatrapati Sambhajinagar",
    "Prerna Hospital",
    "child psychiatry",
    "psychological therapy",
    "sexual medicine",
    "pathology",
  ],
  authors: [{ name: "Prerna Hospital LLP" }],
  creator: "Prerna Hospital LLP",
  publisher: "Prerna Hospital LLP",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BASE_URL,
    siteName: "Prerna Hospital",
    title: "Prerna Hospital – Neuropsychiatry & Mental Health Care",
    description:
      "Expert neuropsychiatry, de-addiction & mental health care in Chhatrapati Sambhajinagar. Book with our specialist doctors.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Prerna Hospital – Chhatrapati Sambhajinagar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Prerna Hospital – Expert Neuropsychiatry & Mental Health Care",
    description:
      "Advanced brain and mental health care in Chhatrapati Sambhajinagar. Book appointments with our specialist doctors.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
};

const hospitalJsonLd = {
  "@context": "https://schema.org",
  "@type": "Hospital",
  name: "Prerna Hospital LLP",
  url: BASE_URL,
  logo: `${BASE_URL}/logo.svg`,
  image: `${BASE_URL}/og-image.jpg`,
  description:
    "Prerna Hospital LLP provides advanced neuropsychiatry, de-addiction, child psychiatry, psychological therapy and pathology services in Chhatrapati Sambhajinagar, Maharashtra, India.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "G47, Town Center N-6, Connaught Place, Near Ganesh Temple & Varsha Palace Hotel, CIDCO",
    addressLocality: "Chhatrapati Sambhajinagar",
    addressRegion: "Maharashtra",
    postalCode: "431003",
    addressCountry: "IN",
  },
  telephone: "+91-7887888865",
  openingHours: "Mo-Sa 09:00-20:00",
  medicalSpecialty: [
    "Neuropsychiatry",
    "De-addiction Medicine",
    "Child and Adolescent Psychiatry",
    "Sexual Medicine",
    "Psychological Therapy",
    "Pathology",
  ],
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(hospitalJsonLd) }}
        />
      </head>
      <body className="antialiased">
        <Providers>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-[#1F4FD8] focus:px-4 focus:py-2 focus:text-white focus:no-underline"
          >
            Skip to main content
          </a>
          {children}
          <DoctorChatbot />
        </Providers>
      </body>
    </html>
  );
}
