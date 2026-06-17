import { createMDX } from "fumadocs-mdx/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Build conteneurisable (Coolify / Docker) : serveur Node minimal autonome.
  output: "standalone",
};

const withMDX = createMDX();

export default withMDX(nextConfig);
