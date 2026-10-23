import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Pine Dijital Reklam Ajansı",
    short_name: "Pine Dijital",
    lang: "tr",
    start_url: "/",
    display: "browser",
    background_color: "#19322E",
    theme_color: "#19322E",
    icons: [
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
