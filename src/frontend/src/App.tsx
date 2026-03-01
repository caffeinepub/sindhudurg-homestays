import { Toaster } from "@/components/ui/sonner";
import { useEffect } from "react";
import { useActor } from "./hooks/useActor";

// Sections
import Navigation from "./components/Navigation";
import BookingFormSection from "./components/sections/BookingFormSection";
import Footer from "./components/sections/Footer";
import GallerySection from "./components/sections/GallerySection";
import HeroSection from "./components/sections/HeroSection";
import InstagramSection from "./components/sections/InstagramSection";
import IntroStrip from "./components/sections/IntroStrip";
import MapSection from "./components/sections/MapSection";
import MonsoonSection from "./components/sections/MonsoonSection";
import PackagesSection from "./components/sections/PackagesSection";
import PaymentOptionsSection from "./components/sections/PaymentOptionsSection";
import PeacefulPlacesSection from "./components/sections/PeacefulPlacesSection";
import PreWeddingSection from "./components/sections/PreWeddingSection";
import PricingSection from "./components/sections/PricingSection";
import TestimonialsSection from "./components/sections/TestimonialsSection";

function SeedRunner() {
  const { actor } = useActor();
  useEffect(() => {
    if (actor) {
      actor.seed().catch(() => {
        // Seed already run or failed; ignore silently
      });
    }
  }, [actor]);
  return null;
}

export default function App() {
  return (
    <div className="min-h-screen font-body">
      <Toaster position="top-right" richColors />
      <SeedRunner />
      <Navigation />

      <main>
        <HeroSection />
        <IntroStrip />
        <PackagesSection />
        <PricingSection />
        <MonsoonSection />
        <PreWeddingSection />
        <PeacefulPlacesSection />
        <GallerySection />
        <MapSection />
        <InstagramSection />
        <TestimonialsSection />
        <PaymentOptionsSection />
        <BookingFormSection />
      </main>

      <Footer />
    </div>
  );
}
