"use client";

import React from "react";
import { motion } from "framer-motion";

const items = [
  "45-Day Dry-Aged Wagyu MS9+",
  "Périgord Black Truffle",
  "24K Gold Leaf Crown",
  "18-Month Cave Gruyère",
  "Michelin Artisan Craft",
  "Charcoal Plancha 400°F",
  "Single Origin Beef",
  "72-Hour Cold Infusion",
  "Hydroponic Arugula",
  "Tallow-Simmered Shallots",
  "Lyon Ferment Brioche",
  "BurgerVerse Architecture",
];

interface MarqueeProps {
  speed?: "normal" | "slow";
  reverse?: boolean;
  className?: string;
}

export function MarqueeTicker({ speed = "normal", reverse = false, className = "" }: MarqueeProps) {
  const animClass = speed === "slow" ? "animate-marquee-slow" : "animate-marquee";

  return (
    <div className={`overflow-hidden w-full ${className}`}>
      <div
        className={`marquee-track ${animClass}`}
        style={{ direction: reverse ? "rtl" : "ltr" }}
      >
        {/* Two copies for seamless loop */}
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center gap-0 shrink-0">
            {items.map((item, i) => (
              <div key={i} className="flex items-center gap-0 shrink-0">
                <span
                  className="text-[11px] font-mono uppercase tracking-[0.25em] text-white/35 whitespace-nowrap px-6"
                >
                  {item}
                </span>
                <span className="text-[#FF9D00]/40 text-xs">✦</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
