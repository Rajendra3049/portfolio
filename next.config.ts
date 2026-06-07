import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90, 95],
    formats: ["image/avif", "image/webp"],
  },
  turbopack: {
    root: currentDirectory,
  },
};

export default nextConfig;
