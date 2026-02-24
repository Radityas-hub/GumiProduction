"use client";

import { useRef } from "react";
import Link from "next/link";
import { Instagram, Twitter, ArrowRight, Mail } from "lucide-react";
import { useGSAP } from "@/hooks";

export function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const columnsRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useGSAP(
    (gsap) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // CTA Animation
      tl.from(ctaRef.current?.children || [], {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });

      // Columns Animation
      const columns = columnsRef.current?.children;
      if (columns) {
        tl.from(columns, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
        }, "-=0.5");
      }

      // Bottom Bar Animation
      tl.from(bottomRef.current, {
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      }, "-=0.5");
    },
    { scope: containerRef }
  );

  return (
    <footer
      ref={containerRef}
      className="bg-black text-white pt-24 pb-12 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      {/* CTA Section */}
      <div ref={ctaRef} className="border-b border-white/20 pb-20 mb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif max-w-4xl leading-tight">
          Ready to get started? <br />
          <a 
            href="https://wa.me/6285792047188?text=Halo%20Gumi%20Production%2C%20saya%20ingin%20bertanya%20lebih%20lanjut%20mengenai%20jasa%20produksi%20video/foto." 
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold flex items-center gap-4 mt-2 hover:text-[#d4d4d4] transition-colors group"
          >
            Get in touch 
            <ArrowRight className="w-8 h-8 md:w-12 md:h-12 transform group-hover:translate-x-2 transition-transform duration-300" />
          </a>
        </h2>
      </div>

      {/* Main Footer Content */}
      <div ref={columnsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
        {/* Column 1: Brand & Address */}
        <div className="space-y-8">
          <h3 className="text-3xl font-bold font-serif tracking-tight">GUMI</h3>
          <div className="text-white/60 space-y-4 text-sm leading-relaxed font-light">
            <p>
              Jalan Sunset Road No. 89
              <br />
              Seminyak, Bali 80361
              <br />
              Indonesia
            </p>
            <p className="flex items-center gap-2 pt-2 hover:text-white transition-colors cursor-pointer">
              <Mail className="w-4 h-4" /> gumiiproduction@gmail.com
            </p>
          </div>
        </div>

        {/* Column 2: Navigation */}
        <div className="flex flex-col gap-6">
          <h4 className="text-xs font-bold uppercase tracking-widest text-white/40">Work</h4>
          <div className="flex flex-col gap-3">
            {['Selected Works', 'Clients', 'About Us', 'Contact', 'F.A.Q'].map((item) => (
              <Link
                key={item}
                href={item === 'Contact' ? 'https://wa.me/6285792047188?text=Halo%20Gumi%20Production%2C%20saya%20tertarik%20bekerja%20sama.' : '#'}
                className="text-white/80 hover:text-white transition-colors text-sm font-medium w-fit relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-white after:transition-all after:duration-300 hover:after:w-full"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>

        {/* Column 3: Expertise */}
        <div className="flex flex-col gap-6">
          <h4 className="text-xs font-bold uppercase tracking-widest text-white/40">Expertise</h4>
          <div className="flex flex-col gap-3">
            {['Commercials', 'Documentaries', 'Social Content', 'Brand Identity', 'Post-Production'].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-white/80 hover:text-white transition-colors text-sm font-medium w-fit relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-white after:transition-all after:duration-300 hover:after:w-full"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>

        {/* Column 4: Socials */}
        <div className="flex flex-col gap-6">
          <h4 className="text-2xl md:text-3xl font-bold font-serif">Follow @gumiiproduction</h4>
          <div className="flex gap-4">
            <a
              href="https://www.instagram.com/gumiiproduction/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all duration-300 group"
            >
              <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div ref={bottomRef} className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-white/40 gap-6 font-light">
        <p>&copy; {new Date().getFullYear()} Gumi Agency. All rights reserved.</p>
        <div className="flex gap-8">
          <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-white transition-colors">Terms & Conditions</Link>
          <Link href="#" className="hover:text-white transition-colors">Sitemap</Link>
        </div>
      </div>
    </footer>
  );
}
