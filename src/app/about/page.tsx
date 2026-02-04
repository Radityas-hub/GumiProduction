"use client";

import { Navbar, Footer } from "@/components";
import { NarrativeSection } from "@/components/sections/NarrativeSection";

export default function AboutPage() {
  return (
    <main className="relative bg-black text-white">
      <Navbar />
      <NarrativeSection />
      <Footer />
    </main>
  );
}
