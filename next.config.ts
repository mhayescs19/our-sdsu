import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // skips ESLint checks during `next build` and `next dev`
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
