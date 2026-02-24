"use client";

import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@/hooks";
import { cn } from "@/lib";
import { ArrowRight, ChevronDown } from "lucide-react";
import { gsap } from "gsap";
import Link from "next/link";

interface NavbarProps {
  className?: string;
}

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { 
    name: "Services", 
    href: "#", 
    dropdown: [
      { name: "Social Media Management", href: "/services/social-media-management" },
      { name: "Company Profile", href: "/services/social-media-management" },
      { name: "Content Creation", href: "/services/social-media-management" },
      { name: "Music Video & Film", href: "/services/social-media-management" },
    ]
  },
  { name: "Works", href: "/works" },
];

export function Navbar({ className }: NavbarProps) {
  const navRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);
  const isHidden = useRef(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const tween = useRef<gsap.core.Tween | null>(null);

  // Handle scroll hide/show with direct GSAP
  useEffect(() => {
    const navbar = navRef.current;
    if (!navbar) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY.current ? "down" : "up";

      // Set scrolled state
      setIsScrolled(currentScrollY > 50);
      
      // Only trigger animation if state changes
      if (direction === "down" && currentScrollY > 100 && !isHidden.current) {
        isHidden.current = true;
        // Kill previous tween to prevent conflicts
        tween.current?.kill();
        tween.current = gsap.to(navbar, {
          y: -100,
          duration: 0.5,
          ease: "power3.inOut",
        });
      } else if (direction === "up" && isHidden.current) {
        isHidden.current = false;
        tween.current?.kill();
        tween.current = gsap.to(navbar, {
          y: 0,
          duration: 0.4,
          ease: "power3.out",
        });
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      tween.current?.kill();
    };
  }, []);

  useGSAP(
    (gsap) => {
      // Initial entrance animation
      gsap.from(navRef.current, {
        y: -15,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.1,
      });

      gsap.from(".nav-link", {
        y: -8,
        opacity: 0,
        duration: 0.4,
        stagger: 0.06,
        ease: "power2.out",
        delay: 0.2,
      });
    },
    { scope: navRef }
  );

  return (
    <nav
      ref={navRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 px-8 py-6 transition-colors duration-300",
        isScrolled ? "bg-[#E8E4DF] border-b-2 border-[#1a1a1a]/20" : "bg-transparent",
        className
      )}
    >
      <div className="w-full max-w-[1400px] mx-auto flex items-center justify-between">
      {/* Logo */}
      <Link 
        href="/" 
        className={cn(
          "text-xl tracking-tight transition-colors duration-300",
          isScrolled ? "text-[#1a1a1a] font-bold" : "text-white font-medium"
        )}
      >
        GumiProduction
      </Link>

      {/* Nav Links */}
      <div className="hidden md:flex items-center gap-10">
        {navLinks.map((link) => (
          <div 
            key={link.name} 
            className="relative"
            onMouseEnter={() => link.dropdown && setOpenDropdown(link.name)}
            onMouseLeave={() => link.dropdown && setOpenDropdown(null)}
          >
            {link.dropdown ? (
              // Services with Dropdown
              <button
                className={cn(
                  "nav-link text-base transition-colors duration-300 flex items-center gap-1 relative group",
                  isScrolled ? "text-[#1a1a1a] font-medium hover:text-black" : "text-white/90 hover:text-white"
                )}
              >
                {link.name}
                <ChevronDown className={cn(
                  "w-4 h-4 transition-transform duration-300",
                  openDropdown === link.name ? "rotate-180" : ""
                )} />
                
                {/* Underline Animation */}
                <span className={cn(
                  "absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-300 ease-out",
                  isScrolled ? "bg-[#1a1a1a]" : "bg-white"
                )} />
              </button>
            ) : (
              // Regular Link
              <Link
                href={link.href}
                className={cn(
                  "nav-link text-base transition-colors duration-300 relative group block",
                  isScrolled ? "text-[#1a1a1a] font-medium hover:text-black" : "text-white/90 hover:text-white"
                )}
              >
                {link.name}
                
                {/* Underline Animation */}
                <span className={cn(
                  "absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-300 ease-out",
                  isScrolled ? "bg-[#1a1a1a]" : "bg-white"
                )} />
              </Link>
            )}

            {/* Dropdown Menu */}
            {link.dropdown && openDropdown === link.name && (
              <div className="absolute top-full left-0 pt-2 w-64">
                <div className="bg-white rounded-lg shadow-2xl overflow-hidden border border-[#1a1a1a]/10">
                  {link.dropdown.map((item, index) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-6 py-3 text-[#1a1a1a] hover:bg-[#E8E4DF] transition-colors duration-200 text-sm font-medium"
                      style={{
                        animation: `slideDown 0.3s ease-out ${index * 0.05}s both`
                      }}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Contact Button */}
        <a
          href="https://wa.me/6285792047188?text=Halo%20Gumi%20Production%2C%20saya%20tertarik%20bekerja%20sama%20dan%20ingin%20berkonsultasi%20mengenai%20proyek%20saya."
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center w-fit overflow-hidden"
        >
          {/* Left Arrow - Slides in */}
          <div className={cn(
            "h-10 rounded-full flex items-center justify-center overflow-hidden transition-[width,opacity,background-color] duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] w-0 opacity-0 group-hover:w-10 group-hover:opacity-100",
            isScrolled ? "bg-[#1a1a1a]" : "bg-[#E8E4DF]"
          )}>
             <div className="w-10 h-10 flex items-center justify-center flex-none">
              <ArrowRight className={cn("w-4 h-4", isScrolled ? "text-[#E8E4DF]" : "text-[#1a1a1a]")} />
            </div>
          </div>

          {/* Text */}
          <span className={cn(
            "px-5 h-10 flex items-center justify-center rounded-full text-base font-light tracking-wide z-10 mx-[-2px] transition-colors duration-300",
            isScrolled ? "bg-[#1a1a1a] text-[#E8E4DF]" : "bg-[#E8E4DF] text-[#1a1a1a]"
          )}>
            Contact
          </span>

          {/* Right Arrow - Slides out */}
          <div className={cn(
            "h-10 rounded-full flex items-center justify-center overflow-hidden transition-[width,opacity,background-color] duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] w-10 opacity-100 group-hover:w-0 group-hover:opacity-0",
            isScrolled ? "bg-[#1a1a1a]" : "bg-[#E8E4DF]"
          )}>
             <div className="w-10 h-10 flex items-center justify-center flex-none">
              <ArrowRight className={cn("w-4 h-4", isScrolled ? "text-[#E8E4DF]" : "text-[#1a1a1a]")} />
            </div>
          </div>
        </a>
      </div>

      {/* Mobile Menu Button */}
      <button className={cn("md:hidden transition-colors duration-300", isScrolled ? "text-[#1a1a1a]" : "text-white")}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>
      </div>

      {/* Dropdown Animation Styles */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </nav>
  );
}
