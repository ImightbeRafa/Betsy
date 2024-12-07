/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
    distDir: "out",
  images: {
    unoptimized: true,
    domains: ['lh3.googleusercontent.com'], // For Google profile images
  },
  // Remove the experimental config since serverActions is now default
}

module.exports = nextConfig