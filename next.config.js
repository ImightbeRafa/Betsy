/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
    distDir: "out",
  images: {
    unoptimized: true,
    domains: ['lh3.googleusercontent.com'], // For Google profile images
  },
  // Add experimental and optimization settings
  experimental: {
    outputFileTracing: true,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      maxSize: 25000 // 25MB in KB
    },
  },
  // Remove the experimental config since serverActions is now default
}

module.exports = nextConfig