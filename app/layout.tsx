import type { Metadata } from "next";
import { Spectral, Archivo, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/analytics/Analytics";
import { OrganizationJsonLd, SoftwareApplicationJsonLd } from "@/components/seo/JsonLd";

const spectral = Spectral({
  variable: "--font-spectral",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const SITE_URL = "https://citypulse-beta.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "CityPULSE · Civil Operating System for Resilient Cities",
    template: "%s · CityPulse",
  },
  description:
    "CityPULSE is an AI-powered civil operating system for resilient cities — infrastructure intelligence, a live digital twin, climate and environmental risk, and citizen 311 in one platform.",
  applicationName: "CityPULSE",
  keywords: [
    "civic infrastructure",
    "smart city platform",
    "digital twin",
    "311 reporting",
    "civil operating system",
    "infrastructure intelligence",
    "municipal software",
    "city operations",
    "climate risk",
    "asset management",
    "AI for government",
  ],
  authors: [{ name: "CityPULSE" }],
  creator: "CityPULSE",
  publisher: "CityPULSE",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "CityPULSE",
    title: "CityPULSE · Civil Operating System for Resilient Cities",
    description:
      "An AI-native operating system for cities: live digital twin, infrastructure intelligence, climate risk, and citizen 311 — in one platform.",
    url: SITE_URL,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "CityPULSE · Civil Operating System for Resilient Cities",
    description:
      "An AI-native operating system for cities: live digital twin, infrastructure intelligence, climate risk, and citizen 311.",
  },
  robots: {
    index: true,
    follow: true,
  },
  // Google Search Console — swap the placeholder for the real token later.
  verification: {
    google: "CITYPULSE_GSC_TOKEN",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spectral.variable} ${archivo.variable} ${ibmPlexMono.variable}`}>
        <OrganizationJsonLd />
        <SoftwareApplicationJsonLd />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
