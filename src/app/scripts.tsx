"use client";

import { useEffect } from "react";

const SOURCES = [
  "/vendor/gsap.min.js",
  "/vendor/ScrollTrigger.min.js",
  "/js/lenis.js",
  "/js/main.js",
  "/js/ui.js",
];

function load(src: string) {
  return new Promise<HTMLScriptElement>((resolve, reject) => {
    const el = document.createElement("script");
    el.src = src;
    el.onload = () => resolve(el);
    el.onerror = reject;
    document.body.appendChild(el);
  });
}

export default function Scripts() {
  useEffect(() => {
    const w = window as unknown as { __pineLoaded?: boolean };
    if (w.__pineLoaded) return;
    w.__pineLoaded = true;
    (async () => {
      for (const src of SOURCES) await load(src);
    })();
  }, []);
  return null;
}
