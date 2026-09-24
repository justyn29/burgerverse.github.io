"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { rewardTiers, programBenefits, milestones, RewardTier } from "@/lib/data/rewards";

export function RewardsSection() {
  const [selectedTier, setSelectedTier] = useState<RewardTier>(rewardTiers[3]); // Default Sovereign
  const [memberName, setMemberName] = useState("JUSTYN KUMAR");
  const [joined, setJoined] = useState(false);

  return (
    <section id="rewards" className="relative section-padding bg-background overflow-hidden" aria-label="Sovereign VIP Rewards Club">
      {/* Background Volumetric Gold Glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-accent uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              The Sovereign Society
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-text uppercase leading-none">
              VIP <span className="text-gradient-accent">REWARDS CLUB</span>
            </h2>
          </div>
          <p className="max-w-md text-text/70 text-sm md:text-base mt-4 md:mt-0 font-body">
            Earn 10 points per $1 spent. Unlock lifetime tier status, secret drops, invitations to private tastings, and complimentary chef table experiences.
          </p>
        </div>

        {/* 4 Tier Selector Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
          {rewardTiers.map((tier) => {
            const isSelected = selectedTier.id === tier.id;
            return (
              <button
                key={tier.id}
                onClick={() => setSelectedTier(tier)}
                className={`p-4 rounded-2xl border text-left transition-all duration-300 ${
                  isSelected
                    ? "bg-surface-elevated border-accent shadow-glow scale-[1.02]"
                    : "glassmorphism border-white/5 text-text/70 hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono text-accent uppercase tracking-wider">
                    Tier 0{tier.level}
                  </span>
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: tier.color }}
                  />
                </div>
                <h3 className="font-display text-xl text-text uppercase">{tier.name}</h3>
                <span className="text-[11px] text-text/50 block truncate">{tier.requirement}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive 3D Member Card & Tier Benefits Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          {/* Left: 3D Holographic VIP Member Card */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            <motion.div
              key={selectedTier.id}
              initial={{ rotateY: -15, opacity: 0, scale: 0.95 }}
              animate={{ rotateY: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[460px] aspect-[1.586/1] rounded-3xl p-6 md:p-8 flex flex-col justify-between overflow-hidden shadow-2xl border border-white/20 select-none group"
              style={{
                background:
                  selectedTier.level === 4
                    ? "linear-gradient(135deg, #1C1917 0%, #292524 50%, #44403C 100%)"
                    : selectedTier.level === 3
                    ? "linear-gradient(135deg, #27272A 0%, #18181B 100%)"
                    : "linear-gradient(135deg, #181818 0%, #0D0D0D 100%)",
              }}
            >
              {/* Metallic / Holographic Foil Shimmer */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

              {/* Card Header */}
              <div className="flex items-start justify-between relative z-10">
                <div>
                  <span className="text-[10px] tracking-widest font-mono uppercase text-accent">
                    BurgerVerse Sovereign Pass
                  </span>
                  <h4 className="font-display text-2xl text-text uppercase tracking-wider">
                    {selectedTier.name} Tier
                  </h4>
                </div>
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center font-display text-lg font-bold border border-white/20 shadow-md"
                  style={{ backgroundColor: selectedTier.color, color: "#000" }}
                >
                  BV
                </div>
              </div>

              {/* Card Chip & Micro-Print */}
              <div className="relative z-10 flex items-center gap-4 my-2">
                <div className="w-11 h-8 rounded-md bg-gradient-to-br from-yellow-300 to-yellow-600 border border-yellow-200/40 flex items-center justify-center shadow-inner">
                  <div className="w-8 h-5 border border-black/30 rounded-sm" />
                </div>
                <span className="font-mono text-xs tracking-widest text-text/70">
                  •••• •••• •••• 2026
                </span>
              </div>

              {/* Card Footer: Member Name & Expiry */}
              <div className="flex items-end justify-between relative z-10 border-t border-white/10 pt-3">
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-text/40 block">Cardholder</span>
                  <span className="font-mono text-xs font-bold text-text uppercase tracking-widest">
                    {memberName || "SOVEREIGN GUEST"}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[9px] uppercase tracking-wider text-text/40 block">Status</span>
                  <span className="text-xs font-bold text-highlight font-mono">LIFETIME ACCESS</span>
                </div>
              </div>
            </motion.div>

            {/* Custom Name Inscription Input */}
            <div className="mt-4 flex items-center gap-2 w-full max-w-[460px]">
              <span className="text-[11px] text-text/50 uppercase font-mono whitespace-nowrap">Card Name:</span>
              <input
                type="text"
                value={memberName}
                onChange={(e) => setMemberName(e.target.value.toUpperCase())}
                maxLength={24}
                className="w-full bg-surface border border-white/10 rounded-lg px-3 py-1.5 text-xs text-text focus:outline-none focus:border-accent font-mono uppercase"
              />
            </div>
          </div>

          {/* Right: Selected Tier Benefits Deep Dive */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl glassmorphism-strong border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-accent font-semibold">
                Tier 0{selectedTier.level} Privileges
              </span>
              <span className="text-xs font-mono bg-white/5 border border-white/5 px-3 py-1 rounded-full text-text/70">
                {selectedTier.requirement}
              </span>
            </div>

            <h3 className="font-display text-3xl text-text uppercase mb-2">
              {selectedTier.name} Status
            </h3>

            <p className="text-xs sm:text-sm text-text/80 leading-relaxed mb-6 font-body">
              {selectedTier.description}
            </p>

            {/* Benefits List */}
            <ul className="space-y-3 mb-8">
              {selectedTier.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-text/90 font-medium">
                  <span className="w-5 h-5 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-accent text-xs flex-shrink-0">
                    ✓
                  </span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            {/* Instant Claim Button */}
            {joined ? (
              <div className="p-4 rounded-2xl bg-accent/20 border border-accent/40 text-center">
                <span className="text-xs font-bold text-accent uppercase tracking-wider block">
                  ✓ Welcome to the Sovereign Society, {memberName}!
                </span>
                <span className="text-[11px] text-text/70">Check your email for your digital Apple Wallet pass.</span>
              </div>
            ) : (
              <button
                onClick={() => setJoined(true)}
                className="btn-primary w-full py-4 text-sm font-semibold flex items-center justify-center gap-2 shadow-glow"
              >
                <span>Enroll in {selectedTier.name} Society</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Milestones & Program Perks Grid */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-10">
            <h3 className="font-display text-2xl md:text-3xl text-text uppercase">
              CULINARY <span className="text-gradient-accent">MILESTONES</span>
            </h3>
            <p className="text-xs text-text/60 mt-1 font-body">
              Unlock permanent physical artifacts and rewards as your gastronomic journey deepens.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {milestones.map((ms) => (
              <div
                key={ms.id}
                className="p-5 rounded-2xl glassmorphism border border-white/5 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase text-accent tracking-wider block mb-2">
                    Milestone
                  </span>
                  <h4 className="font-display text-lg text-text uppercase mb-1">{ms.name}</h4>
                  <p className="text-xs text-text/60 mb-3">{ms.description}</p>
                </div>
                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                  <span className="text-[10px] uppercase text-text/40">Prize:</span>
                  <span className="font-semibold text-highlight text-[11px]">{ms.reward}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
