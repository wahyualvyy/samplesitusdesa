import HeroSection from "@/components/home/HeroSection";
import QuickServices from "@/components/home/QuickServices";
import VillageOverview from "@/components/home/VillageOverview";
import WelcomeMessage from "@/components/home/WelcomeMessage";
import PopulationStatistics from "@/components/home/PopulationStatistics";
import APBDesDashboard from "@/components/home/APBDesDashboard";
import VillageDevelopment from "@/components/home/VillageDevelopment";
import LatestNews from "@/components/home/LatestNews";
import Announcements from "@/components/home/Announcements";
import VillagePotential from "@/components/home/VillagePotential";
import InteractiveMap from "@/components/home/InteractiveMap";
import VillageGallery from "@/components/home/VillageGallery";
import CallToAction from "@/components/home/CallToAction";

export default function Home() {
  return (
    <>
      <HeroSection />
      <QuickServices />
      <VillageOverview />
      <WelcomeMessage />
      <PopulationStatistics />
      <APBDesDashboard />
      <VillageDevelopment />
      <LatestNews />
      <Announcements />
      <VillagePotential />
      <InteractiveMap />
      <VillageGallery />
      <CallToAction />
    </>
  );
}
