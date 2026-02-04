"use client";

import { useRef, useEffect } from "react";
import { useGSAP } from "@/hooks";
import { cn } from "@/lib";

interface ScrollIndicatorProps {
  className?: string;
  text?: string;
}

export function ScrollIndicator({ 
  className,
  text = "Scroll Down" 
}: ScrollIndicatorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<SVGSVGElement>(null);

  useGSAP(
    (gsap) => {
      // Create timeline for scroll indicator
      const tl = gsap.timeline({ delay: 0.8 });

      // Fade in with scale animation
      tl.from(containerRef.current, {
        opacity: 0,
        scale: 0.8,
        y: 20,
        duration: 0.6,
        ease: "power3.out",
      });

      // Rotate the text continuously - smooth and slow
      gsap.to(textRef.current, {
        rotation: 360,
        duration: 12,
        repeat: -1,
        ease: "none",
      });

      // Subtle floating animation for the whole indicator
      gsap.to(containerRef.current, {
        y: -8,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.5,
      });
    },
    { scope: containerRef }
  );

  // Create circular text path - 4 repetitions
  const circleText = `${text} · ${text} · ${text} · ${text} · `;

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-36 h-36 flex items-center justify-center cursor-pointer group",
        className
      )}
    >
      {/* Rotating Text */}
      <svg
        ref={textRef}
        className="absolute inset-0 w-full h-full transition-transform duration-500 ease-out group-hover:scale-110"
        viewBox="0 0 100 100"
      >
        <defs>
          <path
            id="circlePath"
            d="M 50, 50 m -42, 0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0"
            fill="none"
          />
        </defs>
        <text className="text-[7.5px] fill-white/60 uppercase tracking-[0.2em] transition-all duration-300 group-hover:fill-white/80" style={{ fontFamily: 'Inter, sans-serif' }}>
          <textPath href="#circlePath">
            {circleText}
          </textPath>
        </text>
      </svg>

      {/* Center with Mouse Scroll Icon */}
      <div className="relative flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-110">
        <img 
          src="/images/scroll-bar 1.svg" 
          alt="scroll down" 
          className="w-15 h-20 opacity-70 transition-opacity duration-300 group-hover:opacity-100"
        />
      </div>
    </div>
  );
}
