"use client";

import { useEffect, useRef, RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type GSAPCallback = (
  gsap: typeof import("gsap").gsap,
  ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger
) => void;

interface UseGSAPOptions {
  scope?: RefObject<HTMLElement | null>;
  dependencies?: unknown[];
}

/**
 * Custom hook for using GSAP animations with proper cleanup
 * 
 * @example
 * ```tsx
 * const containerRef = useRef<HTMLDivElement>(null);
 * 
 * useGSAP((gsap, ScrollTrigger) => {
 *   gsap.from(".box", {
 *     opacity: 0,
 *     y: 100,
 *     scrollTrigger: {
 *       trigger: ".box",
 *       start: "top 80%",
 *     }
 *   });
 * }, { scope: containerRef });
 * ```
 */
export function useGSAP(
  callback: GSAPCallback,
  options: UseGSAPOptions = {}
) {
  const { scope, dependencies = [] } = options;
  const contextRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    // Create GSAP context for proper cleanup
    const ctx = gsap.context(() => {
      callback(gsap, ScrollTrigger);
    }, scope?.current || undefined);

    contextRef.current = ctx;

    // Cleanup on unmount or when dependencies change
    return () => {
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return contextRef;
}
