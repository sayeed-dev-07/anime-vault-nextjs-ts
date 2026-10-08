import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Allows your YouTube thumbnails
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/vi/**",
      },
      // Allows your MyAnimeList CDN images (like the one you just shared)
      {
        protocol: "https",
        hostname: "cdn.myanimelist.net",
        pathname: "/**", 
      },
      // Allows standard MyAnimeList domains
      {
        protocol: "https",
        hostname: "myanimelist.net",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
