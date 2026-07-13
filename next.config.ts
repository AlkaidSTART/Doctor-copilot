import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.NEST_API_URL || 'http://localhost:3001/api/:path*',
      },
    ];
  },
};

export default nextConfig;
