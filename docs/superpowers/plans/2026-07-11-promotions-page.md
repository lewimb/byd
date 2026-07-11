# Promotions Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a dedicated `/promo` route listing BYD dealer promotions, giving `lib/footer.ts`'s already-stubbed `/promo` link and the nav's dead `Promo` item somewhere real to go.

**Architecture:** A typed data module (`lib/data/promotions.ts`) feeds a server-component page (`components/pages/promotions.tsx`) that renders a header plus a grid of promotion cards, each with a terms-and-conditions accordion (reusing the existing `AccordionComponent`) and a CTA linking to the homepage's consult section. The route (`app/promo/page.tsx`) owns static SEO metadata and passes the data in as a prop, mirroring how `app/cars/[id]/page.tsx` passes `car` into `CarDetailPage`.

**Tech Stack:** Next.js 16 App Router (server components, static route), React 19, TypeScript (strict), Tailwind CSS 4, existing shadcn-style `components/ui/*` primitives (`Badge`, `Button`/`buttonVariants`, `Accordion`).

## Global Constraints

- No homepage teaser section and no `lib/nav-list.ts` fix in this plan — both explicitly deferred to separate follow-up work.
- Seed data is realistic placeholder content (4 promotions, Indonesian copy) — not real current offers.
- No client-side state beyond the existing `Accordion` primitive's own built-in expand/collapse — the whole page is a server component, no `"use client"` anywhere in these files.
- No test framework exists in this repo (confirmed repeatedly across prior work) — verification is `npx tsc --noEmit`, `npm run lint`, and manual/curl checks against a running dev server. Do not introduce a test runner.
- CTA on every promotion card links to `/#konsultasi` — the existing homepage consult-section anchor added during the financing-calculator work.
- `lib/types/accordion.ts`'s `AccordionTypes.content` field must be widened from `string` to `string | React.ReactNode` — backward compatible, required so promotion terms render as a real `<ul>` instead of flattened text. Existing FAQ data (`lib/accordion-items.ts`) must continue to compile and render unchanged after this change.
- Reuse existing primitives — do not build a new card, badge, or accordion component. `SectionHeading` (`components/car-detail/section-heading.tsx`), `Badge`, `buttonVariants`, and `AccordionComponent` (`components/components/shared/accordion.tsx`) are all reused as-is.

---

### Task 1: Data model — promotion type, seed data, and accordion type widening

**Files:**
- Create: `lib/types/promotion.ts`
- Create: `lib/data/promotions.ts`
- Modify: `lib/types/accordion.ts`

**Interfaces:**
- Produces: `interface Promotion { id: string; title: string; tagline: string; discountLabel: string; description: string; terms: string[]; validUntil: string; applicableModels: string[] }` (from `lib/types/promotion.ts`), `PROMOTIONS: Promotion[]` (from `lib/data/promotions.ts`, 4 entries), and the widened `AccordionTypes.content: string | ReactNode` (from `lib/types/accordion.ts`). Task 2 imports `Promotion` and consumes items shaped by `AccordionTypes` (via `AccordionComponent`); Task 3 imports `PROMOTIONS`.

- [ ] **Step 1: Write `lib/types/promotion.ts`**

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

- [ ] **Step 2: Widen `lib/types/accordion.ts`**

Change the file from:

```ts
export interface AccordionTypes {
  title: string;
  content: string;
  value: string;
}
```

to:

```ts
import type { ReactNode } from "react";

export interface AccordionTypes {
  title: string;
  content: string | ReactNode;
  value: string;
}
```

- [ ] **Step 3: Write `lib/data/promotions.ts`**

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

- [ ] **Step 4: Type-check**

Run: `npx tsc --noEmit`
Expected: no output, exit code 0. This also confirms `lib/accordion-items.ts`'s existing `content: string` entries still satisfy the widened `AccordionTypes.content: string | ReactNode` — no separate regression step needed at the type level.

- [ ] **Step 5: Commit**

```bash
git add lib/types/promotion.ts lib/types/accordion.ts lib/data/promotions.ts
git commit -m "feat: add promotion data model and seed promotions"
```

---

### Task 2: Promotions page component

**Files:**
- Create: `components/pages/promotions.tsx`

**Interfaces:**
- Consumes: `Promotion` from `@/lib/types/promotion` (Task 1), `SectionHeading` from `@/components/car-detail/section-heading` (existing, props `{ eyebrow, title, description?, align?, className? }`), `AccordionComponent` from `@/components/components/shared/accordion` (existing, props `{ className?, items: AccordionTypes[] }`), `Badge` from `@/components/ui/button`... **note:** `Badge` is from `@/components/ui/badge`, `buttonVariants` from `@/components/ui/button` — both existing, `cn` from `@/lib/utils`.
- Produces: default-exported `PromotionsPage({ promotions: Promotion[] })` component. Task 3 imports this and passes `PROMOTIONS`.

- [ ] **Step 1: Write `components/pages/promotions.tsx`**

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

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no output, exit code 0.

- [ ] **Step 3: Commit**

```bash
git add components/pages/promotions.tsx
git commit -m "feat: add promotions page component"
```

---

### Task 3: Route wiring and end-to-end verification

**Files:**
- Create: `app/promo/page.tsx`

**Interfaces:**
- Consumes: `PromotionsPage` default export from Task 2 (`@/components/pages/promotions`), `PROMOTIONS` from Task 1 (`@/lib/data/promotions`).

- [ ] **Step 1: Write `app/promo/page.tsx`**

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

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no output, exit code 0.

- [ ] **Step 3: Lint**

Run: `npm run lint`
Expected: 0 errors. Warnings are only acceptable if they pre-exist elsewhere in the codebase (e.g. the known unused `Image` imports in `car-type.tsx`/`hero.tsx`); nothing new from the files this plan touches.

- [ ] **Step 4: Start the dev server and verify with curl**

Start the dev server in the background, wait for it to be ready, then verify both the new route and the FAQ regression:

```bash
npm run dev &
```

Wait for `Ready` in the log / poll `curl -sf http://localhost:3000` until it succeeds, then:

```bash
curl -s http://localhost:3000/promo
```

Confirm the response body contains (adjust for whatever port Next.js actually bound if 3000 was taken):
- `"Promo BYD Scientia Garden"` (page heading)
- All 4 promotion titles: `"DP Ringan Mulai 10%"`, `"Home Charger Gratis"`, `"Bonus Trade-In hingga Rp15.000.000"`, `"Cicilan 0% Tenor 12 Bulan"`
- `"Syarat &amp; Ketentuan"` or `"Syarat & Ketentuan"` (accordion trigger text — HTML entity encoding may vary)
- `href="/#konsultasi"` (CTA target)
- `"31 Agustus 2026"`, `"30 September 2026"`, `"31 Juli 2026"` (expiry chips)

Then confirm the FAQ regression on the homepage:

```bash
curl -s http://localhost:3000/
```

Confirm the response still contains FAQ question text from `lib/accordion-items.ts`, e.g. `"Berapa lama garansi baterai BYD"` — proving the `AccordionTypes.content` widening in Task 1 didn't break the existing FAQ section.

Stop the dev server cleanly when done (kill the process).

- [ ] **Step 5: Note what curl cannot verify**

Record in the implementation report that live accordion expand/collapse interaction cannot be verified via curl (no browser tool available in a typical implementer environment) — this is expected and consistent with how prior features in this codebase (the financing calculator) were verified. The accordion component itself is pre-existing and already used in production by the FAQ section, so its interactive behavior is not new risk introduced by this plan.

- [ ] **Step 6: Commit**

```bash
git add app/promo/page.tsx
git commit -m "feat: wire up /promo route"
```

---

## Plan Self-Review Notes

- **Spec coverage:** `lib/types/promotion.ts` + `lib/data/promotions.ts` + `lib/types/accordion.ts` widening (Task 1) ↔ spec's "Data model" and "Why `lib/types/accordion.ts` needs to change" sections. `components/pages/promotions.tsx` (Task 2) ↔ spec's full component listing. `app/promo/page.tsx` + verification (Task 3) ↔ spec's route file and "Testing" section — every bullet in the spec's Testing section maps to a curl check or an explicit noted limitation in Task 3.
- **No test framework introduced** — matches the spec and every prior plan executed in this codebase this session.
- **Type consistency checked:** `Promotion` field names in Task 1 (`title`, `tagline`, `discountLabel`, `description`, `terms`, `validUntil`, `applicableModels`) match exactly what Task 2 destructures and renders. `AccordionTypes.content` widening in Task 1 matches the JSX (`<ul>...</ul>`) passed as `content` in Task 2. `PromotionsPage` prop shape (`{ promotions: Promotion[] }`) in Task 2 matches exactly how Task 3 calls it (`<PromotionsPage promotions={PROMOTIONS} />`).
- **Deferred scope confirmed absent from all three tasks:** no edits to `lib/nav-list.ts` and no new homepage teaser section appear anywhere in this plan, matching the explicit scope decision from brainstorming.
