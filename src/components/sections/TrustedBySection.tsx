"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@/hooks";
import { cn } from "@/lib";
import { Volume2, VolumeX } from "lucide-react";

import Image from "next/image";

export function TrustedBySection() {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  useGSAP(
    (gsap) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%", // Start animation when section is 60% in view
          toggleActions: "play none none reverse",
        },
      });

      // Text Entrance
      tl.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })
      .from(subtitleRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      }, "-=0.8");

      // Video Reveal (Monks.com style - slight scale up + fade)
      tl.from(videoWrapperRef.current, {
        scale: 0.7,
        y: 50,
        opacity: 0,
        filter: "blur(10px)",
        duration: 1.5,
        ease: "power2.out", // Smoother ease for larger element
      }, "-=0.8");

    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="bg-[#E8E4DF] py-32 px-4 md:px-8 lg:px-12 flex flex-col items-center justify-center text-center"
    >
      <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-16 md:mb-24 space-y-6">
          <h2
            ref={titleRef}
            className="text-4xl md:text-6xl lg:text-7xl font-bold font-serif text-[#1a1a1a]"
          >
            Trusted by Visionaries
          </h2>
          <p
            ref={subtitleRef}
            className="text-lg md:text-xl text-[#1a1a1a]/70 leading-relaxed font-light max-w-2xl mx-auto"
          >
            Guided by integrity, We don't just deliver results; we cultivate
            lasting digital legacies through cinematic excellence
          </p>
        </div>

        {/* Video Placeholder / Container */}
        <div
          ref={videoWrapperRef}
          onClick={toggleMute}
          className="relative w-full aspect-video md:aspect-[3/2] bg-[#d4d4d4] rounded-xl overflow-hidden shadow-2xl group cursor-pointer"
        >
          {/* Dummy Video */}
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/videos/testi.webm" type="video/webm" />
          </video>

          {/* Mute/Unmute UI Overlay - Always Visible */}
          <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 transition-all duration-300">
            {isMuted ? (
              <>
                <VolumeX className="w-4 h-4 text-white" />
                <span className="text-[10px] text-white uppercase tracking-widest font-medium">Click to Unmute</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-white" />
                <span className="text-[10px] text-white uppercase tracking-widest font-medium">Sound On</span>
              </>
            )}
          </div>

          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
        </div>
      </div>
    </section>
  );
}
