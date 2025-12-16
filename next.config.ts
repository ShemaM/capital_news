import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.unsplash.com", // The "**" allows images.unsplash AND plus.unsplash
      },
      {
        protocol: "https",
        hostname: "placehold.co", // Backup service for testing
      },
    ],
  },
};

export default nextConfig;