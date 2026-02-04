"use client";

import { useRef } from "react";
import { useGSAP } from "@/hooks";
import { cn } from "@/lib";

interface VideoBackgroundProps {
  src: string;
  poster?: string;
  className?: string;
  overlay?: boolean;
  overlayClassName?: string;
  children?: React.ReactNode;
}

export function VideoBackground({
  src,
  poster,
  className,
  overlay = true,
  overlayClassName,
  children,
}: VideoBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    (gsap) => {
      gsap.from(containerRef.current, {
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={cn("relative overflow-hidden", className)}>
      <video
        autoPlay
        muted
        loop
        playsInline
        poster={poster}
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={src} type="video/mp4" />
      </video>
      
      {overlay && (
        <div
          className={cn(
            "absolute inset-0 bg-black/40",
            overlayClassName
          )}
        />
      )}
      
      {children && (
        <div className="relative z-10">{children}</div>
      )}
    </div>
  );
}
