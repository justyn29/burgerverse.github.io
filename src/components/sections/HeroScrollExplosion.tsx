"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import { burgers } from "@/lib/data/burgers";
import { BurgerCustomizerModal } from "./BurgerCustomizerModal";

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────
// Ingredient Layer Config
// ─────────────────────────────────────────────
interface LayerConfig {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  // Explosion offsets — how far each layer travels
  yOffset: number;        // Vertical explosion distance (vh)
  xOffset: number;        // Horizontal drift
  rotation: number;       // Rotation in degrees
  scale: number;          // Scale multiplier at peak explosion
  zIndex: number;
  parallaxSpeed: number;  // How fast this layer moves (1 = base, >1 = faster)
  side: "left" | "right"; // Which side telemetry label appears
}

const LAYERS: LayerConfig[] = [
  {
    id: "top-bun",
    name: "24K Gold Brioche Crown",
    subtitle: "28% Normandy Butter • Lyon Ferment",
    image: "/layers/top-bun.jpg",
    yOffset: -55,
    xOffset: 8,
    rotation: -6,
    scale: 1.15,
    zIndex: 60,
    parallaxSpeed: 1.6,
    side: "left",
  },
  {
    id: "lettuce",
    name: "Hydroponic Baby Arugula",
    subtitle: "Vertical Farm • Harvested Today",
    image: "/layers/lettuce.jpg",
    yOffset: -35,
    xOffset: -12,
    rotation: 8,
    scale: 1.1,
    zIndex: 50,
    parallaxSpeed: 1.35,
    side: "right",
  },
  {
    id: "tomato",
    name: "Heirloom Vine Tomato",
    subtitle: "San Marzano Heritage • 48hr Ripened",
    image: "/layers/tomato.jpg",
    yOffset: -18,
    xOffset: 14,
    rotation: -4,
    scale: 1.08,
    zIndex: 40,
    parallaxSpeed: 1.2,
    side: "left",
  },
  {
    id: "cheese",
    name: "Cave-Aged Swiss Gruyère",
    subtitle: "18 Months Matured • Molten 165°F",
    image: "/layers/cheese.jpg",
    yOffset: -5,
    xOffset: -8,
    rotation: 3,
    scale: 1.2,
    zIndex: 35,
    parallaxSpeed: 1.0,
    side: "right",
  },
  {
    id: "bacon",
    name: "Applewood Smoked Bacon",
    subtitle: "12-Hour Slow Cure • Heritage Berkshire",
    image: "/layers/bacon.jpg",
    yOffset: 10,
    xOffset: 16,
    rotation: -7,
    scale: 1.08,
    zIndex: 32,
    parallaxSpeed: 0.92,
    side: "left",
  },
  {
    id: "patty",
    name: "200g Wagyu MS9+ Patty",
    subtitle: "45-Day Dry-Aged • Charcoal Seared 135°F",
    image: "/layers/patty.jpg",
    yOffset: 25,
    xOffset: 10,
    rotation: -2,
    scale: 1.12,
    zIndex: 30,
    parallaxSpeed: 0.85,
    side: "right",
  },
  {
    id: "bottom-bun",
    name: "Brown Butter Brioche Heel",
    subtitle: "Pan-Seared Golden Foundation",
    image: "/layers/bottom-bun.jpg",
    yOffset: 45,
    xOffset: -4,
    rotation: 5,
    scale: 1.05,
    zIndex: 20,
    parallaxSpeed: 0.7,
    side: "right",
  },
];

// ─────────────────────────────────────────────
// Floating particle element data
// ─────────────────────────────────────────────
const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  size: 2 + Math.random() * 4,
  x: Math.random() * 100,
  y: Math.random() * 100,
  delay: Math.random() * 5,
  duration: 4 + Math.random() * 4,
  color: ["#FF9D00", "#FF5A00", "#FFD65A", "#ffffff"][Math.floor(Math.random() * 4)],
  opacity: 0.15 + Math.random() * 0.4,
}));

// ─────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────
export function HeroScrollExplosion() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const zoomOverlayRef = useRef<HTMLDivElement>(null);
  const stageIndicatorRef = useRef<HTMLDivElement>(null);

  const [customizerOpen, setCustomizerOpen] = useState(false);
  const [currentStage, setCurrentStage] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const flagshipBurger = burgers.find((b) => b.id === "ultimate-prime") || burgers[0];
  const { addItem } = useCart();

  // ─── GSAP ScrollTrigger Master Timeline ───
  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const sticky = stickyRef.current;
      if (!container || !sticky) return;

      // Master timeline pinned to the container
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
          pin: false, // We use CSS sticky instead
          onUpdate: (self) => {
            const p = self.progress;
            if (p < 0.15) setCurrentStage(0);
            else if (p < 0.55) setCurrentStage(1);
            else if (p < 0.75) setCurrentStage(2);
            else setCurrentStage(3);
          },
        },
      });

      // ═══════════════════════════════════════
      // STAGE 0 → 1: Title fadeout (0% → 12%)
      // ═══════════════════════════════════════
      if (titleRef.current) {
        tl.to(
          titleRef.current,
          {
            opacity: 0,
            y: -80,
            scale: 0.92,
            duration: 0.12,
            ease: "power2.in",
          },
          0
        );
      }

      // ═══════════════════════════════════════
      // STAGE 1: EXPLOSION — Layers separate (10% → 55%)
      // ═══════════════════════════════════════
      LAYERS.forEach((layer, i) => {
        const el = layerRefs.current[i];
        const label = labelRefs.current[i];
        if (!el) return;

        // Each layer explodes at staggered times
        const startTime = 0.08 + i * 0.04;

        // Explosion animation
        tl.to(
          el,
          {
            y: `${layer.yOffset}vh`,
            x: `${layer.xOffset}vw`,
            rotation: layer.rotation,
            scale: layer.scale,
            duration: 0.35,
            ease: "power2.out",
          },
          startTime
        );

        // Label fade in
        if (label) {
          tl.fromTo(
            label,
            { opacity: 0, x: layer.side === "left" ? -40 : 40 },
            {
              opacity: 1,
              x: 0,
              duration: 0.1,
              ease: "power2.out",
            },
            startTime + 0.06
          );
        }
      });

      // HUD telemetry fade in during explosion
      if (hudRef.current) {
        tl.fromTo(
          hudRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.12, ease: "power2.out" },
          0.14
        );
      }

      // ═══════════════════════════════════════
      // STAGE 2: ZOOM INTO LAYERS (55% → 75%)
      // ═══════════════════════════════════════

      // Zoom: scale up all layers dramatically + push them off screen
      LAYERS.forEach((layer, i) => {
        const el = layerRefs.current[i];
        const label = labelRefs.current[i];
        if (!el) return;

        tl.to(
          el,
          {
            scale: layer.scale * 2.5,
            y: `${layer.yOffset * 2.8}vh`,
            x: `${layer.xOffset * 1.8}vw`,
            opacity: i === 3 || i === 4 ? 1 : 0, // Keep cheese & patty visible longest
            rotation: layer.rotation * 2,
            duration: 0.2,
            ease: "power3.in",
          },
          0.55
        );

        // Labels fade out
        if (label) {
          tl.to(
            label,
            { opacity: 0, duration: 0.08, ease: "power2.in" },
            0.52
          );
        }
      });

      // HUD fades during zoom
      if (hudRef.current) {
        tl.to(
          hudRef.current,
          { opacity: 0, duration: 0.1, ease: "power2.in" },
          0.55
        );
      }

      // Zoom overlay effect — cinematic push-in
      if (zoomOverlayRef.current) {
        tl.fromTo(
          zoomOverlayRef.current,
          { scale: 1, opacity: 0 },
          {
            scale: 1.5,
            opacity: 0.6,
            duration: 0.15,
            ease: "power2.in",
          },
          0.6
        );

        tl.to(
          zoomOverlayRef.current,
          {
            opacity: 0,
            scale: 1,
            duration: 0.1,
            ease: "power2.out",
          },
          0.74
        );
      }

      // ═══════════════════════════════════════
      // STAGE 3: REASSEMBLY + CTA (75% → 100%)
      // ═══════════════════════════════════════

      // Bring all layers back to center, reassembled
      LAYERS.forEach((layer, i) => {
        const el = layerRefs.current[i];
        if (!el) return;

        tl.to(
          el,
          {
            y: 0,
            x: 0,
            rotation: 0,
            scale: 1,
            opacity: 1,
            duration: 0.15,
            ease: "power3.out",
          },
          0.78 + i * 0.015
        );
      });

      // CTA panel slides up
      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.1,
            ease: "power2.out",
          },
          0.88
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // ─── Mouse Parallax ───
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  }, []);

  const handleOrder = () => {
    addItem({
      id: flagshipBurger.id,
      type: "burger",
      title: flagshipBurger.name,
      tagline: flagshipBurger.tagline,
      price: flagshipBurger.price,
      image: flagshipBurger.image,
      accentColor: flagshipBurger.accentColor,
    });
  };

  return (
    <div
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full bg-[#060606]"
      style={{ height: "600vh" }}
    >
      {/* ── Sticky Viewport ── */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden"
      >
        {/* ── Background Elements ── */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Radial ambient glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[#FF9D00]/[0.04] rounded-full blur-[200px]" />
          <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#FF5A00]/[0.03] rounded-full blur-[160px]" />

          {/* Subtle grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,157,0,0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,157,0,0.3) 1px, transparent 1px)
              `,
              backgroundSize: "100px 100px",
            }}
          />
        </div>

        {/* ── Floating Particles ── */}
        <div className="absolute inset-0 pointer-events-none z-[5]">
          {PARTICLES.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full"
              style={{
                width: p.size,
                height: p.size,
                left: `${p.x}%`,
                top: `${p.y}%`,
                background: p.color,
                opacity: p.opacity,
              }}
              animate={{
                y: [-20, -50, -20],
                opacity: [p.opacity * 0.5, p.opacity, p.opacity * 0.5],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: p.delay,
              }}
            />
          ))}
        </div>

        {/* ── Zoom Overlay (for cinematic zoom transition) ── */}
        <div
          ref={zoomOverlayRef}
          className="absolute inset-0 z-[65] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, rgba(255,157,0,0.08) 0%, rgba(6,6,6,0.95) 70%)",
            opacity: 0,
          }}
        />

        {/* ══════════════════════════════════════
            CENTRAL BURGER EXPLOSION CANVAS
        ══════════════════════════════════════ */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div
            className="relative"
            style={{
              width: "min(50vw, 500px)",
              height: "min(50vw, 500px)",
              transform: `translate(${mousePos.x * 15}px, ${mousePos.y * 15}px)`,
              transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            {/* Individual ingredient layers */}
            {LAYERS.map((layer, i) => (
              <div
                key={layer.id}
                ref={(el) => { layerRefs.current[i] = el; }}
                className="absolute inset-0 will-change-transform"
                style={{
                  zIndex: layer.zIndex,
                  transform: `translate(${mousePos.x * layer.parallaxSpeed * 8}px, ${mousePos.y * layer.parallaxSpeed * 8}px)`,
                  transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                <Image
                  src={layer.image}
                  alt={layer.name}
                  fill
                  className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
                  priority={i < 2}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════
            STAGE 0: INTRO TITLE
        ══════════════════════════════════════ */}
        <div
          ref={titleRef}
          className="absolute inset-x-0 top-0 flex flex-col items-center justify-center h-full z-20 pointer-events-none px-6 text-center"
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full glassmorphism border border-white/10 text-[10px] font-mono tracking-[0.25em] uppercase text-[#FF9D00] mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF9D00] animate-pulse" />
            <span>Scroll to Explode</span>
            <span className="text-white/20">•</span>
            <span className="text-white/40">45-Day Wagyu MS9+</span>
          </motion.div>

          {/* Giant headline */}
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[56px] sm:text-[90px] md:text-[130px] lg:text-[165px] xl:text-[190px] uppercase leading-[0.85] tracking-tighter text-[#F0EDE8] select-none"
          >
            BURGER
            <br />
            <span className="text-gradient-accent">VERSE</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="text-sm font-body text-white/35 mt-6 max-w-md tracking-wide"
          >
            A cinematic journey through the anatomy of the world&apos;s most precisely
            engineered burger. Scroll to begin the deconstruction.
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-12 flex flex-col items-center gap-2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-2"
            >
              <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#FF9D00]/40 to-[#FF9D00]/60" />
              <span className="text-[8px] font-mono tracking-[0.5em] uppercase text-white/25">
                Scroll
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* ══════════════════════════════════════
            STAGE 1: FLOATING TELEMETRY LABELS
        ══════════════════════════════════════ */}
        <div ref={hudRef} className="absolute inset-0 z-30 pointer-events-none" style={{ opacity: 0 }}>
          {/* Top HUD bar */}
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#FF9D00] animate-pulse" />
              <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-[#FF9D00]">
                Deconstruction Active
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-[9px] font-mono text-white/30">
              <span>Sear: <strong className="text-white/60">400°F</strong></span>
              <span className="text-white/15">|</span>
              <span>Marble: <strong className="text-[#FF9D00]">MS9+</strong></span>
              <span className="text-white/15">|</span>
              <span>Aged: <strong className="text-white/60">45 Days</strong></span>
            </div>
          </div>

          {/* Ingredient labels positioned along sides */}
          <div className="absolute inset-y-0 left-4 sm:left-8 flex flex-col justify-center gap-4">
            {LAYERS.filter(l => l.side === "left").map((layer, i) => (
              <div
                key={layer.id}
                ref={(el) => {
                  const idx = LAYERS.findIndex(l => l.id === layer.id);
                  labelRefs.current[idx] = el;
                }}
                className="glassmorphism-strong px-4 py-3 rounded-xl max-w-[200px]"
                style={{ opacity: 0 }}
              >
                <div className="text-[8px] font-mono text-[#FF9D00]/60 uppercase tracking-[0.3em] mb-1">
                  Layer {layer.id.includes("bun") ? (layer.id === "top-bun" ? "01" : "06") : String(i + 1).padStart(2, "0")}
                </div>
                <div className="text-xs font-display uppercase text-[#F0EDE8] leading-tight">
                  {layer.name}
                </div>
                <div className="text-[8px] text-white/30 mt-0.5">{layer.subtitle}</div>
              </div>
            ))}
          </div>

          <div className="absolute inset-y-0 right-4 sm:right-8 flex flex-col justify-center gap-4 items-end">
            {LAYERS.filter(l => l.side === "right").map((layer, i) => (
              <div
                key={layer.id}
                ref={(el) => {
                  const idx = LAYERS.findIndex(l => l.id === layer.id);
                  labelRefs.current[idx] = el;
                }}
                className="glassmorphism-strong px-4 py-3 rounded-xl max-w-[200px] text-right"
                style={{ opacity: 0 }}
              >
                <div className="text-[8px] font-mono text-[#FF9D00]/60 uppercase tracking-[0.3em] mb-1">
                  Layer {String(i + 2).padStart(2, "0")}
                </div>
                <div className="text-xs font-display uppercase text-[#F0EDE8] leading-tight">
                  {layer.name}
                </div>
                <div className="text-[8px] text-white/30 mt-0.5">{layer.subtitle}</div>
              </div>
            ))}
          </div>

          {/* Bottom HUD bar */}
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-[9px] font-mono text-white/25">
            <span>Continue scrolling for ingredient journey</span>
            <span className="text-[#FF9D00]/50">6 / 6 Layers Deconstructed</span>
          </div>
        </div>

        {/* ══════════════════════════════════════
            STAGE 3: REASSEMBLY CTA
        ══════════════════════════════════════ */}
        <div
          ref={ctaRef}
          className="absolute bottom-8 sm:bottom-14 inset-x-0 z-40 flex flex-col items-center pointer-events-auto px-4"
          style={{ opacity: 0 }}
        >
          <div className="glassmorphism-strong p-6 sm:p-8 rounded-3xl max-w-xl w-full text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF9D00]/10 border border-[#FF9D00]/20 text-[8px] font-mono uppercase tracking-[0.3em] text-[#FF9D00]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF9D00]" />
              Masterpiece Reassembled
            </div>

            <div>
              <h3 className="font-display text-3xl sm:text-5xl uppercase leading-none text-[#F0EDE8]">
                The Sovereign{" "}
                <span className="text-gradient-accent">Ultimate Prime</span>
              </h3>
              <p className="text-[10px] text-white/35 mt-2 font-body tracking-wider">
                45-Day Wagyu • Périgord Truffle • 18-Month Gruyère • 24K Gold
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
              <button
                onClick={handleOrder}
                className="btn-primary w-full sm:w-auto shadow-glow flex items-center justify-center gap-3"
              >
                Order Masterpiece
                <span className="text-[10px] bg-black/20 px-2.5 py-1 rounded-full font-mono">
                  $42.99
                </span>
              </button>
              <button
                onClick={() => setCustomizerOpen(true)}
                className="btn-secondary w-full sm:w-auto"
              >
                Customize
              </button>
            </div>

            <div className="flex items-center justify-center gap-6 text-[9px] font-mono text-white/25">
              <Link href="#burgers" className="hover:text-[#FF9D00] transition-colors">
                View All 07 Burgers ↓
              </Link>
              <span className="text-white/10">|</span>
              <Link href="#combos" className="hover:text-[#FF9D00] transition-colors">
                Complete Feasts ↓
              </Link>
            </div>
          </div>
        </div>

        {/* ── Stage Indicator (corner) ── */}
        <div
          ref={stageIndicatorRef}
          className="absolute top-1/2 right-4 sm:right-8 -translate-y-1/2 z-50 flex flex-col gap-2"
        >
          {["Reveal", "Explode", "Journey", "Order"].map((label, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className="w-1 rounded-full transition-all duration-500"
                style={{
                  height: currentStage === i ? 28 : 8,
                  background: currentStage === i ? "#FF9D00" : "rgba(255,255,255,0.12)",
                }}
              />
              <span
                className="text-[7px] font-mono uppercase tracking-[0.3em] transition-all duration-500"
                style={{
                  color: currentStage === i ? "#FF9D00" : "rgba(255,255,255,0.15)",
                  opacity: currentStage === i ? 1 : 0,
                  transform: `translateX(${currentStage === i ? 0 : -10}px)`,
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Customizer Modal */}
      <BurgerCustomizerModal
        burger={flagshipBurger}
        isOpen={customizerOpen}
        onClose={() => setCustomizerOpen(false)}
      />
    </div>
  );
}
