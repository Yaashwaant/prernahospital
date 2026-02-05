import HospitalHeader from "@/components/HospitalHeader";
import HeroSection from "@/components/HeroSection";
import ServiceCards from "@/components/ServiceCards";
import AboutAndTeamSection from "@/components/AboutAndTeamSection";
import HospitalUpdatesSection from "@/components/HospitalUpdatesSection";
import HospitalFooter from "@/components/HospitalFooter";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F3F7FA]">
      <HospitalHeader />
      <HeroSection />
      <ServiceCards />
      <AboutAndTeamSection />
      <HospitalUpdatesSection />
      <HospitalFooter />
    </main>
  );
}
