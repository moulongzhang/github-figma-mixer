import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/github-figma-mixer",
  reactCompiler: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.figma.com",
        pathname: "/api/mcp/asset/**",
      },
    ],
  },
};

export default nextConfig;
