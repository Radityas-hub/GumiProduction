"use client";

import { useRef } from "react";
import { useGSAP } from "@/hooks";
import { cn } from "@/lib";
import { ScrollIndicator } from "./ScrollIndicator";

interface HeroSectionProps {
  videoSrc: string;
  title: string;
  titleHighlight?: string;
  subtitle: string;
  className?: string;
}

export function HeroSection({
  videoSrc,
  title,
  titleHighlight,
  subtitle,
  className,
}: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    (gsap) => {
      // Create a timeline for smooth sequenced animations
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Title animation - smooth fade up with slight blur
      const titleLines = titleRef.current?.querySelectorAll(".title-line");
      if (titleLines) {
        tl.from(titleLines, {
          y: 40,
          opacity: 0,
          filter: "blur(8px)",
          duration: 0.8,
          stagger: 0.12,
          ease: "power4.out",
        }, 0.1);
      }

      // Subtitle animation - fade up smoothly
      tl.from(subtitleRef.current, {
        y: 20,
        opacity: 0,
        filter: "blur(4px)",
        duration: 0.6,
        ease: "power3.out",
      }, "-=0.4");
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative h-screen w-full flex flex-col items-center justify-center overflow-hidden",
        className
      )}
    >
      {/* Background Video */}
      <div ref={videoRef} className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        {/* Dark Brown Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1208]/70 via-[#0d0906]/60 to-[#0a0705]/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl">
        <h1
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-7xl font-bold font-serif leading-[1.1] mb-6 text-white"
        >
          <span className="title-line block">{title}</span>
          {titleHighlight && (
            <span className="title-line block font-bold">{titleHighlight}</span>
          )}
        </h1>

        <p
          ref={subtitleRef}
          className="text-sm sm:text-base md:text-lg font-light text-white/70 max-w-2xl mx-auto leading-relaxed"
        >
          {subtitle}
        </p>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <ScrollIndicator />
      </div>
    </section>
  );
}
