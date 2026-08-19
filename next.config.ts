import type { NextConfig } from "next";

const NEWS_API_ORIGIN = process.env.NEWS_API_ORIGIN ?? "http://localhost:3000";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/news",
        destination: `${NEWS_API_ORIGIN}/api/news`,
      },
      {
        source: "/api/news/:path*",
        destination: `${NEWS_API_ORIGIN}/api/news/:path*`,
      },
    ];
  },
};

export default nextConfig;
