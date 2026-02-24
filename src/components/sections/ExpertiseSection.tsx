"use client";

import { useRef } from "react";
import { useGSAP } from "@/hooks";
import { cn } from "@/lib";
import { ArrowRight } from "lucide-react"; // Assuming lucide-react is installed or used
import Image from "next/image";

import Link from "next/link";

const EXPERTISE_ITEMS = [
  {
    id: "01",
    title: "Photo & Video Production",
    description: "Professional photo and video production for cinematic storytelling.",
    image: "/images/solutionDummy.jpeg",
  },
  {
    id: "02",
    title: "Content Strategy",
    description: "Content strategy planning to define your brand voice and visual identity.",
    image: "/images/content-strategy.jpg",
  },
  {
    id: "03",
    title: "Social Media Management",
    description: "Instagram, TikTok, and Facebook management to grow your community.",
    image: "/images/Sosmed.jpg",
  },
  {
    id: "04",
    title: "Digital Advertising",
    description: "Digital advertising across Meta Ads and Google Ads for maximum reach.",
    image: "/images/paid-ads.jpg",
  },
];

export function ExpertiseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    (gsap, ScrollTrigger) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // Header Animation
      tl.from(titleRef.current, {
        y: 50,
        opacity: 0,
        filter: "blur(10px)",
        duration: 1,
        ease: "power3.out",
      })
        .from(
          descRef.current,
          {
            y: 30,
            opacity: 0,
            filter: "blur(5px)",
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6"
        );

      // Cards Animation (Staggered)
      const cards = sectionRef.current?.querySelectorAll(".expertise-card");
      if (cards && cards.length > 0) {
        tl.from(
          cards,
          {
            y: 100,
            opacity: 0,
            filter: "blur(20px)",
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.4"
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#EAE8E4] text-[#1a1a1a] py-24 px-4 md:px-8 lg:px-12 flex flex-col justify-center"
    >
      {/* Content Container */}
      <div className="w-full max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-20 md:mb-32 w-full">
          <h2
            ref={titleRef}
            className="text-5xl md:text-7xl font-bold font-serif mb-8 md:mb-0"
          >
            Our Expertise
          </h2>
          <p
            ref={descRef}
            className="text-lg md:text-xl text-[#1a1a1a]/70 max-w-md leading-relaxed"
          >
            Founded in 2022, Gumi Production emerged from a deep-seated passion for
            visual storytelling. We don't just capture moments; we craft
            narratives.
          </p>
        </div>

        {/* Cards Grid */}
      {/* Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full"
        >
        {EXPERTISE_ITEMS.map((item, index) => (
          <Link
            key={item.id}
            href="/services/social-media-management"
            className={cn(
              "group relative flex flex-col cursor-pointer expertise-card block",
              index % 2 !== 0 ? "lg:mt-24" : ""
            )}
          >
            {/* Huge Number */}
            <div className="absolute -top-24 -left-4 text-[120px] font-serif font-bold text-[#1a1a1a]/20 z-0 leading-none select-none pointer-events-none transition-transform duration-500 group-hover:-translate-y-2">
              {item.id}
            </div>

            {/* Image Container */}
            <div className="relative z-10 w-full aspect-[4/5] sm:aspect-square bg-gray-200 rounded-xl overflow-hidden mb-6 shadow-sm group-hover:shadow-xl transition-all duration-300">
              <Image 
                src={item.image} 
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105 brightness-[0.85] group-hover:brightness-100"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
            </div>

            {/* Text Content */}
            <div className="relative z-10 flex items-center justify-between px-2">
              <span className="text-2xl font-serif text-[#1a1a1a]/60 group-hover:text-[#1a1a1a] transition-colors duration-300">
                {item.title}
              </span>
              
              {/* Animated Arrow Button */}
              <div className="h-10 w-10 rounded-full bg-[#1a1a1a] flex items-center justify-center overflow-hidden shrink-0 relative">
                {/* Default Arrow: visible, moves out right on hover */}
                <div className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-[175%]">
                    <ArrowRight className="w-4 h-4 text-white" /> 
                </div>
                
                {/* Hover Arrow: hidden (left), moves to center on hover */}
                <div className="absolute inset-0 flex items-center justify-center -translate-x-[175%] transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-0">
                    <ArrowRight className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      </div>
    </section>
  );
}
