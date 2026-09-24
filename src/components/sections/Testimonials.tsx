"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonials, reviews } from "@/lib/data/testimonials";

export function Testimonials() {
  const [activeTab, setActiveTab] = useState<"critics" | "patrons">("critics");

  return (
    <section className="relative section-padding bg-surface border-t border-b border-white/5 overflow-hidden" aria-label="Culinary Reviews and Press Acclaim">
      {/* Background Volumetric Light */}
      <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-accent uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Gastronomic Acclaim & Reception
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-text uppercase leading-none">
              PRAISED BY <span className="text-gradient-accent">CRITICS</span>
            </h2>
          </div>

          <div className="flex items-center gap-2 mt-6 md:mt-0">
            <button
              onClick={() => setActiveTab("critics")}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === "critics"
                  ? "bg-accent text-background shadow-glow"
                  : "glassmorphism text-text/70 hover:text-text"
              }`}
            >
              Master Chefs & Critics
            </button>
            <button
              onClick={() => setActiveTab("patrons")}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === "patrons"
                  ? "bg-accent text-background shadow-glow"
                  : "glassmorphism text-text/70 hover:text-text"
              }`}
            >
              Verified Patrons
            </button>
          </div>
        </div>

        {/* Press Badges Marquee */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
          {[
            { quote: "“Redefining the burger as high art.”", publication: "MICHELIN GUIDE NOMINEE" },
            { quote: "“The Ultimate Prime is transcendent.”", publication: "THE DAILY PLATE" },
            { quote: "“Best new luxury dining concept.”", publication: "GQ GASTRONOMY" },
            { quote: "“Flawless flavor architecture.”", publication: "EATER NY" },
          ].map((press, i) => (
            <div key={i} className="p-4 rounded-2xl glassmorphism border border-white/5 text-center">
              <p className="text-xs italic text-text/80 mb-2 font-serif">{press.quote}</p>
              <span className="text-[10px] font-mono tracking-widest uppercase text-accent font-semibold">{press.publication}</span>
            </div>
          ))}
        </div>

        {/* Content Display */}
        <AnimatePresence mode="wait">
          {activeTab === "critics" ? (
            <motion.div
              key="critics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {testimonials.map((test) => (
                <div
                  key={test.id}
                  className="rounded-3xl glassmorphism-strong border border-white/10 hover:border-accent/40 p-6 flex flex-col justify-between transition-all duration-300 group hover:shadow-2xl"
                >
                  <div>
                    {/* Stars & Tag */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex text-accent text-xs tracking-wider">
                        {"★".repeat(test.rating)}
                      </div>
                      <span className="text-[10px] font-mono uppercase bg-white/5 px-2.5 py-1 rounded-md text-highlight">
                        {test.burger}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-text/90 italic leading-relaxed mb-6 font-serif">
                      &quot;{test.quote}&quot;
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-surface-elevated border border-accent/40 flex items-center justify-center font-display text-accent font-bold text-lg">
                      {test.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-display text-base text-text uppercase">{test.name}</h4>
                      <p className="text-[11px] text-text/50">{test.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="patrons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-6 rounded-3xl glassmorphism border border-white/10 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex text-accent text-xs">
                        {"★".repeat(rev.rating)}
                      </div>
                      <span className="text-[10px] font-mono text-text/40">{rev.date}</span>
                    </div>

                    <p className="text-xs text-text/80 leading-relaxed mb-4 font-body">
                      {rev.text}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/5 text-xs">
                    <span className="font-semibold text-text">{rev.author}</span>
                    <span className="text-[10px] text-accent font-mono flex items-center gap-1">
                      <span>✓ Verified Sovereign Order</span>
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
