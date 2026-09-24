"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cart-context";

interface LayerDetail {
  id: string;
  name: string;
  category: string;
  description: string;
  origin: string;
  flavorNote: string;
  temperature: string;
  color: string;
  topPercent: number;
}

const layers: LayerDetail[] = [
  {
    id: "crown",
    name: "French Butter Brioche Crown & 24K Gold Leaf",
    category: "Artisan Bakery",
    description: "Hand-rolled with 28% French churned butter, fermented for 6 hours, baked daily at dawn with edible gold leaf foil.",
    origin: "Lyon Tradition, Baked in House",
    flavorNote: "Sweet, Toasted Hazelnut, Pillowy",
    temperature: "140°F Warm Toast",
    color: "#FFD700",
    topPercent: 8,
  },
  {
    id: "truffle-aioli",
    name: "Périgord Black Winter Truffle Aioli",
    category: "Signature Emulsion",
    description: "Cold-infused over 72 hours with freshly grated Périgord truffles and free-range egg yolks for decadent silkiness.",
    origin: "Périgord, France",
    flavorNote: "Earthy, Umami-rich, Velvet",
    temperature: "Chilled Emulsion",
    color: "#E5E5E5",
    topPercent: 24,
  },
  {
    id: "cheese",
    name: "Cave-Aged Swiss Gruyère AOP (18 Months)",
    category: "Aged Alpine Cheese",
    description: "Matured in natural humidity-controlled caves in Switzerland. Melts over the flame with delicate tyrosine crystals.",
    origin: "Gruyères, Switzerland",
    flavorNote: "Nutty, Complex, Creamy",
    temperature: "165°F Molten Melt",
    color: "#FFAE00",
    topPercent: 40,
  },
  {
    id: "wagyu-patty",
    name: "200g Australian Wagyu MS 9+ (45-Day Dry-Aged)",
    category: "Prime Protein",
    description: "The crown jewel. Intense marbling, dry-aged for 45 days to concentrate deep beef umami. Seared over white binchotan charcoal.",
    origin: "Tasmania, Australia",
    flavorNote: "Deep Umami, Butter-tender, Wood-smoke",
    temperature: "135°F Medium-Rare Core",
    color: "#DC2626",
    topPercent: 56,
  },
  {
    id: "caramelized-shallots",
    name: "Slow-Caramelized Shallot Confit & Micro Greens",
    category: "Botanicals",
    description: "French shallots slow-simmered in beef tallow and aged balsamic for 4 hours until jammy and aromatic.",
    origin: "Organic California Farms",
    flavorNote: "Sweet Savory, Acidic Balance",
    temperature: "150°F Warm Confit",
    color: "#8B5CF6",
    topPercent: 72,
  },
  {
    id: "heel",
    name: "Brioche Heel with Brown Butter Glaze",
    category: "Foundation",
    description: "Dense enough to retain the juices without getting soggy, pan-seared with brown butter for a satisfying crunch.",
    origin: "In-House Boulangerie",
    flavorNote: "Caramelized Crust, Sturdy",
    temperature: "160°F Crisped Base",
    color: "#D97706",
    topPercent: 88,
  },
];

export function BurgerExplodedView() {
  const [activeLayer, setActiveLayer] = useState<LayerDetail>(layers[3]);
  const [viewMode, setViewMode] = useState<"explode" | "explode2" | "assembled">("explode");
  const { addItem } = useCart();

  const handleOrder = () => {
    addItem({
      id: "ultimate-prime",
      type: "burger",
      title: "Ultimate Prime (Exploded Architecture)",
      tagline: "45-Day Dry-Aged Wagyu MS 9+",
      price: 42.99,
      image: "/burgers/ultimate-prime.png",
      accentColor: "#FFD700",
    });
  };

  return (
    <section
      id="explode-view"
      className="relative section-padding bg-surface border-t border-b border-white/5 overflow-hidden"
      aria-label="Deconstructed Burger Architecture"
    >
      {/* Background Volumetric Lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-accent-secondary/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-accent uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Gastronomic Anatomy
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-text uppercase leading-none">
              DECONSTRUCTED <span className="text-gradient-accent">ARCHITECTURE</span>
            </h2>
          </div>
          <p className="max-w-md text-text/70 text-sm md:text-base mt-4 md:mt-0 font-body">
            Every millimeter is calculated. Explore each artisan layer that creates the symphonic balance of the Ultimate Prime.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center justify-center sm:justify-start gap-2 mb-8">
          <span className="text-xs text-text/50 uppercase tracking-wider mr-2 hidden sm:inline">Anatomy View:</span>
          <button
            onClick={() => setViewMode("explode")}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
              viewMode === "explode"
                ? "bg-accent text-background shadow-glow"
                : "glassmorphism text-text/70 hover:text-text hover:border-white/20"
            }`}
          >
            Exploded View A
          </button>
          <button
            onClick={() => setViewMode("explode2")}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
              viewMode === "explode2"
                ? "bg-accent text-background shadow-glow"
                : "glassmorphism text-text/70 hover:text-text hover:border-white/20"
            }`}
          >
            Exploded View B
          </button>
          <button
            onClick={() => setViewMode("assembled")}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
              viewMode === "assembled"
                ? "bg-accent text-background shadow-glow"
                : "glassmorphism text-text/70 hover:text-text hover:border-white/20"
            }`}
          >
            Assembled Masterpiece
          </button>
        </div>

        {/* Main Interactive Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Visual Exploded Interactive Canvas */}
          <div className="lg:col-span-7 relative flex items-center justify-center min-h-[460px] md:min-h-[580px] rounded-3xl glassmorphism border border-white/10 p-6 md:p-8 overflow-hidden group">
            {/* Interactive Background Grid */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FF9D00_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

            {/* Exploded Image Display with Smooth Transitions */}
            <div className="relative w-full h-full max-w-[480px] aspect-[4/5] flex items-center justify-center">
              <AnimatePresence mode="wait">
                {viewMode === "explode" && (
                  <motion.div
                    key="explode1"
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src="/main burger explode view.png"
                      alt="Burger Deconstructed Exploded Layer View"
                      fill
                      className="object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
                      priority
                    />
                  </motion.div>
                )}

                {viewMode === "explode2" && (
                  <motion.div
                    key="explode2"
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src="/main burger explode view -2.png"
                      alt="Burger Deconstructed Exploded Layer View Angle 2"
                      fill
                      className="object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
                      priority
                    />
                  </motion.div>
                )}

                {viewMode === "assembled" && (
                  <motion.div
                    key="assembled"
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -10 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src="/main burger.png"
                      alt="Burger Assembled Hero"
                      fill
                      className="object-contain filter drop-shadow-[0_25px_50px_rgba(255,157,0,0.3)]"
                      priority
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Interactive Layer Pins on Exploded View */}
              {viewMode !== "assembled" &&
                layers.map((layer) => {
                  const isSelected = activeLayer.id === layer.id;
                  return (
                    <button
                      key={layer.id}
                      onClick={() => setActiveLayer(layer)}
                      style={{ top: `${layer.topPercent}%` }}
                      className={`absolute right-2 md:right-6 -translate-y-1/2 flex items-center gap-2 group/pin z-20 transition-transform duration-200 ${
                        isSelected ? "scale-110" : "scale-100 opacity-70 hover:opacity-100"
                      }`}
                      aria-label={`Inspect ${layer.name}`}
                    >
                      <span
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                          isSelected
                            ? "border-accent bg-accent shadow-glow"
                            : "border-white/50 bg-black/60 group-hover/pin:border-accent"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isSelected ? "bg-black" : "bg-white"
                          }`}
                        />
                      </span>
                      <span
                        className={`hidden md:inline text-xs font-semibold px-2.5 py-1 rounded-md transition-all ${
                          isSelected
                            ? "bg-accent text-black font-bold shadow-md"
                            : "bg-surface-elevated/80 text-text/80 backdrop-blur-sm border border-white/5"
                        }`}
                      >
                        {layer.name.split(" ")[0]}
                      </span>
                    </button>
                  );
                })}
            </div>

            {/* Bottom Floating Hint */}
            <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-[11px] text-text/50 border-t border-white/5 pt-3">
              <span>Touch or click pins to inspect layer composition</span>
              <span className="font-mono text-accent">LAYER 0{layers.findIndex((l) => l.id === activeLayer.id) + 1} / 06</span>
            </div>
          </div>

          {/* Right Column: Layer Spec Inspector Card */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {/* Quick Layer Switcher Pills */}
            <div className="grid grid-cols-3 gap-2">
              {layers.map((layer, idx) => (
                <button
                  key={layer.id}
                  onClick={() => setActiveLayer(layer)}
                  className={`p-2.5 text-left rounded-xl border transition-all text-xs ${
                    activeLayer.id === layer.id
                      ? "bg-surface-elevated border-accent text-accent shadow-sm"
                      : "bg-surface/50 border-white/5 text-text/60 hover:border-white/20 hover:text-text"
                  }`}
                >
                  <div className="font-mono text-[10px] text-text/40">0{idx + 1}</div>
                  <div className="font-semibold truncate">{layer.name.split(" ")[0]}</div>
                </button>
              ))}
            </div>

            {/* Active Layer Details Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLayer.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="p-6 md:p-8 rounded-3xl glassmorphism-strong border border-white/10 relative overflow-hidden"
              >
                <div
                  className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 pointer-events-none"
                  style={{ backgroundColor: activeLayer.color }}
                />

                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                    {activeLayer.category}
                  </span>
                  <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-white/5 text-text/70 border border-white/5">
                    {activeLayer.temperature}
                  </span>
                </div>

                <h3 className="font-display text-2xl md:text-3xl text-text uppercase mb-3">
                  {activeLayer.name}
                </h3>

                <p className="text-sm text-text/80 leading-relaxed font-body mb-6">
                  {activeLayer.description}
                </p>

                <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-5 text-xs">
                  <div>
                    <span className="text-text/40 block mb-1 uppercase tracking-wider text-[10px]">Sourcing & Origin</span>
                    <span className="text-text font-semibold">{activeLayer.origin}</span>
                  </div>
                  <div>
                    <span className="text-text/40 block mb-1 uppercase tracking-wider text-[10px]">Sensory Profile</span>
                    <span className="text-accent font-semibold">{activeLayer.flavorNote}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Action Bar */}
            <div className="p-6 rounded-2xl glassmorphism border border-white/10 flex items-center justify-between gap-4">
              <div>
                <div className="text-xs text-text/50 uppercase tracking-wider">Experience the Whole</div>
                <div className="text-xl font-bold text-text font-display">$42.99 <span className="text-xs text-text/60 font-body font-normal">/ complete burger</span></div>
              </div>
              <button
                onClick={handleOrder}
                className="btn-primary px-6 py-3 text-sm font-semibold flex items-center gap-2 shadow-glow"
              >
                <span>Add To Tray</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
