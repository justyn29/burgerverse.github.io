"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function IntroLoader() {
  const [isVisible, setIsVisible] = useState(true);
  const [count, setCount] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Count up from 0 to 100
    let current = 0;
    const duration = 1800; // ms
    const steps = 60;
    const increment = 100 / steps;
    const stepDuration = duration / steps;

    intervalRef.current = setInterval(() => {
      current += increment;
      if (current >= 100) {
        current = 100;
        setCount(100);
        if (intervalRef.current) clearInterval(intervalRef.current);
        // Hide after a short pause
        setTimeout(() => setIsVisible(false), 500);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[10000] bg-[#060606] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Animated logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            <div className="text-xs font-mono tracking-[0.4em] text-white/30 uppercase mb-4">
              Haute Cuisine
            </div>
            <div className="font-display text-[72px] sm:text-[100px] uppercase leading-none tracking-tight">
              <span className="text-[#FF9D00]">Burger</span>
              <span className="text-[#F0EDE8]">Verse</span>
            </div>
            <div className="text-xs font-mono tracking-[0.3em] text-white/30 uppercase mt-3">
              Architecture of Taste
            </div>
          </motion.div>

          {/* Progress bar */}
          <div className="absolute bottom-16 left-8 right-8 sm:left-16 sm:right-16">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-white/30">
                Loading Experience
              </span>
              <span className="text-[10px] font-mono text-[#FF9D00] tabular-nums">
                {String(count).padStart(3, "0")}
              </span>
            </div>
            <div className="w-full h-px bg-white/10 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#FF9D00] to-[#FF5A00] origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: count / 100 }}
                transition={{ duration: 0.1, ease: "linear" }}
                style={{ transformOrigin: "left" }}
              />
            </div>
          </div>

          {/* Corner decorative elements */}
          <div className="absolute top-8 left-8 text-[10px] font-mono text-white/20 tracking-widest uppercase">
            BV.01
          </div>
          <div className="absolute top-8 right-8 text-[10px] font-mono text-white/20 tracking-widest uppercase text-right">
            Est. 2025
          </div>
          <div className="absolute bottom-8 left-8 text-[10px] font-mono text-white/20 tracking-widest uppercase">
            Premium<br />Artisan
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
