import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
  },
  experimental: {
    typedRoutes: false,
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
}

export default nextConfig
