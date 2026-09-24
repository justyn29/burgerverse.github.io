"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { combos, Combo } from "@/lib/data/combos";
import { useCart } from "@/lib/cart-context";

export function CombosShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const assemblyRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCart();

  // Scroll animations for dynamic product assembly
  const { scrollYProgress } = useScroll({
    target: assemblyRef,
    offset: ["start end", "center center"],
  });

  // Dynamic product entry vectors
  const burgerX = useTransform(scrollYProgress, [0, 1], ["-60px", "0px"]);
  const burgerScale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const burgerRotate = useTransform(scrollYProgress, [0, 1], [-8, 0]);

  const friesX = useTransform(scrollYProgress, [0, 1], ["80px", "0px"]);
  const friesY = useTransform(scrollYProgress, [0, 1], ["40px", "0px"]);
  const friesRotate = useTransform(scrollYProgress, [0, 1], [10, 0]);

  const drinkX = useTransform(scrollYProgress, [0, 1], ["-80px", "0px"]);
  const drinkY = useTransform(scrollYProgress, [0, 1], ["-40px", "0px"]);
  const drinkRotate = useTransform(scrollYProgress, [0, 1], [-6, 0]);

  const handleAddCombo = (combo: Combo) => {
    addItem({
      id: combo.id,
      type: "combo",
      title: combo.name,
      tagline: `${combo.burger} + ${combo.side} + ${combo.drink} + ${combo.dessert}`,
      price: combo.price,
      originalPrice: combo.originalPrice,
      image: "/burgers/combo-all.png",
      accentColor: combo.accentColor,
    });
  };

  const handleQuickAddGrandCombo = () => {
    const flagshipCombo = combos[0];
    handleAddCombo(flagshipCombo);
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -420 : 420;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section
      id="combos"
      ref={containerRef}
      className="relative py-28 sm:py-36 bg-[#080808] border-t border-b border-white/5 overflow-hidden"
    >
      {/* Background Volumetric Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#FF9D00]/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="section-container relative z-10 space-y-24">
        {/* ══════════════════════════════════════════════════
            SECTION 7A: FLOATING ASSEMBLY HERO STAGE
            Burger + Fries + Drink dynamically enter and group
        ══════════════════════════════════════════════════ */}
        <div ref={assemblyRef} className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glassmorphism border border-white/10 text-[9px] font-mono uppercase tracking-[0.3em] text-[#FF9D00]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF9D00] animate-pulse" />
              <span>SECTION 7 — DYNAMIC COMBO ASSEMBLY</span>
            </div>

            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl uppercase text-[#F0EDE8] leading-none">
              THE HOLY TRINITY <span className="text-gradient-accent">ENSEMBLE</span>
            </h2>

            <p className="text-xs sm:text-sm text-white/50 font-body">
              Multiple products enter dynamically. Watch the Wagyu burger, truffle fries, and craft shake float into position as you scroll.
            </p>
          </div>

          {/* 3-Product Dynamic Floating Grouping */}
          <div className="relative glassmorphism-strong rounded-3xl p-8 sm:p-14 border border-white/10 overflow-hidden shadow-2xl">
            {/* Ambient assembly glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF9D00]/5 via-transparent to-[#FF5A00]/5" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center relative z-10">
              {/* Product 1: The Drink */}
              <motion.div
                style={{ x: drinkX, y: drinkY, rotate: drinkRotate }}
                className="flex flex-col items-center text-center space-y-4 group"
              >
                <div className="relative w-48 h-56 sm:w-56 sm:h-64 rounded-2xl overflow-hidden bg-black/40 border border-white/10 group-hover:border-[#FF9D00]/40 transition-all duration-500 shadow-xl">
                  <Image
                    src="/combos/craft-shake.jpg"
                    alt="Dark Bourbon Vanilla Shake"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-[9px] font-mono text-white/80">
                    Course 01 • Beverage
                  </div>
                </div>

                <div>
                  <h4 className="font-display text-xl uppercase text-[#F0EDE8]">Bourbon Vanilla Shake</h4>
                  <p className="text-[11px] text-white/40 font-body">Cold-Pressed Cream • Madagascar Pods</p>
                </div>
              </motion.div>

              {/* Product 2: Centerpiece Burger */}
              <motion.div
                style={{ x: burgerX, scale: burgerScale, rotate: burgerRotate }}
                className="flex flex-col items-center text-center space-y-4 group"
              >
                <div className="relative w-56 h-64 sm:w-64 sm:h-72 rounded-2xl overflow-hidden bg-black/40 border-2 border-[#FF9D00]/50 group-hover:border-[#FF9D00] transition-all duration-500 shadow-glow">
                  <Image
                    src="/burgers/ultimate-prime.png"
                    alt="Ultimate Prime Wagyu"
                    fill
                    className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 inset-x-3 flex justify-between">
                    <span className="px-2.5 py-1 rounded-md bg-[#FF9D00] text-black font-mono font-bold text-[9px] uppercase">
                      The Anchor
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-black/70 text-white/80 font-mono text-[9px]">
                      MS9+ Wagyu
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="font-display text-2xl uppercase text-[#F0EDE8]">The Ultimate Prime</h4>
                  <p className="text-[11px] text-[#FF9D00] font-mono">45-Day Dry Aged • Truffle Demi-Glace</p>
                </div>
              </motion.div>

              {/* Product 3: Truffle Parmesan Fries */}
              <motion.div
                style={{ x: friesX, y: friesY, rotate: friesRotate }}
                className="flex flex-col items-center text-center space-y-4 group"
              >
                <div className="relative w-48 h-56 sm:w-56 sm:h-64 rounded-2xl overflow-hidden bg-black/40 border border-white/10 group-hover:border-[#FF9D00]/40 transition-all duration-500 shadow-xl">
                  <Image
                    src="/combos/truffle-fries.jpg"
                    alt="Hand-Cut Truffle Fries"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-[9px] font-mono text-white/80">
                    Course 02 • Side
                  </div>
                </div>

                <div>
                  <h4 className="font-display text-xl uppercase text-[#F0EDE8]">Black Truffle Fries</h4>
                  <p className="text-[11px] text-white/40 font-body">Aged Parmesan • Fresh Rosemary Sea Salt</p>
                </div>
              </motion.div>
            </div>

            {/* Assembled Group Action Bar */}
            <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
              <div>
                <span className="text-[10px] font-mono uppercase text-white/40 tracking-wider block">
                  Synchronized Ensemble Price
                </span>
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-4xl text-[#F0EDE8] font-bold">$38.99</span>
                  <span className="text-sm text-white/40 line-through font-mono">$49.50</span>
                  <span className="px-2 py-0.5 rounded bg-[#FF9D00]/20 text-[#FF9D00] text-[10px] font-mono font-bold">
                    Bundle & Save $10.51
                  </span>
                </div>
              </div>

              <button
                onClick={handleQuickAddGrandCombo}
                className="btn-primary w-full sm:w-auto px-8 py-3.5 text-xs font-semibold flex items-center justify-center gap-3 shadow-glow"
              >
                <span>Order Complete Ensemble</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            SECTION 7B: COMPLETE CURATED FEASTS DECK
        ══════════════════════════════════════════════════ */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#FF9D00]">
                All Curated Bundles
              </span>
              <h3 className="font-display text-3xl sm:text-5xl uppercase text-[#F0EDE8]">
                CHEF&apos;S TASTING <span className="text-gradient-accent">COLLECTIONS</span>
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => scroll("left")}
                className="p-3 rounded-full glassmorphism border border-white/10 hover:border-[#FF9D00] text-white transition-colors"
                aria-label="Scroll left"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => scroll("right")}
                className="p-3 rounded-full glassmorphism border border-white/10 hover:border-[#FF9D00] text-white transition-colors"
                aria-label="Scroll right"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {combos.map((combo, index) => (
              <div
                key={combo.id}
                className="flex-shrink-0 w-[300px] sm:w-[380px] snap-start rounded-3xl glassmorphism border border-white/10 hover:border-[#FF9D00]/40 p-6 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1 shadow-xl"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[9px] font-mono text-[#FF9D00] uppercase tracking-wider block">
                        Feast N° 0{index + 1}
                      </span>
                      <h4 className="font-display text-2xl uppercase text-[#F0EDE8] group-hover:text-[#FF9D00] transition-colors">
                        {combo.name}
                      </h4>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-[#FF9D00] bg-[#FF9D00]/15 border border-[#FF9D00]/30 px-2 py-0.5 rounded-full">
                      Save ${combo.savings.toFixed(2)}
                    </span>
                  </div>

                  <p className="text-xs text-white/50 font-body leading-relaxed">
                    {combo.description}
                  </p>

                  <div className="space-y-1.5 text-xs bg-black/40 p-3.5 rounded-xl border border-white/5 font-mono">
                    <div className="flex justify-between text-white/80">
                      <span className="text-white/40">BURGER:</span>
                      <span className="truncate max-w-[180px]">{combo.burger}</span>
                    </div>
                    <div className="flex justify-between text-white/80">
                      <span className="text-white/40">SIDE:</span>
                      <span className="truncate max-w-[180px]">{combo.side}</span>
                    </div>
                    <div className="flex justify-between text-white/80">
                      <span className="text-white/40">DRINK:</span>
                      <span className="truncate max-w-[180px]">{combo.drink}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-2xl font-bold text-[#F0EDE8]">${combo.price.toFixed(2)}</span>
                    <span className="text-xs text-white/40 line-through font-mono">${combo.originalPrice.toFixed(2)}</span>
                  </div>

                  <button
                    onClick={() => handleAddCombo(combo)}
                    className="btn-primary text-xs px-5 py-2.5 font-semibold"
                  >
                    Add Feast
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
