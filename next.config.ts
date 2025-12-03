import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "shikimori.one",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
