import HospitalHeader from "@/components/HospitalHeader";
import HeroSection from "@/components/HeroSection";
import ServiceCards from "@/components/ServiceCards";
import AboutAndTeamSection from "@/components/AboutAndTeamSection";
import HospitalUpdatesSection from "@/components/HospitalUpdatesSection";
import HospitalFooter from "@/components/HospitalFooter";
import SocialHandlesSection from "@/components/SocialHandlesSection";
import FloatingChatPrompt from "@/components/FloatingChatPrompt";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F3F7FA]">
      <HospitalHeader />
      <HeroSection />
      <ServiceCards />
      <AboutAndTeamSection />
      <HospitalUpdatesSection />
      <SocialHandlesSection />
      <HospitalFooter />
      <FloatingChatPrompt />
    </main>
  );
}
