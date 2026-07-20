import type { Metadata } from "next";

import PromotionsPage from "@/components/pages/promotions";
import { PROMOTIONS } from "@/lib/data/promotions";
import { BUSINESS } from "@/lib/seo";

const TITLE = "Promo BYD Tangerang";
const DESCRIPTION =
  "Promo dan penawaran spesial pembelian BYD di Tangerang, Scientia Garden — DP ringan, home charger gratis, bonus trade-in, dan cicilan 0%.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "promo BYD Tangerang",
    "diskon BYD Tangerang",
    "cicilan BYD Tangerang",
    "DP ringan BYD",
  ],
  alternates: {
    canonical: "/promo",
  },
  openGraph: {
    title: `${TITLE} — BYD Scientia Garden`,
    description: DESCRIPTION,
    url: "/promo",
    images: [{ url: BUSINESS.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} — BYD Scientia Garden`,
    description: DESCRIPTION,
    images: [BUSINESS.ogImage],
  },
};

export default function Page() {
  return <PromotionsPage promotions={PROMOTIONS} />;
}
