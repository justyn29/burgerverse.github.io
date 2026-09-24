import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production" || process.argv.some(arg => arg.includes("build"));
const basePath = process.env.NEXT_PUBLIC_BASE_PATH !== undefined 
  ? process.env.NEXT_PUBLIC_BASE_PATH 
  : (isProd ? "/burgerverse.github.io" : "");

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "gsap", "@react-three/fiber", "@react-three/drei"],
  },
};

export default nextConfig;