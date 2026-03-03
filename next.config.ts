import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: process.env.API_HOSTNAME ?? '',
      },
    ],
  },
};

export default nextConfig;
