/** @type {import('next').NextConfig} */
const CompressionPlugin = require('compression-webpack-plugin');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
  
  // Optimize images
  images: {
    unoptimized: true,
    domains: ['lh3.googleusercontent.com'],
    deviceSizes: [640, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64],
  },

  webpack: (config, { dev, isServer }) => {
    // Production optimizations only
    if (!dev) {
      // Enable compression
      config.plugins.push(
        new CompressionPlugin({
          test: /\.(js|css|html|svg)$/,
          algorithm: 'gzip',
          threshold: 10240,
          minRatio: 0.8,
        })
      );

      // Optimize chunks
      config.optimization = {
        ...config.optimization,
        minimize: true,
        moduleIds: 'deterministic',
        runtimeChunk: isServer ? false : 'single',
        splitChunks: {
          chunks: 'all',
          minSize: 10000,
          maxSize: 20000000, // 20MB to be safe
          cacheGroups: {
            vendor: {
              name: (module) => {
                const packageName = module.context.match(
                  /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                )[1];
                return `vendor.${packageName.replace('@', '')}`;
              },
              test: /[\\/]node_modules[\\/]/,
              chunks: 'all',
              priority: 20,
              reuseExistingChunk: true,
              enforce: true,
            },
            commons: {
              name: 'commons',
              minChunks: 2,
              priority: 10,
              reuseExistingChunk: true,
              enforce: true,
            },
          },
        },
      };
    }

    return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);