import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
  },
  experimental: {
    optimizePackageImports: ['embla-carousel-react']
  },
  // Performance optimizations for Safari iOS
  poweredByHeader: false,
  compress: true,
  swcMinify: true,
};

export default nextConfig;
