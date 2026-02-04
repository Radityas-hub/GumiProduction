"use client";

import { useRef } from "react";
import { useGSAP } from "@/hooks";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Dummy data - ready for replacement
const MISSION_DATA = {
  title: "Where Bali Meets Cinema",
  description: "Born from the lush landscapes of Bali, Gumi Production bridges the gap between authentic local storytelling and world-class cinematic standards. We don't just create content—we craft visual narratives that honor cultural richness while speaking the universal language of emotion.",
  values: [
    {
      title: "Cultural Authenticity",
      description: "Every frame respects and celebrates the spirit of Bali, weaving local wisdom into global narratives.",
    },
    {
      title: "Cinematic Excellence",
      description: "We hold ourselves to international production standards, ensuring every project meets the highest quality benchmarks.",
    },
    {
      title: "Emotional Storytelling",
      description: "Beyond technical perfection, we create stories that resonate, inspire, and leave lasting impressions.",
    },
  ],
};

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Design Thinking & Ideas",
    description: "We begin by deeply understanding your vision, audience, and objectives. Through collaborative brainstorming and creative exploration, we develop concepts that align with your brand story.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
  },
  {
    number: "02",
    title: "Planning & Pre-Production",
    description: "Meticulous planning transforms ideas into actionable blueprints. From storyboarding to location scouting, we ensure every detail is mapped out before cameras roll.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
  },
  {
    number: "03",
    title: "Implementation & Production",
    description: "This is where magic happens. Our experienced crew brings the vision to life with precision, creativity, and unwavering commitment to excellence.",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=600&fit=crop",
  },
  {
    number: "04",
    title: "Evaluation & Delivery",
    description: "Post-production polish and rigorous quality checks ensure the final product exceeds expectations. We deliver content that's ready to captivate your audience.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop",
  },
];

const TEAM_MEMBERS = [
  {
    name: "Arjuna Wijaya",
    role: "Creative Director",
    bio: "With 12+ years in visual storytelling, Arjuna leads our creative vision, ensuring every project carries the soul of Bali.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=faces",
  },
  {
    name: "Kadek Saraswati",
    role: "Lead Videographer",
    bio: "A master of light and composition, Kadek captures moments that transcend the ordinary, bringing cinematic beauty to every frame.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces",
  },
  {
    name: "Made Putra",
    role: "Senior Editor",
    bio: "Made transforms raw footage into compelling narratives, weaving emotion and rhythm into every cut.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces",
  },
  {
    name: "Wayan Surya",
    role: "Director of Photography",
    bio: "Wayan's technical expertise and artistic vision ensure every shot is perfectly crafted, from lighting to lens choice.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces",
  },
  {
    name: "Ni Luh Ayu",
    role: "Production Manager",
    bio: "The backbone of our operations, Ayu ensures seamless execution from concept to delivery.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces",
  },
  {
    name: "Komang Adi",
    role: "Motion Graphics Artist",
    bio: "Komang brings ideas to life through stunning animations and visual effects that elevate our storytelling.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=faces",
  },
];

// Hero Section
function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    gsap.from(titleRef.current, {
      y: 100,
      opacity: 0,
      filter: "blur(40px)",
      duration: 1.5,
      ease: "power3.out",
    });

    // Parallax effect
    gsap.to(heroRef.current, {
      backgroundPosition: "50% 100%",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });
  }, { scope: heroRef });

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1920&h=1080&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "50% 50%",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h1
          ref={titleRef}
          className="text-6xl md:text-8xl lg:text-9xl font-bold font-serif text-[#E8E4DF] leading-[0.9] mb-6"
        >
          The Narrative
        </h1>
        <p className="text-xl md:text-2xl text-[#E8E4DF]/80 font-light max-w-2xl mx-auto">
          Our Story, Our Mission, Our People
        </p>
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

// Mission Section
function MissionSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".mission-title", {
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

    gsap.from(".mission-description", {
      y: 60,
      opacity: 0,
      filter: "blur(20px)",
      duration: 1,
      delay: 0.3,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    });

    gsap.from(".mission-value", {
      y: 80,
      opacity: 0,
      filter: "blur(25px)",
      duration: 1,
      stagger: 0.2,
      delay: 0.6,
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
        <div className="mb-16 md:mb-24">
          <span className="mission-title text-xs font-medium text-[#E8E4DF]/40 uppercase tracking-[0.3em] block mb-6">
            The Mission
          </span>
          <h2 className="mission-title text-4xl md:text-6xl lg:text-7xl font-bold font-serif text-[#E8E4DF] mb-8 leading-tight">
            {MISSION_DATA.title}
          </h2>
          <p className="mission-description text-xl md:text-2xl lg:text-3xl font-light text-[#E8E4DF]/80 leading-relaxed max-w-4xl">
            {MISSION_DATA.description}
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {MISSION_DATA.values.map((value, index) => (
            <div key={index} className="mission-value">
              <div className="mb-6">
                <span className="text-6xl md:text-7xl font-bold font-serif text-[#E8E4DF]/20">
                  0{index + 1}
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-[#E8E4DF] mb-4">
                {value.title}
              </h3>
              <p className="text-base md:text-lg text-[#E8E4DF]/70 font-light leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Process Section
function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".process-header", {
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

    gsap.from(".process-step", {
      y: 100,
      opacity: 0,
      filter: "blur(35px)",
      duration: 1.2,
      stagger: 0.3,
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
        <div className="process-header mb-16 md:mb-24">
          <span className="text-xs font-medium text-[#E8E4DF]/40 uppercase tracking-[0.3em] block mb-6">
            The Process
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold font-serif text-[#E8E4DF] mb-6">
            How We Work
          </h2>
          <p className="text-lg md:text-xl text-[#E8E4DF]/70 font-light max-w-3xl">
            Our proven methodology ensures exceptional results, from initial concept to final delivery.
          </p>
        </div>

        {/* Process Steps */}
        <div className="space-y-24 md:space-y-32">
          {PROCESS_STEPS.map((step, index) => (
            <div
              key={index}
              className={`process-step grid md:grid-cols-2 gap-12 md:gap-16 items-center ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Image */}
              <div className={`relative ${index % 2 === 1 ? "md:order-2" : ""}`}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
              </div>

              {/* Content */}
              <div className={index % 2 === 1 ? "md:order-1" : ""}>
                <div className="mb-6">
                  <span className="text-7xl md:text-8xl font-bold font-serif text-[#E8E4DF]/10">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif text-[#E8E4DF] mb-6 leading-tight">
                  {step.title}
                </h3>
                <p className="text-lg md:text-xl text-[#E8E4DF]/70 font-light leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Team Section
function TeamSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".team-header", {
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

    gsap.from(".team-member", {
      y: 100,
      opacity: 0,
      filter: "blur(30px)",
      scale: 0.95,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%",
        toggleActions: "play none none reverse",
      },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="bg-black py-24 md:py-32 px-4 md:px-8 lg:px-12">
      <div className="w-full max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="team-header mb-16 md:mb-24">
          <span className="text-xs font-medium text-[#E8E4DF]/40 uppercase tracking-[0.3em] block mb-6">
            The Team
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold font-serif text-[#E8E4DF] mb-6">
            Meet The Creators
          </h2>
          <p className="text-lg md:text-xl text-[#E8E4DF]/70 font-light max-w-3xl">
            Talented individuals united by passion for visual storytelling and commitment to excellence.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {TEAM_MEMBERS.map((member, index) => (
            <div key={index} className="team-member group">
              {/* Image */}
              <div className="relative aspect-square mb-6 overflow-hidden rounded-lg">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
              </div>

              {/* Content */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-[#E8E4DF] mb-2">
                  {member.name}
                </h3>
                <p className="text-sm md:text-base text-[#E8E4DF]/60 uppercase tracking-wider mb-4">
                  {member.role}
                </p>
                <p className="text-base md:text-lg text-[#E8E4DF]/70 font-light leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Main Component
export function NarrativeSection() {
  return (
    <div className="bg-black">
      <HeroSection />
      <MissionSection />
      <ProcessSection />
      <TeamSection />
    </div>
  );
}
