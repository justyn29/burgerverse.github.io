"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Burger } from "@/lib/data/burgers";
import { useCart, CartCustomization } from "@/lib/cart-context";
import { asset } from "@/lib/assets";

interface Props {
  burger: Burger | null;
  isOpen: boolean;
  onClose: () => void;
}

export function BurgerCustomizerModal({ burger, isOpen, onClose }: Props) {
  const { addItem } = useCart();

  const [bunType, setBunType] = useState<CartCustomization["bunType"]>("brioche");
  const [extraPatty, setExtraPatty] = useState(false);
  const [extraCheese, setExtraCheese] = useState(false);
  const [truffleAioli, setTruffleAioli] = useState(false);
  const [ghostPepperSauce, setGhostPepperSauce] = useState(false);
  const [caramelizedOnions, setCaramelizedOnions] = useState(false);
  const [goldDust, setGoldDust] = useState(false);
  const [specialNotes, setSpecialNotes] = useState("");

  if (!burger) return null;

  const calculateCustomPrice = () => {
    let total = burger.price;
    if (extraPatty) total += 6.5;
    if (extraCheese) total += 2.5;
    if (truffleAioli) total += 3.5;
    if (ghostPepperSauce) total += 1.5;
    if (caramelizedOnions) total += 2.0;
    if (goldDust) total += 8.0;
    return total;
  };

  const handleAddToCart = () => {
    const customPrice = calculateCustomPrice();
    addItem({
      id: `${burger.id}-custom-${Date.now()}`,
      type: "burger",
      title: `${burger.name} (Bespoke)`,
      tagline: burger.tagline,
      price: customPrice,
      image: burger.image,
      accentColor: burger.accentColor,
      customization: {
        bunType,
        extraPatty,
        extraCheese,
        truffleAioli,
        ghostPepperSauce,
        caramelizedOnions,
        goldDust,
        specialNotes,
      },
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-surface border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-2xl bg-surface-elevated overflow-hidden border border-white/10 flex-shrink-0">
                  <Image
                    src={asset(burger.image)}
                    alt={burger.name}
                    fill
                    className="object-contain p-1"
                  />
                </div>
                <div>
                  <span className="text-[10px] tracking-widest uppercase font-mono text-accent">Bespoke Gastronomy</span>
                  <h3 className="font-display text-2xl text-text uppercase">{burger.name}</h3>
                  <p className="text-xs text-text/60">{burger.tagline}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 text-text/60 hover:text-text transition-colors"
                aria-label="Close customizer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Scrollable Customizer Body */}
            <div className="overflow-y-auto space-y-6 py-4 pr-1 flex-grow">
              {/* Bun Selection */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-text/80 block mb-3">
                  1. Artisan Foundation Bun
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: "brioche", label: "French Brioche", sub: "28% Butter" },
                    { id: "potato", label: "Potato Roll", sub: "Classic Soft" },
                    { id: "milk-bun", label: "Japanese Milk Bun", sub: "Ultra Fluffy" },
                    { id: "lettuce-wrap", label: "Hydro Lettuce", sub: "Keto/Low-Carb" },
                  ].map((b) => (
                    <button
                      key={b.id}
                      onClick={() => setBunType(b.id as any)}
                      className={`p-3 rounded-xl border text-left transition-all text-xs ${
                        bunType === b.id
                          ? "border-accent bg-accent/10 text-accent font-semibold shadow-sm"
                          : "border-white/5 bg-surface-elevated text-text/70 hover:border-white/20"
                      }`}
                    >
                      <div className="font-semibold text-text">{b.label}</div>
                      <div className="text-[10px] text-text/50">{b.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Luxury Additions */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-text/80 block mb-3">
                  2. Sovereign Gastronomy Upgrades
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { state: extraPatty, setter: setExtraPatty, label: "Extra 180g Wagyu / Prime Patty", price: "+$6.50" },
                    { state: extraCheese, setter: setExtraCheese, label: "Double Cave-Aged Gruyère & Cheddar", price: "+$2.50" },
                    { state: truffleAioli, setter: setTruffleAioli, label: "Black Winter Truffle Aioli Shot", price: "+$3.50" },
                    { state: ghostPepperSauce, setter: setGhostPepperSauce, label: "Fermented Ghost Pepper Glaze", price: "+$1.50" },
                    { state: caramelizedOnions, setter: setCaramelizedOnions, label: "Slow Confit Caramelized Shallots", price: "+$2.00" },
                    { state: goldDust, setter: setGoldDust, label: "24K Edible Gold Leaf Crown Garnish", price: "+$8.00" },
                  ].map((item, idx) => (
                    <label
                      key={idx}
                      className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all text-xs ${
                        item.state
                          ? "border-accent bg-accent/10 text-text"
                          : "border-white/5 bg-surface-elevated text-text/80 hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={item.state}
                          onChange={(e) => item.setter(e.target.checked)}
                          className="w-4 h-4 rounded text-accent focus:ring-accent accent-accent bg-surface-elevated border-white/20"
                        />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      <span className="font-mono font-semibold text-accent">{item.price}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Special Instructions */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-text/80 block mb-2">
                  3. Kitchen Chef Notes & Preferences
                </label>
                <textarea
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  placeholder="e.g., Extra sear on patty, sauces on the side, cut in half..."
                  rows={2}
                  className="w-full bg-surface-elevated border border-white/10 rounded-xl p-3 text-xs text-text placeholder-text/30 focus:outline-none focus:border-accent"
                />
              </div>
            </div>

            {/* Footer Summary & Checkout Action */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase text-text/50 block">Customized Price</span>
                <span className="font-display text-2xl text-accent font-bold">
                  ${calculateCustomPrice().toFixed(2)}
                </span>
              </div>
              <button
                onClick={handleAddToCart}
                className="btn-primary px-8 py-3.5 text-sm font-semibold flex items-center gap-2 shadow-glow"
              >
                <span>Add Custom Creation</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
