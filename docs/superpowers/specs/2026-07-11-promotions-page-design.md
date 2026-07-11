# Promotions Page — Design Spec

Date: 2026-07-11
Status: Approved

## Purpose

A dedicated `/promo` page listing active BYD dealer promotions, per the IA audit's Category B/C split (homepage teaser deferred to a separate task; this spec covers the full page only). Currently `lib/footer.ts:45-47` already links to `/promo` and the top nav's "Promo" item points at a dead `/#` — this page gives that link somewhere real to go, and gives the site a URL that can rank for seasonal "promo BYD" search intent.

## Scope

- New route `/promo` only.
- No homepage teaser section, no nav-list fix — both explicitly deferred to separate follow-up work per user decision during brainstorming.
- Seed data is realistic placeholder content (4 promotions), not real current offers — swappable later.
- No client-side state beyond the existing `Accordion` primitive's own built-in expand/collapse (which needs no "use client" wrapper beyond what `components/ui/accordion.tsx` already provides). The whole page is a server component.

Out of scope: per-promotion detail pages, promo code / coupon input, filtering/sorting, cross-linking to specific vehicle detail pages by id.

## Files

| File | Purpose |
|---|---|
| `lib/types/promotion.ts` | `Promotion` interface |
| `lib/data/promotions.ts` | `PROMOTIONS: Promotion[]` — 4 seed promotions |
| `components/pages/promotions.tsx` | Page component: header + card grid |
| `app/promo/page.tsx` | Route, static `metadata`, passes `PROMOTIONS` in as a prop |

Existing file touched:

| File | Change |
|---|---|
| `lib/types/accordion.ts` | Widen `AccordionTypes.content` from `string` to `string \| React.ReactNode` |

### Why `lib/types/accordion.ts` needs to change

The existing `AccordionComponent` (`components/components/shared/accordion.tsx`) is the established pattern for "click to see more" disclosure — already used by FAQ, and exactly what the IA audit calls for on promotion terms. But `AccordionTypes.content` is typed as plain `string`, and each promotion's terms are a `string[]` that should render as a bullet list, not a flattened sentence. Widening the field to `string | React.ReactNode` is backward compatible (FAQ's existing `content: string` entries in `lib/accordion-items.ts` still satisfy the wider type unchanged) and lets this page pass real JSX (a `<ul>`) instead of working around the type with string concatenation. This is a minimal, compatible widening of a shared type to fit a need the type was simply too narrow for — not a redesign of the accordion.

## `lib/types/promotion.ts`

```ts
export interface Promotion {
  id: string;
  title: string;
  tagline: string;
  /** Headline offer, e.g. "DP mulai 10%" */
  discountLabel: string;
  description: string;
  /** Bullet points rendered inside the terms accordion */
  terms: string[];
  /** Display-ready date string, e.g. "31 Agustus 2026" */
  validUntil: string;
  /** e.g. ["Semua tipe BYD"] or specific model names */
  applicableModels: string[];
}
```

## `lib/types/accordion.ts` (modified)

```ts
import type { ReactNode } from "react";

export interface AccordionTypes {
  title: string;
  content: string | ReactNode;
  value: string;
}
```

## `lib/data/promotions.ts`

```ts
import type { Promotion } from "@/lib/types/promotion";

export const PROMOTIONS: Promotion[] = [
  {
    id: "dp-ringan",
    title: "DP Ringan Mulai 10%",
    tagline: "Miliki BYD impian Anda dengan uang muka lebih ringan.",
    discountLabel: "DP mulai 10%",
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
```

## `components/pages/promotions.tsx`

```tsx
import Link from "next/link";
import { CalendarClock, Tag } from "lucide-react";

import SectionHeading from "@/components/car-detail/section-heading";
import AccordionComponent from "@/components/components/shared/accordion";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Promotion } from "@/lib/types/promotion";

interface PromotionsPageProps {
  promotions: Promotion[];
}

export default function PromotionsPage({ promotions }: PromotionsPageProps) {
  return (
    <article className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-10">
      <SectionHeading
        eyebrow="Promo"
        title="Promo BYD Scientia Garden"
        description="Penawaran spesial untuk mempermudah Anda beralih ke kendaraan listrik BYD. Klaim promo sebelum periode berakhir."
        align="center"
        className="mx-auto"
      />

      <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2">
        {promotions.map((promo) => (
          <div
            key={promo.id}
            className="flex flex-col space-y-4 rounded-2xl border border-border p-6"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <h3 className="text-lg font-bold">{promo.title}</h3>
                <p className="text-sm text-muted-foreground">{promo.tagline}</p>
              </div>
              <Badge variant="outline" className="shrink-0 gap-1">
                <CalendarClock className="size-3" />
                {promo.validUntil}
              </Badge>
            </div>

            <div className="flex items-center gap-2.5">
              <Tag className="size-4 shrink-0 text-primary" />
              <p className="text-base font-bold">{promo.discountLabel}</p>
            </div>

            <p className="text-sm text-muted-foreground">{promo.description}</p>

            <p className="text-xs text-muted-foreground">
              Berlaku untuk: {promo.applicableModels.join(", ")}
            </p>

            <AccordionComponent
              items={[
                {
                  value: `${promo.id}-terms`,
                  title: "Syarat & Ketentuan",
                  content: (
                    <ul className="list-disc space-y-1 pl-4">
                      {promo.terms.map((term) => (
                        <li key={term}>{term}</li>
                      ))}
                    </ul>
                  ),
                },
              ]}
            />

            <Link
              href="/#konsultasi"
              className={cn(buttonVariants({ size: "lg" }), "mt-auto w-full text-md py-5.5")}
            >
              Klaim Promo
            </Link>
          </div>
        ))}
      </div>
    </article>
  );
}
```

## `app/promo/page.tsx`

```tsx
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
```

## Data flow

```
PROMOTIONS (lib/data/promotions.ts)
  ↓
app/promo/page.tsx (server component, static route)
  ↓ passes as `promotions` prop
components/pages/promotions.tsx
  ↓ maps each Promotion to a card
  → SectionHeading (page header)
  → Badge (expiry chip)
  → AccordionComponent (terms disclosure, reused from FAQ's pattern)
  → Link → buttonVariants (CTA to /#konsultasi, cross-page anchor to the existing homepage consult section)
```

No client state, no fetches — everything resolves at build/render time from the static array, same as the existing car-detail route's `getCarDetailById` pattern but without the per-id lookup (this page always renders the full list).

## Testing

No test infrastructure exists in this repo (confirmed in the original codebase analysis and in every prior feature built this session). Verification is manual via dev server:

- `npx tsc --noEmit` clean after all files are in place.
- Visit `/promo` — confirm 4 promotion cards render with title, tagline, discount label, expiry badge, applicable models, and a collapsed "Syarat & Ketentuan" accordion per card.
- Click each card's accordion trigger — confirm it expands to show the bullet list of terms and collapses again on a second click.
- Click "Klaim Promo" on any card — confirm it navigates to `/` and lands scrolled to the consult form (`#konsultasi`, the same anchor the financing calculator's CTA already uses).
- Confirm `lib/accordion-items.ts`'s existing FAQ data still type-checks and renders unchanged on the homepage FAQ section (regression check for the `AccordionTypes.content` widening).
- Responsive check: single column on mobile, two columns at `sm:` and above.
