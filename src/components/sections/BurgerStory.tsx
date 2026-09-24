"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { asset } from "@/lib/assets";

interface StoryPillar {
  number: string;
  title: string;
  tagline: string;
  description: string;
  stats: { label: string; value: string }[];
  image: string;
  accent: string;
}

const PILLARS: StoryPillar[] = [
  {
    number: "01",
    title: "45-Day Dry-Aged Wagyu MS9+",
    tagline: "The Meat Architecture",
    description:
      "We source exclusively from 100% full-blood Wagyu steers. Dry-aged for 45 days in Himalayan salt-lined chambers to concentrate deep nutty umami, then seared over Japanese Binchotan white oak charcoal at 400°F to produce an impervious caramelized crust while retaining buttery, melt-in-mouth marbling.",
    stats: [
      { label: "Marbling Score", value: "MS 9+" },
      { label: "Salt Chamber Age", value: "45 Days" },
      { label: "Charcoal Sear", value: "400°F" },
    ],
    image: "/layers/patty.jpg",
    accent: "#FF5A00",
  },
  {
    number: "02",
    title: "18-Month Cave-Aged Gruyère",
    tagline: "The Molten Mantle",
    description:
      "Crafted exclusively in copper vats in the alpine canton of Fribourg, Switzerland. Matured on raw unvarnished spruce shelves inside natural mountain caves for 18 months, developing crunchy tyrosine crystals and melting into a silky, savory blanket at precisely 168°F.",
    stats: [
      { label: "Terroir", value: "Swiss Alps" },
      { label: "Maturity", value: "18 Months" },
      { label: "Melt Point", value: "168°F" },
    ],
    image: "/layers/cheese.jpg",
    accent: "#FFD65A",
  },
  {
    number: "03",
    title: "28% Normandy Butter Brioche",
    tagline: "The Golden Crown",
    description:
      "Baked fresh every three hours. Incorporating pure cultured Beurre d'Isigny A.O.P. from Normandy, France. A 72-hour slow cold fermentation yields a feathery, cloud-like crumb that absorbs burger jus without collapsing under weight.",
    stats: [
      { label: "Butter Fat", value: "28% A.O.P." },
      { label: "Fermentation", value: "72 Hours" },
      { label: "Bake Cycle", value: "Every 3h" },
    ],
    image: "/layers/top-bun.jpg",
    accent: "#FF9D00",
  },
  {
    number: "04",
    title: "Périgord Truffle & Bourbon Glaze",
    tagline: "The Liquid Alchemy",
    description:
      "Black winter truffles (Tuber melanosporum) hand-foraged in Périgord, France, slow-infused into a velvety egg-yolk aioli and paired with an aged Kentucky bourbon reduction. Earthy, seductive, and lingers on the palate for minutes.",
    stats: [
      { label: "Truffle Spec", value: "Melanosporum" },
      { label: "Reduction", value: "Bourbon Mash" },
      { label: "Extraction", value: "Cold Infused" },
    ],
    image: "/layers/sauce.jpg",
    accent: "#D4AF37",
  },
];

export function BurgerStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      id="story"
      ref={containerRef}
      className="relative w-full py-28 sm:py-36 bg-[#080808] overflow-hidden"
    >
      {/* ── Background Morphing Ingredient Elements (Continuity from Section 3) ── */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none z-0 opacity-15 overflow-hidden"
      >
        <div className="absolute -top-20 -left-20 w-[420px] h-[420px] rounded-full blur-[140px] bg-[#FF9D00]/20" />
        <div className="absolute top-1/2 -right-32 w-[500px] h-[500px] rounded-full blur-[160px] bg-[#FF5A00]/15" />

        {/* Ambient floating ingredient fragments */}
        <div className="absolute top-[10%] left-[8%] w-48 h-48 opacity-25 filter blur-[2px] animate-float">
          <Image src={asset("/layers/lettuce.jpg")} alt="" fill className="object-contain" />
        </div>
        <div className="absolute top-[45%] right-[5%] w-56 h-56 opacity-20 filter blur-[2px] animate-float" style={{ animationDelay: "2s" }}>
          <Image src={asset("/layers/tomato.jpg")} alt="" fill className="object-contain" />
        </div>
        <div className="absolute top-[75%] left-[5%] w-60 h-60 opacity-20 filter blur-[2px] animate-float" style={{ animationDelay: "4s" }}>
          <Image src={asset("/layers/onion.jpg")} alt="" fill className="object-contain" />
        </div>
      </motion.div>

      <div className="relative z-10 section-container">
        {/* Section Header */}
        <div className="max-w-2xl mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glassmorphism border border-white/10 text-[9px] font-mono uppercase tracking-[0.3em] text-[#FF9D00]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF9D00]" />
            <span>SECTION 4 — THE ARTISAN MANIFESTO</span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl uppercase text-[#F0EDE8] leading-none tracking-tight">
            INGREDIENTS MORPHED INTO{" "}
            <span className="text-gradient-accent">PURE CRAFT</span>
          </h2>

          <p className="text-sm sm:text-base text-white/50 font-body leading-relaxed">
            Every element that exploded in the flythrough exists because of obsessively curated provenance.
            We do not compromise. We do not use shortcuts.
          </p>
        </div>

        {/* 4 Story Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {PILLARS.map((pillar) => (
            <motion.div
              key={pillar.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="glassmorphism-strong rounded-3xl p-8 sm:p-10 border border-white/10 hover:border-[#FF9D00]/40 transition-all duration-500 flex flex-col justify-between group shadow-2xl relative overflow-hidden"
            >
              {/* Subtle top glow line */}
              <div
                className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(90deg, transparent, ${pillar.accent}, transparent)`,
                }}
              />

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#FF9D00]">
                    Pillar {pillar.number}
                  </span>
                  <span className="text-[10px] font-mono uppercase text-white/30 tracking-wider">
                    {pillar.tagline}
                  </span>
                </div>

                <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden bg-black/40 border border-white/5 group-hover:border-white/20 transition-all duration-500">
                  <Image
                    src={asset(pillar.image)}
                    alt={pillar.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>

                <h3 className="font-display text-2xl sm:text-3xl uppercase text-[#F0EDE8] leading-tight">
                  {pillar.title}
                </h3>

                <p className="text-xs sm:text-sm text-white/50 font-body leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              {/* Stats telemetry row */}
              <div className="grid grid-cols-3 gap-3 pt-8 mt-6 border-t border-white/10">
                {pillar.stats.map((stat, i) => (
                  <div key={i} className="space-y-1">
                    <div className="text-[9px] font-mono uppercase text-white/30 tracking-wider">
                      {stat.label}
                    </div>
                    <div className="font-mono text-xs sm:text-sm text-[#FF9D00] font-semibold">
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
