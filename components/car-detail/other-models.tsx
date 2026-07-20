import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { carDetails } from "@/lib/data/car-details";
import { getColorHex } from "@/lib/car-colors";
import { getShowcasePhoto } from "@/lib/car-color-photos";
import { formatIDR, getStartingPrice } from "@/lib/car-price";
import type { CarDetail } from "@/lib/types/car-detail";
import CarSilhouette from "./car-silhouette";
import Reveal from "./reveal";
import SectionHeading from "./section-heading";

interface OtherModelsProps {
  car: CarDetail;
}

export default function OtherModels({ car }: OtherModelsProps) {
  const others = carDetails.filter((c) => c.id !== car.id);

  if (others.length === 0) return null;

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <Reveal>
        <SectionHeading
          eyebrow="Jelajahi Lainnya"
          title="Model BYD Lainnya"
          description="Bandingkan dengan tipe lain dalam lini BYD sebelum menentukan pilihan."
          className="mb-8 sm:mb-10"
        />
      </Reveal>

      <Reveal delay={0.05}>
        <div className="mx-auto max-w-3xl divide-y divide-border rounded-2xl border border-border overflow-hidden">
          {others.map((other) => {
            const colorNames = [
              ...other.colors.premiumExtendedRange,
              ...other.colors.dynamicStandardRange,
            ];
            const { photo, colorName } = getShowcasePhoto(other.id, colorNames);
            const hex = getColorHex(colorName ?? colorNames[0] ?? "grey");
            const startingPrice = getStartingPrice(other);

            return (
              <Link
                key={other.id}
                href={`/cars/${other.slug}`}
                className="group flex items-center gap-4 p-3 sm:p-4 transition-colors hover:bg-secondary/50"
              >
                <div className="relative size-16 sm:size-20 shrink-0 overflow-hidden rounded-xl bg-secondary/40">
                  <div
                    className="pointer-events-none absolute inset-0 opacity-30 blur-2xl"
                    style={{ background: `radial-gradient(closest-side, ${hex}, transparent)` }}
                    aria-hidden="true"
                  />
                  <div className="relative flex h-full w-full items-center justify-center p-1.5">
                    {photo ? (
                      <Image
                        src={photo.src}
                        alt={other.name}
                        width={photo.width}
                        height={photo.height}
                        className="h-auto max-h-full w-full object-contain"
                      />
                    ) : (
                      <CarSilhouette color={hex} className="w-full" />
                    )}
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {other.category}
                  </p>
                  <p className="font-semibold truncate">{other.name}</p>
                  {startingPrice != null && (
                    <p className="text-sm text-muted-foreground">
                      Mulai dari {formatIDR(startingPrice)}
                    </p>
                  )}
                </div>

                <ArrowRight className="size-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
              </Link>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
