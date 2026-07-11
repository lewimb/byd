# Financing Calculator Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a homepage financing calculator section that lets a visitor pick a BYD model, adjust down payment and tenor, and see a live estimated monthly installment, with a CTA into the existing consult form.

**Architecture:** A pure calculation module (`lib/car-finance.ts`) computes the estimate from a flat-rate formula. A new `Slider` UI primitive wraps `@base-ui/react/slider` following the existing `components/ui/*` pattern. A client component (`components/sections/financing-calculator.tsx`) holds local state (selected car, DP%, tenor) and renders inputs + a live result card, inserted into the homepage between the vehicle-type section and testimonials.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript (strict), Tailwind CSS 4, `@base-ui/react` (already a dependency), `class-variance-authority` via existing `buttonVariants`.

## Global Constraints

- No lead-capture gate in v1 — result displays live as inputs change (per approved spec).
- Homepage only — not embedded on vehicle detail pages in v1.
- Flat rate: `FLAT_RATE_ANNUAL = 0.045` (4.5%/year flat, Indonesian car-loan convention), clearly labeled as an estimate — this is a placeholder until a real financing-partner rate exists.
- DP range: 10–50%, step 5. Tenor options: 1, 2, 3, 4, 5 years.
- Car picker: native `<select>` — no new Select primitive (6 items doesn't justify one).
- No test framework exists in this repo (confirmed: no test files, no jest/vitest/playwright in `package.json`). Verification is `npx tsc --noEmit` for type correctness plus manual dev-server checks — do not introduce a test runner as part of this work.
- Price source: `getStartingPrice()` from `lib/car-price.ts` (already used in `components/sections/car-type.tsx`) — reuse, do not reimplement.
- CTA links to `#konsultasi`, which requires adding that `id` to the existing `ConsultSection`.

---

### Task 1: Calculation module

**Files:**
- Create: `lib/car-finance.ts`

**Interfaces:**
- Produces: `FLAT_RATE_ANNUAL: number`, `DP_MIN_PERCENT: number`, `DP_MAX_PERCENT: number`, `DP_STEP_PERCENT: number`, `TENOR_OPTIONS_YEARS: readonly [1, 2, 3, 4, 5]`, `interface InstallmentInput { otrPrice: number; dpPercent: number; tenorYears: number }`, `interface InstallmentEstimate { dpAmount: number; principal: number; totalInterest: number; totalPayable: number; monthlyInstallment: number }`, `function calculateInstallment(input: InstallmentInput): InstallmentEstimate`. Task 3 imports all of these.

- [ ] **Step 1: Hand-verify the formula before transcribing it into TypeScript**

Run this to confirm the flat-rate math for a known case (BYD Sealion 7, starting price Rp635,500,000 — the `includeHomeChargingWithKwhMeter` variant price that `getStartingPrice`/`resolvePrice` in `lib/car-price.ts` actually selects as the minimum across variants — at 20% DP, 3-year tenor):

```bash
node -e "
const otrPrice = 635500000, dpPercent = 20, tenorYears = 3, FLAT_RATE_ANNUAL = 0.045;
const dpAmount = otrPrice * (dpPercent / 100);
const principal = otrPrice - dpAmount;
const totalInterest = principal * FLAT_RATE_ANNUAL * tenorYears;
const totalPayable = principal + totalInterest;
const monthlyInstallment = totalPayable / (tenorYears * 12);
console.log({ dpAmount, principal, totalInterest, totalPayable, monthlyInstallment });
"
```

Expected output:
```
{
  dpAmount: 127100000,
  principal: 508400000,
  totalInterest: 68634000,
  totalPayable: 577034000,
  monthlyInstallment: 16028722.222222222
}
```

Keep these numbers — Task 4's final manual check confirms the running UI matches them (rounded to whole Rupiah).

- [ ] **Step 2: Write `lib/car-finance.ts`**

```ts
export const FLAT_RATE_ANNUAL = 0.045; // 4.5%/year flat — placeholder, swap for real partner rate when available
export const DP_MIN_PERCENT = 10;
export const DP_MAX_PERCENT = 50;
export const DP_STEP_PERCENT = 5;
export const TENOR_OPTIONS_YEARS = [1, 2, 3, 4, 5] as const;

export interface InstallmentInput {
  otrPrice: number;
  /** 10–50, matches DP_MIN_PERCENT..DP_MAX_PERCENT */
  dpPercent: number;
  /** one of TENOR_OPTIONS_YEARS */
  tenorYears: number;
}

export interface InstallmentEstimate {
  dpAmount: number;
  principal: number;
  totalInterest: number;
  totalPayable: number;
  monthlyInstallment: number;
}

export function calculateInstallment(input: InstallmentInput): InstallmentEstimate {
  const dpAmount = input.otrPrice * (input.dpPercent / 100);
  const principal = input.otrPrice - dpAmount;
  const totalInterest = principal * FLAT_RATE_ANNUAL * input.tenorYears;
  const totalPayable = principal + totalInterest;
  const monthlyInstallment = totalPayable / (input.tenorYears * 12);

  return { dpAmount, principal, totalInterest, totalPayable, monthlyInstallment };
}
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: no output, exit code 0.

- [ ] **Step 4: Commit**

```bash
git add lib/car-finance.ts
git commit -m "feat: add financing calculator flat-rate calculation module"
```

---

### Task 2: `Slider` UI primitive

**Files:**
- Create: `components/ui/slider.tsx`

**Interfaces:**
- Consumes: `@base-ui/react/slider` (`Slider.Root`, `Slider.Control`, `Slider.Track`, `Slider.Indicator`, `Slider.Thumb` — already an installed dependency), `cn` from `@/lib/utils`.
- Produces: `Slider` component with props `{ id?, min, max, step, value: number, onValueChange: (value: number) => void, className? }` (typed via `SliderPrimitive.Root.Props<number>`, matching the single-thumb usage in Task 3). Task 3 imports `Slider` from `@/components/ui/slider`.

- [ ] **Step 1: Write `components/ui/slider.tsx`**

Follows the same wrap-and-style pattern as `components/ui/checkbox.tsx` (which wraps `@base-ui/react/checkbox` the same way):

```tsx
"use client"

import { Slider as SliderPrimitive } from "@base-ui/react/slider"

import { cn } from "@/lib/utils"

function Slider({ className, ...props }: SliderPrimitive.Root.Props<number>) {
  return (
    <SliderPrimitive.Root
      data-slot="slider"
      className={cn("relative flex w-full touch-none items-center select-none", className)}
      {...props}
    >
      <SliderPrimitive.Control className="flex w-full items-center py-2">
        <SliderPrimitive.Track className="relative h-1.5 w-full grow rounded-full bg-muted">
          <SliderPrimitive.Indicator
            data-slot="slider-indicator"
            className="absolute h-full rounded-full bg-primary"
          />
          <SliderPrimitive.Thumb
            data-slot="slider-thumb"
            className="block size-4 rounded-full border border-primary bg-background shadow transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50"
          />
        </SliderPrimitive.Track>
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  )
}

export { Slider }
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no output, exit code 0.

- [ ] **Step 3: Commit**

```bash
git add components/ui/slider.tsx
git commit -m "feat: add Slider UI primitive wrapping @base-ui/react/slider"
```

---

### Task 3: Financing calculator section component

**Files:**
- Create: `components/sections/financing-calculator.tsx`

**Interfaces:**
- Consumes: `carDetails` from `@/lib/data/car-details` (array of `CarDetail`, each with `.id: string`, `.name: string`), `getStartingPrice`, `formatIDR` from `@/lib/car-price`, `FLAT_RATE_ANNUAL` (not directly used here but re-exported context), `DP_MIN_PERCENT`, `DP_MAX_PERCENT`, `DP_STEP_PERCENT`, `TENOR_OPTIONS_YEARS`, `calculateInstallment` from `@/lib/car-finance` (Task 1), `Slider` from `@/components/ui/slider` (Task 2), `Button`/`buttonVariants` from `@/components/ui/button`, `cn` from `@/lib/utils`.
- Produces: default-exported `FinancingCalculatorSection` component, no props. Task 4 imports it into `components/pages/dashboard.tsx`.

- [ ] **Step 1: Write `components/sections/financing-calculator.tsx`**

```tsx
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { carDetails } from "@/lib/data/car-details";
import { formatIDR, getStartingPrice } from "@/lib/car-price";
import {
  DP_MAX_PERCENT,
  DP_MIN_PERCENT,
  DP_STEP_PERCENT,
  TENOR_OPTIONS_YEARS,
  calculateInstallment,
} from "@/lib/car-finance";
import { cn } from "@/lib/utils";

export default function FinancingCalculatorSection() {
  const [selectedCarId, setSelectedCarId] = useState(carDetails[0]!.id);
  const [dpPercent, setDpPercent] = useState(20);
  const [tenorYears, setTenorYears] = useState(3);

  const selectedCar =
    carDetails.find((car) => car.id === selectedCarId) ?? carDetails[0]!;
  const otrPrice = getStartingPrice(selectedCar);

  const estimate = useMemo(() => {
    if (otrPrice == null) return undefined;
    return calculateInstallment({ otrPrice, dpPercent, tenorYears });
  }, [otrPrice, dpPercent, tenorYears]);

  return (
    <section id="simulasi" className="p-6 sm:p-10 lg:p-16 scroll-mt-28">
      <div className="max-w-2xl mb-8 sm:mb-12">
        <h3 className="text-xs sm:text-sm font-semibold tracking-widest text-primary uppercase">
          Simulasi Cicilan
        </h3>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2">
          Hitung Estimasi Cicilan Bulanan Anda
        </h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        <div className="space-y-8">
          <div className="space-y-2">
            <label htmlFor="calculator-car" className="text-sm font-medium">
              Pilih Tipe Mobil
            </label>
            <select
              id="calculator-car"
              value={selectedCarId}
              onChange={(event) => setSelectedCarId(event.target.value)}
              className="h-10 w-full rounded-lg border border-input bg-transparent px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {carDetails.map((car) => (
                <option key={car.id} value={car.id}>
                  {car.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-3">
            <div className="flex items-baseline justify-between">
              <p className="text-sm font-medium">Uang Muka (DP)</p>
              <span className="text-sm text-muted-foreground">
                {dpPercent}%
                {otrPrice != null && (
                  <span className="ml-2 font-semibold text-foreground">
                    {formatIDR(otrPrice * (dpPercent / 100))}
                  </span>
                )}
              </span>
            </div>
            <Slider
              min={DP_MIN_PERCENT}
              max={DP_MAX_PERCENT}
              step={DP_STEP_PERCENT}
              value={dpPercent}
              onValueChange={(value) => setDpPercent(value)}
            />
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium">Tenor</p>
            <div className="flex flex-wrap gap-2">
              {TENOR_OPTIONS_YEARS.map((years) => (
                <button
                  key={years}
                  type="button"
                  onClick={() => setTenorYears(years)}
                  className={cn(
                    buttonVariants({
                      variant: years === tenorYears ? "default" : "outline",
                      size: "sm",
                    }),
                  )}
                >
                  {years} Tahun
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-5">
          <p className="text-sm text-muted-foreground">
            Estimasi cicilan / bulan
          </p>
          <p className="text-3xl sm:text-4xl font-bold">
            {estimate ? formatIDR(estimate.monthlyInstallment) : "—"}
          </p>

          <div className="space-y-2 text-sm border-t border-border pt-4">
            <div className="flex justify-between text-muted-foreground">
              <span>Uang Muka</span>
              <span className="text-foreground">
                {estimate ? formatIDR(estimate.dpAmount) : "—"}
              </span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Tenor</span>
              <span className="text-foreground">{tenorYears} Tahun</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Total Bunga</span>
              <span className="text-foreground">
                {estimate ? formatIDR(estimate.totalInterest) : "—"}
              </span>
            </div>
          </div>

          <p className="text-xs text-muted-foreground">
            Estimasi, bukan penawaran resmi — bunga aktual tergantung mitra
            pembiayaan.
          </p>

          <Link
            href="#konsultasi"
            className={cn(buttonVariants({ size: "lg" }), "w-full text-md py-5.5")}
          >
            Ajukan Simulasi ke Sales
          </Link>
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
git add components/sections/financing-calculator.tsx
git commit -m "feat: add financing calculator section component"
```

---

### Task 4: Wire into homepage and verify end-to-end

**Files:**
- Modify: `components/pages/dashboard.tsx`
- Modify: `components/sections/consult.tsx`

**Interfaces:**
- Consumes: `FinancingCalculatorSection` default export from Task 3 (`@/components/sections/financing-calculator`).

- [ ] **Step 1: Add the `id="konsultasi"` anchor to `ConsultSection`**

In `components/sections/consult.tsx`, change:

```tsx
    <section className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start px-6 sm:px-8 py-16 sm:py-20">
```

to:

```tsx
    <section id="konsultasi" className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start px-6 sm:px-8 py-16 sm:py-20 scroll-mt-28">
```

- [ ] **Step 2: Insert the section into the homepage**

In `components/pages/dashboard.tsx`, add the import alongside the existing section imports:

```tsx
import FinancingCalculatorSection from "../sections/financing-calculator";
```

Then insert `<FinancingCalculatorSection />` between `<CarTypeSection />` and `<Testimony />` so the JSX reads:

```tsx
      <div className="relative z-10">
        <Hero />
        <CompanyHistory />
        <Profile />
        <CarTypeSection />
        <FinancingCalculatorSection />
        <Testimony />
        <BookingSection />
        <SalesConsultantSection />
        <ConsultSection />
        <MapSection />
        <FAQ />
      </div>
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: no output, exit code 0.

- [ ] **Step 4: Start the dev server**

Run: `npm run dev`
Expected: server starts on `http://localhost:3000` with no compile errors in the terminal.

- [ ] **Step 5: Manually verify in the browser**

Open `http://localhost:3000` and scroll to the "Simulasi Cicilan" section (it should appear right after the "Pilih Tipe" vehicle section and before testimonials):

1. Default state shows: car = "BYD Sealion 7", DP = 20%, tenor = 3 Tahun, monthly estimate ≈ **Rp16.028.722** (matches Task 1 Step 1's hand-verified numbers, rounded to whole Rupiah), DP amount ≈ **Rp127.100.000**, total bunga ≈ **Rp68.634.000**.
2. Drag the DP slider to its minimum (10%) and maximum (50%) — confirm the % label, DP Rupiah amount, and monthly estimate all update live and never show `—` (that only appears if `otrPrice` is undefined, which shouldn't happen with seeded data).
3. Click each tenor button (1–5 Tahun) — confirm the active button visually changes (filled vs outline) and the monthly estimate updates (longer tenor → lower monthly payment, more total interest).
4. Change the car dropdown to a different model — confirm the DP amount and monthly estimate recompute against that car's starting price.
5. Click "Ajukan Simulasi ke Sales" — confirm the page scrolls down to the consultation form section (`#konsultasi`).
6. Resize the browser to a mobile width (~375px) — confirm the inputs column and result card stack vertically and remain readable.

- [ ] **Step 6: Lint**

Run: `npm run lint`
Expected: no errors (warnings acceptable only if they pre-exist elsewhere in the codebase; nothing new from the files touched in this plan).

- [ ] **Step 7: Commit**

```bash
git add components/pages/dashboard.tsx components/sections/consult.tsx
git commit -m "feat: wire financing calculator into homepage"
```

---

## Plan Self-Review Notes

- **Spec coverage:** `lib/car-finance.ts` (Task 1) ↔ spec's "Calculation logic" section. `components/ui/slider.tsx` (Task 2) ↔ spec's "Slider approach" decision. `components/sections/financing-calculator.tsx` (Task 3) ↔ spec's full component layout (car picker, DP slider, tenor buttons, result card, CTA, disclaimer). `dashboard.tsx` placement + `consult.tsx` anchor (Task 4) ↔ spec's "Placement" and CTA target. Manual verification steps (Task 4, Step 5) ↔ spec's "Testing" section item-for-item.
- **No test framework introduced** — matches spec's explicit statement that no test infra exists in this repo; `tsc --noEmit` and manual browser checks stand in for automated tests, as agreed during brainstorming.
- **Type consistency checked:** `InstallmentInput`/`InstallmentEstimate` field names in Task 1 match exactly what Task 3 destructures (`estimate.monthlyInstallment`, `.dpAmount`, `.totalInterest`). `Slider` props (`min`, `max`, `step`, `value`, `onValueChange`) in Task 2 match exactly how Task 3 calls it. `FinancingCalculatorSection` default export name in Task 3 matches the import in Task 4.
