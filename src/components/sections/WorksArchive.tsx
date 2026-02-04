"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib";
import { useGSAP } from "@/hooks";
import gsap from "gsap";

// Dummy data - ready for replacement
const CATEGORIES = ["All", "Hospitality", "Music Videos", "Corporate", "Documentary"];

const WORKS_DATA = [
  {
    id: 1,
    slug: "the-mulia-resort",
    title: "The Mulia Resort & Villas",
    category: "Hospitality",
    year: "2025",
    video: "/videos/hero.mp4",
    thumbnail: "/images/hero-poster.jpg",
    challenge: "Creating a visual narrative that captures the essence of luxury hospitality while maintaining authenticity and emotional connection with potential guests.",
    solution: "We developed a cinematic storytelling approach that showcased not just the property, but the experience. Using golden hour lighting and intimate moments, we crafted a film that feels like a dream vacation.",
    gridClass: "col-span-2 row-span-2", // Large
  },
  {
    id: 2,
    slug: "sunset-dreams-music-video",
    title: "Sunset Dreams - Music Video",
    category: "Music Videos",
    year: "2024",
    video: "/videos/hero.mp4",
    thumbnail: "/images/hero-poster.jpg",
    challenge: "Translating abstract musical emotions into compelling visual metaphors while working with a limited budget and tight timeline.",
    solution: "Leveraged Bali's natural beauty and practical lighting techniques. Shot during magic hour to maximize production value, creating a dreamy aesthetic that perfectly complemented the song's vibe.",
    gridClass: "col-span-1 row-span-1", // Small
  },
  {
    id: 3,
    slug: "tech-innovations-corp",
    title: "Tech Innovations Corp",
    category: "Corporate",
    year: "2025",
    video: "/videos/hero.mp4",
    thumbnail: "/images/hero-poster.jpg",
    challenge: "Making corporate content engaging and human-centered rather than sterile and forgettable.",
    solution: "Focused on the people behind the technology. Used dynamic camera movements and authentic interviews to create a corporate film that feels genuine and inspiring.",
    gridClass: "col-span-1 row-span-2", // Tall
  },
  {
    id: 4,
    slug: "bali-coffee-culture",
    title: "Bali Coffee Culture",
    category: "Documentary",
    year: "2024",
    video: "/videos/hero.mp4",
    thumbnail: "/images/hero-poster.jpg",
    challenge: "Documenting traditional coffee farming practices while keeping the narrative accessible to international audiences.",
    solution: "Created a visual-first documentary that lets the craft speak for itself. Minimal dialogue, maximum visual storytelling with intimate close-ups and sweeping landscapes.",
    gridClass: "col-span-2 row-span-1", // Wide
  },
  {
    id: 5,
    slug: "karma-beach-club",
    title: "Karma Beach Club",
    category: "Hospitality",
    year: "2024",
    video: "/videos/hero.mp4",
    thumbnail: "/images/hero-poster.jpg",
    challenge: "Capturing the energy and atmosphere of a beach club experience in a way that drives bookings and social engagement.",
    solution: "High-energy editing with vibrant color grading. Focused on genuine moments of joy and connection, creating FOMO-inducing content that performs exceptionally on social media.",
    gridClass: "col-span-1 row-span-1", // Small
  },
  {
    id: 6,
    slug: "echoes-indie-band",
    title: "Echoes - Indie Band",
    category: "Music Videos",
    year: "2025",
    video: "/videos/hero.mp4",
    thumbnail: "/images/hero-poster.jpg",
    challenge: "Creating a visually striking music video with experimental aesthetics that matches the band's unique sound.",
    solution: "Embraced practical effects and in-camera techniques. Used colored gels, smoke, and creative framing to build a surreal world that feels both intimate and otherworldly.",
    gridClass: "col-span-1 row-span-1", // Small
  },
  {
    id: 7,
    slug: "sustainable-futures-summit",
    title: "Sustainable Futures Summit",
    category: "Corporate",
    year: "2024",
    video: "/videos/hero.mp4",
    thumbnail: "/images/hero-poster.jpg",
    challenge: "Covering a multi-day conference while creating content that remains engaging beyond the event itself.",
    solution: "Developed a documentary-style approach with key speaker highlights and behind-the-scenes moments. Created modular content pieces that work independently and as a cohesive narrative.",
    gridClass: "col-span-2 row-span-1", // Wide
  },
  {
    id: 8,
    slug: "alila-ubud-wellness-retreat",
    title: "Alila Ubud - Wellness Retreat",
    category: "Hospitality",
    year: "2025",
    video: "/videos/hero.mp4",
    thumbnail: "/images/hero-poster.jpg",
    challenge: "Communicating the transformative wellness experience without relying on clichéd spa imagery.",
    solution: "Focused on the journey of self-discovery. Used slow, meditative camera movements and natural soundscapes to create an immersive piece that mirrors the retreat experience itself.",
    gridClass: "col-span-1 row-span-2", // Tall
  },
];

import Link from "next/link";

interface WorkItemProps {
  item: typeof WORKS_DATA[0];
}

function WorkItem({ item }: WorkItemProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <Link
      href="/works/madhuban-social-media"
      className={cn(
        "group relative overflow-hidden cursor-none work-item block",
        item.gridClass
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Video Container */}
      <div className="relative w-full h-full min-h-[300px] md:min-h-[400px] bg-[#1a1a1a] overflow-hidden">
        <video
          ref={videoRef}
          src={item.video}
          poster={item.thumbnail}
          preload="none"
          muted
          loop
          playsInline
          className={cn(
            "w-full h-full object-cover transition-all duration-700",
            isHovered ? "scale-105 grayscale-0" : "scale-100 grayscale"
          )}
        />

        {/* Overlay */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500",
            isHovered ? "opacity-90" : "opacity-60"
          )}
        />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 transform transition-transform duration-500">
          <div
            className={cn(
              "transform transition-all duration-500",
              isHovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-80"
            )}
          >
            <span className="text-xs font-medium text-[#E8E4DF]/60 uppercase tracking-widest mb-2 block">
              {item.category} • {item.year}
            </span>
            <h3 className="text-2xl md:text-3xl font-light text-[#E8E4DF] leading-tight mb-3">
              {item.title}
            </h3>
            <div
              className={cn(
                "text-sm text-[#E8E4DF]/80 font-light transition-all duration-500",
                isHovered ? "opacity-100 max-h-20" : "opacity-0 max-h-0"
              )}
            >
              Click to view case study
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function WorksArchive() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const xTo = useRef<gsap.QuickToFunc | null>(null);
  const yTo = useRef<gsap.QuickToFunc | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredWorks =
    selectedCategory === "All"
      ? WORKS_DATA
      : WORKS_DATA.filter((work) => work.category === selectedCategory);

  useGSAP(() => {
    // Custom Cursor Logic
    xTo.current = gsap.quickTo(cursorRef.current, "x", { duration: 0.1, ease: "power3" });
    yTo.current = gsap.quickTo(cursorRef.current, "y", { duration: 0.1, ease: "power3" });
    
    // Hide cursor initially
    gsap.set(cursorRef.current, { scale: 0, autoAlpha: 0 });

    // Header Animation with blur
    gsap.from(headerRef.current, {
      y: 80,
      opacity: 0,
      filter: "blur(30px)",
      duration: 1.2,
      ease: "power3.out",
    });

    // Category Filter Animation with blur
    gsap.from(".category-filter", {
      y: 30,
      opacity: 0,
      filter: "blur(15px)",
      duration: 0.8,
      stagger: 0.05,
      ease: "power2.out",
      delay: 0.3,
    });

    // Work Items Animation with enhanced blur
    gsap.from(".work-item", {
      y: 120,
      opacity: 0,
      filter: "blur(40px)",
      scale: 0.95,
      duration: 1.2,
      stagger: {
        amount: 0.6,
        from: "start",
        ease: "power2.inOut",
      },
      ease: "power3.out",
      delay: 0.5,
    });
  }, { scope: containerRef, dependencies: [selectedCategory] });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (xTo.current && yTo.current) {
      xTo.current(e.clientX);
      yTo.current(e.clientY);
    }
  };

  const handleMouseEnterGrid = () => {
    gsap.to(cursorRef.current, { scale: 1, autoAlpha: 1, duration: 0.3 });
  };

  const handleMouseLeaveGrid = () => {
    gsap.to(cursorRef.current, { scale: 0, autoAlpha: 0, duration: 0.3 });
  };

  return (
    <>
      <section
        className="bg-black min-h-screen py-24 md:py-32 px-4 md:px-8 lg:px-12 relative"
        ref={containerRef}
      >
        {/* Custom Cursor */}
        <div 
          ref={cursorRef} 
          className="fixed top-0 left-0 w-24 h-24 bg-white rounded-full pointer-events-none z-[100] flex items-center justify-center -translate-x-1/2 -translate-y-1/2 will-change-transform"
        >
          <span className="text-black font-medium text-sm text-center px-2 leading-tight">click for details</span>
        </div>

        <div className="w-full max-w-[1600px] mx-auto">
          {/* Header */}
          <div ref={headerRef} className="mb-16 md:mb-24">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-serif text-[#E8E4DF] mb-6">
              Selected Works
            </h1>
            <p className="text-lg md:text-xl text-[#E8E4DF]/60 font-light max-w-2xl">
              A curated collection of our finest work across hospitality, music, corporate, and documentary filmmaking.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-12 md:mb-16">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "category-filter px-6 py-3 rounded-full text-sm font-medium tracking-wide transition-all duration-300",
                  selectedCategory === category
                    ? "bg-[#E8E4DF] text-black"
                    : "bg-white/5 text-[#E8E4DF]/60 hover:bg-white/10 hover:text-[#E8E4DF]"
                )}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Asymmetric Grid */}
          <div 
            className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-auto cursor-none"
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnterGrid}
            onMouseLeave={handleMouseLeaveGrid}
          >
            {filteredWorks.map((work) => (
              <WorkItem
                key={work.id}
                item={work}
              />
            ))}
          </div>
        </div>
      </section>


    </>
  );
}
