import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // allow-popups: los clics en anuncios de AdSense abren ventanas nuevas.
  { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
];

// Los archivos de /public no llevan hash en el nombre, así que no se marcan
// como immutable: 30 días + revalidación en segundo plano.
const staticAssetCache = {
  key: "Cache-Control",
  value: "public, max-age=2592000, stale-while-revalidate=86400",
};

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
    ],
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      { source: "/assets/:path*", headers: [staticAssetCache] },
      { source: "/fonts/:path*", headers: [staticAssetCache] },
      { source: "/og-image.jpg", headers: [staticAssetCache] },
    ];
  },
};

export default nextConfig;
