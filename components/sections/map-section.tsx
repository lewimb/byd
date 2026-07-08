import { MapPin, Clock, Phone, Mail } from "lucide-react";

const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1852.879280969936!2d106.6148962750833!3d-6.269641906744446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69fd00628591f9%3A0xa11901ebc7950336!2sBYD%20ARISTA%20SUMMARECON%20SERPONG!5e0!3m2!1sid!2sid!4v1783395576681!5m2!1sid!2sid";

const SHOWROOM = {
  address:
    "Jl. Gading Serpong Boulevard No.32 Blok O, Medang, Pagedangan, Tangerang Regency, Banten 15334",
  hours: "Senin–Minggu · 08.00–20.00 WIB",
  phone: "(021) 2900-XXXX",
  email: "scientiagarden@byd-diler.co.id",
};

export default function MapSection() {
  return (
    <section
      id="lokasi"
      className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-center px-6 sm:px-8 py-12 bg-ink scroll-mt-28"
    >
      <iframe
        src={MAP_EMBED_URL}
        title="Lokasi showroom BYD Arista Summarecon Serpong"
        height="400"
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        className="rounded-lg w-full lg:col-span-3 border-0"
      />

      <div className="space-y-5 lg:col-span-2">
        <div className="space-y-2">
          <h3 className="uppercase text-xs sm:text-sm font-semibold tracking-widest text-accent-glow">
            Lokasi
          </h3>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Kunjungi showroom kami
          </h2>
        </div>

        <ul className="space-y-3 text-sm text-white">
          <li className="flex gap-3">
            <MapPin className="size-4 shrink-0 mt-0.5 " />
            <span>{SHOWROOM.address}</span>
          </li>
          <li className="flex gap-3">
            <Clock className="size-4 shrink-0 mt-0.5 " />
            <span>{SHOWROOM.hours}</span>
          </li>
          <li className="flex gap-3">
            <Phone className="size-4 shrink-0 mt-0.5 " />
            <a
              href={`tel:${SHOWROOM.phone.replace(/\D/g, "")}`}
              className="hover:text-white transition-colors"
            >
              {SHOWROOM.phone}
            </a>
          </li>
          <li className="flex gap-3">
            <Mail className="size-4 shrink-0 mt-0.5 text-white" />
            <a
              href={`mailto:${SHOWROOM.email}`}
              className="hover:text-white transition-colors"
            >
              {SHOWROOM.email}
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
