"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";

const navItems = [
  { href: "#home", label: "Deconstruct" },
  { href: "#burgers", label: "07 Burgers" },
  { href: "#combos", label: "Feasts" },
  { href: "#story", label: "Provenance" },
  { href: "#flavor-oracle", label: "Oracle" },
  { href: "#rewards", label: "VIP Club" },
  { href: "#locations", label: "Sanctuaries" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { itemCount, openCart } = useCart();
  const prevScrollY = useRef(0);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = prevScrollY.current;
    setScrolled(latest > 60);
    // Hide nav on scroll down, show on scroll up
    if (latest > 150 && latest > prev) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    prevScrollY.current = latest;
  });

  // Intersection Observer for active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: 0 }
    );

    document.querySelectorAll("section[id], div[id]").forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "glassmorphism-strong border-b border-white/6 shadow-2xl"
          : "bg-transparent"
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="#home"
            className="flex items-center gap-1 select-none"
            aria-label="BurgerVerse Home"
            onClick={() => setMobileOpen(false)}
          >
            <span className="font-display text-2xl md:text-3xl uppercase leading-none">
              <span className="text-[#FF9D00]">Burger</span>
              <span className="text-[#F0EDE8]">Verse</span>
            </span>
            <span className="hidden sm:block text-[8px] font-mono uppercase tracking-[0.3em] text-white/25 ml-2 mt-auto mb-0.5">
              ™
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-3 py-2 text-[11px] font-medium tracking-[0.15em] uppercase transition-colors duration-200",
                    isActive ? "text-[#FF9D00]" : "text-white/50 hover:text-white/90"
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-3 right-3 h-px rounded-full bg-[#FF9D00]"
                      transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Cart */}
            <button
              onClick={openCart}
              className="relative p-2.5 rounded-full transition-all duration-200 text-white/60 hover:text-white glassmorphism border border-white/8 hover:border-white/20"
              aria-label={`View cart (${itemCount} items)`}
            >
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.75}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-[#FF9D00] text-black font-bold text-[9px] flex items-center justify-center shadow-glow"
                >
                  {itemCount}
                </motion.span>
              )}
            </button>

            {/* Order CTA */}
            <button
              onClick={openCart}
              className="hidden md:block btn-primary !px-5 !py-2.5 !text-[11px] shadow-sm"
            >
              Order Tray
            </button>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2.5 rounded-full glassmorphism border border-white/8 text-white/60 hover:text-white transition-all duration-200"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              id="mobile-menu"
              className="lg:hidden overflow-hidden border-t border-white/6"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="py-6 space-y-1">
                {navItems.map((item) => {
                  const isActive = activeSection === item.href.replace("#", "");
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "block px-4 py-3 text-sm font-medium tracking-wider uppercase rounded-xl transition-all duration-200",
                        isActive
                          ? "bg-[#FF9D00]/10 text-[#FF9D00]"
                          : "text-white/50 hover:text-white/90 hover:bg-white/5"
                      )}
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  );
                })}
                <div className="pt-4 border-t border-white/6 px-4">
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      openCart();
                    }}
                    className="btn-primary w-full text-center shadow-glow"
                  >
                    View Order Tray ({itemCount})
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}