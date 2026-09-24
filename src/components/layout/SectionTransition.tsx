"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

interface SectionTransitionProps {
  children: React.ReactNode;
  /**
   * The ingredient element that bridges sections.
   * 'sauce' — amber sauce splash wipe
   * 'smoke' — smoke dissipation reveal
   * 'cheese' — cheese stretch transition
   * 'crumbs' — floating crumb particles
   * 'none' — standard fade transition
   */
  transitionType?: "sauce" | "smoke" | "cheese" | "crumbs" | "none";
  /** Label shown during transition */
  transitionLabel?: string;
  /** GSAP scrub intensity */
  scrubIntensity?: number;
}

export function SectionTransition({
  children,
  transitionType = "smoke",
  transitionLabel,
  scrubIntensity = 1,
}: SectionTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const content = contentRef.current;
      const overlay = overlayRef.current;
      if (!container || !content) return;

      // Content reveal animation driven by scroll
      gsap.fromTo(
        content,
        {
          y: 80,
          opacity: 0,
          scale: 0.97,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container,
            start: "top 85%",
            end: "top 25%",
            scrub: scrubIntensity,
          },
        }
      );

      // Overlay fade effect
      if (overlay) {
        gsap.fromTo(
          overlay,
          { opacity: 1 },
          {
            opacity: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: container,
              start: "top 90%",
              end: "top 50%",
              scrub: scrubIntensity,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [scrubIntensity]);

  const getOverlayStyle = (): React.CSSProperties => {
    switch (transitionType) {
      case "sauce":
        return {
          background: "linear-gradient(180deg, #060606 0%, rgba(255,157,0,0.15) 40%, rgba(255,90,0,0.08) 70%, transparent 100%)",
        };
      case "cheese":
        return {
          background: "linear-gradient(180deg, #060606 0%, rgba(255,200,50,0.08) 50%, transparent 100%)",
        };
      case "crumbs":
        return {
          background: "linear-gradient(180deg, #060606 0%, rgba(180,140,80,0.06) 50%, transparent 100%)",
        };
      case "smoke":
      default:
        return {
          background: "linear-gradient(180deg, #060606 0%, rgba(30,30,30,0.5) 30%, transparent 100%)",
        };
    }
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Transition overlay */}
      {transitionType !== "none" && (
        <div
          ref={overlayRef}
          className="absolute top-0 left-0 right-0 h-40 z-10 pointer-events-none"
          style={getOverlayStyle()}
        >
          {/* Floating transition particles for sauce/crumbs */}
          {(transitionType === "sauce" || transitionType === "crumbs") && (
            <div className="absolute inset-0 overflow-hidden">
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: 3 + Math.random() * 5,
                    height: 3 + Math.random() * 5,
                    left: `${10 + Math.random() * 80}%`,
                    top: `${20 + Math.random() * 60}%`,
                    background: transitionType === "sauce" ? "#FF9D00" : "#B08850",
                    opacity: 0.2 + Math.random() * 0.3,
                  }}
                  animate={{
                    y: [-10, 10, -10],
                    x: [-5, 5, -5],
                    opacity: [0.1, 0.3, 0.1],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>
          )}

          {/* Transition label */}
          {transitionLabel && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
              <span className="text-[8px] font-mono uppercase tracking-[0.5em] text-white/15">
                {transitionLabel}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Actual content */}
      <div ref={contentRef}>
        {children}
      </div>
    </div>
  );
}
