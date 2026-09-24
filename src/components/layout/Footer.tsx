"use client";

import React, { useState } from "react";
import Link from "next/link";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="relative bg-background border-t border-white/10 pt-16 pb-12 overflow-hidden text-text/70" aria-label="BurgerVerse Sovereign Footer">
      {/* Ambient background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-accent/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Newsletter VIP Club Banner */}
        <div className="rounded-3xl glassmorphism-strong border border-white/10 p-8 md:p-12 mb-16 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="max-w-xl text-center lg:text-left">
            <span className="text-xs font-mono uppercase text-accent tracking-widest block mb-2 font-semibold">
              Private Gastronomy Dispatch
            </span>
            <h3 className="font-display text-3xl sm:text-4xl text-text uppercase leading-none">
              JOIN THE <span className="text-gradient-accent">SOVEREIGN CIRCLE</span>
            </h3>
            <p className="text-xs sm:text-sm text-text/70 mt-2 font-body">
              Receive secret seasonal burger drops, invitations to private tasting dinners, and a complimentary $10 welcome credit.
            </p>
          </div>

          <div className="w-full lg:w-auto flex-shrink-0">
            {subscribed ? (
              <div className="p-4 rounded-2xl bg-accent/20 border border-accent/40 text-center">
                <span className="text-xs font-bold text-accent font-mono block">
                  ✓ WELCOME TO THE CIRCLE
                </span>
                <span className="text-[11px] text-text/80">Use code &quot;SOVEREIGN&quot; in your tray for $10 off.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5 w-full max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your VIP email address..."
                  required
                  className="bg-surface-elevated border border-white/10 rounded-full px-5 py-3.5 text-xs text-text placeholder-text/30 focus:outline-none focus:border-accent flex-grow"
                />
                <button
                  type="submit"
                  className="btn-primary text-xs font-semibold px-6 py-3.5 shadow-glow whitespace-nowrap"
                >
                  Join Sovereign
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12 text-xs">
          {/* Brand Col */}
          <div className="col-span-2">
            <Link href="#home" className="inline-block font-display text-3xl text-text uppercase mb-3">
              <span className="text-accent">Burger</span>Verse
            </Link>
            <p className="text-xs text-text/60 max-w-sm leading-relaxed mb-4">
              The benchmark in haute burger gastronomy. Single-origin Wagyu MS 9+, 45-day dry-aging curing, French butter brioche, and cave-aged alpine cheeses.
            </p>
            <div className="flex items-center gap-3 text-text/50 font-mono text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>All 6 Flagships Open For Gastronomy</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-display text-base text-text uppercase mb-3 tracking-wider">Pantheon</h4>
            <ul className="space-y-2">
              <li><Link href="#burgers" className="hover:text-accent transition-colors">07 Signature Burgers</Link></li>
              <li><Link href="#explode-view" className="hover:text-accent transition-colors">Deconstructed View</Link></li>
              <li><Link href="#combos" className="hover:text-accent transition-colors">Haute Feasts</Link></li>
              <li><Link href="#menu-explorer" className="hover:text-accent transition-colors">Full Catalog</Link></li>
              <li><Link href="#story" className="hover:text-accent transition-colors">Ingredient Provenance</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-base text-text uppercase mb-3 tracking-wider">Sanctuaries</h4>
            <ul className="space-y-2">
              <li><Link href="#locations" className="hover:text-accent transition-colors">Soho NYC Flagship</Link></li>
              <li><Link href="#locations" className="hover:text-accent transition-colors">West Hollywood LA</Link></li>
              <li><Link href="#locations" className="hover:text-accent transition-colors">Mission District SF</Link></li>
              <li><Link href="#locations" className="hover:text-accent transition-colors">Lincoln Park Chicago</Link></li>
              <li><Link href="#locations" className="hover:text-accent transition-colors">South Congress Austin</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-base text-text uppercase mb-3 tracking-wider">Membership</h4>
            <ul className="space-y-2">
              <li><Link href="#rewards" className="hover:text-accent transition-colors">VIP Sovereign Pass</Link></li>
              <li><Link href="#rewards" className="hover:text-accent transition-colors">Tier Milestones</Link></li>
              <li><Link href="#rewards" className="hover:text-accent transition-colors">Private Chef Tables</Link></li>
              <li><a href="mailto:concierge@burgerverse.com" className="hover:text-accent transition-colors">Sovereign Concierge</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Certifications */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-text/40">
          <div>
            © {new Date().getFullYear()} BurgerVerse International Inc. Engineered with world-class digital gastronomy standards.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-text cursor-pointer">Allergen Matrix</span>
            <span>•</span>
            <span className="hover:text-text cursor-pointer">Ethical Sourcing Protocol</span>
            <span>•</span>
            <span className="hover:text-text cursor-pointer">Privacy & Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
