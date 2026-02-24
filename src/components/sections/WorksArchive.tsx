"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib";
import { useGSAP } from "@/hooks";
import gsap from "gsap";

const WORKS_VIDEOS = [
  { 
    id: 1, 
    video: "/images/Work/Chicken Tikka.webm", 
    title: "Chicken Tikka",
    category: "Culinary"
  },
  { 
    id: 2, 
    video: "/images/Work/FOOD.webm", 
    title: "Gourmet Story",
    category: "Hospitality"
  },
  { 
    id: 3, 
    video: "/images/Work/DESSERT THE CHOWK.webm", 
    title: "Dessert Showcase",
    category: "Visual Magic"
  },
  { 
    id: 4, 
    video: "/images/Work/DAY IN LIFE.webm", 
    title: "Day in Life",
    category: "Lifestyle"
  },
  { 
    id: 5, 
    video: "/images/Work/1105.webm", 
    title: "Cinematic 01",
    category: "Ads"
  },
  { 
    id: 6, 
    video: "/images/Work/1116.webm", 
    title: "Cinematic 02",
    category: "Ads"
  },
];

function WorkVideoItem({ item }: { item: typeof WORKS_VIDEOS[0] }) {
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
      // Keep it on the same frame or reset based on sandwich style
      // Sandwich usually resets to first frame
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className="group relative overflow-hidden rounded-xl bg-[#0a0a0a] aspect-[3/4] work-item border border-white/5"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Video element */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          src={item.video}
          loop
          muted
          playsInline
          preload="auto"
          className={cn(
            "w-full h-full object-cover transition-all duration-700",
            isHovered ? "scale-105 opacity-100" : "scale-100 opacity-90"
          )}
        />
      </div>

      {/* Static Overlay (Always there but subtle) */}
      <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none">
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-1 block">
          {item.category}
        </span>
        <h3 className="text-xl md:text-2xl font-serif text-[#E8E4DF] leading-tight">
          {item.title}
        </h3>
      </div>

      {/* Hover Light Effect */}
      <div className={cn(
        "absolute inset-0 bg-white/5 transition-opacity duration-500 pointer-events-none",
        isHovered ? "opacity-100" : "opacity-0"
      )} />
    </div>
  );
}

export function WorksArchive() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const xTo = useRef<gsap.QuickToFunc | null>(null);
  const yTo = useRef<gsap.QuickToFunc | null>(null);

  useGSAP(() => {
    xTo.current = gsap.quickTo(cursorRef.current, "x", { duration: 0.1, ease: "power3" });
    yTo.current = gsap.quickTo(cursorRef.current, "y", { duration: 0.1, ease: "power3" });
    
    gsap.set(cursorRef.current, { scale: 0, autoAlpha: 0 });

    gsap.from(headerRef.current, {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    gsap.from(".work-item", {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.05,
      ease: "power3.out",
      delay: 0.2,
    });
  }, { scope: containerRef });

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
    <section
      className="bg-black min-h-screen py-32 px-4 md:px-8 lg:px-12 relative overflow-hidden"
      ref={containerRef}
      onMouseMove={handleMouseMove}
    >
      {/* Custom Cursor */}
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-20 h-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-full pointer-events-none z-[100] flex items-center justify-center -translate-x-1/2 -translate-y-1/2 will-change-transform"
      >
        <div className="w-1 h-1 bg-white rounded-full animate-ping" />
      </div>

      <div className="w-full max-w-[1400px] mx-auto">
        {/* Header */}
        <div ref={headerRef} className="mb-20">
          <span className="text-xs font-medium text-[#E8E4DF]/40 uppercase tracking-[0.4em] block mb-4">
            Archive — Video Portfolio
          </span>
          <h1 className="text-5xl md:text-7xl font-bold font-serif text-[#E8E4DF] tracking-tight">
            Selected Work
          </h1>
        </div>

        {/* Uniform Grid - 3 Columns */}
        <div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          onMouseEnter={handleMouseEnterGrid}
          onMouseLeave={handleMouseLeaveGrid}
        >
          {WORKS_VIDEOS.map((item) => (
            <WorkVideoItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
