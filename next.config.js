/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['logo.clearbit.com'],
  },
}

module.exports = nextConfig 