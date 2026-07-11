# Homepage Restructure — Design Spec

Date: 2026-07-11
Status: Approved

## Purpose

Implements the recommendation from the homepage scoring audit (Vol. III): reduce the homepage from 11 sections to 7, eliminate the two content duplications identified (address/hours/contact stated twice; test-drive booking asked twice), and relocate Company History + Sales Consultants to a new `/tentang-kami` page. No new sections, no new content — every existing section either stays, moves, or merges into a section that already covers overlapping ground.

## Scope

- Reorder `components/pages/dashboard.tsx` to 7 sections.
- Merge `BookingSection` into `ConsultSection` (WhatsApp shortcut below the form).
- Merge `Profile` into `MapSection` (facilities description + services chips above the existing map/address block).
- Delete `booking-section.tsx` and `profile.tsx` — content fully absorbed, nothing left orphaned.
- New `/tentang-kami` route housing `CompanyHistory` + `SalesConsultantSection`, both moved unmodified.
- Update `lib/nav-list.ts` to match the audit's navigation recommendation.

Out of scope: the `Promo` nav item's dead `/#` link (explicitly flagged in the audit as out of scope for this exercise), any change to `lib/footer.ts` (its `Tentang Kami → /tentang-kami` link already points at the route this spec creates — it simply starts resolving, no edit needed), the financing calculator, the `/promo` page, and any of the "Future Ideas" from the audit (gated calculator result, Google Reviews embed, sticky CTA bar, trade-in estimator) — none of those are implemented here.

## Files

| File | Change |
|---|---|
| `components/pages/dashboard.tsx` | Reorder to 7 sections, remove 4 imports |
| `components/sections/consult.tsx` | Add WhatsApp secondary CTA below the form |
| `components/sections/map-section.tsx` | Add facilities description + services chips above existing map/info grid |
| `components/sections/booking-section.tsx` | Delete |
| `components/sections/profile.tsx` | Delete |
| `components/pages/tentang-kami.tsx` | Create — new page component |
| `app/tentang-kami/page.tsx` | Create — new route |
| `lib/nav-list.ts` | Update to 4 nav entries |

No changes to `components/sections/history.tsx` or `components/sections/sales-consultant.tsx` themselves — both relocate as-is, imported from their new page instead of `dashboard.tsx`.

## `components/pages/dashboard.tsx`

```tsx
import FAQ from "../sections/faq";
import Hero from "../sections/hero";
import Testimony from "../sections/testimony";
import CarTypeSection from "../sections/car-type";
import ConsultSection from "../sections/consult";
import MapSection from "../sections/map-section";
import FinancingCalculatorSection from "../sections/financing-calculator";

export default function Dashboard() {
  return (
    <>
      <div className="relative z-10">
        <Hero />
        <CarTypeSection />
        <FinancingCalculatorSection />
        <Testimony />
        <ConsultSection />
        <MapSection />
        <FAQ />
      </div>
    </>
  );
}
```

## `components/sections/consult.tsx`

Adds a `Separator` (existing primitive, `components/ui/separator.tsx`, not previously used anywhere in this codebase) and a WhatsApp outline button below the form, inside the same card. The button uses `href="#"`, consistent with every other WhatsApp/contact CTA already in this codebase (`hero.tsx`, `car-hero.tsx`, `bottom-cta.tsx`, the deleted `booking-section.tsx` had none either) — none have a real phone number wired yet; inventing one here would be fabricating business data, not this spec's job.

```tsx
import ConsultForm from "@/components/components/shared/consult-form";
import { Separator } from "@/components/ui/separator";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ConsultSection() {
  return (
    <section
      id="konsultasi"
      className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start px-6 sm:px-8 py-16 sm:py-20 scroll-mt-28"
    >
      <div className="space-y-3 lg:col-span-2">
        <h3 className="uppercase text-xs sm:text-sm font-semibold tracking-widest text-primary">
          Konsultasi
        </h3>
        <h2 className="text-xl sm:text-2xl font-bold">
          Punya pertanyaan? Konsultasi dengan tim kami
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Isi formulir berikut dan tim sales kami akan menghubungi Anda untuk
          membantu memilih tipe BYD yang tepat, atau menjadwalkan test drive
          langsung di showroom.
        </p>
      </div>

      <div className="lg:col-span-3 rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-6">
        <ConsultForm />

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground">Atau</span>
            <Separator className="flex-1" />
          </div>
          <a
            href="#"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "w-full text-md py-5.5",
            )}
          >
            Booking via WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
```

Note: `id="konsultasi"` and `scroll-mt-28` already exist on this section (added during the financing-calculator work) — unchanged here, just shown for context. The `#konsultasi` anchor used by the financing calculator's and promotions page's CTAs continues to work unmodified.

## `components/sections/map-section.tsx`

`SHOWROOM` (address/hours/phone/email) is untouched and remains the single source of that data. New top block adds Profile's facilities description (moved verbatim) and a services chip row (from Profile's `dealerInfo` "Layanan" entry). Profile's duplicate Alamat/Jam Operasional/Kontak fields are dropped — `MapSection`'s own `SHOWROOM` already states them.

```tsx
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

const SERVICES = ["Sales", "Test Drive", "Servis", "Suku Cadang"];

export default function MapSection() {
  return (
    <section
      id="lokasi"
      className="space-y-8 px-6 sm:px-8 py-12 bg-ink text-ink-foreground scroll-mt-28"
    >
      <div className="space-y-3 max-w-2xl">
        <h3 className="uppercase text-xs sm:text-sm font-semibold tracking-widest text-accent-glow">
          Profil Cabang
        </h3>
        <h2 className="text-xl sm:text-2xl font-bold">BYD Scientia Garden</h2>
        <p className="text-sm text-ink-muted leading-relaxed">
          Berlokasi strategis di kawasan Gading Serpong, cabang kami
          menghadirkan pengalaman showroom penuh dengan area display, ruang
          konsultasi, bengkel servis resmi, dan fasilitas pengisian daya
          untuk pelanggan di area Tangerang dan sekitarnya.
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          {SERVICES.map((service) => (
            <span
              key={service}
              className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium"
            >
              {service}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-center">
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
            <h2 className="text-xl sm:text-2xl font-bold text-ink-foreground">
              Kunjungi showroom kami
            </h2>
          </div>

          <ul className="space-y-3 text-sm text-ink-foreground">
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
                className="hover:text-accent-glow transition-colors"
              >
                {SHOWROOM.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="size-4 shrink-0 mt-0.5 text-ink-foreground" />
              <a
                href={`mailto:${SHOWROOM.email}`}
                className="hover:text-accent-glow transition-colors"
              >
                {SHOWROOM.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
```

Both blocks share `id="lokasi"` as one section (not two), so `/#lokasi` from the nav still resolves to the top of the merged content. Two distinct eyebrow labels ("Profil Cabang" for the new top block, "Lokasi" for the original map/info block) keep the two pieces of content visually distinguishable within the one merged section, rather than implying they were always one block.

## `components/pages/tentang-kami.tsx`

```tsx
import CompanyHistory from "@/components/sections/history";
import SalesConsultantSection from "@/components/sections/sales-consultant";
import SectionHeading from "@/components/car-detail/section-heading";

export default function TentangKamiPage() {
  return (
    <article>
      <div className="px-6 sm:px-8 pt-16 sm:pt-20 pb-6">
        <SectionHeading
          eyebrow="Tentang Kami"
          title="BYD Scientia Garden"
          description="Dealer resmi BYD yang melayani Tangerang dan sekitarnya — kenali perjalanan kami dan tim yang siap membantu Anda."
          align="center"
          className="mx-auto"
        />
      </div>
      <CompanyHistory />
      <SalesConsultantSection />
    </article>
  );
}
```

`SectionHeading` is the same reusable primitive already used by `components/pages/promotions.tsx` — no new component created. `CompanyHistory` and `SalesConsultantSection` render exactly as they do today; only their import source changes (from `dashboard.tsx` to this new page).

## `app/tentang-kami/page.tsx`

```tsx
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
```

## `lib/nav-list.ts`

Replaces the current 7-entry list (`Sejarah`, `Profil`, `Mobil`, `Promo`, `Testimoni`, `FAQ`, `Lokasi`) with 4, per the audit's navigation recommendation. `Sejarah`/`Profil` collapse into the one new `Tentang Kami` destination; `Testimoni`/`FAQ` drop from top nav (their sections keep their existing `id`s — `testimoni`, `faq` — so any other in-page link to them still works, they just no longer get a primary nav slot). `Promo`'s dead `/#` link is left exactly as-is — explicitly out of scope per the audit.

```ts
export const NAVLIST = [
  {
    title: "Mobil",
    url: "/#mobil",
  },
  {
    title: "Promo",
    url: "/#",
  },
  {
    title: "Tentang Kami",
    url: "/tentang-kami",
  },
  {
    title: "Lokasi",
    url: "/#lokasi",
  },
];
```

## Files deleted

- `components/sections/booking-section.tsx` — content (WhatsApp CTA) fully absorbed into `consult.tsx`.
- `components/sections/profile.tsx` — content (description + services) fully absorbed into `map-section.tsx`; duplicate address/hours/contact fields dropped, not relocated (already stated in `map-section.tsx`'s `SHOWROOM`).

## Data flow

```
components/pages/dashboard.tsx  (7 sections, reordered)
  ├─ Hero
  ├─ CarTypeSection            (unchanged)
  ├─ FinancingCalculatorSection (unchanged)
  ├─ Testimony                 (unchanged)
  ├─ ConsultSection            (+ WhatsApp CTA, absorbs BookingSection)
  ├─ MapSection                (+ description/services, absorbs Profile)
  └─ FAQ                       (unchanged)

app/tentang-kami/page.tsx  (new route)
  └─ components/pages/tentang-kami.tsx
       ├─ SectionHeading (page intro)
       ├─ CompanyHistory  (unchanged, relocated)
       └─ SalesConsultantSection (unchanged, relocated)

lib/nav-list.ts → components/sections/header.tsx (consumes NAVLIST, unchanged itself)
lib/footer.ts → "Tentang Kami" link (unchanged file, now resolves to a real page)
```

## Testing

No test infrastructure exists in this repo (confirmed repeatedly throughout this project's history). Verification is `npx tsc --noEmit`, `npm run lint`, and manual/curl checks against a running dev server:

- `tsc --noEmit` and `npm run lint` clean (0 errors; the 2 pre-existing `Image`-unused warnings in `car-type.tsx`/`hero.tsx` are the only acceptable output).
- `curl http://localhost:PORT/` — confirm exactly 7 section-level headings appear in the expected order (Hero's H1, then CarTypeSection's "Temukan Tipe yang Tepat...", FinancingCalculatorSection's "Hitung Estimasi...", Testimony's "Kata pelanggan kami", ConsultSection's "Punya pertanyaan?...", MapSection's new "BYD Scientia Garden" + "Kunjungi showroom kami", FAQ's "FAQ") — and confirm neither "Perjalanan BYD" (History) nor "Konsultasikan Kebutuhan Anda dengan Ahlinya" (Sales Consultants) appear on the homepage anymore.
- `curl http://localhost:PORT/` — confirm `id="konsultasi"` still present (financing calculator + promo page CTAs depend on it), confirm "Booking via WhatsApp" text now appears inside the consult section's HTML.
- `curl http://localhost:PORT/` — confirm `id="lokasi"` still present, confirm the services chips ("Sales", "Test Drive", "Servis", "Suku Cadang") and the facilities description text both appear within it, confirm the address/hours/phone/email each appear exactly once on the page (not twice).
- `curl http://localhost:PORT/tentang-kami` — confirm "BYD Scientia Garden" page heading, "Perjalanan BYD" (History), and "Konsultasikan Kebutuhan Anda dengan Ahlinya" (Sales Consultants) all present.
- Confirm `git status` shows `booking-section.tsx` and `profile.tsx` deleted, with no remaining `grep` hits importing either from anywhere in the codebase.
- Visual/responsive check noted as a known limitation if no browser tool is available in the implementation environment — consistent with how the financing calculator and promotions page were verified earlier in this project.
