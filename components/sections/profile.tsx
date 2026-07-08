export interface DealerInfoItem {
  id: number;
  label: string;
  value: string | string[];
}

export const dealerInfo: DealerInfoItem[] = [
  {
    id: 1,
    label: "Alamat",
    value: "Jl. Gading Serpong Boulevard No.32 Blok O, Scientia Garden",
  },
  {
    id: 2,
    label: "Jam Operasional",
    value: "Senin–Minggu, 08.00–20.00 WIB",
  },
  {
    id: 3,
    label: "Layanan",
    value: ["Sales", "Test Drive", "Servis", "Suku Cadang"],
  },
  {
    id: 4,
    label: "Kontak",
    value: "(021) 2900-XXXX",
  },
];

export default function Profile() {
  return (
    <section id="profil" className="px-8 py-14 flex max-lg:flex-col gap-6 scroll-mt-28">
      <div className="bg-muted rounded-lg w-full max-lg:min-h-70" />
      <div className="space-y-3">
        <h3 className="text-xs sm:text-sm font-semibold">PROFIL CABANG</h3>
        <h2 className="text-xl sm:text-2xl font-bold">BYD Scientia Garden</h2>
        <p className="text-sm text-muted-foreground">
          Berlokasi strategis di kawasan Gading Serpong, cabang kami
          menghadirkan pengalaman showroom penuh dengan area display, ruang
          konsultasi, bengkel servis resmi, dan fasilitas pengisian daya untuk
          pelanggan di area Tangerang dan sekitarnya.
        </p>

        <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-3">
          {dealerInfo.map((info) => (
            <div
              key={info.id}
              className="space-y-2 border border-border p-3 rounded-lg transition-colors hover:border-primary/40"
            >
              <p className="text-sm text-muted-foreground">{info.label}</p>
              <p className="font-semibold text-sm">{info.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
