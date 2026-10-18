import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost", "192.168.68.115"],
  devIndicators: false,
  // Keep SEO metadata in <head>, including the dynamic home catalogue.
  htmlLimitedBots: /.*/,
  output: "standalone",
  async redirects() {
    // Retire the researched catalogue without leaving broken incoming links.
    return [
      "parim-85006", "parim-83444", "parim-85007", "parim-84043",
      "exfash-ef69473", "exfash-ef75287t", "exfash-ef84472", "exfash-ef292011",
      "new-balance-nb09332", "new-balance-nbz07074x", "new-balance-nbo06245z", "new-balance-nb08139x",
    ].map((slug) => ({ source: `/san-pham/${slug}`, destination: "/gong-kinh", permanent: true }));
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
