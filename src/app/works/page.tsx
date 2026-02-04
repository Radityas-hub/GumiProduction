"use client";

import { Navbar, Footer } from "@/components";
import { WorksArchive } from "@/components/sections/WorksArchive";

export default function WorksPage() {
  return (
    <main className="relative bg-black text-white">
      <Navbar />
      <WorksArchive />
      <Footer />
    </main>
  );
}
