"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import { burgers } from "@/lib/data/burgers";
import { asset } from "@/lib/assets";

export function FinalAssemblyCTA() {
  const { addItem } = useCart();
  const [reserved, setReserved] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("Flagship Soho, New York");

  const flagshipBurger = burgers.find((b) => b.id === "ultimate-prime") || burgers[0];

  const handleOrderMasterpiece = () => {
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
    <section
      id="contact"
      className="relative py-28 sm:py-36 bg-[#040404] border-t border-white/5 overflow-hidden"
    >
      {/* Dynamic ambient gold spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FF9D00]/10 rounded-full blur-[200px] pointer-events-none" />

      <div className="section-container relative z-10 space-y-16">
        {/* Section Tag */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glassmorphism border border-white/10 text-[9px] font-mono uppercase tracking-[0.3em] text-[#FF9D00]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF9D00] animate-pulse" />
            <span>SECTION 9 — THE CLIMAX & FINAL ASSEMBLY</span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl uppercase text-[#F0EDE8] leading-none">
            THE MASTERPIECE <span className="text-gradient-accent">ASSEMBLED</span>
          </h2>

          <p className="text-xs sm:text-sm text-white/50 font-body">
            You have explored every micron of the craft. Now taste what culinary engineering feels like.
          </p>
        </div>

        {/* 360 Final Assembly Showcase Card */}
        <div className="glassmorphism-strong rounded-3xl p-8 sm:p-14 border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Final Assembled Hero Burger */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96">
                {/* Radial golden halo */}
                <div className="absolute inset-0 bg-[#FF9D00]/15 rounded-full blur-3xl animate-pulse" />

                <motion.div
                  animate={{
                    y: [-10, 10, -10],
                    rotate: [-1, 2, -1],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={asset("/burgers/ultimate-prime.png")}
                    alt="Sovereign Ultimate Prime"
                    fill
                    className="object-contain filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.9)]"
                  />
                </motion.div>
              </div>

              <div className="mt-4 inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono text-white/60">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
                <span>Kitchen Status: Seared Fresh to Order • Allocation Available</span>
              </div>
            </div>

            {/* Right: Strong Ordering CTA & VIP Reservation Bar */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#FF9D00]">
                  Flagship Offering • N° 07
                </span>
                <h3 className="font-display text-3xl sm:text-5xl uppercase text-[#F0EDE8] leading-tight">
                  The Sovereign Ultimate Prime
                </h3>
                <p className="text-xs sm:text-sm text-white/60 font-body mt-2 leading-relaxed">
                  200g 45-day dry-aged wagyu, 18-month cave-aged gruyère, black winter truffle demi-glace, and gold leaf on hand-crafted brioche.
                </p>
              </div>

              {/* Location Selector */}
              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase text-white/40 tracking-wider block">
                  Select Dispatch Location
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-xs font-mono text-white focus:outline-none focus:border-[#FF9D00]"
                >
                  <option value="Flagship Soho, New York">Flagship Soho — 128 Mercer St, New York, NY</option>
                  <option value="Beverly Hills Salon">Beverly Hills Salon — 9400 Wilshire Blvd, Los Angeles, CA</option>
                  <option value="Mayfair Vault, London">Mayfair Vault — 14 Berkeley Square, London, UK</option>
                  <option value="Ginza Atelier, Tokyo">Ginza Atelier — 6-10-1 Ginza, Chuo City, Tokyo</option>
                </select>
              </div>

              {/* Primary Order Action */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={handleOrderMasterpiece}
                  className="btn-primary w-full sm:w-auto flex-1 py-4 text-xs font-semibold flex items-center justify-center gap-3 shadow-glow"
                >
                  <span>Order Sovereign Ultimate Prime</span>
                  <span className="font-mono bg-black/25 px-2 py-0.5 rounded-full text-[11px]">
                    $42.99
                  </span>
                </button>
              </div>

              {/* VIP Table Reservation Accordion */}
              <div className="pt-4 border-t border-white/10">
                {reserved ? (
                  <div className="p-4 rounded-xl bg-[#FF9D00]/15 border border-[#FF9D00]/30 text-center space-y-1">
                    <span className="text-xs font-bold text-[#FF9D00] uppercase font-mono block">
                      ✓ Tasting Reservation Requested
                    </span>
                    <p className="text-[11px] text-white/60">
                      Our Head Concierge will contact you within 15 minutes to confirm your table.
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setReserved(true);
                    }}
                    className="flex gap-2"
                  >
                    <input
                      type="email"
                      required
                      placeholder="Enter email for Private Chef's Table"
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#FF9D00]"
                    />
                    <button
                      type="submit"
                      className="btn-secondary text-xs px-5 py-2.5 whitespace-nowrap"
                    >
                      Reserve Table
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
