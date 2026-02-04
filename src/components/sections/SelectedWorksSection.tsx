"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib";
import { ArrowRight } from "lucide-react";
import { useGSAP } from "@/hooks";
import gsap from "gsap";

const WORKS = [
  {
    id: 1,
    title: "Madhuban: Vegetarian Indian Resto",
    category: "Social Media Management",
    video: "/videos/hero.mp4",
  },
  {
    id: 2,
    title: "Madhuban: Vegetarian Indian Resto",
    category: "Social Media Management",
    video: "/videos/hero.mp4",
  },
  {
    id: 3,
    title: "Madhuban: Vegetarian Indian Resto",
    category: "Social Media Management",
    video: "/videos/hero.mp4",
  },
];

interface WorkItemProps {
  item: (typeof WORKS)[0];
}

import Link from "next/link";

function WorkItem({ item }: WorkItemProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Ignore AbortError caused by quick pause() calls
        });
      }
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0; // Reset to start
    }
  };

  return (
    <Link 
      href="/works/madhuban-social-media"
      className="group work-item border-b border-white/10 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 transition-colors duration-300 hover:border-white/30 cursor-none block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex flex-col gap-8 max-w-xl pointer-events-none">
        <h3 className="text-3xl md:text-5xl font-light text-[#E8E4DF]/60 group-hover:text-[#E8E4DF] leading-tight transition-colors duration-300">
          {item.title}
        </h3>
        <span className="text-sm font-medium text-[#E8E4DF]/40 uppercase tracking-widest">
          {item.category}
        </span>
      </div>

      <div className="relative w-full md:w-[400px] aspect-video bg-[#2a2a2a] rounded-lg overflow-hidden shrink-0 pointer-events-none">
        <video
          ref={videoRef}
          src={item.video}
          poster="/images/hero-poster.jpg" 
          preload="none"
          muted
          loop
          playsInline
          className={cn(
            "w-full h-full object-cover transition-all duration-500",
            isHovered ? "blur-0" : "blur-sm"
          )}
        />
      </div>
    </Link>
  );
}

export function SelectedWorksSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const xTo = useRef<gsap.QuickToFunc | null>(null);
  const yTo = useRef<gsap.QuickToFunc | null>(null);

  useGSAP(() => {
    // Custom Cursor Logic
    xTo.current = gsap.quickTo(cursorRef.current, "x", { duration: 0.1, ease: "power3" });
    yTo.current = gsap.quickTo(cursorRef.current, "y", { duration: 0.1, ease: "power3" });
    
    // Hide cursor initially
    gsap.set(cursorRef.current, { scale: 0, autoAlpha: 0 });

    // Entrance Animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    });

    // Header Animation
    tl.from(headerRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    // Work Items Animation
    tl.from(".work-item", {
      y: 100,
      opacity: 0,
      filter: "blur(20px)",
      duration: 1.2,
      stagger: 0.5,
      ease: "power3.out",
    }, "-=0.5");
  
  }, { scope: containerRef });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (xTo.current && yTo.current) {
      xTo.current(e.clientX);
      yTo.current(e.clientY);
    }
  };

  const handleMouseEnterList = () => {
    gsap.to(cursorRef.current, { scale: 1, autoAlpha: 1, duration: 0.3 });
  };

  const handleMouseLeaveList = () => {
     gsap.to(cursorRef.current, { scale: 0, autoAlpha: 0, duration: 0.3 });
  };

  return (
    <section className="bg-[#111111] py-32 px-4 md:px-8 lg:px-12 relative" ref={containerRef}>
      
      {/* Custom Cursor */}
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-24 h-24 bg-white rounded-full pointer-events-none z-[100] flex items-center justify-center -translate-x-1/2 -translate-y-1/2 will-change-transform"
      >
        <span className="text-black font-medium text-sm text-center px-2 leading-tight">click to see more</span>
      </div>

      <div className="w-full max-w-[1400px] mx-auto">
        {/* Header */}
        <div ref={headerRef} className="flex flex-wrap items-end justify-between gap-8 mb-24 border-b border-white/10 pb-8">
          <h2 className="text-5xl md:text-7xl font-bold font-serif text-[#E8E4DF]">
            Selected Works
          </h2>

          {/* All Works Button */}
           <a
            href="/works"
            className="group flex items-center w-fit overflow-hidden"
          >
            {/* Left Arrow - Slides in */}
            <div className="h-12 rounded-full flex items-center justify-center overflow-hidden transition-[width,opacity] duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] w-0 opacity-0 group-hover:w-12 group-hover:opacity-100 bg-[#E8E4DF]">
               <div className="w-12 h-12 flex items-center justify-center flex-none">
                <ArrowRight className="w-4 h-4 text-[#1a1a1a]" />
              </div>
            </div>

            {/* Text */}
            <span className="px-6 h-12 flex items-center justify-center bg-[#E8E4DF] rounded-full text-base text-[#1a1a1a] font-light tracking-wide z-10 mx-[-2px] transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)]">
              All Works
            </span>

            {/* Right Arrow - Slides out */}
            <div className="h-12 rounded-full flex items-center justify-center overflow-hidden transition-[width,opacity] duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] w-12 opacity-100 group-hover:w-0 group-hover:opacity-0 bg-[#E8E4DF]">
               <div className="w-12 h-12 flex items-center justify-center flex-none">
                <ArrowRight className="w-4 h-4 text-[#1a1a1a]" />
              </div>
            </div>
          </a>
        </div>

        {/* List */}
        <div 
          className="flex flex-col"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnterList}
          onMouseLeave={handleMouseLeaveList}
        >
          {WORKS.map((work) => (
            <WorkItem key={work.id} item={work} />
          ))}
        </div>
      </div>
    </section>
  );
}
