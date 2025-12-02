import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'shikimori.one', // Allow images from this API
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
