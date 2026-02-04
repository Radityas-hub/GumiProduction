"use client";

import { Navbar, Footer, HeroSection, AboutSection, ExpertiseSection, SelectedWorksSection, TrustedBySection, AwardsSection } from "@/components";

export default function Home() {
  return (
    <main className="relative bg-black text-white">
      <Navbar />

      <HeroSection
        videoSrc="/videos/hero.mp4"
        title="Crafted with Passion"
        titleHighlight="Delivered with Purpose"
        subtitle="Creative Agency based in Bali, specializing in Cinematic Storytelling Commercials."
      />

      <AboutSection />

      <ExpertiseSection />

      <SelectedWorksSection />

      <TrustedBySection />

      <AwardsSection />

      <Footer />

    </main>
  );
}