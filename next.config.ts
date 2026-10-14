import type { NextConfig } from "next";

// Задаётся в GitHub Actions из actions/configure-pages:
// "" для репозитория username.github.io, "/repo-name" для остальных.
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: { unoptimized: true },
  // Для путей в обычном <img> / fetch: `${process.env.NEXT_PUBLIC_BASE_PATH}/logo.png`
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
