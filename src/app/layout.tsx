import type { Metadata, Viewport } from "next";
import { Big_Shoulders, Playfair_Display } from "next/font/google";
import "./nesil.css";

/* Türkçe karakterleri (ğ ş ı İ Ğ Ş) içeren latin-ext alt kümesiyle yüklenir */
const sans = Big_Shoulders({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});
const serif = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  variable: "--font-serif",
  weight: ["400", "500", "700"],
  display: "swap",
});

const SITE = "https://pinedigital.com.tr";
const TITLE = "Pine Dijital Reklam Ajansı · Bolu";
const DESCRIPTION =
  "Pine Dijital, Bolu merkezli dijital reklam ajansıdır. Web tasarım, sosyal medya yönetimi, prodüksiyon ve kurumsal kimlik işlerini tek çatı altında yapıyoruz.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: TITLE, template: "%s · Pine Dijital" },
  description: DESCRIPTION,
  applicationName: "Pine Dijital",
  keywords: [
    "Bolu dijital reklam ajansı",
    "Bolu web tasarım",
    "sosyal medya yönetimi",
    "kurumsal kimlik",
    "prodüksiyon",
    "Pine Dijital",
  ],
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.svg", apple: "/apple-touch-icon.png" },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: SITE,
    siteName: "Pine Dijital",
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "Pine Dijital logosu" }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: ["/opengraph-image.png"] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#19322E" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Pine Dijital Reklam Ajansı",
  url: SITE,
  logo: `${SITE}/logo.svg`,
  image: `${SITE}/opengraph-image.png`,
  email: "info@pinedigitals.com",
  description: DESCRIPTION,
  areaServed: "TR",
  address: { "@type": "PostalAddress", addressLocality: "Bolu", addressCountry: "TR" },
  sameAs: ["https://www.instagram.com/pinedigitals/"],
  knowsAbout: ["Web tasarım", "Sosyal medya yönetimi", "Prodüksiyon", "Kurumsal kimlik", "Grafik tasarım"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${sans.variable} ${serif.variable}`}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
