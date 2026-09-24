"use client";

import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { asset } from "@/lib/assets";

gsap.registerPlugin(ScrollTrigger);

interface FlythroughIngredient {
  id: string;
  name: string;
  subtitle: string;
  texturePath: string;
  zPos: number;
  scale: [number, number];
  rotationZ: number;
  highlight: string;
}

const FLYTHROUGH_INGREDIENTS: FlythroughIngredient[] = [
  {
    id: "top-bun",
    name: "01. Gold Brioche Crown",
    subtitle: "28% Normandy Butter • Lyon Ferment",
    texturePath: "/layers/top-bun.jpg",
    zPos: 0,
    scale: [7.5, 7.5],
    rotationZ: -0.05,
    highlight: "Double Butter Glazed",
  },
  {
    id: "sauce",
    name: "02. Périgord Truffle Aioli",
    subtitle: "Smoked Bourbon & Black Truffle Glaze",
    texturePath: "/layers/sauce.jpg",
    zPos: -16,
    scale: [7.2, 7.2],
    rotationZ: 0.1,
    highlight: "Emulsified at 65°C",
  },
  {
    id: "lettuce",
    name: "03. Hydroponic Butterhead",
    subtitle: "Vertical Farmed • Zero Carbon Crisp",
    texturePath: "/layers/lettuce.jpg",
    zPos: -32,
    scale: [7.6, 7.6],
    rotationZ: -0.08,
    highlight: "Living Leaf Harvested Daily",
  },
  {
    id: "onion",
    name: "04. Vidalia Sweet Straws",
    subtitle: "Flash Fried & Charred Sweet Shallot",
    texturePath: "/layers/onion.jpg",
    zPos: -48,
    scale: [7.0, 7.0],
    rotationZ: 0.15,
    highlight: "Cast Iron Caramelized",
  },
  {
    id: "tomato",
    name: "05. San Marzano Vine Slice",
    subtitle: "Campanian Volcanic Terroir",
    texturePath: "/layers/tomato.jpg",
    zPos: -64,
    scale: [7.2, 7.2],
    rotationZ: -0.04,
    highlight: "Hand-Picked at Peak Brix",
  },
  {
    id: "bacon",
    name: "06. Applewood Kurobuta Slab",
    subtitle: "16-Hour Hickory Smoke • Maple Cure",
    texturePath: "/layers/bacon.jpg",
    zPos: -80,
    scale: [7.4, 7.4],
    rotationZ: 0.08,
    highlight: "Thick Hand-Carved Rib",
  },
  {
    id: "cheese",
    name: "07. Cave-Aged Gruyère AOP",
    subtitle: "18-Month Cellar Matured • 168°F Melt",
    texturePath: "/layers/cheese.jpg",
    zPos: -96,
    scale: [8.0, 8.0],
    rotationZ: -0.06,
    highlight: "Molten Fondue Crust",
  },
  {
    id: "patty",
    name: "08. Wagyu MS9+ Dry-Aged",
    subtitle: "45-Day Dry Aging • Binchotan Sear",
    texturePath: "/layers/patty.jpg",
    zPos: -112,
    scale: [7.8, 7.8],
    rotationZ: 0.03,
    highlight: "Seared at 400°F Charcoal",
  },
  {
    id: "pickles",
    name: "09. Kentucky Bourbon Pickles",
    subtitle: "White Oak Cask Dill Brine",
    texturePath: "/layers/pickles.jpg",
    zPos: -128,
    scale: [7.0, 7.0],
    rotationZ: -0.1,
    highlight: "Aged 30 Days in Mash",
  },
  {
    id: "bottom-bun",
    name: "10. Pan-Seared Brioche Heel",
    subtitle: "Weight-Bearing Golden Foundation",
    texturePath: "/layers/bottom-bun.jpg",
    zPos: -144,
    scale: [7.4, 7.4],
    rotationZ: 0.05,
    highlight: "Toasted Brown Butter Seal",
  },
];

export function IngredientFlythrough() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);

  const [activeIngredient, setActiveIngredient] = useState<FlythroughIngredient>(FLYTHROUGH_INGREDIENTS[0]);
  const [flyProgress, setFlyProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // ──────────────────────────────────────────
    // Three.js Scene Setup
    // ──────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060606, 0.016);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      300
    );
    camera.position.set(0, 0, 18);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xff9d00, 3, 50);
    pointLight.position.set(0, 5, 10);
    scene.add(pointLight);

    const rimLight = new THREE.DirectionalLight(0xffd65a, 1.8);
    rimLight.position.set(5, 8, 5);
    scene.add(rimLight);

    // ──────────────────────────────────────────
    // Load Ingredient Quads
    // ──────────────────────────────────────────
    const textureLoader = new THREE.TextureLoader();
    const planeMeshes: THREE.Mesh[] = [];

    FLYTHROUGH_INGREDIENTS.forEach((item) => {
      const textureUrl = asset(item.texturePath);
      const texture = textureLoader.load(textureUrl);
      texture.colorSpace = THREE.SRGBColorSpace;

      const geometry = new THREE.PlaneGeometry(item.scale[0], item.scale[1]);
      const material = new THREE.MeshStandardMaterial({
        map: texture,
        transparent: true,
        roughness: 0.35,
        metalness: 0.1,
        side: THREE.DoubleSide,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(0, 0, item.zPos);
      mesh.rotation.z = item.rotationZ;
      scene.add(mesh);
      planeMeshes.push(mesh);
    });

    // ──────────────────────────────────────────
    // Floating Spice & Steam Particles Field
    // ──────────────────────────────────────────
    const particleCount = 1200;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(0xff9d00);
    const color2 = new THREE.Color(0xffd65a);
    const color3 = new THREE.Color(0xffffff);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = 20 - Math.random() * 180;

      const c = Math.random() < 0.5 ? color1 : Math.random() < 0.8 ? color2 : color3;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // ──────────────────────────────────────────
    // Render loop with slight mouse tilt
    // ──────────────────────────────────────────
    let mouseX = 0;
    let mouseY = 0;
    let targetCameraX = 0;
    let targetCameraY = 0;

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointerMove);

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Subtle camera floating motion
      targetCameraX = mouseX * 1.5;
      targetCameraY = mouseY * 1.0;
      camera.position.x += (targetCameraX - camera.position.x) * 0.05;
      camera.position.y += (targetCameraY - camera.position.y) * 0.05;

      // Particle subtle drift
      particles.rotation.z += 0.0005;

      // Keep point light following camera
      pointLight.position.z = camera.position.z - 2;

      renderer.render(scene, camera);
    };
    animate();

    // ──────────────────────────────────────────
    // GSAP ScrollTrigger Camera Flythrough Timeline
    // ──────────────────────────────────────────
    const ctx = gsap.context(() => {
      const startZ = 18;
      const endZ = -155;

      const flyTimeline = gsap.timeline({
        defaults: { ease: "none" },
      });

      // Camera dollies through Z-axis
      flyTimeline.to(camera.position, {
        z: endZ,
        duration: 1,
        ease: "none",
        onUpdate: () => {
          const currentZ = camera.position.z;
          // Calculate which ingredient is currently in camera view
          let closest = FLYTHROUGH_INGREDIENTS[0];
          let minDiff = 999;
          FLYTHROUGH_INGREDIENTS.forEach((item) => {
            const diff = Math.abs(currentZ - item.zPos);
            if (diff < minDiff) {
              minDiff = diff;
              closest = item;
            }
          });
          setActiveIngredient(closest);
        },
      });

      // Pin the section during flythrough
      ScrollTrigger.create({
        trigger: container,
        pin: true,
        start: "top top",
        end: "+=2800",
        scrub: 1,
        animation: flyTimeline,
        anticipatePin: 1,
        onUpdate: (self) => {
          setFlyProgress(self.progress);
        },
      });
    }, container);

    // Resize handler
    const handleResize = () => {
      if (!container || !renderer) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      ctx.revert();
      renderer.dispose();
    };
  }, []);

  return (
    <section
      id="flythrough"
      ref={containerRef}
      className="relative w-full h-screen bg-[#060606] overflow-hidden select-none"
    >
      {/* 3D WebGL Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-10" />

      {/* ── Overlay Cinematic HUD ── */}
      <div
        ref={hudRef}
        className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-6 sm:p-12"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="glassmorphism px-5 py-2.5 rounded-full border border-white/10 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#FF9D00] animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#FF9D00]">
              SECTION 3 — THREE.JS INGREDIENT FLYTHROUGH
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-[10px] font-mono text-white/40">
            <span>Dolly Mode: <strong className="text-white">Continuous Z-Scrub</strong></span>
            <span className="text-white/20">|</span>
            <span>Speed: <strong className="text-[#FF9D00]">60 FPS Fluid</strong></span>
          </div>
        </div>

        {/* Center Live Focus Card (Changes dynamically as camera glides through layers) */}
        <div className="flex justify-center items-center">
          <div className="glassmorphism-strong px-8 py-6 rounded-3xl border border-[#FF9D00]/30 max-w-lg w-full text-center space-y-2 shadow-glow animate-fade-in">
            <div className="inline-flex items-center gap-2 text-[9px] font-mono uppercase tracking-[0.3em] text-[#FF9D00]">
              <span>Active Layer Focus</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF9D00]" />
              <span>{activeIngredient.highlight}</span>
            </div>

            <h3 className="font-display text-2xl sm:text-4xl uppercase text-[#F0EDE8] tracking-tight">
              {activeIngredient.name}
            </h3>

            <p className="text-xs sm:text-sm text-white/50 font-body">
              {activeIngredient.subtitle}
            </p>

            <div className="pt-2 flex items-center justify-center gap-2">
              <div className="w-36 h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#FF9D00] to-[#FF5A00] transition-all duration-300"
                  style={{ width: `${Math.round(flyProgress * 100)}%` }}
                />
              </div>
              <span className="text-[9px] font-mono text-white/40">
                {Math.round(flyProgress * 100)}% Traveled
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Navigation Hint */}
        <div className="flex items-center justify-between text-[10px] font-mono text-white/35">
          <span>Camera Depth: {Math.round(flyProgress * 144)}mm Traversed</span>
          <span className="text-[#FF9D00] animate-bounce">
            Scroll forward to emerge into the Burger Story ↓
          </span>
        </div>
      </div>
    </section>
  );
}
