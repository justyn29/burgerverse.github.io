"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { burgers, Burger } from "@/lib/data/burgers";
import { useCart } from "@/lib/cart-context";
import { BurgerCustomizerModal } from "./BurgerCustomizerModal";

export function BurgersShowcase() {
  const [selectedFilter, setSelectedFilter] = useState<"all" | "featured" | "luxury" | "spicy">("all");
  const [inspectedBurger, setInspectedBurger] = useState<Burger | null>(null);
  const [customizingBurger, setCustomizingBurger] = useState<Burger | null>(null);
  const { addItem } = useCart();

  const filteredBurgers = burgers.filter((b) => {
    if (selectedFilter === "featured") return b.featured;
    if (selectedFilter === "luxury") return b.price > 20 || b.id.includes("truffle") || b.id.includes("prime");
    if (selectedFilter === "spicy") return b.id.includes("inferno") || b.id.includes("volcano");
    return true;
  });

  const handleQuickAdd = (burger: Burger) => {
    addItem({
      id: burger.id,
      type: "burger",
      title: burger.name,
      tagline: burger.tagline,
      price: burger.price,
      image: burger.image,
      accentColor: burger.accentColor,
    });
  };

  return (
    <section id="burgers" className="relative section-padding bg-background overflow-hidden" aria-label="Signature 7 Burgers Showcase">
      {/* Ambient Lighting */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-accent-secondary/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-accent uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              The Signature Pantheon
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-text uppercase leading-none">
              THE 07 <span className="text-gradient-accent">MASTERPIECES</span>
            </h2>
          </div>
          <p className="max-w-md text-text/70 text-sm md:text-base mt-4 md:mt-0 font-body">
            Hand-crafted in limited daily allocations. Every patty is seared to order with proprietary seasoning and artisan sauces.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-12">
          {[
            { id: "all", label: "All 07 Creations" },
            { id: "featured", label: "Chef's Signatures" },
            { id: "luxury", label: "Wagyu & Truffle Tier" },
            { id: "spicy", label: "Intense Heat & Ghost Pepper" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id as any)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                selectedFilter === tab.id
                  ? "bg-accent text-background font-semibold shadow-glow"
                  : "glassmorphism text-text/70 hover:text-text hover:border-white/20"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 7 Burgers Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBurgers.map((burger, index) => (
            <motion.div
              key={burger.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="group relative rounded-3xl glassmorphism border border-white/10 hover:border-accent/40 p-6 flex flex-col justify-between transition-all duration-500 hover:shadow-2xl overflow-hidden hover:-translate-y-1.5"
            >
              {/* Dynamic Ambient Hover Glow */}
              <div
                className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-0 group-hover:opacity-25 transition-opacity duration-500 pointer-events-none"
                style={{ backgroundColor: burger.accentColor || "#FF9D00" }}
              />

              {/* Card Top: Number & Badges */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-accent/80 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                    N° {burger.number}
                  </span>
                  {burger.featured && (
                    <span className="text-[10px] tracking-wider uppercase font-semibold text-highlight bg-highlight/10 px-2.5 py-1 rounded-full border border-highlight/20">
                      Chef Selected
                    </span>
                  )}
                </div>

                {/* Floating Burger Image */}
                <div className="relative w-full aspect-square my-2 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-t from-accent/10 to-transparent rounded-full blur-2xl group-hover:scale-110 transition-transform duration-500" />
                  <div className="relative w-full h-full p-2 group-hover:scale-105 transition-transform duration-500 ease-out-expo">
                    <Image
                      src={burger.image}
                      alt={burger.name}
                      fill
                      className="object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)]"
                    />
                  </div>
                </div>

                {/* Burger Details */}
                <div className="space-y-1.5 mt-2">
                  <h3 className="font-display text-2xl sm:text-3xl text-text uppercase group-hover:text-accent transition-colors">
                    {burger.name}
                  </h3>
                  <p className="text-xs font-mono text-accent">{burger.tagline}</p>
                  <p className="text-xs text-text/70 line-clamp-2 pt-1 font-body leading-relaxed">
                    {burger.description}
                  </p>
                </div>

                {/* Key Ingredients Pill List */}
                <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-white/5">
                  {burger.ingredients.slice(0, 3).map((ing, i) => (
                    <span key={i} className="text-[10px] text-text/60 bg-white/5 px-2 py-0.5 rounded-md border border-white/5">
                      {ing.split("•")[0]}
                    </span>
                  ))}
                  {burger.ingredients.length > 3 && (
                    <span className="text-[10px] text-accent/80 font-mono bg-white/5 px-2 py-0.5 rounded-md">
                      +{burger.ingredients.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Card Footer: Price & Actions */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] text-text/40 uppercase block">Price</span>
                  <span className="font-display text-2xl text-text font-bold">
                    ${burger.price.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setInspectedBurger(burger)}
                    className="p-2.5 rounded-xl glassmorphism border border-white/10 hover:border-accent/40 text-text/70 hover:text-text text-xs transition-colors"
                    title="Nutrition & Specs"
                    aria-label={`Inspect nutrition for ${burger.name}`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>

                  <button
                    onClick={() => setCustomizingBurger(burger)}
                    className="p-2.5 rounded-xl glassmorphism border border-white/10 hover:border-accent text-accent text-xs transition-colors font-medium"
                    title="Customize Bun & Toppings"
                    aria-label={`Customize ${burger.name}`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </button>

                  <button
                    onClick={() => handleQuickAdd(burger)}
                    className="btn-primary text-xs px-4 py-2.5 font-semibold flex items-center gap-1.5 shadow-sm"
                  >
                    <span>Order</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Inspect Burger Macro & Nutrition Modal */}
      <AnimatePresence>
        {inspectedBurger && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setInspectedBurger(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-surface border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 space-y-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-mono text-accent uppercase tracking-widest">N° {inspectedBurger.number} Breakdown</span>
                  <h3 className="font-display text-3xl text-text uppercase">{inspectedBurger.name}</h3>
                  <p className="text-xs text-text/60">{inspectedBurger.tagline}</p>
                </div>
                <button
                  onClick={() => setInspectedBurger(null)}
                  className="p-2 rounded-full hover:bg-white/10 text-text/60 hover:text-text"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Nutrition Gauges */}
              <div>
                <span className="text-xs font-semibold uppercase text-text/70 tracking-wider block mb-3">Macronutrient Profile</span>
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="p-3 rounded-2xl bg-surface-elevated border border-white/5">
                    <div className="font-display text-2xl text-accent">{inspectedBurger.nutrition.calories}</div>
                    <div className="text-[10px] text-text/50 uppercase">Calories</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-surface-elevated border border-white/5">
                    <div className="font-display text-2xl text-highlight">{inspectedBurger.nutrition.protein}g</div>
                    <div className="text-[10px] text-text/50 uppercase">Protein</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-surface-elevated border border-white/5">
                    <div className="font-display text-2xl text-text">{inspectedBurger.nutrition.carbs}g</div>
                    <div className="text-[10px] text-text/50 uppercase">Carbs</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-surface-elevated border border-white/5">
                    <div className="font-display text-2xl text-accent-secondary">{inspectedBurger.nutrition.fat}g</div>
                    <div className="text-[10px] text-text/50 uppercase">Healthy Fats</div>
                  </div>
                </div>
              </div>

              {/* Full Ingredients List */}
              <div>
                <span className="text-xs font-semibold uppercase text-text/70 tracking-wider block mb-3">Complete Artisan Ingredients</span>
                <ul className="space-y-2 text-xs">
                  {inspectedBurger.ingredients.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-text/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer Actions */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="font-display text-3xl text-text font-bold">${inspectedBurger.price.toFixed(2)}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setCustomizingBurger(inspectedBurger);
                      setInspectedBurger(null);
                    }}
                    className="btn-secondary text-xs px-4 py-2.5"
                  >
                    Customize
                  </button>
                  <button
                    onClick={() => {
                      handleQuickAdd(inspectedBurger);
                      setInspectedBurger(null);
                    }}
                    className="btn-primary text-xs px-6 py-2.5 font-semibold"
                  >
                    Add to Tray
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bespoke Customizer Modal */}
      <BurgerCustomizerModal
        burger={customizingBurger}
        isOpen={!!customizingBurger}
        onClose={() => setCustomizingBurger(null)}
      />
    </section>
  );
}
