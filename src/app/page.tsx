import HospitalHeader from "@/components/HospitalHeader";
import HeroSection from "@/components/HeroSection";
import ServiceCards from "@/components/ServiceCards";
import HospitalFooter from "@/components/HospitalFooter";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <HospitalHeader />
      <HeroSection />
      <ServiceCards />
      <HospitalFooter />
    </main>
  );
}
