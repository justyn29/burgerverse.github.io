"use client";

import React from "react";
import { motion } from "framer-motion";

const pillars = [
  {
    number: "01",
    title: "100% Single-Origin Wagyu & Angus",
    subtitle: "Ethically Farmed & Grass-Fed",
    description: "We never blend scraps or frozen trimmings. Every patty is ground in-house daily from whole primal cuts aged 45 days for unrivaled tenderness.",
  },
  {
    number: "02",
    title: "6-Hour Fermented French Brioche",
    subtitle: "28% Churned Normandy Butter",
    description: "Baked fresh at 5:00 AM every morning. Our pillowy buns feature an egg-wash golden sheen that holds juices without softening.",
  },
  {
    number: "03",
    title: "Cave-Aged Alpine Fromages",
    subtitle: "Matured 18 to 36 Months",
    description: "Direct imports from Swiss caves and Vermont heritage creameries. Natural tyrosine crystals deliver crunch and profound savory depth.",
  },
  {
    number: "04",
    title: "Proprietary Botanical Ferments",
    subtitle: "Small-Batch Handcrafted Sauces",
    description: "From 6-month barrel-fermented Bhut Jolokia ghost peppers to 72-hour cold-steeped Périgord black truffle aioli. Zero artificial thickeners.",
  },
];

const comparisonData = [
  {
    feature: "Beef Sourcing",
    burgerverse: "Single-Estate Tasmanian Wagyu MS 9+ & 45-Day Dry-Aged Angus",
    generic: "Commodity frozen bulk trimmings, multi-source blends",
  },
  {
    feature: "Bun Standard",
    burgerverse: "28% French butter brioche, baked fresh twice daily in-house",
    generic: "Industrial shelf-stable rolls loaded with preservatives",
  },
  {
    feature: "Cheese Sourcing",
    burgerverse: "18-month Cave-Aged Swiss Gruyère AOP & 3-Year Vermont Cheddar",
    generic: "Processed cheese slices with emulsifiers",
  },
  {
    feature: "Sauces & Condiments",
    burgerverse: "Dog-harvested Périgord black winter truffles & barrel-fermented peppers",
    generic: "High-fructose corn syrup relishes and artificial aromas",
  },
  {
    feature: "Cooking Technique",
    burgerverse: "Seared over white Binchotan charcoal & 400°F plancha precision",
    generic: "Conveyor gas broilers or standard flat tops",
  },
];

export function WhyBurgerVerse() {
  return (
    <section className="relative section-padding bg-background overflow-hidden" aria-label="Why BurgerVerse Philosophy and Standards">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-accent/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-accent uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            The Sovereign Standard
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-text uppercase leading-none">
            WHY <span className="text-gradient-accent">BURGERVERSE</span> REIGNS
          </h2>
          <p className="text-text/70 text-sm sm:text-base mt-4 font-body">
            We rejected the fast-casual race to the bottom. Here is how our commitment to relentless culinary perfection redefines the modern burger.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 rounded-3xl glassmorphism border border-white/10 hover:border-accent/40 transition-all duration-300 hover:shadow-xl flex flex-col justify-between"
            >
              <div>
                <span className="font-display text-4xl text-gradient-accent block mb-4">
                  {pillar.number}
                </span>
                <h3 className="font-display text-2xl text-text uppercase mb-1">
                  {pillar.title}
                </h3>
                <span className="text-xs font-mono text-accent block mb-3">
                  {pillar.subtitle}
                </span>
                <p className="text-xs text-text/70 leading-relaxed font-body">
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Comparison Matrix Table */}
        <div className="rounded-3xl glassmorphism-strong border border-white/10 p-6 md:p-10 shadow-2xl">
          <div className="mb-6">
            <h3 className="font-display text-2xl md:text-3xl text-text uppercase">
              THE QUALITY <span className="text-accent">BENCHMARK</span>
            </h3>
            <p className="text-xs text-text/60 font-mono mt-1">
              Side-by-side audit: Fast Casual Industry Defaults vs BurgerVerse Sovereign Architecture
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-text/50 uppercase tracking-wider font-mono">
                  <th className="pb-4 pr-4">Craft Dimension</th>
                  <th className="pb-4 px-4 text-accent font-bold">BurgerVerse Sovereign Quality</th>
                  <th className="pb-4 pl-4 text-text/40">Generic Fast Casual Chains</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-body">
                {comparisonData.map((row, i) => (
                  <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 pr-4 font-semibold text-text whitespace-nowrap">
                      {row.feature}
                    </td>
                    <td className="py-4 px-4 text-text/90 font-medium">
                      <div className="flex items-center gap-2">
                        <span className="text-accent font-bold">✓</span>
                        <span>{row.burgerverse}</span>
                      </div>
                    </td>
                    <td className="py-4 pl-4 text-text/40">
                      <div className="flex items-center gap-2">
                        <span className="text-text/30">✕</span>
                        <span>{row.generic}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
