"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import { burgers } from "@/lib/data/burgers";
import { useScroll } from "@/components/layout/ScrollProvider";
import { BurgerCustomizerModal } from "./BurgerCustomizerModal";

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────
// 10 Distinct Burger Layers with calibrated physics offsets
// ─────────────────────────────────────────────────────────
export interface BurgerLayer {
  id: string;
  number: string;
  name: string;
  origin: string;
  detail: string;
  image: string;
  yOffset: number;        // vh displacement
  xOffset: number;        // vw displacement
  rotation: number;       // deg
  scale: number;
  zIndex: number;
  side: "left" | "right";
  color: string;
}

const BURGER_LAYERS: BurgerLayer[] = [
  {
    id: "top-bun",
    number: "01",
    name: "24K Gold Brioche Crown",
    origin: "Normandy, France",
    detail: "28% Beurre d'Isigny • 72-Hour Slow Ferment",
    image: "/layers/top-bun.jpg",
    yOffset: -58,
    xOffset: 6,
    rotation: -5,
    scale: 1.14,
    zIndex: 60,
    side: "left",
    color: "#FF9D00",
  },
  {
    id: "sauce",
    number: "02",
    name: "Golden Truffle Aioli & Glaze",
    origin: "Périgord, France",
    detail: "Smoked Bourbon Reduction • Black Truffle Emulsion",
    image: "/layers/sauce.jpg",
    yOffset: -46,
    xOffset: -10,
    rotation: 7,
    scale: 1.18,
    zIndex: 55,
    side: "right",
    color: "#FFD65A",
  },
  {
    id: "lettuce",
    number: "03",
    name: "Hydroponic Baby Butterhead",
    origin: "Vertical Bio-Farm",
    detail: "Zero-Pesticide Harvest • 4°C Crisp Retained",
    image: "/layers/lettuce.jpg",
    yOffset: -34,
    xOffset: 12,
    rotation: -4,
    scale: 1.12,
    zIndex: 50,
    side: "left",
    color: "#4ADE80",
  },
  {
    id: "onion",
    number: "04",
    name: "Charred Shallots & Crispy Straws",
    origin: "Vidalia Heritage",
    detail: "Cast-Iron Sweet Glazed • Flash-Fried Strings",
    image: "/layers/onion.jpg",
    yOffset: -22,
    xOffset: -14,
    rotation: 6,
    scale: 1.15,
    zIndex: 45,
    side: "right",
    color: "#E879F9",
  },
  {
    id: "tomato",
    number: "05",
    name: "Heirloom San Marzano Slice",
    origin: "Campania Volcanic Soil",
    detail: "Sun-Drenched Umami • Hand Cut 8mm Thick",
    image: "/layers/tomato.jpg",
    yOffset: -10,
    xOffset: 10,
    rotation: -3,
    scale: 1.08,
    zIndex: 40,
    side: "left",
    color: "#EF4444",
  },
  {
    id: "bacon",
    number: "06",
    name: "Applewood Smoked Berkshire Bacon",
    origin: "Heritage Kurobuta",
    detail: "16-Hour Hickory Cure • Maple Bourbon Glazed",
    image: "/layers/bacon.jpg",
    yOffset: 3,
    xOffset: -8,
    rotation: 5,
    scale: 1.1,
    zIndex: 36,
    side: "right",
    color: "#F97316",
  },
  {
    id: "cheese",
    number: "07",
    name: "Cave-Aged Swiss Gruyère AOP",
    origin: "Fribourg Alps, Switzerland",
    detail: "18-Month Cellar Matured • Molten 168°F Crust",
    image: "/layers/cheese.jpg",
    yOffset: 16,
    xOffset: 12,
    rotation: -4,
    scale: 1.22,
    zIndex: 32,
    side: "left",
    color: "#FACC15",
  },
  {
    id: "patty",
    number: "08",
    name: "200g Wagyu MS9+ Prime Patty",
    origin: "Hyogo Prefecture & Australian Reserve",
    detail: "45-Day Dry-Aged • Binchotan Charcoal Seared",
    image: "/layers/patty.jpg",
    yOffset: 29,
    xOffset: -6,
    rotation: 2,
    scale: 1.16,
    zIndex: 28,
    side: "right",
    color: "#FF5A00",
  },
  {
    id: "pickles",
    number: "09",
    name: "Bourbon Barrel Crinkle Pickles",
    origin: "Kentucky White Oak",
    detail: "Kentucky Mash Brine • Wild Dill Infusion",
    image: "/layers/pickles.jpg",
    yOffset: 41,
    xOffset: 8,
    rotation: -6,
    scale: 1.1,
    zIndex: 24,
    side: "left",
    color: "#84CC16",
  },
  {
    id: "bottom-bun",
    number: "10",
    name: "Brown Butter Brioche Heel",
    origin: "Normandy, France",
    detail: "Pan-Seared Golden Crust • Weight-Bearing Foundation",
    image: "/layers/bottom-bun.jpg",
    yOffset: 53,
    xOffset: -4,
    rotation: 4,
    scale: 1.08,
    zIndex: 20,
    side: "right",
    color: "#FF9D00",
  },
];

export function HeroExplosionSequence() {
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const burgerStageRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const hudContainerRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const [activeLayerIndex, setActiveLayerIndex] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [customizerOpen, setCustomizerOpen] = useState(false);

  const { scrollTo } = useScroll();
  const { addItem } = useCart();
  const flagshipBurger = burgers.find((b) => b.id === "ultimate-prime") || burgers[0];

  // ─── Mouse tracking for physical 3D parallax ───
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  }, []);

  // ─── Master GSAP ScrollTrigger Scrubbed Timeline ───
  useEffect(() => {
    const section = pinSectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const masterTL = gsap.timeline({
        defaults: { ease: "none" },
      });

      // ──────────────────────────────────────────
      // 1. Hero Content Exits (0% -> 18%)
      // ──────────────────────────────────────────
      if (heroContentRef.current) {
        masterTL.to(
          heroContentRef.current,
          {
            opacity: 0,
            y: -100,
            scale: 0.9,
            duration: 0.18,
            ease: "power2.in",
          },
          0
        );
      }

      // Scroll indicator fade
      if (scrollIndicatorRef.current) {
        masterTL.to(
          scrollIndicatorRef.current,
          { opacity: 0, duration: 0.08 },
          0
        );
      }

      // ──────────────────────────────────────────
      // 2. HUD Telemetry Enters (12% -> 22%)
      // ──────────────────────────────────────────
      if (hudContainerRef.current) {
        masterTL.to(
          hudContainerRef.current,
          {
            opacity: 1,
            duration: 0.1,
            ease: "power1.out",
          },
          0.12
        );
      }

      // ──────────────────────────────────────────
      // 3. Burger Explodes into 10 Layers (15% -> 80%)
      // ──────────────────────────────────────────
      BURGER_LAYERS.forEach((layer, i) => {
        const layerEl = layerRefs.current[i];
        const labelEl = labelRefs.current[i];
        if (!layerEl) return;

        // Progressive stagger as you scroll
        const startTime = 0.12 + (i / BURGER_LAYERS.length) * 0.45;
        const endTime = startTime + 0.35;

        // Separate Y, X, rotation, and scale directly scrubbed by scroll
        masterTL.to(
          layerEl,
          {
            y: `${layer.yOffset}vh`,
            x: `${layer.xOffset}vw`,
            rotation: layer.rotation,
            scale: layer.scale,
            duration: 0.4,
            ease: "power2.out",
          },
          startTime
        );

        // Associated telemetry label appearance
        if (labelEl) {
          masterTL.fromTo(
            labelEl,
            {
              opacity: 0,
              x: layer.side === "left" ? -40 : 40,
              scale: 0.9,
            },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 0.18,
              ease: "power2.out",
            },
            startTime + 0.1
          );
        }
      });

      // ──────────────────────────────────────────
      // 4. Climax Hold & Reversible Assembly Prep (80% -> 100%)
      // ──────────────────────────────────────────
      masterTL.to(
        {},
        {
          duration: 0.2,
        },
        0.8
      );

      // Create the ScrollTrigger pin
      ScrollTrigger.create({
        trigger: section,
        pin: true,
        start: "top top",
        end: "+=2600",
        scrub: 1,
        animation: masterTL,
        anticipatePin: 1,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={pinSectionRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-screen bg-[#060606] overflow-hidden select-none"
    >
      {/* ── Background Ambient Atmosphere & Lighting ── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Core warm amber spotlight */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75vw] h-[75vw] max-w-[900px] max-h-[900px] rounded-full blur-[180px] opacity-25"
          style={{
            background: "radial-gradient(circle, #FF9D00 0%, #FF5A00 40%, transparent 75%)",
            transform: `translate(calc(-50% + ${mousePos.x * 30}px), calc(-50% + ${mousePos.y * 30}px))`,
            transition: "transform 0.4s ease-out",
          }}
        />

        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,157,0,0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,157,0,0.4) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Steam / Ember floating particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 18 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gradient-to-t from-[#FF9D00] to-[#FFD65A]"
              style={{
                width: 2 + (i % 4),
                height: 2 + (i % 4),
                left: `${15 + (i * 4.5)}%`,
                top: `${40 + (i % 5) * 10}%`,
                opacity: 0.15 + (i % 3) * 0.15,
                filter: "blur(1px)",
              }}
              animate={{
                y: [-10, -70, -10],
                x: [(i % 2 === 0 ? -15 : 15), 0, (i % 2 === 0 ? 15 : -15)],
                opacity: [0.1, 0.45, 0.1],
              }}
              transition={{
                duration: 4 + (i % 4) * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.25,
              }}
            />
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          CENTRAL BURGER EXPLOSION ENGINE (10 LAYERS)
      ══════════════════════════════════════════════════ */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <div
          ref={burgerStageRef}
          className="relative w-[320px] h-[320px] sm:w-[440px] sm:h-[440px] md:w-[500px] md:h-[500px] will-change-transform"
          style={{
            transform: `perspective(1000px) rotateX(${mousePos.y * -10}deg) rotateY(${mousePos.x * 12}deg)`,
            transition: "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {BURGER_LAYERS.map((layer, index) => (
            <div
              key={layer.id}
              ref={(el) => {
                layerRefs.current[index] = el;
              }}
              onMouseEnter={() => setActiveLayerIndex(index)}
              onMouseLeave={() => setActiveLayerIndex(null)}
              className="absolute inset-0 will-change-transform pointer-events-auto cursor-pointer"
              style={{
                zIndex: layer.zIndex,
                transform: `translate(${mousePos.x * (index + 2) * 2.2}px, ${mousePos.y * (index + 2) * 2.2}px)`,
                transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <div className="relative w-full h-full">
                <Image
                  src={layer.image}
                  alt={layer.name}
                  fill
                  sizes="(max-width: 768px) 360px, 500px"
                  className="object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)] filter hover:brightness-110 transition-all duration-300"
                  priority={index < 3}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          SECTION 1: HERO OVERLAY (TITLE & CTAs)
      ══════════════════════════════════════════════════ */}
      <div
        ref={heroContentRef}
        className="absolute inset-0 z-20 flex flex-col items-center justify-between py-12 px-6 pointer-events-none"
      >
        {/* Top Eyebrow Tag */}
        <div className="pt-16 sm:pt-20">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full glassmorphism border border-white/10 text-[10px] font-mono tracking-[0.25em] uppercase text-[#FF9D00] shadow-glow">
            <span className="w-2 h-2 rounded-full bg-[#FF9D00] animate-pulse" />
            <span>Culinary Haute Horlogerie</span>
            <span className="text-white/20">•</span>
            <span className="text-white/50">45-Day Dry Aged MS9+</span>
          </div>
        </div>

        {/* Massive Center Headline */}
        <div className="text-center space-y-3 pointer-events-auto">
          <h1 className="font-display text-[64px] sm:text-[100px] md:text-[140px] lg:text-[170px] uppercase leading-[0.82] tracking-tighter text-[#F0EDE8] drop-shadow-2xl">
            BURGER
            <br />
            <span className="text-gradient-accent">VERSE</span>
          </h1>

          <p className="text-xs sm:text-sm font-body text-white/50 max-w-lg mx-auto tracking-wide pt-2">
            Engineered with Michelin-star precision. Scroll to deconstruct every layer of our flagship Wagyu masterpiece.
          </p>

          {/* Primary Call to Action buttons */}
          <div className="flex items-center justify-center gap-4 pt-6">
            <button
              onClick={() => scrollTo("#burgers")}
              className="btn-primary flex items-center gap-2.5 shadow-glow"
            >
              <span>Explore Burgers</span>
              <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
                <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <button
              onClick={() => scrollTo("#combos")}
              className="btn-secondary flex items-center gap-2"
            >
              <span>View Menu</span>
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div ref={scrollIndicatorRef} className="pb-4 flex flex-col items-center gap-2 pointer-events-auto">
          <div className="w-px h-12 bg-gradient-to-b from-[#FF9D00] to-transparent animate-pulse" />
          <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-white/40">
            Scroll to Explode
          </span>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          SECTION 2: HUD TELEMETRY & INGREDIENT TAGS
      ══════════════════════════════════════════════════ */}
      <div
        ref={hudContainerRef}
        className="absolute inset-0 z-30 pointer-events-none opacity-0"
      >
        {/* Top HUD Status Bar */}
        <div className="absolute top-6 inset-x-6 sm:inset-x-12 flex items-center justify-between text-[10px] font-mono tracking-wider">
          <div className="flex items-center gap-3 glassmorphism px-4 py-2 rounded-full border border-white/10">
            <span className="w-2 h-2 rounded-full bg-[#FF9D00] animate-ping" />
            <span className="text-[#FF9D00] font-semibold">ACT II — 10-LAYER DECONSTRUCTION</span>
          </div>

          <div className="hidden md:flex items-center gap-6 text-white/40">
            <span>SEAR: <strong className="text-white">400°F CHARCOAL</strong></span>
            <span className="text-white/20">|</span>
            <span>MARBLING: <strong className="text-[#FF9D00]">MS 9+ WAGYU</strong></span>
            <span className="text-white/20">|</span>
            <span>PROGRESS: <strong className="text-white">{Math.round(scrollProgress * 100)}%</strong></span>
          </div>
        </div>

        {/* Left Side Ingredient Telemetry Labels */}
        <div className="absolute inset-y-0 left-4 sm:left-8 md:left-12 flex flex-col justify-center gap-3 sm:gap-4 max-w-[240px]">
          {BURGER_LAYERS.filter((l) => l.side === "left").map((layer) => {
            const index = BURGER_LAYERS.findIndex((l) => l.id === layer.id);
            const isHovered = activeLayerIndex === index;

            return (
              <div
                key={layer.id}
                ref={(el) => {
                  labelRefs.current[index] = el;
                }}
                className={`glassmorphism-strong p-3 sm:p-3.5 rounded-xl border transition-all duration-300 pointer-events-auto cursor-pointer ${
                  isHovered
                    ? "border-[#FF9D00] scale-105 shadow-glow"
                    : "border-white/10 hover:border-white/25"
                }`}
                onMouseEnter={() => setActiveLayerIndex(index)}
                onMouseLeave={() => setActiveLayerIndex(null)}
              >
                <div className="flex items-center justify-between text-[9px] font-mono text-white/40 mb-1">
                  <span className="text-[#FF9D00]">LAYER {layer.number}</span>
                  <span>{layer.origin}</span>
                </div>
                <h4 className="font-display text-sm sm:text-base uppercase text-[#F0EDE8] leading-tight">
                  {layer.name}
                </h4>
                <p className="text-[10px] text-white/45 mt-1 font-body leading-snug">
                  {layer.detail}
                </p>
              </div>
            );
          })}
        </div>

        {/* Right Side Ingredient Telemetry Labels */}
        <div className="absolute inset-y-0 right-4 sm:right-8 md:right-12 flex flex-col justify-center gap-3 sm:gap-4 max-w-[240px] items-end text-right">
          {BURGER_LAYERS.filter((l) => l.side === "right").map((layer) => {
            const index = BURGER_LAYERS.findIndex((l) => l.id === layer.id);
            const isHovered = activeLayerIndex === index;

            return (
              <div
                key={layer.id}
                ref={(el) => {
                  labelRefs.current[index] = el;
                }}
                className={`glassmorphism-strong p-3 sm:p-3.5 rounded-xl border transition-all duration-300 pointer-events-auto cursor-pointer ${
                  isHovered
                    ? "border-[#FF9D00] scale-105 shadow-glow"
                    : "border-white/10 hover:border-white/25"
                }`}
                onMouseEnter={() => setActiveLayerIndex(index)}
                onMouseLeave={() => setActiveLayerIndex(null)}
              >
                <div className="flex items-center justify-between text-[9px] font-mono text-white/40 mb-1">
                  <span>{layer.origin}</span>
                  <span className="text-[#FF9D00]">LAYER {layer.number}</span>
                </div>
                <h4 className="font-display text-sm sm:text-base uppercase text-[#F0EDE8] leading-tight">
                  {layer.name}
                </h4>
                <p className="text-[10px] text-white/45 mt-1 font-body leading-snug">
                  {layer.detail}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom Navigation Hint */}
        <div className="absolute bottom-6 inset-x-6 sm:inset-x-12 flex items-center justify-between text-[9px] font-mono text-white/35">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF9D00]" />
            <span>10 / 10 INGREDIENT LAYERS MAPPED</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">KEEP SCROLLING FOR 3D FLYTHROUGH</span>
            <span className="text-[#FF9D00]">↓</span>
          </div>
        </div>
      </div>

      {/* Customizer Modal */}
      <BurgerCustomizerModal
        burger={flagshipBurger}
        isOpen={customizerOpen}
        onClose={() => setCustomizerOpen(false)}
      />
    </section>
  );
}
