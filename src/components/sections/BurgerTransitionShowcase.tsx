"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { burgers, Burger } from "@/lib/data/burgers";
import { useCart } from "@/lib/cart-context";
import { BurgerCustomizerModal } from "./BurgerCustomizerModal";

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
}

export function BurgerTransitionShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExploding, setIsExploding] = useState(false);
  const [customizerBurger, setCustomizerBurger] = useState<Burger | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number | null>(null);

  const { addItem } = useCart();
  const currentBurger = burgers[currentIndex];

  // Colors for particles based on ingredients (patty brown, cheddar gold, lettuce green, sauce amber)
  const particleColors = ["#FF9D00", "#FF5A00", "#FFD65A", "#4ADE80", "#EF4444", "#D4AF37", "#FFFFFF"];

  // ─── Trigger Particle Explosion & Reassembly ───
  const triggerTransition = useCallback((nextIndex: number) => {
    if (nextIndex === currentIndex || isExploding) return;

    setIsExploding(true);
    const canvas = canvasRef.current;
    if (!canvas) {
      setCurrentIndex(nextIndex);
      setIsExploding(false);
      return;
    }

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;

    // Generate 1200 explosion particles from center
    const particles: Particle[] = [];
    const count = 900;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 9;
      const radius = 60 + Math.random() * 120;

      particles.push({
        x: centerX + Math.cos(angle) * (Math.random() * 60),
        y: centerY + Math.sin(angle) * (Math.random() * 60),
        originX: centerX,
        originY: centerY,
        targetX: centerX + Math.cos(angle) * radius,
        targetY: centerY + Math.sin(angle) * radius,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 1.5 + Math.random() * 3,
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
        alpha: 0.8 + Math.random() * 0.2,
        life: 0,
      });
    }

    particlesRef.current = particles;

    let progress = 0;
    const ctx = canvas.getContext("2d");

    const render = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      progress += 0.025;

      particlesRef.current.forEach((p) => {
        if (progress < 0.45) {
          // Phase 1: Explode outward
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.94;
          p.vy *= 0.94;
        } else {
          // Phase 2: Swirl and reassemble inward
          const dx = centerX - p.x;
          const dy = centerY - p.y;
          const angle = Math.atan2(dy, dx) + 0.3; // vortex spiral
          const dist = Math.sqrt(dx * dx + dy * dy);

          p.vx += Math.cos(angle) * 1.2;
          p.vy += Math.sin(angle) * 1.2;
          p.x += p.vx * 0.8;
          p.y += p.vy * 0.8;
          p.alpha = Math.max(0, 1 - progress * 0.7);
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      if (progress < 0.5 && currentIndex !== nextIndex) {
        setCurrentIndex(nextIndex);
      }

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, width, height);
        setIsExploding(false);
      }
    };

    render();
  }, [currentIndex, isExploding]);

  // Clean up canvas loop
  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const handleNext = () => {
    const next = (currentIndex + 1) % burgers.length;
    triggerTransition(next);
  };

  const handlePrev = () => {
    const prev = (currentIndex - 1 + burgers.length) % burgers.length;
    triggerTransition(prev);
  };

  const handleQuickOrder = () => {
    addItem({
      id: currentBurger.id,
      type: "burger",
      title: currentBurger.name,
      tagline: currentBurger.tagline,
      price: currentBurger.price,
      image: currentBurger.image,
      accentColor: currentBurger.accentColor,
    });
  };

  return (
    <section
      id="showcase-transition"
      className="relative w-full py-28 sm:py-36 bg-[#060606] overflow-hidden"
    >
      {/* Dynamic ambient backdrop */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[180px] pointer-events-none opacity-20 transition-all duration-700"
        style={{ backgroundColor: currentBurger.accentColor || "#FF9D00" }}
      />

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glassmorphism border border-white/10 text-[9px] font-mono uppercase tracking-[0.3em] text-[#FF9D00]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF9D00] animate-pulse" />
              <span>SECTION 6 — PARTICLE MORPH SHOWCASE</span>
            </div>

            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl uppercase text-[#F0EDE8] leading-none">
              SEAMLESS <span className="text-gradient-accent">PARTICLE TRANSITION</span>
            </h2>
          </div>

          <p className="max-w-md text-sm text-white/50 font-body mt-4 md:mt-0">
            Switch between creations. When transitioning, the burger explodes into glowing ingredient particles and reassembles into the next form.
          </p>
        </div>

        {/* 7 Burgers Thumb Selector Bar */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-4 mb-12 no-scrollbar">
          {burgers.map((b, idx) => (
            <button
              key={b.id}
              onClick={() => triggerTransition(idx)}
              className={`flex-shrink-0 px-4 py-2.5 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-300 border flex items-center gap-2 ${
                currentIndex === idx
                  ? "bg-[#FF9D00] text-black font-bold border-[#FF9D00] shadow-glow"
                  : "glassmorphism text-white/60 hover:text-white border-white/10 hover:border-white/25"
              }`}
            >
              <span>{b.number}</span>
              <span className="hidden sm:inline">{b.name}</span>
            </button>
          ))}
        </div>

        {/* Main Morph Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Left / Center: Interactive Particle Burger Stage */}
          <div className="lg:col-span-7 relative flex items-center justify-center min-h-[380px] sm:min-h-[480px]">
            {/* Particle Canvas for Explosion & Reassembly */}
            <canvas
              ref={canvasRef}
              width={600}
              height={600}
              className="absolute inset-0 w-full h-full pointer-events-none z-20"
            />

            {/* Burger Hero Image */}
            <div
              className={`relative w-[280px] h-[280px] sm:w-[420px] sm:h-[420px] transition-all duration-500 will-change-transform ${
                isExploding ? "opacity-0 scale-75 blur-sm" : "opacity-100 scale-100 blur-0"
              }`}
            >
              <Image
                src={currentBurger.image}
                alt={currentBurger.name}
                fill
                priority
                className="object-contain filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.9)] hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Prev / Next Floating Navigation Controls */}
            <button
              onClick={handlePrev}
              disabled={isExploding}
              className="absolute left-0 sm:left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glassmorphism-strong border border-white/10 hover:border-[#FF9D00] text-white flex items-center justify-center transition-all z-30 group disabled:opacity-50"
              aria-label="Previous Burger"
            >
              <svg className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={handleNext}
              disabled={isExploding}
              className="absolute right-0 sm:right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glassmorphism-strong border border-white/10 hover:border-[#FF9D00] text-white flex items-center justify-center transition-all z-30 group disabled:opacity-50"
              aria-label="Next Burger"
            >
              <svg className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Right: Burger Specs, Macros, & Ordering Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glassmorphism-strong rounded-3xl p-8 sm:p-10 border border-white/10 space-y-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#FF9D00]">
                  ARCHETYPE {currentBurger.number} / 07
                </span>
                <span className="font-display text-3xl font-bold text-[#F0EDE8]">
                  ${currentBurger.price.toFixed(2)}
                </span>
              </div>

              <div>
                <h3 className="font-display text-3xl sm:text-5xl uppercase text-[#F0EDE8] leading-none">
                  {currentBurger.name}
                </h3>
                <p className="text-xs font-mono text-[#FF9D00] mt-1 tracking-wider">
                  {currentBurger.tagline}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-white/60 font-body leading-relaxed">
                {currentBurger.description}
              </p>

              {/* Macro Nutrition Specs */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <span className="text-[10px] font-mono uppercase text-white/40 tracking-wider">
                  Macronutrient Density
                </span>
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                    <div className="font-display text-lg text-[#FF9D00]">{currentBurger.nutrition.calories}</div>
                    <div className="text-[9px] text-white/40 uppercase">Calories</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                    <div className="font-display text-lg text-[#FFD65A]">{currentBurger.nutrition.protein}g</div>
                    <div className="text-[9px] text-white/40 uppercase">Protein</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                    <div className="font-display text-lg text-white">{currentBurger.nutrition.carbs}g</div>
                    <div className="text-[9px] text-white/40 uppercase">Carbs</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                    <div className="font-display text-lg text-[#FF5A00]">{currentBurger.nutrition.fat}g</div>
                    <div className="text-[9px] text-white/40 uppercase">Fats</div>
                  </div>
                </div>
              </div>

              {/* Ingredients tag cloud */}
              <div className="space-y-2 pt-2">
                <span className="text-[10px] font-mono uppercase text-white/40 tracking-wider">
                  Artisan Layer Composition
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentBurger.ingredients.map((ing, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-body bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg text-white/70"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex items-center gap-3">
                <button
                  onClick={handleQuickOrder}
                  className="btn-primary flex-1 py-3 text-xs font-semibold flex items-center justify-center gap-2 shadow-glow"
                >
                  <span>Order Now</span>
                  <span>•</span>
                  <span>${currentBurger.price.toFixed(2)}</span>
                </button>

                <button
                  onClick={() => setCustomizerBurger(currentBurger)}
                  className="btn-secondary py-3 text-xs"
                >
                  Customize
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Customizer Modal */}
      <BurgerCustomizerModal
        burger={customizerBurger}
        isOpen={!!customizerBurger}
        onClose={() => setCustomizerBurger(null)}
      />
    </section>
  );
}
