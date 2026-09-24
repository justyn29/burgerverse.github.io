import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "gsap", "@react-three/fiber", "@react-three/drei"],
  },
};

export default nextConfig;