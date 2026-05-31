import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  output: "standalone",
  transpilePackages: ["leaflet"],
  // Pin the file-tracing root to THIS project. A stray package-lock.json in a
  // parent dir (/data/projects) otherwise makes Next infer that as the workspace
  // root and nest the standalone output under .next/standalone/citypulse/, which
  // breaks the Dockerfile's `CMD ["node", "server.js"]` (server.js would not be
  // at /app). Pinning the root emits server.js directly at .next/standalone/.
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
