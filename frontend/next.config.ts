import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost", "192.168.68.115"],
  devIndicators: false,
  // Keep SEO metadata in <head>, including the dynamic home catalogue.
  htmlLimitedBots: /.*/,
  output: "standalone",
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www\\.kinhthuocanhthi\\.com" }],
        destination: "https://kinhthuocanhthi.com/:path*",
        permanent: true,
      },
    ];
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.mp4$/,
      type: "asset/resource",
    });

    return config;
  },
};

export default nextConfig;
