"use client";

import { useRef } from "react";
import { useGSAP } from "@/hooks";
import { Trophy, Award, Crown } from "lucide-react";

const AWARDS = [
  {
    id: 1,
    organization: "International Startup Competition",
    title: "4th Place Winner (Universitas Warmadewa)",
    icon: Trophy,
  },
  {
    id: 2,
    organization: "KMI Expo 2025",
    title: "Selected National Participant",
    icon: Crown,
  },
  {
    id: 3,
    organization: "Business Grant",
    title: "Official Funding Recipient",
    icon: Award,
  },
];

export function AwardsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useGSAP(
    (gsap) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(headerRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power2.out",
      })
      
      const items = listRef.current?.children;
      if (items) {
        tl.from(items, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
        }, "-=0.6");
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="bg-[#E8E4DF] text-[#1a1a1a] py-24 px-6 md:px-12 lg:px-20"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Top Border similar to reference */}
        <div className="w-full h-px bg-[#1a1a1a]/20 mb-16 md:mb-24" />

        <div className="flex flex-col md:flex-row gap-12 md:gap-20">
          {/* Left Column: Heading */}
          <div className="md:w-1/4">
            <h2 
              ref={headerRef}
              className="text-lg font-bold tracking-wide text-[#1a1a1a]"
            >
              Awards
            </h2>
          </div>

          {/* Right Column: Awards List */}
          <div 
            ref={listRef}
            className="md:w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16"
          >
            {AWARDS.map((award) => (
              <div key={award.id} className="flex flex-col gap-6 group">
                {/* Icon Placeholder for Award Logo */}
                <div className="w-16 h-16 flex items-center justify-start text-[#1a1a1a]/80 group-hover:text-[#1a1a1a] transition-colors">
                  <award.icon className="w-10 h-10 md:w-12 md:h-12 stroke-[1.5]" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-bold text-lg md:text-xl text-[#1a1a1a] group-hover:text-[#1a1a1a]/80 transition-colors">
                    {award.organization}
                  </h3>
                  <p className="text-[#1a1a1a]/70 font-light leading-relaxed text-sm md:text-base max-w-[240px]">
                    {award.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
