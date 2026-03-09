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
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'dracin-xi.vercel.app',
          },
        ],
        destination: 'https://www.homeme.my.id/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;