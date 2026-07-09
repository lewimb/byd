import { BatteryCharging, Gauge, Tag } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatIDR, priceCaption, resolvePrice } from "@/lib/car-price";
import type { CarDetail } from "@/lib/types/car-detail";
import Reveal from "./reveal";
import SectionHeading from "./section-heading";

interface CarVariantsProps {
  car: CarDetail;
}

export default function CarVariants({ car }: CarVariantsProps) {
  if (car.variants.length === 0) return null;

  const recommendedIndex = car.variants.length - 1;

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-10">
      <Reveal>
        <SectionHeading
          eyebrow="Varian & Baterai"
          title="Pilih Varian Sesuai Kebutuhan Anda"
        />
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {car.variants.map((variant, index) => {
          const isRecommended = index === recommendedIndex;
          const price = resolvePrice(variant.price);
          const caption = priceCaption(variant.price);

          return (
            <Reveal key={variant.name} delay={index * 0.05}>
              <div
                className={cn(
                  "relative flex h-full flex-col space-y-5 rounded-2xl border p-6 transition-colors",
                  isRecommended
                    ? "border-primary bg-primary/5 shadow-lg"
                    : "border-border hover:border-primary/40",
                )}
              >
                {isRecommended && (
                  <Badge className="absolute -top-3 left-6">Direkomendasikan</Badge>
                )}
                <h3 className="text-lg font-bold">{variant.name}</h3>
                <dl className="space-y-3">
                  <div className="flex items-center gap-2.5">
                    <BatteryCharging className="size-4 shrink-0 text-primary" />
                    <dt className="sr-only">Baterai</dt>
                    <dd className="text-sm text-muted-foreground">{variant.battery}</dd>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Gauge className="size-4 shrink-0 text-primary" />
                    <dt className="sr-only">Drivetrain</dt>
                    <dd className="text-sm text-muted-foreground">{variant.drivetrain}</dd>
                  </div>
                </dl>

                <div className="mt-auto space-y-1 border-t border-border pt-4">
                  {price != null ? (
                    <>
                      <div className="flex items-center gap-2.5">
                        <Tag className="size-4 shrink-0 text-primary" />
                        <p className="text-base font-bold">{formatIDR(price)}</p>
                      </div>
                      {caption && (
                        <p className="pl-6.5 text-xs text-muted-foreground">{caption}</p>
                      )}
                    </>
                  ) : (
                    <p className="text-sm font-medium text-muted-foreground">
                      Hubungi kami untuk info harga
                    </p>
                  )}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
