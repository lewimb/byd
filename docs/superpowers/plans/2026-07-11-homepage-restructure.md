# Homepage Restructure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reduce the homepage from 11 sections to 7 per the homepage scoring audit — merge `BookingSection` into `ConsultSection`, merge `Profile` into `MapSection`, relocate `CompanyHistory` + `SalesConsultantSection` to a new `/tentang-kami` page, update the nav to match.

**Architecture:** Four tasks, ordered so the repo type-checks and the homepage keeps rendering correctly after every single task — the two content merges (map, consult) and the new page land first as additive/self-contained changes, then one final integration task does the destructive part (removing old imports, deleting the two now-empty section files, updating the nav) with full end-to-end verification.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript (strict), Tailwind CSS 4, existing `components/ui/*` primitives (`Separator`, `buttonVariants`).

## Global Constraints

- No new components, no new libraries — every file below reuses existing primitives (`Separator`, `buttonVariants`, `SectionHeading`, `cn`).
- The WhatsApp CTA added to `ConsultSection` uses `href="#"` — matches every other WhatsApp/contact CTA already in this codebase (none have a real phone number wired). Do not invent one.
- `MapSection`'s `SHOWROOM` object (address/hours/phone/email) is the single source of that data after this plan — do not duplicate it elsewhere.
- `id="konsultasi"` and `id="lokasi"` must be preserved exactly on their respective sections — the financing calculator and promotions page CTAs link to `#konsultasi`; the nav's `Lokasi` link and any external links depend on `#lokasi`.
- `lib/footer.ts` is NOT modified by this plan — its existing `Tentang Kami → /tentang-kami` link starts resolving automatically once the route exists.
- The `Promo` nav item's dead `/#` link is NOT fixed by this plan — explicitly out of scope per the audit.
- No test framework exists in this repo — verification is `npx tsc --noEmit`, `npm run lint`, and manual/curl checks against a running dev server.

---

### Task 1: Merge Profile into MapSection

**Files:**
- Modify: `components/sections/map-section.tsx`

**Interfaces:**
- Produces: same default-exported `MapSection` component, no props, same `id="lokasi"`. No interface change — `dashboard.tsx` already imports this exact shape and needs no changes yet.

- [ ] **Step 1: Replace the full contents of `components/sections/map-section.tsx`**

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

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no output, exit code 0.

- [ ] **Step 3: Commit**

```bash
git add components/sections/map-section.tsx
git commit -m "feat: merge Profile content into MapSection"
```

Note: at this point `components/sections/profile.tsx` still exists and `dashboard.tsx` still renders it separately — that's expected transitional state, cleaned up in Task 4.

---

### Task 2: Merge BookingSection into ConsultSection

**Files:**
- Modify: `components/sections/consult.tsx`

**Interfaces:**
- Consumes: `Separator` from `@/components/ui/separator` (existing, no props needed beyond `className`), `buttonVariants` from `@/components/ui/button` (existing), `cn` from `@/lib/utils` (existing).
- Produces: same default-exported `ConsultSection` component, no props, same `id="konsultasi"`. No interface change.

- [ ] **Step 1: Replace the full contents of `components/sections/consult.tsx`**

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

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no output, exit code 0.

- [ ] **Step 3: Commit**

```bash
git add components/sections/consult.tsx
git commit -m "feat: merge BookingSection WhatsApp CTA into ConsultSection"
```

Note: at this point `components/sections/booking-section.tsx` still exists and `dashboard.tsx` still renders it separately — expected transitional state, cleaned up in Task 4.

---

### Task 3: New `/tentang-kami` page

**Files:**
- Create: `components/pages/tentang-kami.tsx`
- Create: `app/tentang-kami/page.tsx`

**Interfaces:**
- Consumes: `CompanyHistory` default export from `@/components/sections/history` (existing, no props), `SalesConsultantSection` default export from `@/components/sections/sales-consultant` (existing, no props), `SectionHeading` from `@/components/car-detail/section-heading` (existing, props `{ eyebrow, title, description?, align?, className? }`).
- Produces: default-exported `TentangKamiPage` component (no props) from `components/pages/tentang-kami.tsx`; the route itself has no exports other tasks depend on.

- [ ] **Step 1: Write `components/pages/tentang-kami.tsx`**

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

- [ ] **Step 2: Write `app/tentang-kami/page.tsx`**

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

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: no output, exit code 0.

- [ ] **Step 4: Start the dev server and verify the new route independently**

```bash
npm run dev &
```

Wait for `Ready`, note the actual port (Next.js may pick a port other than 3000), then:

```bash
curl -s http://localhost:PORT/tentang-kami
```

Confirm the response contains: `"BYD Scientia Garden"` (page heading), `"Perjalanan BYD"` (History section heading), `"Konsultasikan Kebutuhan Anda dengan Ahlinya"` (Sales Consultants heading). Stop the dev server cleanly afterward.

- [ ] **Step 5: Commit**

```bash
git add components/pages/tentang-kami.tsx app/tentang-kami/page.tsx
git commit -m "feat: add /tentang-kami page with History and Sales Consultants"
```

---

### Task 4: Final integration — reorder homepage, delete merged sections, update nav

**Files:**
- Modify: `components/pages/dashboard.tsx`
- Modify: `lib/nav-list.ts`
- Delete: `components/sections/booking-section.tsx`
- Delete: `components/sections/profile.tsx`

**Interfaces:**
- Consumes: `FinancingCalculatorSection` (existing), `CarTypeSection` (existing), `Testimony` (existing), `ConsultSection` (Task 2's version), `MapSection` (Task 1's version), `FAQ` (existing), `Hero` (existing) — all default exports, no props.

- [ ] **Step 1: Replace the full contents of `components/pages/dashboard.tsx`**

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

- [ ] **Step 2: Delete the two absorbed section files**

```bash
git rm components/sections/booking-section.tsx components/sections/profile.tsx
```

- [ ] **Step 3: Confirm nothing else references the deleted files**

```bash
grep -rn "sections/booking-section\|sections/profile" --include="*.tsx" --include="*.ts" .
```

Expected: no matches (the only prior reference was `dashboard.tsx`, already updated in Step 1).

- [ ] **Step 4: Replace the full contents of `lib/nav-list.ts`**

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

- [ ] **Step 5: Type-check**

Run: `npx tsc --noEmit`
Expected: no output, exit code 0.

- [ ] **Step 6: Lint**

Run: `npm run lint`
Expected: 0 errors. Warnings are only acceptable if pre-existing in files this plan doesn't touch (the known unused `Image` imports in `car-type.tsx`/`hero.tsx`).

- [ ] **Step 7: Start the dev server and run full end-to-end verification**

```bash
npm run dev &
```

Wait for `Ready`, note the actual port, then:

```bash
curl -s http://localhost:PORT/
```

Confirm on the homepage:
- Exactly 7 section-level headings appear, in this order: Hero's H1, "Temukan Tipe yang Tepat untuk Anda" (CarTypeSection), "Hitung Estimasi Cicilan Bulanan Anda" (FinancingCalculatorSection), "Kata pelanggan kami" (Testimony), "Punya pertanyaan? Konsultasi dengan tim kami" (ConsultSection), "BYD Scientia Garden" + "Kunjungi showroom kami" (MapSection, both headings from the merged section), "FAQ" (FAQ).
- `"Perjalanan BYD"` (History) does NOT appear on the homepage.
- `"Konsultasikan Kebutuhan Anda dengan Ahlinya"` (Sales Consultants) does NOT appear on the homepage.
- `id="konsultasi"` is present exactly once.
- `id="lokasi"` is present exactly once.
- `"Booking via WhatsApp"` appears exactly once (inside the merged consult section).
- The address string `"Jl. Gading Serpong Boulevard No.32 Blok O"` appears exactly once (confirming the Profile duplicate is gone, not that the whole string is duplicated elsewhere for unrelated reasons — grep the count).
- The services chips `"Sales"`, `"Test Drive"`, `"Servis"`, `"Suku Cadang"` all appear (from the merged MapSection).

```bash
curl -s http://localhost:PORT/tentang-kami
```

Confirm `"Perjalanan BYD"` and `"Konsultasikan Kebutuhan Anda dengan Ahlinya"` both appear here instead.

Stop the dev server cleanly when done.

- [ ] **Step 8: Note what could not be verified**

Record in the implementation report that live interaction (nav dropdown/menu behavior, WhatsApp button hover state, responsive stacking) could not be verified without a browser tool — expected, consistent with how the financing calculator and promotions page were verified earlier in this project. All content presence/absence and structural checks above were verified via curl against real server-rendered HTML, which is the substantive risk this task introduces (content correctly relocated, not duplicated, not lost).

- [ ] **Step 9: Commit**

```bash
git add components/pages/dashboard.tsx lib/nav-list.ts
git commit -m "feat: finalize homepage restructure — reorder sections, remove merged files, update nav"
```

(The `git rm` from Step 2 stages the deletions; include them in this commit or a preceding one — either is fine as long as the final state on this branch has both deletions and the `dashboard.tsx`/`nav-list.ts` changes together before the branch is considered complete.)

---

## Plan Self-Review Notes

- **Spec coverage:** `map-section.tsx` (Task 1) ↔ spec's Map/Profile merge section, verbatim. `consult.tsx` (Task 2) ↔ spec's Consult/Booking merge section, verbatim. `tentang-kami.tsx` + `app/tentang-kami/page.tsx` (Task 3) ↔ spec's new-page section, verbatim. `dashboard.tsx` + `nav-list.ts` + deletions (Task 4) ↔ spec's dashboard reorder, nav update, and "Files deleted" sections. Every curl check in Task 4's Step 7 maps directly to a bullet in the spec's Testing section.
- **No test framework introduced** — matches the spec and every prior plan executed in this codebase.
- **Sequencing avoids a broken intermediate state:** Tasks 1–3 are additive/self-contained (existing imports keep working, new route is independently reachable); Task 4 is the only task that removes imports and deletes files, and it does so atomically with the corresponding `dashboard.tsx` update in the same task — never leaves a dangling import.
- **Type consistency checked:** `MapSection`, `ConsultSection` keep identical default-export shape (no props) across all four tasks, so `dashboard.tsx`'s import statements never need to change for those two. `TentangKamiPage`'s default export in Task 3 matches exactly how Task 3's own route file imports it (no cross-task dependency issue, both steps are in the same task).
- **Global constraints confirmed absent from earlier tasks:** no edits to `lib/footer.ts` and no fix to `Promo`'s dead `/#` link appear anywhere in this plan, matching the explicit scope decision from the spec.
