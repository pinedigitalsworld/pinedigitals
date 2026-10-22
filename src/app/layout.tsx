import type { Metadata, Viewport } from "next";
import "./nesil.css";

export const metadata: Metadata = {
  title: "Pine Dijital Reklam Ajansı · Bolu",
  description: "Pine Dijital Reklam Ajansı, Bolu merkezli dijital reklam, web tasarım ve marka ajansı.",
  icons: { icon: "/favicon.svg", apple: "/apple-touch-icon.png" },
};

export const viewport: Viewport = { themeColor: "#545388" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
