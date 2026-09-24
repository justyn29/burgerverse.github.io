# 🍔 BURGERVERSE™ — Luxury Culinary Motion Experience

<div align="center">

[![Next.js 15](https://img.shields.io/badge/Next.js-15.2.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?style=for-the-badge&logo=three.js)](https://threejs.org/)
[![GSAP 3](https://img.shields.io/badge/GSAP-ScrollTrigger-88CE02?style=for-the-badge&logo=greensock)](https://greensock.com/)
[![Lenis](https://img.shields.io/badge/Lenis-Smooth_Scroll-FF9D00?style=for-the-badge)](https://lenis.darkroom.engineering/)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

<p align="center">
  <strong>A cinematic, scroll-driven interactive burger deconstruction and flythrough experience.</strong><br/>
  Engineered like an Apple Product Launch, Porsche Showcase, and Awwwards Site of the Day.
</p>

[Explore Experience](#-the-9-cinematic-sections) • [Tech Stack](#-tech-stack) • [Quick Start](#-quick-start) • [Architecture](#-architecture) • [Engineering Highlights](#-engineering-highlights)

---

</div>

## 🌟 Overview

**BurgerVerse™** is a luxury food brand web experience that treats culinary craft as haute horlogerie. Scrolling drives a synchronized 10-layer burger explosion sequence, transitions into an interactive Three.js 3D camera flythrough along the Z-axis, morphs into editorial storytelling, and features a dynamic particle reassembly showcase.

---

## 🎬 The 9 Cinematic Sections

```
Act I    │ Hero — Atmospheric floating burger, volumetric lighting & steam
Act II   │ Burger Explosion — 10-layer scrubbed ScrollTrigger deconstruction
Act III  │ Ingredient Flythrough — Three.js 3D camera dolly through layer quads
Act IV   │ Burger Story — Ingredients morph into ambient elements & craft pillars
Act V    │ The 07 Signature Burgers — Interactive 3D tilt cards & nutrition gauges
Act VI   │ Particle Showcase Transition — Canvas vortex particle morph engine
Act VII  │ Combo Section — Dynamic floating assembly (Burger + Truffle Fries + Shake)
Act VIII │ Rewards Club — Lighter visual rest & holographic VIP sovereign pass
Act IX   │ Final Assembly CTA — Full 360° reassembly & luxury concierge dispatch
```

### 1. Hero
- Full-viewport dark luxury introduction with floating particles, ambient steam, and reactive 3D mouse parallax.
- Primary calls-to-action: **"Explore Burgers"** and **"View Menu"**.

### 2. 10-Layer Scrub Explosion Sequence
- Pinned GSAP ScrollTrigger timeline scrubbed directly to scroll position (0% autoplay, 100% reversible).
- **10 discrete physical layers**:
  1. `24K Gold Brioche Crown` (28% Beurre d'Isigny • 72h Ferment)
  2. `Golden Truffle Aioli & Glaze` (Smoked Bourbon Reduction)
  3. `Hydroponic Baby Butterhead` (Vertical Bio-Farm)
  4. `Charred Shallots & Crispy Straws` (Cast-Iron Caramelized)
  5. `Heirloom San Marzano Slice` (Campanian Volcanic Terroir)
  6. `Applewood Smoked Berkshire Bacon` (16-Hour Hickory Cure)
  7. `Cave-Aged Swiss Gruyère AOP` (18-Month Cellar Matured)
  8. `200g Wagyu MS9+ Prime Patty` (45-Day Dry-Aged • 400°F Sear)
  9. `Bourbon Barrel Crinkle Pickles` (White Oak Cask Dill Brine)
  10. `Brown Butter Brioche Heel` (Weight-Bearing Foundation)
- Synchronized telemetry HUD displaying layer numbers, origin terroir, and culinary specifications.

### 3. Three.js Ingredient Flythrough
- WebGL perspective camera dollies forward through 3D space from $Z = 18$ to $Z = -144$.
- 1,200-particle spice and mist field with real-time rack focus transitions as each ingredient is passed.

### 4. Burger Story (Artisan Manifesto)
- Seamless continuity from the 3D flythrough where layers morph into ambient floating background elements.
- 4 editorial pillars with tasting notes, marbling scores, maturity, and bake cycles.

### 5. Signature Burgers Collection
- The complete 7-burger pantheon:
  - **01 Inferno Beast** — Double Beef & Ghost Pepper
  - **02 Golden Melt** — Triple Cheddar & Sweet Shallots
  - **03 Black Truffle King** — Wagyu MS9+ & Truffle Aioli
  - **04 Smoky Titan** — Applewood Bacon & Bourbon BBQ
  - **05 Volcano Stack** — Quad Beef & Lava Cheese
  - **06 Crunch Royale** — Tempura Onion Tower
  - **07 Ultimate Prime** — 45-Day Dry-Aged Wagyu & 24K Gold
- Interactive 3D hover tilt, macro nutrition breakdown (Calories, Protein, Carbs, Fats), and customizer drawer.

### 6. Burger Showcase Transition (Particle Morph)
- High-performance HTML5 Canvas simulation.
- Switching between burgers dissolves the active item into 900+ glowing particles that swirl in a vortex and reassemble into the next silhouette with zero hard cuts.

### 7. Dynamic Combo Assembly
- Burger, **Parmesan Truffle Fries**, and **Bourbon Vanilla Shake** glide into physical proximity from separate lateral and vertical vectors as the user scrolls.

### 8. VIP Rewards Club (Visual Rest)
- Calibrated visual pacing allowing the user to rest visually.
- Interactive 3D holographic VIP Sovereign card with custom name embossing and tier privileges (Bronze, Silver, Gold, Sovereign).

### 9. Contact & Final 360° Assembly CTA
- The Sovereign Ultimate Prime completes a final floating 360° assembly.
- Global location dispatch selector (Soho NYC, Beverly Hills, Mayfair London, Ginza Tokyo) and Private Chef's Table reservation.

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework** | [Next.js 15 (App Router)](https://nextjs.org/), [React 19](https://react.dev/), [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/), Vanilla CSS Variables |
| **Scroll Engine** | [Lenis 1.1+](https://lenis.darkroom.engineering/) synchronized with [GSAP 3 Ticker](https://greensock.com/) |
| **3D & WebGL** | [Three.js](https://threejs.org/), Custom Canvas Particle Physics |
| **Motion** | [GSAP ScrollTrigger](https://greensock.com/scrolltrigger/), [Framer Motion 11](https://www.framer.com/motion/) |
| **State** | React Context (Cart Tray, Scroll Controller, Customizer Modal) |

---

## ⚡ Engineering Highlights

### Unified Lenis + GSAP Ticker Synchronization
To avoid micro-stutter and desynchronization between smooth scrolling and scrubbed animations, Lenis RAF is driven directly through GSAP's internal ticker with lag smoothing disabled:

```ts
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  touchMultiplier: 1.5,
});

// Notify ScrollTrigger on scroll
lenis.on("scroll", ScrollTrigger.update);

// Drive Lenis directly from GSAP ticker
const updateTicker = (time: number) => {
  lenis.raf(time * 1000);
};
gsap.ticker.add(updateTicker);
gsap.ticker.lagSmoothing(0);
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js**: `v18.18+` or `v20+`
- **npm** or **pnpm** or **yarn**

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/burgerverse.git
   cd burgerverse
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
npm run start
```

---

## 📁 Project Structure

```
burgerverse/
├── public/
│   ├── layers/              # 10 High-res burger layer assets
│   ├── burgers/             # 7 Signature burger hero renders
│   ├── combos/              # Artisan truffle fries & craft drink
│   └── 5 burgers.png        # Feast overview asset
├── src/
│   ├── app/
│   │   ├── globals.css      # Dark luxury design tokens & typography
│   │   ├── layout.tsx       # Root layout & metadata
│   │   └── page.tsx         # The 9-Act orchestrated master sequence
│   ├── components/
│   │   ├── layout/          # Navigation, CustomCursor, IntroLoader, ScrollProvider
│   │   ├── cart/            # CartDrawer & tray management
│   │   └── sections/
│   │       ├── HeroExplosionSequence.tsx     # Acts I & II (Hero & 10-Layer Explosion)
│   │       ├── IngredientFlythrough.tsx      # Act III (Three.js 3D Z-Dolly Scene)
│   │       ├── BurgerStory.tsx               # Act IV (Morphing Craft Manifesto)
│   │       ├── BurgersShowcase.tsx           # Act V (7 Signature Masterpieces)
│   │       ├── BurgerTransitionShowcase.tsx  # Act VI (Canvas Particle Vortex)
│   │       ├── CombosShowcase.tsx            # Act VII (Dynamic Combo Assembly)
│   │       ├── RewardsSection.tsx            # Act VIII (VIP Sovereign Club)
│   │       └── FinalAssemblyCTA.tsx          # Act IX (Final 360° Assembly & CTA)
│   └── lib/
│       ├── cart-context.tsx # Interactive cart state management
│       └── data/            # Curated data for burgers, combos, rewards
```

---

## 🎯 Performance & Compatibility

- **Target Framerate**: 60 FPS desktop / 45–60 FPS mobile
- **Scroll Physics**: Hardware-accelerated GPU transforms (`will-change: transform`)
- **Accessibility**: Respects `prefers-reduced-motion` with graceful transform degradation
- **SEO Ready**: Semantic HTML5 hierarchy, OpenGraph metadata, and structured data

---

## 📄 License

This project is licensed under the **MIT License**.
