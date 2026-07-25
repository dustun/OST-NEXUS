import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';
    const base = apiUrl.replace(/\/$/, '');
    return [
      {
        source: '/api/v1/:path*',
        destination: `${base}/api/v1/:path*`,
      },
    ];
  },
};

export default nextConfig;
