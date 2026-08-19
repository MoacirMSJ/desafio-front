import type { NextConfig } from "next";

const NEWS_API_ORIGIN = process.env.NEWS_API_ORIGIN ?? "http://localhost:3000";

const nextConfig: NextConfig = {
  output: "standalone",
  async rewrites() {
    return [
      {
        source: "/api/noticias",
        destination: `${NEWS_API_ORIGIN}/api/noticias`,
      },
      {
        source: "/api/noticias/:path*",
        destination: `${NEWS_API_ORIGIN}/api/noticias/:path*`,
      },
    ];
  },
};

export default nextConfig;
