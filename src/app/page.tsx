"use client";

import React from "react";
import { Navigation } from "@/components/layout/Navigation";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { IntroLoader } from "@/components/layout/IntroLoader";
import { MarqueeTicker } from "@/components/layout/MarqueeTicker";
import { ScrollProvider } from "@/components/layout/ScrollProvider";
import { CartProvider } from "@/lib/cart-context";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Footer } from "@/components/layout/Footer";

// ══════════════════════════════════════════════════
// THE 9 MANDATED AESTHETIC & MOTION SECTIONS
// ══════════════════════════════════════════════════
// Section 1 (Hero) & Section 2 (10-Layer Scrub Explosion Sequence)
import { HeroExplosionSequence } from "@/components/sections/HeroExplosionSequence";
// Section 3: Ingredient Flythrough in Three.js
import { IngredientFlythrough } from "@/components/sections/IngredientFlythrough";
// Section 4: Burger Story Section (Ingredients morph into content layout)
import { BurgerStory } from "@/components/sections/BurgerStory";
// Section 5: Burger Collection (7 Signature Burgers)
import { BurgersShowcase } from "@/components/sections/BurgersShowcase";
// Section 6: Burger Showcase Transition (Explosion into particles, morph into next burger)
import { BurgerTransitionShowcase } from "@/components/sections/BurgerTransitionShowcase";
// Section 7: Combo Section (Dynamic floating assembly of Burger, Fries, Drink)
import { CombosShowcase } from "@/components/sections/CombosShowcase";
// Section 8: Rewards Section (Lighter motion, visual rest)
import { RewardsSection } from "@/components/sections/RewardsSection";
// Section 9: Contact & Final Burger Full Assembly CTA
import { FinalAssemblyCTA } from "@/components/sections/FinalAssemblyCTA";

export default function HomePage() {
  return (
    <CartProvider>
      <ScrollProvider>
        {/* Custom Luxury Cursor */}
        <CustomCursor />

        {/* Cinematic Intro Loader */}
        <IntroLoader />

        <div className="relative min-h-screen bg-[#060606] text-[#F0EDE8]">
          {/* Main Top Navigation */}
          <Navigation />

          <main className="relative">
            {/* ═══════════════════════════════════════════
                SECTION 1 & SECTION 2:
                Hero & 10-Layer Scrub Explosion Sequence
            ═══════════════════════════════════════════ */}
            <HeroExplosionSequence />

            {/* Marquee Ticker */}
            <div className="py-4 border-y border-white/[0.06] bg-[#060606] overflow-hidden">
              <MarqueeTicker speed="normal" />
            </div>

            {/* ═══════════════════════════════════════════
                SECTION 3:
                Three.js 3D Ingredient Flythrough
            ═══════════════════════════════════════════ */}
            <IngredientFlythrough />

            {/* ═══════════════════════════════════════════
                SECTION 4:
                Burger Story Section (Morphed Layout)
            ═══════════════════════════════════════════ */}
            <BurgerStory />

            {/* Reverse Marquee */}
            <div className="py-4 border-y border-white/[0.06] bg-[#060606] overflow-hidden">
              <MarqueeTicker speed="slow" reverse />
            </div>

            {/* ═══════════════════════════════════════════
                SECTION 5:
                The 7 Signature Burgers Collection
            ═══════════════════════════════════════════ */}
            <BurgersShowcase />

            {/* ═══════════════════════════════════════════
                SECTION 6:
                Burger Showcase Transition (Particle Morph)
            ═══════════════════════════════════════════ */}
            <BurgerTransitionShowcase />

            {/* ═══════════════════════════════════════════
                SECTION 7:
                Combo Section (Dynamic Floating Assembly)
            ═══════════════════════════════════════════ */}
            <CombosShowcase />

            {/* ═══════════════════════════════════════════
                SECTION 8:
                Rewards Section (Lighter Visual Rest)
            ═══════════════════════════════════════════ */}
            <RewardsSection />

            {/* ═══════════════════════════════════════════
                SECTION 9:
                Contact & Final Burger Full Assembly CTA
            ═══════════════════════════════════════════ */}
            <FinalAssemblyCTA />
          </main>

          {/* Luxury Footer */}
          <Footer />

          {/* Cart Drawer */}
          <CartDrawer />
        </div>
      </ScrollProvider>
    </CartProvider>
  );
}
