"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib";
import { useGSAP } from "@/hooks";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

interface ProjectData {
  slug: string;
  title: string;
  category: string;
  year: string;
  heroVideo: string;
  heroPoster: string;
  challenge: string;
  solution: string;
  gallery: Array<{
    type: "video" | "image";
    src: string;
    caption: string;
  }>;
  btsImage: string;
  btsQuote: string;
  impact: Array<{
    metric: string;
    label: string;
  }>;
  testimonial: {
    quote: string;
    author: string;
    position: string;
    avatar: string;
  };
  nextProject: {
    slug: string;
    title: string;
    category: string;
  };
}

interface ProjectDetailProps {
  project: ProjectData;
}

// 1. Hero Section Component
function HeroSection({ project }: { project: ProjectData }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Entrance animation
    gsap.from(heroRef.current, {
      scale: 0.9,
      opacity: 0,
      filter: "blur(20px)",
      duration: 1.2,
      ease: "power3.out",
    });

    // Parallax effect on scroll
    gsap.to(videoRef.current, {
      scale: 1.1,
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    gsap.to(overlayRef.current, {
      opacity: 0.8,
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
        src={project.heroVideo}
        poster={project.heroPoster}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover scale-100"
      />

      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"
      />

      {/* Content */}
      <div className="absolute inset-0 flex items-end justify-start p-8 md:p-16 lg:p-24">
        <div className="max-w-4xl">
          <div className="mb-4 opacity-80">
            <span className="text-sm md:text-base font-medium text-[#E8E4DF] uppercase tracking-[0.3em]">
              {project.year} — {project.category}
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-serif text-[#E8E4DF] leading-[0.95] mb-8">
            {project.title}
          </h1>
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

// 2. Brief & Core Concept Section
function BriefSection({ project }: { project: ProjectData }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".brief-item", {
      y: 100,
      opacity: 0,
      filter: "blur(20px)",
      duration: 1,
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
    <section
      ref={sectionRef}
      className="bg-black py-24 md:py-32 px-4 md:px-8 lg:px-12"
    >
      <div className="w-full max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 lg:gap-24">
          {/* The Challenge */}
          <div className="brief-item">
            <div className="mb-8">
              <span className="text-xs font-medium text-[#E8E4DF]/40 uppercase tracking-[0.3em]">
                01 — The Challenge
              </span>
            </div>
            <p className="text-2xl md:text-3xl lg:text-4xl font-light text-[#E8E4DF] leading-relaxed">
              {project.challenge}
            </p>
          </div>

          {/* The Solution */}
          <div className="brief-item">
            <div className="mb-8">
              <span className="text-xs font-medium text-[#E8E4DF]/40 uppercase tracking-[0.3em]">
                02 — The Solution
              </span>
            </div>
            <p className="text-2xl md:text-3xl lg:text-4xl font-light text-[#E8E4DF] leading-relaxed">
              {project.solution}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// 3. Visual Showcase Gallery
function GallerySection({ project }: { project: ProjectData }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);

  useGSAP(() => {
    gsap.from(".gallery-item", {
      y: 80,
      opacity: 0,
      filter: "blur(30px)",
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="bg-[#0a0a0a] py-24 md:py-32 px-4 md:px-8 lg:px-12"
    >
      <div className="w-full max-w-[1600px] mx-auto">
        {/* Section Header */}
        <div className="mb-16 md:mb-24">
          <span className="text-xs font-medium text-[#E8E4DF]/40 uppercase tracking-[0.3em]">
            03 — Visual Showcase
          </span>
          <h2 className="text-4xl md:text-6xl font-bold font-serif text-[#E8E4DF] mt-4">
            The Details Matter
          </h2>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {project.gallery.map((item, index) => (
            <div
              key={index}
              className={cn(
                "gallery-item relative group overflow-hidden rounded-lg bg-[#1a1a1a]",
                index === 0 && "md:col-span-2 md:row-span-2",
                index === 3 && "lg:col-span-2"
              )}
            >
              {item.type === "video" ? (
                <div className="relative aspect-video">
                  <video
                    src={item.src}
                    poster={project.heroPoster}
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                    onMouseEnter={(e) => e.currentTarget.play()}
                    onMouseLeave={(e) => {
                      e.currentTarget.pause();
                      e.currentTarget.currentTime = 0;
                    }}
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Play className="w-4 h-4 text-white" />
                  </div>
                </div>
              ) : (
                <div className="relative aspect-video">
                  <img
                    src={item.src}
                    alt={item.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
              )}

              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-xs md:text-sm text-[#E8E4DF]/80 font-light italic">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 4. Behind The Lens Section
function BehindTheLensSection({ project }: { project: ProjectData }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".bts-content", {
      y: 100,
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

    // Parallax image
    gsap.to(imageRef.current, {
      y: -50,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="bg-black py-24 md:py-32 px-4 md:px-8 lg:px-12 overflow-hidden"
    >
      <div className="w-full max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Image */}
          <div className="relative h-[500px] md:h-[700px] overflow-hidden rounded-lg bts-content">
            <div ref={imageRef} className="absolute inset-0 -top-12 -bottom-12">
              <img
                src={project.btsImage}
                alt="Behind the scenes"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
          </div>

          {/* Content */}
          <div className="bts-content">
            <div className="mb-8">
              <span className="text-xs font-medium text-[#E8E4DF]/40 uppercase tracking-[0.3em]">
                04 — Behind The Lens
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-[#E8E4DF] mb-8 leading-tight">
              Authenticity in Every Frame
            </h2>
            <blockquote className="text-xl md:text-2xl lg:text-3xl font-light text-[#E8E4DF]/80 leading-relaxed italic border-l-2 border-[#E8E4DF]/30 pl-8">
              "{project.btsQuote}"
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}

// 5. Impact & Results Section
function ImpactSection({ project }: { project: ProjectData }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".impact-metric", {
      y: 60,
      opacity: 0,
      filter: "blur(20px)",
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    });

    gsap.from(".testimonial-card", {
      y: 80,
      opacity: 0,
      filter: "blur(30px)",
      duration: 1.2,
      ease: "power3.out",
      delay: 0.5,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="bg-[#0a0a0a] py-24 md:py-32 px-4 md:px-8 lg:px-12"
    >
      <div className="w-full max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="mb-16 md:mb-24">
          <span className="text-xs font-medium text-[#E8E4DF]/40 uppercase tracking-[0.3em]">
            05 — Impact & Results
          </span>
          <h2 className="text-4xl md:text-6xl font-bold font-serif text-[#E8E4DF] mt-4">
            The Business Value
          </h2>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-24">
          {project.impact.map((item, index) => (
            <div key={index} className="impact-metric text-center md:text-left">
              <div className="text-6xl md:text-7xl lg:text-8xl font-bold font-serif text-[#E8E4DF] mb-4">
                {item.metric}
              </div>
              <div className="text-lg md:text-xl text-[#E8E4DF]/60 font-light uppercase tracking-wider">
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div className="testimonial-card bg-[#1a1a1a] rounded-2xl p-8 md:p-12 lg:p-16">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Avatar */}
            <div className="shrink-0">
              <img
                src={project.testimonial.avatar}
                alt={project.testimonial.author}
                className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex-1">
              <blockquote className="text-xl md:text-2xl lg:text-3xl font-light text-[#E8E4DF] leading-relaxed mb-8 italic">
                "{project.testimonial.quote}"
              </blockquote>
              <div>
                <div className="text-lg md:text-xl font-medium text-[#E8E4DF] mb-1">
                  {project.testimonial.author}
                </div>
                <div className="text-sm md:text-base text-[#E8E4DF]/60">
                  {project.testimonial.position}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// 6. Next Project Section
function NextProjectSection({ project }: { project: ProjectData }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".next-project-content", {
      y: 100,
      opacity: 0,
      filter: "blur(40px)",
      duration: 1.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="bg-black py-32 md:py-48 px-4 md:px-8 lg:px-12 relative overflow-hidden"
    >
      <div className="w-full max-w-[1600px] mx-auto">
        <div className="next-project-content">
          <div className="mb-8">
            <span className="text-xs font-medium text-[#E8E4DF]/40 uppercase tracking-[0.3em]">
              Next Project
            </span>
          </div>

          <Link
            href={`/works/${project.nextProject.slug}`}
            className="group block"
          >
            <h2 className="text-6xl md:text-8xl lg:text-9xl font-bold font-serif text-[#E8E4DF] leading-[0.9] mb-6 group-hover:text-[#E8E4DF]/70 transition-colors duration-500">
              {project.nextProject.title}
            </h2>
            <div className="flex items-center gap-4 text-lg md:text-xl text-[#E8E4DF]/60 group-hover:text-[#E8E4DF] transition-colors duration-500">
              <span className="uppercase tracking-wider">{project.nextProject.category}</span>
              <span>→</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#E8E4DF]/20 to-transparent" />
    </section>
  );
}

// Main Component
export function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <div className="bg-black">
      <HeroSection project={project} />
      <BriefSection project={project} />
      <GallerySection project={project} />
      <BehindTheLensSection project={project} />
      <ImpactSection project={project} />
      <NextProjectSection project={project} />
    </div>
  );
}
