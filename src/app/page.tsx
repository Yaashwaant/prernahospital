import HospitalHeader from "@/components/HospitalHeader";
import HeroSection from "@/components/HeroSection";
import ServiceCards from "@/components/ServiceCards";
import AboutAndTeamSection from "@/components/AboutAndTeamSection";
import dynamic from "next/dynamic";

const FaqSection = dynamic(() => import("@/components/FaqSection"));
const HospitalUpdatesSection = dynamic(() => import("@/components/HospitalUpdatesSection"));
const SocialHandlesSection = dynamic(() => import("@/components/SocialHandlesSection"));
const BlogSliderSection = dynamic(() => import("@/components/BlogSliderSection"));
const HospitalFooter = dynamic(() => import("@/components/HospitalFooter"));
const FloatingChatPrompt = dynamic(() => import("@/components/FloatingChatPrompt"));
import { createAdminClient } from "@/lib/supabase";

const BASE_URL = "https://www.prernahospital.com";

import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// VideoObject schema for the featured YouTube video — placed in metadata
// so it renders in <head> not <body>
const videoJsonLd = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: "जाणून घेऊयात मानवी मेंदू च मनोविकारात महत्व आणि कार्य | Prerna Hospital",
  description:
    "Dr. Manik Bhise explains the role of the human brain in mental disorders. Expert psychiatric education from Prerna Hospital, Chhatrapati Sambhajinagar.",
  thumbnailUrl: `https://img.youtube.com/vi/EP3HsV871Ks/hqdefault.jpg`,
  uploadDate: "2024-01-01",
  contentUrl: `https://www.youtube.com/watch?v=EP3HsV871Ks`,
  embedUrl: `https://www.youtube.com/embed/EP3HsV871Ks`,
  publisher: {
    "@type": "Organization",
    name: "Prerna Hospital LLP",
    logo: {
      "@type": "ImageObject",
      url: `${BASE_URL}/logo.svg`,
    },
  },
};

async function getUpdates() {
  try {
    const admin = createAdminClient();
    if (!admin) return [];
    const { data } = await admin
      .from("updates")
      .select("*")
      .order("date", { ascending: false });
    
    // Filter out demo placeholders, take latest 8 items
    const real = (data || []).filter((u: any) => !u.id.startsWith("demo-")).slice(0, 8);
    return real;
  } catch (error) {
    console.error("Error fetching updates for SSR:", error);
    return [];
  }
}

export default async function Home() {
  const updates = await getUpdates();

  return (
    <main id="main-content" className="min-h-screen bg-[#F3F7FA]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd) }}
      />
      <HospitalHeader />
      <HeroSection />
      <ServiceCards />
      <AboutAndTeamSection />
      <FaqSection />
      <HospitalUpdatesSection initialUpdates={updates} />
      <SocialHandlesSection />
      <BlogSliderSection />
      <HospitalFooter />
      <FloatingChatPrompt />
    </main>
  );
}
