import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    DATABASE_URL: process.env.DATABASE_URL || "file:/var/task/prisma/dev.db",
  },
};

export default nextConfig;
