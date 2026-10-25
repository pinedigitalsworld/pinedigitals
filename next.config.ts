import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  async headers() {
    /* değişmeyen statik dosyalar tarayıcıda önbelleklenir; güncellemeler en geç bir gün içinde gelir */
    const cache = [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }];
    return [
      { source: "/:path*", headers: securityHeaders },
      ...["js", "vendor", "fonts", "work/img"].map(d => ({ source: `/${d}/:path*`, headers: cache })),
      ...["grain-light.png", "grain-dark.png"].map(f => ({ source: `/${f}`, headers: cache })),
    ];
  },
};

export default nextConfig;
