# Financing Calculator — Design Spec

Date: 2026-07-11
Status: Approved

## Purpose

Homepage section letting a visitor pick a BYD model, adjust down payment and tenor, and see a live estimated monthly installment. Highest-leverage missing lead magnet identified in the IA/CRO redesign memo (turns "expensive EV" into "Rp X/month"). v1 ships with no lead-capture gate — result is shown live, with a CTA handing off to the existing consult form.

## Scope

- New homepage section only (not embedded on vehicle detail pages in v1)
- No lead-capture gate — estimate shown immediately as inputs change
- No real financing-partner rate data exists yet — uses a clearly-labeled placeholder flat rate

Out of scope: per-vehicle-detail-page calculator, gated lead capture, multiple financing products (only one flat-rate model), real bank/leasing integration.

## Files

| File | Purpose |
|---|---|
| `lib/car-finance.ts` | Pure calculation constants + function, no React |
| `components/ui/slider.tsx` | New shadcn primitive wrapping `@base-ui/react/slider`, following the pattern of existing `components/ui/*` (e.g. `input.tsx`, `checkbox.tsx`) |
| `components/sections/financing-calculator.tsx` | Client component, new homepage section |

Existing files touched:

| File | Change |
|---|---|
| `components/pages/dashboard.tsx` | Insert `<FinancingCalculatorSection />` between `<CarTypeSection />` and `<Testimony />` |
| `components/sections/consult.tsx` | Add `id="konsultasi"` to the `<section>` so it becomes a real anchor target |

## Calculation logic (`lib/car-finance.ts`)

Indonesian car-loan flat-rate convention (interest computed once on the original principal, not amortized):

```ts
export const FLAT_RATE_ANNUAL = 0.045; // 4.5%/year flat — placeholder, swap for real partner rate when available
export const DP_MIN_PERCENT = 10;
export const DP_MAX_PERCENT = 50;
export const DP_STEP_PERCENT = 5;
export const TENOR_OPTIONS_YEARS = [1, 2, 3, 4, 5] as const;

export interface InstallmentEstimate {
  dpAmount: number;
  principal: number;
  totalInterest: number;
  totalPayable: number;
  monthlyInstallment: number;
}

export interface InstallmentInput {
  otrPrice: number;
  dpPercent: number;   // 10–50
  tenorYears: number;  // one of TENOR_OPTIONS_YEARS
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

No validation/error branches — inputs are always bounded by the slider (10–50, step 5) and a fixed tenor option set, so `calculateInstallment` never receives out-of-range values.

## `components/ui/slider.tsx`

Wraps `@base-ui/react/slider` (already an installed dependency, same primitive family as the existing `Checkbox`/`Accordion` wrappers) the same way `input.tsx` wraps `@base-ui/react/input`: forward props, apply `cn()`-merged Tailwind classes matching the site's existing input styling (border, ring, radius tokens from `globals.css`), export as a thin styled component. Single-thumb, controlled (`value`/`onValueChange`), no range (dual-thumb) variant needed.

## `components/sections/financing-calculator.tsx`

Client component (`"use client"`). Local state: `selectedCarId` (default: first `carDetails` entry), `dpPercent` (default 20), `tenorYears` (default 3).

Layout: section wrapper matching existing homepage section pattern (`id`, eyebrow + heading, `p-6 sm:p-10 lg:p-16` rhythm — see `car-type.tsx` for the reference pattern). Two-column grid on large screens (inputs left, result right; stacks on mobile).

**Inputs (left column):**
- Car picker: native `<select>` listing all `carDetails` by `name`, styled to match `Input` (no new Select primitive — 6 items doesn't justify one)
- DP slider: new `Slider`, range 10–50, step 5. Shows live `{dpPercent}%` and the computed Rupiah amount (`formatIDR(dpAmount)`) next to it
- Tenor: segmented button group over `TENOR_OPTIONS_YEARS`, reusing `buttonVariants` (active tenor gets the filled/primary variant, others outline) — same visual language as `car-type.tsx`'s outline button usage

**Result (right column):**
- Large `formatIDR(monthlyInstallment)` as the headline number, labeled "Estimasi cicilan / bulan"
- Breakdown lines: DP amount, tenor (X tahun), total bunga (`formatIDR(totalInterest)`)
- Disclaimer line: "Estimasi, bukan penawaran resmi — bunga aktual tergantung mitra pembiayaan."
- CTA button (`buttonVariants`, primary) → `<Link href="#konsultasi">Ajukan Simulasi ke Sales</Link>`

**Price source:** `getStartingPrice(car)` from `lib/car-price.ts` on the selected `CarDetail` — same helper already used in `car-type.tsx`. If a car somehow has no resolvable price (not possible with current seeded data, but the helper's return type is `number | undefined`), the section falls back to disabling the result display rather than computing against `undefined`.

## Data flow

```
carDetails (lib/data/car-details.ts)
  ↓ user selects car
selectedCarId → find CarDetail → getStartingPrice() → otrPrice
  ↓ user adjusts DP slider / tenor buttons
{ otrPrice, dpPercent, tenorYears } → calculateInstallment() → InstallmentEstimate
  ↓
Result card re-renders on every input change (fully client-side, no network, no debounce needed — computation is trivial arithmetic)
```

## Testing

No test infrastructure exists in this repo (confirmed during codebase analysis — no test files anywhere). Verification is manual via dev server:

- Slider drag updates % and Rupiah amount live
- Tenor button switch updates result
- Car dropdown switch updates OTR price and result
- Boundary values: DP 10% and 50%, tenor 1 and 5 years — confirm math (spot-check against the formula by hand for one car)
- CTA scrolls to `#konsultasi` and lands on the consult form
- Responsive: two-column desktop, stacked mobile
