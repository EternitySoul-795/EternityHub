import type { NextConfig } from "next";
import path from "path";

// Deploys to Vercel: normal Next.js server runtime (no static export),
// so API routes (/api/chat, /api/contact) and next/image optimization work.
const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(process.cwd()),
  },
};

export default nextConfig;
