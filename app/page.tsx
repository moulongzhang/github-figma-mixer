import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AgendaSection from "@/components/AgendaSection";
import SpeakersSection from "@/components/SpeakersSection";
import LocationSection from "@/components/LocationSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <AgendaSection />
        <SpeakersSection />
        <FAQSection />
        <LocationSection />
      </main>
      <Footer />
    </>
  );
}
