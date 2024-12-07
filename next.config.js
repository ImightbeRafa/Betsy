/** @type {import('next').NextConfig} */
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

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
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      minSize: 10000, // Minimum size for chunks
      maxSize: 25000000, // 25 MB in bytes, ensures no chunk exceeds this
    },
  },
  // Webpack configuration for Bundle Analyzer
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    if (!dev && isServer) {
      config.plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: 'server-bundle-report.html',
        openAnalyzer: false,
      }));
    }
    return config;
  },
}

module.exports = nextConfig;