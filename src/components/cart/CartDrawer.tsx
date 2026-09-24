"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import { asset } from "@/lib/assets";

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    vipDiscount,
    tax,
    deliveryFee,
    total,
    pointsEarned,
  } = useCart();

  const [orderType, setOrderType] = useState<"delivery" | "pickup">("delivery");
  const [tipPercent, setTipPercent] = useState(20);
  const [promoInput, setPromoInput] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const tipAmount = (subtotal * tipPercent) / 100;
  const finalTotal = total + tipAmount - (promoApplied ? 10 : 0);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoInput.trim().toUpperCase() === "SOVEREIGN" || promoInput.trim().toUpperCase() === "BURGERVERSE") {
      setPromoApplied(true);
    }
  };

  const handlePlaceOrder = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderConfirmed(true);
      clearCart();
    }, 1800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Drawer Container */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 280 }}
            className="relative w-full max-w-lg bg-surface border-l border-white/10 h-full flex flex-col justify-between shadow-2xl z-10 overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-display text-2xl text-text uppercase">
                  SOVEREIGN <span className="text-accent">TRAY</span>
                </span>
                <span className="text-xs font-mono bg-accent/20 border border-accent/40 text-accent px-2.5 py-0.5 rounded-full">
                  {items.length} {items.length === 1 ? "Item" : "Items"}
                </span>
              </div>
              <button
                onClick={closeCart}
                className="p-2 rounded-full hover:bg-white/10 text-text/60 hover:text-text transition-colors"
                aria-label="Close tray"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body */}
            {orderConfirmed ? (
              <div className="p-8 flex-grow flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-accent text-black font-bold text-3xl flex items-center justify-center shadow-glow animate-bounce">
                  ✓
                </div>
                <h3 className="font-display text-3xl text-text uppercase">Sovereign Order Dispatched</h3>
                <p className="text-xs text-text/70 max-w-xs leading-relaxed">
                  Your luxury gastronomy order #BV-{Math.floor(100000 + Math.random() * 900000)} is seared and packed in thermal insulated gold-foil boxes.
                </p>
                <div className="p-4 rounded-2xl bg-surface-elevated border border-white/10 w-full text-xs space-y-1 text-left font-mono">
                  <div className="flex justify-between text-text/60">
                    <span>Estimated Arrival:</span>
                    <span className="text-accent font-bold">25 - 35 mins</span>
                  </div>
                  <div className="flex justify-between text-text/60">
                    <span>VIP Points Earned:</span>
                    <span className="text-highlight font-bold">+{pointsEarned} PTS</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setOrderConfirmed(false);
                    closeCart();
                  }}
                  className="btn-primary w-full py-3.5 text-xs font-semibold uppercase"
                >
                  Return to Menu
                </button>
              </div>
            ) : items.length === 0 ? (
              <div className="flex-grow flex flex-col items-center justify-center p-8 text-center text-text/50">
                <div className="w-20 h-20 rounded-full bg-surface-elevated border border-white/5 flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-text/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h4 className="font-display text-2xl text-text uppercase mb-1">Your Tray is Empty</h4>
                <p className="text-xs text-text/60 max-w-xs mb-6">
                  Explore our 07 signature masterworks or craft combinations to begin your culinary journey.
                </p>
                <button
                  onClick={closeCart}
                  className="btn-secondary text-xs px-6 py-3 font-medium"
                >
                  Explore Masterpieces
                </button>
              </div>
            ) : (
              <div className="flex-grow overflow-y-auto p-6 space-y-4">
                {/* Delivery vs Pickup Selector */}
                <div className="grid grid-cols-2 gap-2 bg-surface-elevated p-1.5 rounded-2xl border border-white/5">
                  <button
                    onClick={() => setOrderType("delivery")}
                    className={`py-2 rounded-xl text-xs font-semibold transition-all ${
                      orderType === "delivery"
                        ? "bg-accent text-background shadow-sm"
                        : "text-text/70 hover:text-text"
                    }`}
                  >
                    White-Glove Delivery
                  </button>
                  <button
                    onClick={() => setOrderType("pickup")}
                    className={`py-2 rounded-xl text-xs font-semibold transition-all ${
                      orderType === "pickup"
                        ? "bg-accent text-background shadow-sm"
                        : "text-text/70 hover:text-text"
                    }`}
                  >
                    Express Lounge Pickup
                  </button>
                </div>

                {/* Items List */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl glassmorphism border border-white/5 flex flex-col gap-2 relative group"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-xl bg-surface-elevated flex-shrink-0 border border-white/5 overflow-hidden">
                            <Image
                              src={asset(item.image)}
                              alt={item.title}
                              fill
                              className="object-contain p-1"
                            />
                          </div>
                          <div>
                            <h4 className="font-display text-lg text-text uppercase leading-none">{item.title}</h4>
                            <span className="text-[11px] text-text/60 block line-clamp-1">{item.tagline}</span>
                            <span className="font-display text-sm text-accent font-bold mt-1 block">
                              ${item.price.toFixed(2)}
                            </span>
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 bg-surface-elevated px-2 py-1 rounded-xl border border-white/5 text-xs">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-5 h-5 flex items-center justify-center text-text/60 hover:text-text"
                          >
                            -
                          </button>
                          <span className="font-mono font-bold w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-5 h-5 flex items-center justify-center text-text/60 hover:text-text"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Customization Badges if any */}
                      {item.customization && (
                        <div className="flex flex-wrap gap-1 pt-2 border-t border-white/5 text-[10px] text-text/70">
                          <span className="bg-white/5 px-2 py-0.5 rounded uppercase font-mono">Bun: {item.customization.bunType}</span>
                          {item.customization.extraPatty && <span className="bg-accent/15 text-accent px-1.5 py-0.5 rounded font-mono">+Wagyu Patty</span>}
                          {item.customization.goldDust && <span className="bg-highlight/15 text-highlight px-1.5 py-0.5 rounded font-mono">+24K Gold</span>}
                          {item.customization.truffleAioli && <span className="bg-white/5 px-1.5 py-0.5 rounded font-mono">+Truffle Aioli</span>}
                          {item.customization.specialNotes && (
                            <span className="w-full text-text/50 italic truncate">Note: &quot;{item.customization.specialNotes}&quot;</span>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Promo Code Input */}
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="VIP Code: SOVEREIGN"
                    className="flex-grow bg-surface-elevated border border-white/10 rounded-xl px-3 py-2 text-xs text-text placeholder-text/30 focus:outline-none focus:border-accent uppercase font-mono"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-surface-elevated border border-white/10 hover:border-accent rounded-xl text-xs font-semibold text-text transition-colors"
                  >
                    Apply
                  </button>
                </form>
                {promoApplied && (
                  <div className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                    <span>✓ VIP $10.00 Courtesy Credit Applied</span>
                  </div>
                )}

                {/* Tip Selector */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] text-text/60">
                    <span>Culinary Team Gratuity</span>
                    <span className="font-mono">${tipAmount.toFixed(2)} ({tipPercent}%)</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[15, 18, 20, 25].map((pct) => (
                      <button
                        key={pct}
                        onClick={() => setTipPercent(pct)}
                        className={`py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                          tipPercent === pct
                            ? "bg-accent text-background"
                            : "bg-surface-elevated border border-white/5 text-text/70 hover:text-text"
                        }`}
                      >
                        {pct}%
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Footer Summary */}
            {!orderConfirmed && items.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-surface-elevated/50 space-y-3">
                <div className="space-y-1 text-xs text-text/70">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-mono text-text">${subtotal.toFixed(2)}</span>
                  </div>
                  {vipDiscount > 0 && (
                    <div className="flex justify-between text-accent">
                      <span>VIP Sovereign Tier Discount (15%)</span>
                      <span className="font-mono">-${vipDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  {promoApplied && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Promo Credit</span>
                      <span className="font-mono">-$10.00</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Estimated Tax (NYC/LA/SF)</span>
                    <span className="font-mono text-text">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{orderType === "delivery" ? "Thermal White-Glove Courier" : "Lounge Packaging"}</span>
                    <span className="font-mono text-text">
                      {deliveryFee === 0 ? "FREE (Orders > $60)" : `$${deliveryFee.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-white/5 text-sm font-bold text-text">
                    <span>Total</span>
                    <span className="font-display text-2xl text-gradient-accent">
                      ${Math.max(0, finalTotal).toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  disabled={isCheckingOut}
                  onClick={handlePlaceOrder}
                  className="btn-primary w-full py-4 text-sm font-semibold flex items-center justify-center gap-2 shadow-glow disabled:opacity-50"
                >
                  {isCheckingOut ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full border-2 border-background border-t-transparent animate-spin" />
                      Authorizing Sovereign Transaction...
                    </span>
                  ) : (
                    <>
                      <span>Dispatch Order • ${Math.max(0, finalTotal).toFixed(2)}</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-[10px] text-text/40 font-mono">
                  <span>🔒 256-BIT ENCRYPTED</span>
                  <span>•</span>
                  <span>EARN +{pointsEarned} VIP PTS</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
