import type { Metadata } from "next";

import PromotionsPage from "@/components/pages/promotions";
import { PROMOTIONS } from "@/lib/data/promotions";

export const metadata: Metadata = {
  title: "Promo — BYD Scientia Garden",
  description:
    "Penawaran dan promo spesial pembelian BYD di Scientia Garden — DP ringan, home charger gratis, bonus trade-in, dan cicilan 0%.",
};

export default function Page() {
  return <PromotionsPage promotions={PROMOTIONS} />;
}
