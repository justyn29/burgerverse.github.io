"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { locations, Location } from "@/lib/data/locations";

export function StoreLocator() {
  const [activeLocation, setActiveLocation] = useState<Location>(locations[0]);
  const [reserved, setReserved] = useState(false);
  const [reserveModalOpen, setReserveModalOpen] = useState(false);
  const [partySize, setPartySize] = useState("2");
  const [reserveTime, setReserveTime] = useState("19:30");

  const handleReserve = (e: React.FormEvent) => {
    e.preventDefault();
    setReserved(true);
    setTimeout(() => {
      setReserveModalOpen(false);
      setReserved(false);
    }, 2500);
  };

  return (
    <section id="locations" className="relative section-padding bg-surface border-t border-b border-white/5 overflow-hidden" aria-label="BurgerVerse Flagship Store Locations">
      {/* Background Volumetric Ambience */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-accent uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Gastronomy Lounges & Flagships
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-text uppercase leading-none">
              FIND YOUR <span className="text-gradient-accent">SANCTUARY</span>
            </h2>
          </div>
          <p className="max-w-md text-text/70 text-sm md:text-base mt-4 md:mt-0 font-body">
            Experience our open-kitchen chef tables, vinyl listening lounges, and heated rooftop patios across 6 major culinary capitals.
          </p>
        </div>

        {/* City Selector Tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {locations.map((loc) => {
            const isSelected = activeLocation.id === loc.id;
            return (
              <button
                key={loc.id}
                onClick={() => setActiveLocation(loc)}
                className={`px-5 py-2.5 rounded-full text-xs font-medium transition-all ${
                  isSelected
                    ? "bg-accent text-background font-semibold shadow-glow"
                    : "glassmorphism text-text/70 hover:text-text hover:border-white/20"
                }`}
              >
                {loc.city} ({loc.name})
              </button>
            );
          })}
        </div>

        {/* Location Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Location Spec & Experience Card */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl glassmorphism-strong border border-white/10 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                  {activeLocation.flagship ? "★ Flagship Sovereign Sanctuary" : "Gourmet Lounge"}
                </span>
                <span className="text-xs text-emerald-400 font-mono flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Open Today
                </span>
              </div>

              <h3 className="font-display text-3xl sm:text-4xl text-text uppercase mb-2">
                {activeLocation.name}
              </h3>

              <p className="text-sm text-text/80 font-mono mb-6 flex items-center gap-2">
                <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                <span>{activeLocation.address}, {activeLocation.city}, {activeLocation.state} {activeLocation.zip}</span>
              </p>

              {/* Hours Grid */}
              <div className="bg-black/40 p-4 rounded-2xl border border-white/5 mb-6">
                <span className="text-[10px] font-mono uppercase text-text/40 tracking-wider block mb-2">
                  Operating Hours
                </span>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-text/80">
                  <div className="flex justify-between">
                    <span className="text-text/50">Mon–Wed:</span>
                    <span>{activeLocation.hours.monday}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text/50">Thu–Fri:</span>
                    <span>{activeLocation.hours.friday}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text/50">Saturday:</span>
                    <span>{activeLocation.hours.saturday}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text/50">Sunday:</span>
                    <span>{activeLocation.hours.sunday}</span>
                  </div>
                </div>
              </div>

              {/* Architectural Features */}
              <div className="mb-6">
                <span className="text-[10px] font-mono uppercase text-text/40 tracking-wider block mb-2">
                  Lounge Features
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeLocation.features.map((f, i) => (
                    <span key={i} className="text-xs bg-white/5 border border-white/10 px-3 py-1 rounded-lg text-text/90">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Actions */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs font-mono text-text/60">
                Direct Line: <a href={`tel:${activeLocation.phone}`} className="text-text hover:text-accent underline font-semibold">{activeLocation.phone}</a>
              </div>
              <button
                onClick={() => setReserveModalOpen(true)}
                className="btn-primary text-xs sm:text-sm px-6 py-3 font-semibold shadow-glow flex items-center gap-2"
              >
                <span>Reserve Chef Table</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right: Architectural Visual / Stylized Map Simulator */}
          <div className="lg:col-span-6 rounded-3xl glassmorphism border border-white/10 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden min-h-[380px]">
            {/* Map Grid Stylized Overlay */}
            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#FF9D00_1px,transparent_1px),linear-gradient(to_bottom,#FF9D00_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

            <div className="relative z-10 flex items-center justify-between">
              <span className="text-xs font-mono text-text/50 uppercase tracking-widest">
                GPS COORDINATES: {activeLocation.coordinates.lat}° N, {activeLocation.coordinates.lng}° W
              </span>
              <span className="text-[10px] bg-accent/20 border border-accent/40 text-accent font-mono px-2.5 py-1 rounded-md">
                LIVE STATUS: ACTIVE
              </span>
            </div>

            {/* Center Radar / Pin Graphic */}
            <div className="relative z-10 my-8 flex flex-col items-center justify-center text-center">
              <div className="relative w-24 h-24 rounded-full border-2 border-accent/50 flex items-center justify-center mb-4">
                <div className="absolute inset-0 rounded-full bg-accent/20 animate-ping" />
                <div className="w-12 h-12 rounded-full bg-accent text-black font-display font-bold text-xl flex items-center justify-center shadow-glow">
                  BV
                </div>
              </div>
              <h4 className="font-display text-2xl text-text uppercase">{activeLocation.city}</h4>
              <p className="text-xs text-text/60">{activeLocation.address}</p>
            </div>

            {/* Bottom Actions */}
            <div className="relative z-10 flex items-center justify-between text-xs pt-4 border-t border-white/5">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(`${activeLocation.address}, ${activeLocation.city}`)}`}
                target="_blank"
                rel="noreferrer"
                className="text-accent hover:underline flex items-center gap-1 font-semibold"
              >
                <span>Open in Google Maps</span>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <span className="text-text/40 font-mono">Curbside & Delivery Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chef Table Reservation Modal */}
      <AnimatePresence>
        {reserveModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setReserveModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-surface border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl z-10"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className="text-[10px] font-mono text-accent uppercase tracking-widest">
                    Gastronomy Sanctuary Reservation
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl text-text uppercase">
                    {activeLocation.name}
                  </h3>
                </div>
                <button
                  onClick={() => setReserveModalOpen(false)}
                  className="p-2 rounded-full hover:bg-white/10 text-text/60 hover:text-text"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {reserved ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-accent text-black font-bold text-2xl flex items-center justify-center mx-auto shadow-glow">
                    ✓
                  </div>
                  <h4 className="font-display text-2xl text-text uppercase">Chef Table Confirmed</h4>
                  <p className="text-xs text-text/70">
                    Your reservation at {activeLocation.name} for {partySize} guests at {reserveTime} is secured. Confirmation sent via SMS.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleReserve} className="space-y-4 text-xs">
                  <div>
                    <label className="text-text/70 uppercase tracking-wider block mb-1.5 font-semibold">Party Size</label>
                    <select
                      value={partySize}
                      onChange={(e) => setPartySize(e.target.value)}
                      className="w-full bg-surface-elevated border border-white/10 rounded-xl p-3 text-text focus:outline-none focus:border-accent"
                    >
                      <option value="1">1 Guest (Chef Counter)</option>
                      <option value="2">2 Guests (Tasting Table)</option>
                      <option value="4">4 Guests (Lounge Booth)</option>
                      <option value="6">6 Guests (Sovereign Suite)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-text/70 uppercase tracking-wider block mb-1.5 font-semibold">Date</label>
                      <input
                        type="date"
                        defaultValue="2026-09-26"
                        className="w-full bg-surface-elevated border border-white/10 rounded-xl p-3 text-text focus:outline-none focus:border-accent"
                      />
                    </div>
                    <div>
                      <label className="text-text/70 uppercase tracking-wider block mb-1.5 font-semibold">Seating Time</label>
                      <select
                        value={reserveTime}
                        onChange={(e) => setReserveTime(e.target.value)}
                        className="w-full bg-surface-elevated border border-white/10 rounded-xl p-3 text-text focus:outline-none focus:border-accent"
                      >
                        <option value="18:00">6:00 PM (First Seating)</option>
                        <option value="19:30">7:30 PM (Peak Gastronomy)</option>
                        <option value="21:00">9:00 PM (Late Tasting)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-text/70 uppercase tracking-wider block mb-1.5 font-semibold">Guest Name & Phone</label>
                    <input
                      type="text"
                      placeholder="e.g. Justyn Kumar • (555) 019-2834"
                      required
                      className="w-full bg-surface-elevated border border-white/10 rounded-xl p-3 text-text placeholder-text/30 focus:outline-none focus:border-accent"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary w-full py-3.5 text-sm font-semibold shadow-glow mt-4"
                  >
                    Confirm Table Reservation
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
