/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Containerizable build (Coolify / Docker): minimal standalone Node server.
  output: "standalone",
  // Image optimization: serves AVIF/WebP when the browser supports it.
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // The OG route reads its brand fonts from src/app/fonts via process.cwd().
  // The standalone tracer doesn't follow runtime fs reads, so force-include the
  // font files into the standalone output (otherwise the OG card crashes in prod).
  outputFileTracingIncludes: {
    "/api/og/[slug]": ["./src/app/fonts/*.ttf"],
    "/opengraph-image": ["./src/app/fonts/*.ttf"],
    "/twitter-image": ["./src/app/fonts/*.ttf"],
  },
};

export default nextConfig;
