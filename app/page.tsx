import Dashboard from "@/components/pages/dashboard";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { BUSINESS, SITE_NAME } from "@/lib/seo";

const TITLE =
  "BYD Scientia Garden — Dealer & Showroom Resmi BYD Tangerang, Gading Serpong";
const DESCRIPTION =
  "Dealer resmi BYD di Tangerang, Gading Serpong, Scientia Garden. Jelajahi BYD Dolphin, Atto 3, Seal, Sealion 7, M6 & Denza D9 — cek harga, jadwalkan test drive, dan konsultasi pembelian mobil listrik BYD terdekat di Tangerang.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    siteName: SITE_NAME,
    images: [
      { url: BUSINESS.ogImage, width: 1200, height: 630, alt: SITE_NAME },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [BUSINESS.ogImage],
  },
};

export default function Home() {
  const GA_ID = process.env.GOOGLE_ANALYTICS_ID;
  return (
    <>
      <Dashboard />;
      <GoogleAnalytics gaId={GA_ID ? GA_ID : ""} />
    </>
  );
}
