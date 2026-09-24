"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { burgers, Burger } from "@/lib/data/burgers";
import { combos, Combo } from "@/lib/data/combos";
import { useCart } from "@/lib/cart-context";

interface MenuItem {
  id: string;
  category: "burgers" | "combos" | "sides" | "drinks" | "desserts";
  name: string;
  tagline: string;
  price: number;
  description: string;
  image: string;
  calories?: number;
  tags: string[];
}

const additionalItems: MenuItem[] = [
  // Sides
  {
    id: "side-duck-fat-fries",
    category: "sides",
    name: "Duck Fat Belgian Frites",
    tagline: "Double-fried in duck tallow with rosemary salt",
    price: 9.99,
    description: "Crisp Kennebec potatoes double-fried in rich duck tallow, tossed with fresh chopped rosemary and fleur de sel.",
    image: "/main burger.png",
    calories: 520,
    tags: ["Signature Side", "Crispy"],
  },
  {
    id: "side-truffle-parm",
    category: "sides",
    name: "Truffle Parmesan Fries",
    tagline: "Black winter truffle oil & 24-month Parmigiano",
    price: 11.99,
    description: "Hand-cut Idaho potatoes tossed with white truffle butter, microplaned Parmigiano-Reggiano, and fresh chives.",
    image: "/main burger.png",
    calories: 580,
    tags: ["Luxury", "Vegetarian"],
  },
  {
    id: "side-tempura-rings",
    category: "sides",
    name: "Tempura Sweet Onion Tower",
    tagline: "Served with smoked paprika aioli",
    price: 8.99,
    description: "Colossal Vidalia onions in an airy, beer-infused tempura batter. Stays crisp to the last bite.",
    image: "/main burger.png",
    calories: 460,
    tags: ["Crunch", "Vegetarian"],
  },
  // Drinks
  {
    id: "drink-smoked-old-fashioned",
    category: "drinks",
    name: "Smoked Oak Old Fashioned (Zero-Proof)",
    tagline: "Oak-smoked demerara, bitters & orange oil",
    price: 9.50,
    description: "Non-alcoholic distilled botanical blend smoked with cherrywood tableside, infused with charred orange peel.",
    image: "/main burger.png",
    calories: 90,
    tags: ["Craft Beverage", "Zero-Proof"],
  },
  {
    id: "drink-vanilla-shake",
    category: "drinks",
    name: "Madagascar Vanilla Bean Custard Shake",
    tagline: "Organic whole milk custard & real vanilla beans",
    price: 8.50,
    description: "Dense, slow-churned French custard blended with cold whole milk and Madagascar Bourbon vanilla caviar.",
    image: "/main burger.png",
    calories: 640,
    tags: ["Dessert Shake", "Indulgent"],
  },
  // Desserts
  {
    id: "dessert-gold-tiramisu",
    category: "desserts",
    name: "24K Gold-Dusted Espresso Tiramisu",
    tagline: "Mascarpone cream & dark roast espresso soak",
    price: 13.99,
    description: "Savoiardi soaked in single-origin Ethiopian espresso and dark cocoa, crowned with edible 24K gold foil.",
    image: "/main burger.png",
    calories: 480,
    tags: ["Chef Special", "Gold Tier"],
  },
  {
    id: "dessert-truffle-gelato",
    category: "desserts",
    name: "Black Truffle Honey Artisan Gelato",
    tagline: "Wildflower honey, sea salt & Périgord truffle shavings",
    price: 11.50,
    description: "Sweet cream gelato infused with white acacia honey and finished with fresh black truffle shavings.",
    image: "/main burger.png",
    calories: 390,
    tags: ["Artisan", "Unique"],
  },
];

export function MenuExplorer() {
  const [activeCategory, setActiveCategory] = useState<"all" | "burgers" | "combos" | "sides" | "drinks" | "desserts">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { addItem } = useCart();

  // Unified items list
  const allMenuItems: MenuItem[] = [
    ...burgers.map((b) => ({
      id: b.id,
      category: "burgers" as const,
      name: b.name,
      tagline: b.tagline,
      price: b.price,
      description: b.description,
      image: b.image,
      calories: b.nutrition.calories,
      tags: [b.featured ? "Chef Pick" : "Signature", b.number],
    })),
    ...combos.map((c) => ({
      id: c.id,
      category: "combos" as const,
      name: c.name,
      tagline: `${c.burger} + ${c.side}`,
      price: c.price,
      description: c.description,
      image: "/burgers/combo-all.png",
      tags: ["4 Courses", "Best Value"],
    })),
    ...additionalItems,
  ];

  const filteredItems = allMenuItems.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAdd = (item: MenuItem) => {
    addItem({
      id: item.id,
      type: item.category === "burgers" ? "burger" : item.category === "combos" ? "combo" : "side",
      title: item.name,
      tagline: item.tagline,
      price: item.price,
      image: item.image,
    });
  };

  return (
    <section id="menu-explorer" className="relative section-padding bg-surface border-t border-b border-white/5 overflow-hidden" aria-label="Interactive Menu Explorer">
      <div className="section-container relative z-10">
        {/* Header & Live Search */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-accent uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Complete Gastronomic Catalog
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-text uppercase leading-none">
              THE FULL <span className="text-gradient-accent">MENU</span>
            </h2>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search burgers, truffles, shakes..."
              className="w-full bg-surface-elevated border border-white/10 rounded-full pl-11 pr-4 py-3 text-xs sm:text-sm text-text placeholder-text/40 focus:outline-none focus:border-accent transition-colors"
            />
            <svg
              className="w-4 h-4 text-text/40 absolute left-4 top-1/2 -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {[
            { id: "all", label: "All Items" },
            { id: "burgers", label: "07 Signature Burgers" },
            { id: "combos", label: "Feast Ensembles" },
            { id: "sides", label: "Artisan Sides" },
            { id: "drinks", label: "Craft Drinks" },
            { id: "desserts", label: "Pastry Desserts" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                activeCategory === cat.id
                  ? "bg-accent text-background font-semibold shadow-glow"
                  : "glassmorphism text-text/70 hover:text-text hover:border-white/20"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl glassmorphism border border-white/10 hover:border-accent/40 p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-xl group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <span className="text-[10px] tracking-wider uppercase font-mono text-accent">
                        {item.category}
                      </span>
                      <h3 className="font-display text-xl text-text uppercase group-hover:text-accent transition-colors">
                        {item.name}
                      </h3>
                    </div>
                    <span className="font-display text-xl text-text font-bold whitespace-nowrap">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>

                  <p className="text-xs text-text/60 line-clamp-2 mb-4 font-body leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {item.tags.map((t, idx) => (
                      <span key={idx} className="text-[10px] bg-white/5 border border-white/5 px-2 py-0.5 rounded text-text/60">
                        {t}
                      </span>
                    ))}
                    {item.calories && (
                      <span className="text-[10px] bg-white/5 border border-white/5 px-2 py-0.5 rounded text-text/40 font-mono">
                        {item.calories} kcal
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[11px] text-text/40">{item.tagline}</span>
                  <button
                    onClick={() => handleAdd(item)}
                    className="btn-primary text-xs px-4 py-2 font-semibold flex items-center gap-1.5 shadow-sm"
                  >
                    <span>Add</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16 text-text/50">
            <p className="text-base">No gastronomic creations match &quot;{searchQuery}&quot;</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
              className="mt-4 text-accent text-xs underline font-semibold"
            >
              Reset Search & Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
