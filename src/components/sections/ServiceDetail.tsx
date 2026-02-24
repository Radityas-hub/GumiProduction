"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib";
import { useGSAP } from "@/hooks";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

interface ServiceData {
  slug: string;
  number: string;
  title: string;
  tagline: string;
  heroVideo: string;
  heroPoster: string;
  marketInsight: {
    stat: string;
    description: string;
  };
  problemSolution: {
    problem: string;
    solution: string;
  };
  scope: Array<{
    number: string;
    title: string;
    description: string;
    image: string;
  }>;
  edge: {
    expertise: {
      title: string;
      description: string;
    };
    growth: {
      title: string;
      stats: Array<{
        value: string;
        label: string;
      }>;
      description: string;
    };
    authenticity?: {
      title: string;
      description: string;
    };
  };
  caseStudies: Array<{
    slug: string;
    title: string;
    category: string;
    image: string;
    results: string;
  }>;
}

interface ServiceDetailProps {
  service: ServiceData;
}

// 1. Hero Section
function HeroSection({ service }: { service: ServiceData }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(heroRef.current, {
      opacity: 0,
      filter: "blur(30px)",
      duration: 1.5,
      ease: "power3.out",
    });

    // Parallax effect
    gsap.to(videoRef.current, {
      scale: 1.15,
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    gsap.to(overlayRef.current, {
      opacity: 0.9,
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });
  }, { scope: heroRef });

  return (
    <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        src={service.heroVideo}
        poster={service.heroPoster}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover grayscale scale-100"
      />

      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80"
      />

      {/* Content */}
      <div className="absolute inset-0 flex items-end justify-start p-8 md:p-16 lg:p-24">
        <div className="max-w-5xl">
          <div className="mb-4">
            <span className="text-6xl md:text-7xl font-bold font-serif text-[#E8E4DF]/30">
              {service.number}
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-serif text-[#E8E4DF] leading-[0.95] mb-6">
            {service.title}
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-[#E8E4DF]/80 font-light leading-relaxed max-w-3xl">
            {service.tagline}
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
        <span className="text-xs text-[#E8E4DF] uppercase tracking-widest">Scroll</span>
        <div className="w-[1px] h-16 bg-[#E8E4DF] relative overflow-hidden">
          <div className="absolute inset-0 bg-[#E8E4DF] animate-scroll-line" />
        </div>
      </div>
    </section>
  );
}

// 2. Strategic Value Section
function StrategySection({ service }: { service: ServiceData }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".strategy-item", {
      y: 100,
      opacity: 0,
      filter: "blur(30px)",
      duration: 1.2,
      stagger: 0.3,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="bg-black py-24 md:py-32 px-4 md:px-8 lg:px-12">
      <div className="w-full max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="strategy-item mb-16 md:mb-24">
          <span className="text-xs font-medium text-[#E8E4DF]/40 uppercase tracking-[0.3em] block mb-6">
            Why It Matters
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold font-serif text-[#E8E4DF] mb-8">
            The Strategic Value
          </h2>
        </div>

        {/* Market Insight */}
        <div className="strategy-item mb-16 md:mb-24">
          <div className="bg-[#1a1a1a] rounded-2xl p-8 md:p-12 lg:p-16 border border-[#E8E4DF]/10">
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
              <div className="shrink-0">
                <div className="text-7xl md:text-8xl lg:text-9xl font-bold font-serif text-[#E8E4DF]">
                  {service.marketInsight.stat}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-[#E8E4DF]/60 uppercase tracking-wider mb-4">
                  Market Insight
                </h3>
                <p className="text-xl md:text-2xl lg:text-3xl text-[#E8E4DF]/80 font-light leading-relaxed">
                  {service.marketInsight.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Problem-Solution */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="strategy-item">
            <div className="mb-6">
              <span className="text-sm font-medium text-[#E8E4DF]/40 uppercase tracking-wider">
                The Problem
              </span>
            </div>
            <p className="text-xl md:text-2xl text-[#E8E4DF]/70 font-light leading-relaxed">
              {service.problemSolution.problem}
            </p>
          </div>

          <div className="strategy-item">
            <div className="mb-6">
              <span className="text-sm font-medium text-[#E8E4DF]/40 uppercase tracking-wider">
                Our Solution
              </span>
            </div>
            <p className="text-xl md:text-2xl text-[#E8E4DF] font-light leading-relaxed">
              {service.problemSolution.solution}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// 3. Service Scope Section
function ScopeSection({ service }: { service: ServiceData }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useGSAP(() => {
    gsap.from(".scope-header", {
      y: 80,
      opacity: 0,
      filter: "blur(30px)",
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    });

    gsap.from(".scope-item", {
      y: 100,
      opacity: 0,
      filter: "blur(35px)",
      scale: 0.95,
      duration: 1.2,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%",
        toggleActions: "play none none reverse",
      },
    });
  }, { scope: sectionRef });

  const handleMouseMove = (e: React.MouseEvent, index: number) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
    
    if (hoveredIndex !== index) {
      setHoveredIndex(index);
    }
  };

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
    
    // Animate tooltip entrance
    if (tooltipRef.current) {
      gsap.fromTo(
        tooltipRef.current,
        {
          opacity: 0,
          scale: 0.8,
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.5,
          ease: "power3.out",
        }
      );
    }
  };

  const handleMouseLeave = () => {
    // Animate tooltip exit
    if (tooltipRef.current) {
      gsap.to(tooltipRef.current, {
        opacity: 0,
        scale: 0.9,
        filter: "blur(8px)",
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => setHoveredIndex(null),
      });
    }
  };

  return (
    <section ref={sectionRef} className="bg-[#0a0a0a] py-24 md:py-32 px-4 md:px-8 lg:px-12 relative">
      <div className="w-full max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="scope-header mb-16 md:mb-24">
          <span className="text-xs font-medium text-[#E8E4DF]/40 uppercase tracking-[0.3em] block mb-6">
            Service Scope
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold font-serif text-[#E8E4DF] mb-6">
            What You Get
          </h2>
        </div>

        {/* Scope List */}
        <div className="space-y-12 md:space-y-16">
          {service.scope.map((item, index) => (
            <div
              key={index}
              className="scope-item group"
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
                {/* Number */}
                <div className="shrink-0">
                  <span className="text-7xl md:text-8xl font-bold font-serif text-[#E8E4DF]/20 group-hover:text-[#E8E4DF]/40 transition-colors duration-500">
                    {item.number}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif text-[#E8E4DF] mb-4 group-hover:text-[#E8E4DF]/90 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-lg md:text-xl text-[#E8E4DF]/70 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Smooth Tooltip Gallery */}
      {hoveredIndex !== null && (
        <div
          ref={tooltipRef}
          className="fixed pointer-events-none z-50 w-72 h-56 rounded-xl overflow-hidden shadow-2xl transition-transform duration-500 ease-out"
          style={{
            left: `${cursorPos.x + 20}px`,
            top: `${cursorPos.y + 20}px`,
          }}
        >
          <img
            src={service.scope[hoveredIndex].image}
            alt={service.scope[hoveredIndex].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          
          {/* Caption */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="text-sm font-medium text-white">
              {service.scope[hoveredIndex].title}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

// 4. The Gumi Edge Section
function EdgeSection({ service }: { service: ServiceData }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".edge-item", {
      y: 100,
      opacity: 0,
      filter: "blur(30px)",
      duration: 1.2,
      stagger: 0.3,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    });

    // Animate stats
    gsap.from(".stat-value", {
      textContent: 0,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".growth-stats",
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="bg-black py-24 md:py-32 px-4 md:px-8 lg:px-12">
      <div className="w-full max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="edge-item mb-16 md:mb-24">
          <span className="text-xs font-medium text-[#E8E4DF]/40 uppercase tracking-[0.3em] block mb-6">
            The Gumi Edge
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold font-serif text-[#E8E4DF] mb-6">
            Why Choose Us
          </h2>
        </div>

        {/* Expertise */}
        <div className="edge-item mb-16 md:mb-24">
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif text-[#E8E4DF] mb-6">
            {service.edge.expertise.title}
          </h3>
          <p className="text-xl md:text-2xl text-[#E8E4DF]/70 font-light leading-relaxed max-w-4xl">
            {service.edge.expertise.description}
          </p>
        </div>

        {/* Growth Stats */}
        <div className="edge-item growth-stats mb-16 md:mb-24">
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif text-[#E8E4DF] mb-12">
            {service.edge.growth.title}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12">
            {service.edge.growth.stats.map((stat, index) => (
              <div key={index} className="text-center md:text-left">
                <div className="stat-value text-6xl md:text-7xl lg:text-8xl font-bold font-serif text-[#E8E4DF] mb-4">
                  {stat.value}
                </div>
                <div className="text-lg md:text-xl text-[#E8E4DF]/60 font-light uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <p className="text-lg md:text-xl text-[#E8E4DF]/70 font-light leading-relaxed max-w-4xl">
            {service.edge.growth.description}
          </p>
        </div>

        {/* Authenticity */}
        {service.edge.authenticity && (
          <div className="edge-item">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif text-[#E8E4DF] mb-6">
              {service.edge.authenticity.title}
            </h3>
            <p className="text-xl md:text-2xl text-[#E8E4DF]/70 font-light leading-relaxed max-w-4xl">
              {service.edge.authenticity.description}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

// 5. Case Studies Section
function CaseStudiesSection({ service }: { service: ServiceData }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".case-header", {
      y: 80,
      opacity: 0,
      filter: "blur(30px)",
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    });

    gsap.from(".case-card", {
      y: 100,
      opacity: 0,
      filter: "blur(35px)",
      scale: 0.95,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%",
        toggleActions: "play none none reverse",
      },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="bg-[#0a0a0a] py-24 md:py-32 px-4 md:px-8 lg:px-12">
      <div className="w-full max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="case-header mb-16 md:mb-24">
          <span className="text-xs font-medium text-[#E8E4DF]/40 uppercase tracking-[0.3em] block mb-6">
            Proven Results
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold font-serif text-[#E8E4DF] mb-6">
            Success Stories
          </h2>
          <p className="text-lg md:text-xl text-[#E8E4DF]/70 font-light max-w-3xl">
            See how we've helped businesses like yours achieve remarkable growth through strategic social media management.
          </p>
        </div>

        {/* Case Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {service.caseStudies.map((study, index) => (
            <Link
              key={index}
              href={`/works/${study.slug}`}
              className="case-card group block"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] mb-6 overflow-hidden rounded-lg">
                <img
                  src={study.image}
                  alt={study.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Results Badge */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                    <p className="text-sm font-medium text-white">
                      {study.results}
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div>
                <p className="text-sm text-[#E8E4DF]/60 uppercase tracking-wider mb-2">
                  {study.category}
                </p>
                <h3 className="text-2xl md:text-3xl font-bold text-[#E8E4DF] mb-4 group-hover:text-[#E8E4DF]/80 transition-colors duration-300">
                  {study.title}
                </h3>
                
                {/* View Case Study Link */}
                <div className="flex items-center gap-2 text-[#E8E4DF]/60 group-hover:text-[#E8E4DF] transition-colors duration-300">
                  <span className="text-sm font-medium">View Case Study</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// Main Component
export function ServiceDetail({ service }: ServiceDetailProps) {
  return (
    <div className="bg-black">
      <HeroSection service={service} />
      <StrategySection service={service} />
      <ScopeSection service={service} />
      <EdgeSection service={service} />
      <CaseStudiesSection service={service} />
    </div>
  );
}
