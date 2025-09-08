/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // keep this ONLY if you want a fully static export
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true, // required for static export
  },
};

module.exports = nextConfig;
