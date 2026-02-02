import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "dramaboxdb.com",
      },
      {
        protocol: "http",
        hostname: "dramaboxdb.com",
      },
    ],
  },
};

export default nextConfig;
