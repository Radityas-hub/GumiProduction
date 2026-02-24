"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@/hooks";
import { cn } from "@/lib";
import { Check, ArrowRight } from "lucide-react";

const SOCIAL_MEDIA_PRICING = [
  {
    name: "Basic Brand Package",
    price: "Rp 3.500.000",
    period: "/month",
    features: [
      "1x content capture session/month",
      "20 photos + 6 video reels",
      "Copywriting & feed design",
      "Instagram + Facebook account management",
      "Regular posting (3-4 times per week)",
    ],
    highlight: false,
    whatsappLink: "https://wa.me/6285792047188?text=Halo%20Gumi%20Production%2C%20saya%20tertarik%20dengan%20paket%20Basic%20Brand%20Package%20(Rp%203.5jt).%20Boleh%20tanya-tanya%20lebih%20detail%3F",
  },
  {
    name: "Growth Package",
    price: "Rp 5.000.000",
    period: "/month",
    features: [
      "3x content capture session/month",
      "30 photos + 10 video reels",
      "Copywriting, design & content strategy",
      "Instagram, Facebook, and TikTok management",
      "Ads management (separate costs)",
    ],
    highlight: true,
    whatsappLink: "https://wa.me/6285792047188?text=Halo%20Gumi%20Production%2C%20saya%20tertarik%20dengan%20paket%20Growth%20Package%20(Rp%205jt).%20Boleh%20konsultasi%20mengenai%20strategi%20konten%20saya%3F",
  },
  {
    name: "Premium Brand Boost",
    price: "Rp 7.000.000",
    period: "/month",
    features: [
      "4x content capture session/month",
      "40 photos + 15 video reels",
      "All-platform management",
      "Monthly performance reports",
      "Comprehensive digital campaign strategy",
    ],
    highlight: false,
    whatsappLink: "https://wa.me/6285792047188?text=Halo%20Gumi%20Production%2C%20saya%20tertarik%20dengan%20paket%20Premium%20Brand%20Boost%20(Rp%207jt).%20Mohon%20informasi%20selengkapnya%20mengenai%20layanan%20full%20management%20ini.",
  },
];

const TIKTOK_PRICING = [
  {
    name: "Basic TikTok",
    price: "Rp 1.500.000",
    period: "/month",
    features: [
      "8 video/bulan",
      "Content planning",
      "TikTok account management",
      "Content posting & management",
      "Ads strategy",
    ],
    highlight: false,
    whatsappLink: "https://wa.me/6285792047188?text=Halo%20Gumi%20Production%2C%20saya%20tertarik%20dengan%20paket%20Basic%20TikTok%20(Rp%201.5jt).%20Bagaimana%20prosedur%20mulainya%3F",
  },
  {
    name: "Professional TikTok",
    price: "Rp 2.200.000",
    period: "/month",
    features: [
      "15 video/bulan",
      "Content planning",
      "TikTok account management",
      "Posting & advertising strategy",
    ],
    highlight: true,
    whatsappLink: "https://wa.me/6285792047188?text=Halo%20Gumi%20Production%2C%20saya%20tertarik%20dengan%20paket%20Professional%20TikTok%20(Rp%202.2jt).%20Bisa%20minta%20info%20lengkap%20mengenai%20strategi%20postingnya%3F",
  },
  {
    name: "TikTok Live",
    price: "Rp 100.000",
    period: "/jam",
    features: [
      "Live session support",
      "Professional host engagement",
      "Equipment setup provided",
      "Transportation: IDR 50k (if on-site)",
    ],
    highlight: false,
    whatsappLink: "https://wa.me/6285792047188?text=Halo%20Gumi%20Production%2C%20saya%20tertarik%20dengan%20layanan%20TikTok%20Live.%20Boleh%20tanya%20mengenai%20host%20dan%20ketersediaan%20jadwalnya%3F",
  },
];

export function PricingSection() {
  const [activeTab, setActiveTab] = useState<"social" | "tiktok">("social");
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    (gsap) => {
      // Entrance Animation for Header
      gsap.from(headerRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Animation for Cards (runs on initial load and when activeTab changes)
      const cards = gsap.utils.toArray(".pricing-card");
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          {
            y: 30,
            opacity: 0,
            filter: "blur(10px)",
          },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    },
    { scope: containerRef, dependencies: [activeTab] }
  );

  const currentPricing = activeTab === "social" ? SOCIAL_MEDIA_PRICING : TIKTOK_PRICING;

  return (
    <section
      ref={containerRef}
      id="pricing"
      className="bg-[#EAE8E4] py-32 px-4 md:px-8 lg:px-12"
    >
      <div className="w-full max-w-[1400px] mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-bold font-serif text-[#1a1a1a] mb-8">
            Service Packages
          </h2>
          <p className="text-lg text-[#1a1a1a]/60 max-w-2xl mx-auto mb-12">
            Choose the perfect plan to elevate your culinary brand's digital presence.
            Tailored strategies for Instagram, TikTok, and beyond.
          </p>

          {/* Tab Switcher */}
          <div className="flex items-center justify-center gap-4 bg-black/5 p-1 rounded-full w-fit mx-auto">
            <button
              onClick={() => setActiveTab("social")}
              className={cn(
                "px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer",
                activeTab === "social"
                  ? "bg-[#1a1a1a] text-white shadow-lg"
                  : "text-[#1a1a1a]/40 hover:text-[#1a1a1a]"
              )}
            >
              Social Media Mgmt
            </button>
            <button
              onClick={() => setActiveTab("tiktok")}
              className={cn(
                "px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer",
                activeTab === "tiktok"
                  ? "bg-[#1a1a1a] text-white shadow-lg"
                  : "text-[#1a1a1a]/40 hover:text-[#1a1a1a]"
              )}
            >
              TikTok Direct
            </button>
          </div>
        </div>

        {/* Pricing Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start"
        >
          {currentPricing.map((pkg, idx) => (
            <div
              key={pkg.name}
              className={cn(
                "pricing-card relative p-8 md:p-10 rounded-2xl border transition-all duration-500 hover:scale-[1.02]",
                pkg.highlight
                  ? "bg-[#1a1a1a] text-white border-[#1a1a1a] shadow-2xl scale-105 z-10"
                  : "bg-white text-[#1a1a1a] border-black/5"
              )}
            >
              {pkg.highlight && (
                <div className="absolute top-0 right-10 -translate-y-1/2 bg-[#EAE8E4] text-[#1a1a1a] text-[10px] uppercase tracking-widest font-bold py-1 px-4 rounded-full border border-black/10">
                  Most Popular
                </div>
              )}

              <h3 className="text-xl font-serif font-medium mb-2">{pkg.name}</h3>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-3xl md:text-4xl font-bold">{pkg.price}</span>
                <span className={cn("text-sm", pkg.highlight ? "text-white/60" : "text-black/40")}>
                  {pkg.period}
                </span>
              </div>

              <div className="space-y-4 mb-10">
                {pkg.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <Check
                      className={cn(
                        "w-5 h-5 shrink-0 mt-0.5",
                        pkg.highlight ? "text-white" : "text-[#1a1a1a]"
                      )}
                    />
                    <span className={cn("text-sm leading-relaxed", pkg.highlight ? "text-white/80" : "text-black/70")}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <a
                href={pkg.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "w-full py-4 rounded-xl flex items-center justify-center gap-2 group transition-all duration-300 overflow-hidden relative cursor-pointer",
                  pkg.highlight
                    ? "bg-white text-[#1a1a1a] hover:bg-white/90"
                    : "bg-[#1a1a1a] text-white hover:bg-[#1a1a1a]/90"
                )}
              >
                <span className="text-sm font-medium z-10">Inquire Now</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 z-10" />
              </a>
            </div>
          ))}
        </div>

        {/* Note */}
        <p className="mt-16 text-center text-sm text-[#1a1a1a]/40 italic">
          * Advertising costs are not included (adjusted to the client's budget). <br className="hidden md:block" />
          Prices can be adjusted based on the client's needs and location.
        </p>
      </div>
    </section>
  );
}
