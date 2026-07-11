import type { Promotion } from "@/lib/types/promotion";

export const PROMOTIONS: Promotion[] = [
  {
    id: "dp-ringan",
    title: "DP Ringan Mulai 20%",
    tagline: "Miliki BYD impian Anda dengan uang muka lebih ringan.",
    discountLabel: "DP mulai 20%",
    description:
      "Nikmati skema pembiayaan dengan uang muka mulai dari 10% untuk pembelian unit baru melalui mitra multifinance resmi kami.",
    terms: [
      "Berlaku untuk pembelian unit baru melalui skema kredit.",
      "Bekerja sama dengan multifinance rekanan resmi BYD Scientia Garden.",
      "Syarat dan ketentuan persetujuan kredit mengikuti kebijakan multifinance.",
      "Tidak dapat digabung dengan promo cicilan 0%.",
    ],
    validUntil: "31 Agustus 2026",
    applicableModels: ["Semua tipe BYD"],
  },
  {
    id: "home-charger-gratis",
    title: "Home Charger Gratis",
    tagline: "Isi daya di rumah tanpa biaya tambahan.",
    discountLabel: "Home charger + instalasi gratis",
    description:
      "Setiap pembelian unit BYD elektrik mendapatkan home charger beserta survei dan instalasi gratis di area jangkauan layanan kami.",
    terms: [
      "Berlaku untuk model BYD Battery Electric Vehicle (BEV).",
      "Instalasi gratis berlaku untuk radius maksimal 25 km dari showroom.",
      "Biaya tambahan di luar radius ditanggung pelanggan.",
      "Survei lokasi dilakukan oleh tim teknisi resmi BYD.",
    ],
    validUntil: "30 September 2026",
    applicableModels: [
      "BYD Dolphin",
      "BYD Atto 3",
      "BYD Seal",
      "BYD Sealion 7",
      "BYD Atto 1",
    ],
  },
  {
    id: "bonus-trade-in",
    title: "Bonus Trade-In hingga Rp15.000.000",
    tagline: "Tukar mobil lama Anda dengan bonus tambahan.",
    discountLabel: "Bonus hingga Rp15.000.000",
    description:
      "Tukar tambah mobil lama Anda dengan penilaian transparan dan dapatkan bonus tambahan di atas harga pasar untuk pembelian unit BYD baru.",
    terms: [
      "Bonus berlaku untuk kendaraan trade-in dengan STNK dan BPKB atas nama sendiri.",
      "Nilai bonus final ditentukan setelah inspeksi kendaraan di showroom.",
      "Berlaku untuk pembelian tunai maupun kredit.",
      "Tidak berlaku untuk kendaraan dengan status sengketa atau leasing aktif.",
    ],
    validUntil: "31 Agustus 2026",
    applicableModels: ["Semua tipe BYD"],
  },
  {
    id: "cicilan-0-persen",
    title: "Cicilan 0% Tenor 12 Bulan",
    tagline: "Cicilan ringan tanpa bunga selama satu tahun pertama.",
    discountLabel: "Bunga 0% untuk tenor 12 bulan",
    description:
      "Dapatkan program cicilan spesial bunga 0% untuk tenor 12 bulan melalui mitra multifinance pilihan, khusus periode promo ini.",
    terms: [
      "Berlaku untuk tenor 12 bulan melalui multifinance rekanan tertentu.",
      "Kuota unit terbatas setiap bulannya.",
      "Persetujuan kredit mengikuti hasil analisa multifinance.",
      "Tidak dapat digabung dengan promo DP ringan.",
    ],
    validUntil: "31 Juli 2026",
    applicableModels: ["Semua tipe BYD"],
  },
];
