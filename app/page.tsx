import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AgendaSection from "@/components/AgendaSection";
import SpeakersSection from "@/components/SpeakersSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navigation />
      <HeroSection />
      <AgendaSection />
      <SpeakersSection />
      <Footer />
    </main>
  );
}
