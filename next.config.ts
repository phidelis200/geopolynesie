import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  assetPrefix: process.env.NODE_ENV === "production" ? "." : "",
  reactStrictMode: true,

  // facultatif : forcer webpack si Turbopack plante
  experimental: {
    turbo: false,
  },
};

export default nextConfig;
