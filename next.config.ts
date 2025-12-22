import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com', // Allows Pexels links
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // Allows Unsplash links
      },
      {
        protocol: 'https',
        hostname: '**.supabase.co', // Allows your own Supabase storage
      },
      {
        protocol: 'https',
        hostname: 'placehold.co', // Allows placeholder images
      },
      {
        protocol: 'https',
        hostname: '**.supabase.co', // Allow all Supabase projects
      },
      
    ],
  },
};

export default nextConfig;