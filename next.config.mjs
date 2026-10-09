/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  transpilePackages: ['animejs', 'lenis'],
  // pdf.js worker ships as a static file; the resume viewer only needs its URL
  webpack(config) {
    config.module.rules.push({
      test: /pdf\.worker\.min\.mjs$/,
      type: 'asset/resource',
      generator: { filename: 'static/chunks/[name].[contenthash][ext]' },
    });
    return config;
  },
};

export default nextConfig;
