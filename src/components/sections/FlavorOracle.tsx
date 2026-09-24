"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─────────────────────────────────────────────
// Gemini API Flavor Oracle
// ─────────────────────────────────────────────

const MOODS = [
  { id: "bold", label: "Bold & Fiery", emoji: "🔥", color: "#FF5A00" },
  { id: "luxe", label: "Ultra Luxe", emoji: "👑", color: "#FFD65A" },
  { id: "umami", label: "Deep Umami", emoji: "🌊", color: "#7B6CFF" },
  { id: "smoky", label: "Smoky Dark", emoji: "🖤", color: "#888" },
  { id: "light", label: "Light & Fresh", emoji: "🌿", color: "#5FD670" },
];

interface FlavorProfile {
  burgerId: string;
  burgerName: string;
  rationale: string;
  pairingDrink: string;
  poeticNote: string;
  intensityScore: number;
}

async function askGeminiFlavor(mood: string): Promise<FlavorProfile> {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  if (!apiKey) {
    // Demo mode with curated responses
    const demos: Record<string, FlavorProfile> = {
      bold: {
        burgerId: "inferno-beast",
        burgerName: "The Inferno Beast",
        rationale: "Your craving for intensity demands the six-pepper ghost mash and charcoal-seared Wagyu. Each bite is a controlled detonation of capsaicin, smoke, and fat.",
        pairingDrink: "Mezcal Paloma with smoked salt rim",
        poeticNote: "Like volcanic obsidian meeting wildfire — this burger doesn't ask permission to be extraordinary.",
        intensityScore: 98,
      },
      luxe: {
        burgerId: "ultimate-prime",
        burgerName: "The Ultimate Prime",
        rationale: "Gold leaf, winter truffle, and 45-day Wagyu converge in a creation that has no peers. Luxury is not decoration here — it's architecture.",
        pairingDrink: "1999 Dom Pérignon Rosé",
        poeticNote: "The quietest expression of maximum opulence. Royalty has never tasted this deliberate.",
        intensityScore: 92,
      },
      umami: {
        burgerId: "black-truffle-king",
        burgerName: "The Black Truffle King",
        rationale: "Three layers of umami — cave Gruyère, Périgord truffle, and dry-aged Wagyu — create a fifth-taste singularity your palate won't recover from.",
        pairingDrink: "Aged Brunello di Montalcino",
        poeticNote: "The ocean floor of flavor. Dark, bottomless, and ancient as the earth itself.",
        intensityScore: 88,
      },
      smoky: {
        burgerId: "smoky-titan",
        burgerName: "The Smoky Titan",
        rationale: "Binchotan white charcoal and 12-hour applewood smoke imbue every fiber of the patty with a depth that lingers long after the last bite.",
        pairingDrink: "Peated Scotch Whisky Neat",
        poeticNote: "Charcoal drawings on your taste memory. Dark, deliberate, and impossible to forget.",
        intensityScore: 85,
      },
      light: {
        burgerId: "golden-melt",
        burgerName: "The Golden Melt",
        rationale: "Triple-cheddar cascade, caramelized heirloom onions, and baby arugula achieve lightness without sacrificing indulgence — a study in elegant restraint.",
        pairingDrink: "Sparkling Chenin Blanc",
        poeticNote: "Afternoon sunlight through amber glass. Warm, golden, and quietly magnificent.",
        intensityScore: 71,
      },
    };
    return demos[mood] || demos.luxe;
  }

  const prompt = `You are the Flavor Oracle of BurgerVerse, an elite gourmet burger restaurant. 
A customer's flavor mood is: "${mood}".

Our signature burgers are:
1. The Ultimate Prime — 45-day Wagyu MS9+, black truffle, 24K gold, cave Gruyère
2. The Inferno Beast — ghost pepper mash, triple-smoked beef, volcanic aioli  
3. The Golden Melt — triple cheddar cascade, caramelized heirloom onions
4. The Black Truffle King — Périgord truffle, Gruyère, dry-aged Angus
5. The Smoky Titan — Binchotan charcoal-seared, 12-hour applewood smoked
6. The Volcano Stack — lava cheese sauce, jalapeño crisp, habanero glaze

Respond in JSON only (no markdown), matching this schema exactly:
{
  "burgerId": "snake-case-id",
  "burgerName": "Full Name",
  "rationale": "2-3 sentence sensory explanation of why this burger matches their mood",
  "pairingDrink": "Specific premium drink pairing",
  "poeticNote": "One poetic, evocative sentence about this burger",
  "intensityScore": 1-100
}`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.9, maxOutputTokens: 512 },
      }),
    }
  );

  if (!response.ok) throw new Error("Gemini API error");

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "{}";
  const cleanText = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
  return JSON.parse(cleanText) as FlavorProfile;
}

export function FlavorOracle() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<FlavorProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleMoodSelect = async (moodId: string) => {
    setSelectedMood(moodId);
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const profile = await askGeminiFlavor(moodId);
      setResult(profile);
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
    } catch {
      setError("The Oracle meditates. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const selectedMoodData = MOODS.find(m => m.id === selectedMood);

  return (
    <section
      className="relative section-padding bg-background overflow-hidden"
      aria-label="Gemini AI Flavor Oracle"
    >
      {/* Background bloom */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[#FF9D00]/4 rounded-full blur-[250px]" />
      </div>

      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glassmorphism border border-white/10 text-[10px] font-mono tracking-[0.3em] uppercase text-[#FF9D00] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF9D00] animate-pulse" />
            Powered by Gemini AI
          </div>
          <h2 className="font-display text-[64px] sm:text-[80px] md:text-[100px] uppercase leading-[0.88] text-[#F0EDE8] mb-4">
            The Flavor <span className="text-gradient-accent">Oracle</span>
          </h2>
          <p className="text-sm text-white/40 font-body leading-relaxed max-w-xl mx-auto">
            Our Gemini AI sommelier reads your flavor mood and prescribes the precise 
            BurgerVerse creation engineered for your palate state.
          </p>
        </motion.div>

        {/* Mood Selector */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="flex flex-wrap gap-3 justify-center mb-12"
        >
          {MOODS.map((mood, i) => (
            <motion.button
              key={mood.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              onClick={() => handleMoodSelect(mood.id)}
              className={`
                relative flex items-center gap-2.5 px-5 py-3 rounded-full
                border transition-all duration-300 text-sm font-medium tracking-wide
                ${selectedMood === mood.id
                  ? "bg-white/10 border-white/30 text-[#F0EDE8]"
                  : "glassmorphism border-white/10 text-white/60 hover:text-[#F0EDE8] hover:border-white/25"
                }
              `}
              style={{
                boxShadow: selectedMood === mood.id ? `0 0 30px ${mood.color}30` : "none",
                borderColor: selectedMood === mood.id ? `${mood.color}40` : undefined,
              }}
            >
              <span className="text-lg">{mood.emoji}</span>
              <span>{mood.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Loading state */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center gap-6 py-20"
            >
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full border-2 border-[#FF9D00]/20" />
                <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#FF9D00] animate-spin" />
                <div className="absolute inset-3 rounded-full border border-[#FF5A00]/30" />
              </div>
              <div className="text-center">
                <div className="text-[10px] font-mono uppercase tracking-[0.4em] text-[#FF9D00]/70 mb-1">
                  Oracle Consulting
                </div>
                <div className="text-white/30 text-xs font-body">
                  Analyzing 847 flavor variables…
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error state */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-10 text-white/40 text-sm font-body"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result */}
        <AnimatePresence>
          {result && !loading && (
            <motion.div
              ref={resultRef}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-4xl mx-auto"
            >
              <div className="glassmorphism-strong rounded-3xl overflow-hidden border border-white/10">
                {/* Result header bar */}
                <div className="px-8 py-5 border-b border-white/8 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{selectedMoodData?.emoji}</span>
                    <div>
                      <div className="text-[9px] font-mono uppercase tracking-[0.35em] text-white/30">Oracle Prescription</div>
                      <div className="text-xs font-mono text-[#FF9D00]/70 uppercase tracking-wider">{selectedMoodData?.label} Profile</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[9px] font-mono uppercase tracking-widest text-white/30 mb-1">Intensity</div>
                    <div className="text-2xl font-display text-[#FF9D00]">{result.intensityScore}</div>
                  </div>
                </div>

                <div className="p-8 md:p-10 grid md:grid-cols-[1fr,auto] gap-10 items-start">
                  {/* Left content */}
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-[0.4em] text-[#FF9D00]/60 mb-2">
                      Your Creation
                    </div>
                    <h3 className="font-display text-4xl sm:text-5xl md:text-6xl uppercase leading-none text-[#F0EDE8] mb-6">
                      {result.burgerName}
                    </h3>

                    {/* Poetic note */}
                    <p className="text-lg italic text-white/50 font-body leading-relaxed mb-6 border-l-2 border-[#FF9D00]/30 pl-4">
                      "{result.poeticNote}"
                    </p>

                    {/* Rationale */}
                    <p className="text-sm text-white/60 font-body leading-relaxed mb-8">
                      {result.rationale}
                    </p>

                    {/* Pairing */}
                    <div className="flex items-center gap-3 glassmorphism rounded-2xl px-5 py-4 border border-white/8">
                      <span className="text-xl">🍷</span>
                      <div>
                        <div className="text-[9px] font-mono uppercase tracking-widest text-white/30 mb-0.5">
                          Oracle Pairing
                        </div>
                        <div className="text-sm font-medium text-[#F0EDE8]">{result.pairingDrink}</div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Intensity bar + CTA */}
                  <div className="flex flex-col items-center gap-6 min-w-[180px]">
                    {/* Radial intensity */}
                    <div className="relative w-32 h-32">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                        <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
                        <motion.circle
                          cx="60" cy="60" r="52" fill="none"
                          stroke="#FF9D00" strokeWidth="6"
                          strokeLinecap="round"
                          strokeDasharray={`${2 * Math.PI * 52}`}
                          initial={{ strokeDashoffset: 2 * Math.PI * 52 }}
                          animate={{ strokeDashoffset: 2 * Math.PI * 52 * (1 - result.intensityScore / 100) }}
                          transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          style={{ filter: "drop-shadow(0 0 8px rgba(255,157,0,0.5))" }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="font-display text-3xl text-[#FF9D00]">{result.intensityScore}</span>
                        <span className="text-[8px] font-mono uppercase tracking-widest text-white/30">Intensity</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        // Scroll to #burgers
                        document.querySelector("#burgers")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="btn-primary text-center shadow-glow"
                    >
                      View This Burger
                    </button>

                    <button
                      onClick={() => { setResult(null); setSelectedMood(null); }}
                      className="text-[10px] font-mono uppercase tracking-widest text-white/25 hover:text-white/60 transition-colors"
                    >
                      Consult Again
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty state prompt */}
        {!selectedMood && !loading && !result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-10"
          >
            <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/20">
              ↑ Select your flavor mood above ↑
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
