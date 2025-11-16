/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  reactStrictMode: true,

  images: {
    unoptimized: true, 
    domains: [
      "placehold.co",
      "worldwideshortnews.com", 
      "firebasestorage.googleapis.com"
    ],
  },

  compiler: {
    removeConsole: {
      exclude: ["error"], 
    },
  },

  distDir: ".next",
};

module.exports = nextConfig;
