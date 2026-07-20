import type { Metadata } from "next";

import TentangKamiPage from "@/components/pages/tentang-kami";
import { BUSINESS } from "@/lib/seo";

const TITLE = "Tentang Kami";
const DESCRIPTION =
  "Dealer resmi BYD di Tangerang, Scientia Garden — sejarah BYD dan tim sales consultant bersertifikat yang siap membantu Anda memilih mobil listrik BYD.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "dealer resmi BYD Tangerang",
    "sales consultant BYD Tangerang",
    "showroom BYD Scientia Garden",
  ],
  alternates: {
    canonical: "/tentang-kami",
  },
  openGraph: {
    title: `${TITLE} — BYD Scientia Garden`,
    description: DESCRIPTION,
    url: "/tentang-kami",
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
  return <TentangKamiPage />;
}
