"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useCart } from "@/lib/cart-context";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const { addItem } = useCart();

  const { scrollY } = useScroll();
  const yHeroText = useTransform(scrollY, [0, 600], [0, 150]);
  const yHeroBurger = useTransform(scrollY, [0, 600], [0, -60]);
  const rotateBurger = useTransform(scrollY, [0, 600], [0, 25]);
  const opacityHero = useTransform(scrollY, [0, 400], [1, 0.2]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleQuickOrder = () => {
    addItem({
      id: "ultimate-prime",
      type: "burger",
      title: "Ultimate Prime",
      tagline: "Flagship Premium • 45-Day Dry-Aged Wagyu",
      price: 42.99,
      image: "/burgers/ultimate-prime.png",
      accentColor: "#FFD700",
    });
  };

  return (
    <section
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-20"
      aria-label="BurgerVerse Luxury Hero Experience"
    >
      {/* Background Video with Cinematic Dark Gradient Overlays */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setIsVideoLoaded(true)}
          className={`w-full h-full object-cover opacity-25 scale-105 transition-opacity duration-1000 ${
            isVideoLoaded ? "opacity-25" : "opacity-0"
          }`}
        >
          <source src="/burgvid.MP4" type="video/mp4" />
          <source src="/video/burgvid.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/15 via-transparent to-transparent" />
      </div>

      {/* Ambient Floating Glow & Particles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-accent/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-accent-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Floating Sparkle / Ember Dots */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-accent"
            style={{
              width: `${(i % 3) + 2}px`,
              height: `${(i % 3) + 2}px`,
              top: `${(i * 19) % 95}%`,
              left: `${(i * 29) % 90}%`,
              opacity: 0.4,
            }}
            animate={{
              y: [-10, -40, -10],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + (i % 4),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
          />
        ))}
      </div>

      <motion.div
        style={{ opacity: opacityHero }}
        className="relative z-20 section-container w-full py-12 md:py-20 flex flex-col items-center text-center"
      >
        {/* Top Luxury Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-3 px-5 py-2 rounded-full glassmorphism border border-white/10 text-xs md:text-sm font-medium tracking-widest uppercase text-accent mb-8 shadow-glow"
        >
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span>The Sovereign standard of gastronomy</span>
          <span className="text-white/40">•</span>
          <span className="text-text/80">Australian Wagyu MS 9+</span>
        </motion.div>

        {/* Massive Editorial Display Headline */}
        <motion.div style={{ y: yHeroText }} className="space-y-2 select-none">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[64px] sm:text-[90px] md:text-[130px] lg:text-[160px] tracking-tight leading-[0.88] uppercase text-text"
          >
            HAUTE <span className="text-gradient-accent">BURGER</span>
            <br />
            ARCHITECTURE
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-text/70 font-body font-normal leading-relaxed pt-3 text-balance"
          >
            7 Masterpiece Creations. 45-day dry-aged cuts. 28% French butter brioche.
            Engineered for pure sensory indulgence.
          </motion.p>
        </motion.div>

        {/* Centerpiece Hero Floating Burger with Mouse Parallax and Glow */}
        <motion.div
          style={{
            y: yHeroBurger,
            rotateZ: rotateBurger,
          }}
          animate={{
            x: mousePos.x * 25,
            y: mousePos.y * 25,
          }}
          transition={{ type: "spring", damping: 30, stiffness: 100 }}
          className="relative my-4 md:my-8 group cursor-pointer w-full max-w-[420px] sm:max-w-[500px] md:max-w-[620px] aspect-square flex items-center justify-center"
        >
          {/* Radial Backlight */}
          <div className="absolute inset-0 bg-gradient-to-t from-accent/20 via-accent-secondary/15 to-transparent rounded-full blur-[80px] group-hover:scale-110 transition-transform duration-700" />

          {/* Floating Burger Render */}
          <motion.div
            animate={{
              y: [0, -14, 0],
              rotate: [0, 1.5, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative w-full h-full flex items-center justify-center filter drop-shadow-[0_25px_50px_rgba(255,157,0,0.35)]"
          >
            <Image
              src="/main burger.png"
              alt="BurgerVerse Sovereign Ultimate Prime Burger"
              width={700}
              height={700}
              priority
              className="object-contain w-full h-full scale-100 hover:scale-105 transition-transform duration-500 ease-out-expo"
            />
          </motion.div>

          {/* Floating Spec Tags */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="hidden sm:flex absolute left-0 top-1/3 -translate-x-4 glassmorphism-strong px-4 py-3 rounded-2xl border border-white/10 flex-col items-start gap-1 shadow-xl text-left"
          >
            <span className="text-[10px] tracking-widest uppercase text-accent font-semibold">Marbling Score</span>
            <span className="text-sm font-bold text-text">Wagyu MS 9+ / 200g</span>
            <span className="text-[11px] text-text/60">Tasmanian Single Origin</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="hidden sm:flex absolute right-0 bottom-1/3 translate-x-4 glassmorphism-strong px-4 py-3 rounded-2xl border border-white/10 flex-col items-start gap-1 shadow-xl text-left"
          >
            <span className="text-[10px] tracking-widest uppercase text-highlight font-semibold">Flagship Creation</span>
            <span className="text-sm font-bold text-text">Ultimate Prime</span>
            <span className="text-[11px] text-text/60">Truffle Demi-Glace & Gruyère</span>
          </motion.div>
        </motion.div>

        {/* Primary CTAs & Experience Triggers */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md pt-2"
        >
          <button
            onClick={handleQuickOrder}
            className="btn-primary w-full sm:w-auto text-base font-semibold px-9 py-4 shadow-glow flex items-center justify-center gap-3 group"
          >
            <span>Order Sovereign Flagship</span>
            <span className="text-xs bg-black/20 px-2.5 py-1 rounded-full text-black font-bold">$42.99</span>
            <svg
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>

          <Link
            href="#explode-view"
            className="btn-secondary w-full sm:w-auto text-base font-medium px-8 py-4 flex items-center justify-center gap-2 hover:border-accent"
          >
            <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            <span>Deconstruct Architecture</span>
          </Link>
        </motion.div>

        {/* Key Metrics / Credibility Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 mt-16 pt-12 border-t border-white/5 w-full max-w-4xl text-center"
        >
          <div>
            <div className="font-display text-3xl md:text-4xl text-gradient-accent">07</div>
            <div className="text-xs text-text/60 tracking-wider uppercase mt-1">Signature Masterpieces</div>
          </div>
          <div>
            <div className="font-display text-3xl md:text-4xl text-text">45 DAYS</div>
            <div className="text-xs text-text/60 tracking-wider uppercase mt-1">Dry-Aging Curing</div>
          </div>
          <div>
            <div className="font-display text-3xl md:text-4xl text-highlight">MS 9+</div>
            <div className="text-xs text-text/60 tracking-wider uppercase mt-1">Tasmanian Wagyu</div>
          </div>
          <div>
            <div className="font-display text-3xl md:text-4xl text-accent-secondary">4.98 ★</div>
            <div className="text-xs text-text/60 tracking-wider uppercase mt-1">Michelin Critic Score</div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
