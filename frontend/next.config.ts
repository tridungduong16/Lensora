import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost", "192.168.68.115"],
  devIndicators: false,
  output: "standalone",
  webpack(config) {
    config.module.rules.push({
      test: /\.mp4$/,
      type: "asset/resource",
    });

    return config;
  },
};

export default nextConfig;
