/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin the workspace root to this project (a stray lockfile in a parent dir
  // otherwise confuses Next's root inference / file tracing).
  outputFileTracingRoot: import.meta.dirname,
  // Produce a fully static site in ./out so it can be hosted anywhere
  // (GitHub Pages, S3, any static host) with no Node server required.
  output: "export",
  // Emit /about/index.html style routes that resolve cleanly on static hosts.
  trailingSlash: true,
  // next/image optimization needs a server; disable it for static export.
  images: { unoptimized: true },
};

export default nextConfig;
