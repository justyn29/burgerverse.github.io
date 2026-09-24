"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ingredients, Ingredient } from "@/lib/data/ingredients";

export function IngredientStory() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "beef" | "cheese" | "sauce" | "bun" | "vegetable">("all");
  const [activeIngredient, setActiveIngredient] = useState<Ingredient>(ingredients[0]);

  const filtered = selectedCategory === "all"
    ? ingredients
    : ingredients.filter((i) => i.category === selectedCategory);

  return (
    <section id="story" className="relative section-padding bg-background overflow-hidden" aria-label="Ingredient Storytelling & Sourcing">
      {/* Ambient Lighting */}
      <div className="absolute top-10 left-10 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-accent-secondary/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-accent uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Sovereign Terroir & Provenance
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-text uppercase leading-none">
              THE INGREDIENT <span className="text-gradient-accent">PROVENANCE</span>
            </h2>
          </div>
          <p className="max-w-md text-text/70 text-sm md:text-base mt-4 md:mt-0 font-body">
            No preservatives, no shortcuts. We partner with single-estate farms, artisanal creameries, and master boulangeries worldwide.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {[
            { id: "all", label: "All Elements" },
            { id: "beef", label: "Heritage Beef (Wagyu & Angus)" },
            { id: "cheese", label: "Cave-Aged Fromages" },
            { id: "sauce", label: "Truffles & Micro-Ferments" },
            { id: "bun", label: "French Brioche Boulangerie" },
            { id: "vegetable", label: "Rooftop Hydroponics" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                selectedCategory === cat.id
                  ? "bg-accent text-background font-semibold shadow-glow"
                  : "glassmorphism text-text/70 hover:text-text hover:border-white/20"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Master Ingredient Lab Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Ingredient Selector Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.map((item) => {
              const isSelected = activeIngredient.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveIngredient(item)}
                  className={`p-5 rounded-2xl text-left border transition-all duration-300 relative overflow-hidden group ${
                    isSelected
                      ? "bg-surface-elevated border-accent shadow-glow"
                      : "glassmorphism border-white/5 hover:border-white/20"
                  }`}
                >
                  <div
                    className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-10 group-hover:opacity-30 transition-opacity"
                    style={{ backgroundColor: item.color }}
                  />

                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-accent">
                      {item.category}
                    </span>
                    <span className="text-[10px] text-text/40 font-mono">
                      {item.particles.toUpperCase()}
                    </span>
                  </div>

                  <h3 className="font-display text-xl text-text uppercase mb-1 group-hover:text-accent transition-colors">
                    {item.name}
                  </h3>

                  <p className="text-xs text-text/60 line-clamp-2 mb-3">
                    {item.title}
                  </p>

                  <div className="text-[11px] text-text/80 font-mono flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{item.origin}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Active Ingredient Deep-Dive Card */}
          <div className="lg:col-span-5 sticky top-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIngredient.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
                className="p-8 rounded-3xl glassmorphism-strong border border-white/10 relative overflow-hidden shadow-2xl"
              >
                <div
                  className="absolute -top-10 -right-10 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none"
                  style={{ backgroundColor: activeIngredient.color }}
                />

                <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-accent mb-4">
                  ORIGIN SPECIFICATION
                </div>

                <h3 className="font-display text-3xl sm:text-4xl text-text uppercase mb-2">
                  {activeIngredient.title}
                </h3>

                <div className="flex items-center gap-2 text-xs font-mono text-highlight mb-6">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{activeIngredient.origin}</span>
                </div>

                <p className="text-sm text-text/80 leading-relaxed mb-6 font-body">
                  {activeIngredient.description}
                </p>

                <div className="p-4 rounded-2xl bg-black/40 border border-white/5 mb-6 space-y-2">
                  <span className="text-[10px] text-text/40 uppercase tracking-wider block font-mono">
                    Artisanal Preparation Method
                  </span>
                  <p className="text-xs text-text/90 font-medium">
                    {activeIngredient.process}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs text-text/60 border-t border-white/5 pt-4">
                  <span>Standard Quality Protocol</span>
                  <span className="text-accent font-semibold">100% Uncompromised Sourcing</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
