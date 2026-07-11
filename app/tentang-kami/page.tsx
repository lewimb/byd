import type { Metadata } from "next";

import TentangKamiPage from "@/components/pages/tentang-kami";

export const metadata: Metadata = {
  title: "Tentang Kami — BYD Scientia Garden",
  description:
    "Dealer resmi BYD Scientia Garden di Tangerang — sejarah BYD dan tim sales consultant bersertifikat yang siap membantu Anda.",
};

export default function Page() {
  return <TentangKamiPage />;
}
