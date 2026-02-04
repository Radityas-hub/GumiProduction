"use client";

import { useRef } from "react";
import { useGSAP } from "@/hooks";
import { cn } from "@/lib";
import { ArrowRight } from "lucide-react";

interface AboutSectionProps {
  className?: string;
}

export function AboutSection({ className }: AboutSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useGSAP(
    (gsap, ScrollTrigger) => {
      // Text reveal animation on scroll
      gsap.from(textRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 30%",
          toggleActions: "play none none reverse",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      // Button animation
      gsap.from(buttonRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
        delay: 0.3,
        ease: "power3.out",
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className={cn(
        "min-h-screen bg-[#E8E4DF] flex items-center px-8 py-20",
        className
      )}
    >
      <div className="w-full max-w-[1400px] mx-auto">
        {/* Main Text */}
        <p
          ref={textRef}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] leading-[1.4] tracking-tight text-[#1a1a1a]/40 font-light"
        >
          <span className="text-[#1a1a1a] font-medium">Founded in 2022,</span>{" "}
          Gumi Production emerged from a deep-seated passion for{" "}
          <span className="text-[#1a1a1a] font-medium">visual storytelling.</span>{" "}
          We don't just capture images; we evoke emotions. Based in the heart of Bali, we blend local cultural authenticity with a{" "}
          <span className="text-[#1a1a1a] font-medium">global</span> cinematic{" "}
          <span className="text-[#1a1a1a] font-medium">standard.</span>{" "}
          From music videos to full-scale social media management, we are here to{" "}
          <span className="text-[#1a1a1a] font-medium">transform</span> your{" "}
          <span className="text-[#1a1a1a] font-medium">brand's essence</span>{" "}
          into a meaningful digital experience
        </p>

        {/* Button */}
        <a
          ref={buttonRef}
          href="/about"
          className="group flex items-center w-fit overflow-hidden mt-12"
        >
          {/* Left Arrow - Slides in */}
          <div className="h-12 rounded-full flex items-center justify-center overflow-hidden transition-[width,opacity] duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] w-0 opacity-0 group-hover:w-12 group-hover:opacity-100 bg-[#1a1a1a]">
             <div className="w-12 h-12 flex items-center justify-center flex-none">
              <ArrowRight className="w-4 h-4 text-[#E8E4DF]" />
            </div>
          </div>

          {/* Text */}
          <span className="px-6 h-12 flex items-center justify-center bg-[#1a1a1a] rounded-full text-base text-[#E8E4DF] font-light tracking-wide z-10 mx-[-2px]">
            More about us
          </span>

          {/* Right Arrow - Slides out */}
          <div className="h-12 rounded-full flex items-center justify-center overflow-hidden transition-[width,opacity] duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] w-12 opacity-100 group-hover:w-0 group-hover:opacity-0 bg-[#1a1a1a]">
             <div className="w-12 h-12 flex items-center justify-center flex-none">
              <ArrowRight className="w-4 h-4 text-[#E8E4DF]" />
            </div>
          </div>
        </a>
      </div>
    </section>
  );
}
