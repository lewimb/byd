import type {
  CarDetail,
  CarVariant,
  CarVariantPrice,
} from "@/lib/types/car-detail";

export function formatIDR(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  })
    .format(value)
    .replace(/^(\D+)\s+/, "$1");
}

/** Picks the most inclusive figure to headline: home charging + kWh meter, then home charging, then bare OTR. */
export function resolvePrice(
  price?: number | CarVariantPrice,
): number | undefined {
  if (price == null) return undefined;
  if (typeof price === "number") return price;
  return (
    price.includeHomeChargingWithKwhMeter ??
    price.includeHomeCharging ??
    price.excludeHomeCharging
  );
}

export function priceCaption(
  price?: number | CarVariantPrice,
): string | undefined {
  if (price == null || typeof price === "number") return undefined;
  if (price.includeHomeChargingWithKwhMeter != null)
    return "Termasuk home charging & kWh meter";
  if (price.includeHomeCharging != null) return "Termasuk home charging";
  if (price.excludeHomeCharging != null) return "Belum termasuk home charging";
  return undefined;
}

export function getStartingPrice(car: CarDetail): number | undefined {
  const prices = car.variants
    .map((variant: CarVariant) => resolvePrice(variant.price))
    .filter((value): value is number => value != null);

  return prices.length > 0 ? Math.min(...prices) : undefined;
}
