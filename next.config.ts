import { NextConfig } from "next";

const nextConfig = {
  cacheComponents: true,
  typescript: { ignoreBuildErrors: true },
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: "/account",
        destination: "/account/account-details",
        permanent: true,
      },
    ];
  },
} satisfies NextConfig;

export default nextConfig;
