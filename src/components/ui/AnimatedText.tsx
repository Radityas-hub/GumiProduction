"use client";

import { useRef } from "react";
import { useGSAP } from "@/hooks";
import { cn } from "@/lib";

interface AnimatedTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  animation?: "fadeUp" | "fadeIn" | "splitChars";
  delay?: number;
  duration?: number;
}

export function AnimatedText({
  text,
  className,
  as: Component = "p",
  animation = "fadeUp",
  delay = 0,
  duration = 1,
}: AnimatedTextProps) {
  const textRef = useRef<HTMLElement>(null);

  useGSAP(
    (gsap) => {
      if (!textRef.current) return;

      const animations = {
        fadeUp: {
          y: 50,
          opacity: 0,
        },
        fadeIn: {
          opacity: 0,
        },
        splitChars: {
          opacity: 0,
          y: 20,
          stagger: 0.03,
        },
      };

      if (animation === "splitChars") {
        // Split text into characters
        const chars = text.split("").map((char, i) => {
          const span = document.createElement("span");
          span.textContent = char === " " ? "\u00A0" : char;
          span.style.display = "inline-block";
          return span;
        });
        
        textRef.current.innerHTML = "";
        chars.forEach((char) => textRef.current?.appendChild(char));

        gsap.from(chars, {
          ...animations.splitChars,
          duration,
          delay,
          ease: "power3.out",
        });
      } else {
        gsap.from(textRef.current, {
          ...animations[animation],
          duration,
          delay,
          ease: "power3.out",
        });
      }
    },
    { scope: textRef }
  );

  return (
    <Component
      ref={textRef as React.RefObject<HTMLHeadingElement & HTMLParagraphElement & HTMLSpanElement>}
      className={cn(className)}
    >
      {text}
    </Component>
  );
}
