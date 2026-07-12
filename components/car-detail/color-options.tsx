"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getColorHex, isLightColor } from "@/lib/car-colors";
import {
  getAvailableAngles,
  getColorPhoto,
  SEAL_ANGLE_LABELS,
  type SealAngle,
} from "@/lib/car-color-photos";
import type { CarDetail } from "@/lib/types/car-detail";
import CarSilhouette from "./car-silhouette";
import Reveal from "./reveal";
import SectionHeading from "./section-heading";

interface ColorOptionsProps {
  car: CarDetail;
}

interface ColorGroupProps {
  label: string;
  colors: string[];
  selected: string;
  onSelect: (color: string) => void;
}

function ColorGroup({ label, colors, selected, onSelect }: ColorGroupProps) {
  if (colors.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">
        {label}
      </h3>
      <div className="flex flex-wrap gap-5">
        {colors.map((color) => {
          const hex = getColorHex(color);
          const isSelected = color === selected;
          const showsDarkCheck = isLightColor(hex);

          return (
            <button
              key={color}
              type="button"
              onClick={() => onSelect(color)}
              aria-pressed={isSelected}
              className="flex w-20 flex-col items-center gap-2 text-center"
            >
              <span
                className={cn(
                  "relative flex size-14 items-center justify-center rounded-full border shadow-sm transition-transform hover:scale-105 focus-visible:outline-none",
                  isSelected
                    ? "border-transparent ring-2 ring-primary ring-offset-2 ring-offset-background"
                    : "border-border/60",
                )}
                style={{ backgroundColor: hex }}
              >
                {isSelected && (
                  <Check
                    className={cn(
                      "size-5",
                      showsDarkCheck ? "text-black/70" : "text-white",
                    )}
                    strokeWidth={2.5}
                  />
                )}
              </span>
              <span
                className={cn(
                  "text-xs font-medium text-balance",
                  isSelected && "text-foreground font-semibold",
                )}
              >
                {color}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function ColorOptions({ car }: ColorOptionsProps) {
  const { premiumExtendedRange, dynamicStandardRange } = car.colors;

  const allColors = useMemo(
    () => [...premiumExtendedRange, ...dynamicStandardRange],
    [premiumExtendedRange, dynamicStandardRange],
  );

  const availableAngles = getAvailableAngles(car.id);

  const [selected, setSelected] = useState(allColors[0] ?? "");
  const [angle, setAngle] = useState<SealAngle | undefined>(availableAngles?.[0]);

  if (allColors.length === 0) return null;

  const selectedHex = getColorHex(selected);
  const selectedPhoto = angle ? getColorPhoto(car.id, selected, angle) : undefined;
  const selectedRange = premiumExtendedRange.includes(selected)
    ? "Premium Extended Range"
    : "Dynamic Standard Range";

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-10">
      <Reveal>
        <SectionHeading eyebrow="Pilihan Warna" title="Ekspresikan Gaya Anda" />
      </Reveal>

      <div className="grid gap-8 lg:grid-cols-5 lg:gap-10">
        <Reveal className="lg:col-span-3" delay={0.05}>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-secondary/40 p-8 sm:p-10">
            <div
              className="pointer-events-none absolute inset-0 opacity-25 blur-3xl transition-colors duration-500"
              style={{
                background: `radial-gradient(closest-side, ${selectedHex}, transparent)`,
              }}
              aria-hidden="true"
            />
            <div className="relative flex flex-col items-center gap-6">
              {selectedPhoto ? (
                <Image
                  key={selectedPhoto.src}
                  src={selectedPhoto.src}
                  alt={`${car.name} warna ${selected}${angle ? ` — ${SEAL_ANGLE_LABELS[angle]}` : ""}`}
                  width={selectedPhoto.width}
                  height={selectedPhoto.height}
                  className="h-auto w-full max-w-md animate-in fade-in zoom-in-95 duration-500"
                />
              ) : (
                <CarSilhouette
                  key={selected}
                  color={selectedHex}
                  className="w-full max-w-md animate-in fade-in zoom-in-95 duration-500"
                />
              )}

              {selectedPhoto && availableAngles && (
                <div className="flex flex-wrap justify-center gap-2">
                  {availableAngles.map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => setAngle(a)}
                      aria-pressed={a === angle}
                      className={cn(
                        buttonVariants({
                          variant: a === angle ? "default" : "outline",
                          size: "sm",
                        }),
                      )}
                    >
                      {SEAL_ANGLE_LABELS[a]}
                    </button>
                  ))}
                </div>
              )}

              <div className="space-y-1 text-center">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {selectedRange}
                </p>
                <p className="text-lg font-bold">{car.name} — {selected}</p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-2 space-y-8" delay={0.1}>
          <ColorGroup
            label="Premium Extended Range"
            colors={premiumExtendedRange}
            selected={selected}
            onSelect={setSelected}
          />
          <ColorGroup
            label="Dynamic Standard Range"
            colors={dynamicStandardRange}
            selected={selected}
            onSelect={setSelected}
          />
        </Reveal>
      </div>
    </section>
  );
}
