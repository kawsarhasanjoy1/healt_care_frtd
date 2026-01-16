import DiagnosticHero from "../component/Home/Diognostic";
import DocInfo from "../component/Home/DocInfo";
import TopRatedDoctors from "../component/Home/Doctors/TopRatedDoctors";
import Hero from "../component/Home/HeroSection";
import HospitalPartner from "../component/Home/HospitalPartner";
import PremiumMemberSection from "../component/Home/PremiumMembers";
import Specialties from "../component/Home/Specialties/Specialties";
import WhySection from "../component/Home/WhySection";

export default function Home() {
  return (
    <div className="mx-auto  space-y-14">
      <Hero />
      <DocInfo />
      <WhySection />
      <Specialties />
      <DiagnosticHero />
      <PremiumMemberSection />
      <TopRatedDoctors />
      <HospitalPartner />
    </div>
  );
}
