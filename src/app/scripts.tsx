"use client";

import { useEffect } from "react";

/* Sırayla çalışması gereken betikler: gsap → ScrollTrigger → lenis → ana animasyon → arayüz */
const SOURCES = [
  "/vendor/gsap.min.js",
  "/vendor/ScrollTrigger.min.js",
  "/js/lenis.js",
  "/js/main.js",
  "/js/ui.js",
];

export default function Scripts() {
  useEffect(() => {
    const w = window as unknown as { __pineLoaded?: boolean };
    if (w.__pineLoaded) return;
    w.__pineLoaded = true;
    /* async=false: hepsi aynı anda indirilir, ama eklenme sırasıyla çalışır */
    for (const src of SOURCES) {
      const el = document.createElement("script");
      el.src = src;
      el.async = false;
      document.body.appendChild(el);
    }
  }, []);
  return null;
}
