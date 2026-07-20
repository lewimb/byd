"use client";
import { useState } from "react";
import { carTypes } from "@/lib/car";
import { getCarDetailById } from "@/lib/data/car-details";
import { formatIDR, getStartingPrice } from "@/lib/car-price";
import { getShowcasePhoto } from "@/lib/car-color-photos";
import { getColorHex } from "@/lib/car-colors";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { sendGAEvent } from "@next/third-parties/google";
import CarSilhouette from "@/components/car-detail/car-silhouette";

export default function CarTypeSection() {
  const [activeType, setActiveType] = useState(carTypes[0]?.id);
  const activeIndex = Math.max(
    0,
    carTypes.findIndex((t) => t.id === activeType),
  );
  const selected = carTypes[activeIndex] ?? carTypes[0];
  const selectedDetail = selected
    ? getCarDetailById(String(selected.id))
    : undefined;
  const startingPrice = selectedDetail
    ? getStartingPrice(selectedDetail)
    : undefined;

  const colorNames = selectedDetail
    ? [
        ...selectedDetail.colors.premiumExtendedRange,
        ...selectedDetail.colors.dynamicStandardRange,
      ]
    : [];
  const { photo: showcasePhoto, colorName: showcaseColor } = selectedDetail
    ? getShowcasePhoto(selectedDetail.id, colorNames)
    : {};
  const showcaseHex = getColorHex(showcaseColor ?? colorNames[0] ?? "grey");

  const goTo = (id: number) => setActiveType(id);
  const goPrev = () =>
    goTo(carTypes[(activeIndex - 1 + carTypes.length) % carTypes.length].id);
  const goNext = () => goTo(carTypes[(activeIndex + 1) % carTypes.length].id);

  return (
    <section
      id="mobil"
      className="p-6 sm:p-10 lg:p-16 bg-ink text-ink-foreground scroll-mt-28"
    >
      <div className="shell">
        <div className="max-w-2xl mb-8 sm:mb-12">
          <h3 className="text-xs sm:text-sm font-semibold tracking-widest text-accent-glow uppercase">
            Pilih Tipe
          </h3>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2">
            Temukan Tipe yang Tepat untuk Anda
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-5 lg:gap-12 items-stretch">
          {/* Image showcase */}
          <div className="order-1 lg:order-2 lg:col-span-3 space-y-5">
            <div className="relative w-full aspect-4/3 lg:aspect-16/10 rounded-2xl overflow-hidden bg-white/5 border border-white/10">
              <div
                className="pointer-events-none absolute inset-0 opacity-30 blur-3xl transition-colors duration-500"
                style={{
                  background: `radial-gradient(closest-side, ${showcaseHex}, transparent)`,
                }}
                aria-hidden="true"
              />
              <div className="relative flex h-full w-full items-center justify-center p-6 sm:p-10">
                {showcasePhoto ? (
                  <Image
                    key={showcasePhoto.src}
                    src={showcasePhoto.src}
                    alt={`${selected.name} warna ${showcaseColor}`}
                    width={showcasePhoto.width}
                    height={showcasePhoto.height}
                    className="h-auto max-h-full w-full object-contain animate-in fade-in zoom-in-95 duration-500"
                    priority={activeIndex === 0}
                  />
                ) : (
                  <CarSilhouette
                    key={selected.id}
                    color={showcaseHex}
                    className="w-full max-w-md animate-in fade-in zoom-in-95 duration-500"
                  />
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              {startingPrice != null ? (
                <p className="text-sm text-ink-muted">
                  Mulai dari{" "}
                  <span className="text-lg font-bold text-ink-foreground">
                    {formatIDR(startingPrice)}
                  </span>
                </p>
              ) : (
                <span />
              )}

              <Link
                onClick={() => {
                  sendGAEvent("event", `car-type-click`, {
                    id: `${selected.id}`,
                    name: `${selected.name}`,
                  });
                }}
                href={`/cars/${selectedDetail?.slug ?? selected.id}`}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "text-md py-5.5 border-white/25 bg-transparent text-ink-foreground hover:bg-white/10",
                )}
              >
                Lihat Detail {selected.name}
                <ChevronRight className="size-4" />
              </Link>
            </div>
          </div>

          {/* Paginated info + arrows */}
          <div className="order-2 lg:order-1 lg:col-span-2 flex flex-col justify-between gap-8">
            <div
              key={selected.id}
              className="animate-in fade-in slide-in-from-left-2 duration-300"
            >
              <p className="text-xs font-mono tracking-widest text-ink-muted tabular-nums">
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(carTypes.length).padStart(2, "0")}
              </p>
              <h3 className="font-bold text-2xl sm:text-3xl mt-3">
                {selected.name}
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-ink-muted mt-3 max-w-md">
                {selected.detail}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={goPrev}
                aria-label="Tipe sebelumnya"
                className="flex size-11 items-center justify-center rounded-full border border-white/15 text-ink-foreground transition-colors hover:border-accent-glow/60 hover:text-accent-glow hover:bg-white/5 cursor-pointer"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Tipe berikutnya"
                className="flex size-11 items-center justify-center rounded-full border border-white/15 text-ink-foreground transition-colors hover:border-accent-glow/60 hover:text-accent-glow hover:bg-white/5 cursor-pointer"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          </div>
        </div>

        {/* All available cars */}
        <div className="order-3 mt-10 lg:mt-14 -mx-6 sm:-mx-10 lg:mx-0 px-6 sm:px-10 lg:px-0">
          <div className="flex gap-3 overflow-x-auto pb-2 lg:flex-wrap lg:overflow-visible snap-x snap-mandatory">
            {carTypes.map((type) => {
              const isActive = type.id === activeType;
              const dotHex = getColorHex(
                getCarDetailById(String(type.id))?.colors
                  .premiumExtendedRange[0] ?? "grey",
              );
              return (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => goTo(type.id)}
                  aria-pressed={isActive}
                  className={cn(
                    "flex shrink-0 snap-start items-center gap-2.5 rounded-full border px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer",
                    isActive
                      ? "border-accent-glow/60 bg-white/10 text-ink-foreground"
                      : "border-white/10 text-ink-muted hover:border-white/25 hover:text-ink-foreground",
                  )}
                >
                  <span
                    className="size-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: dotHex }}
                    aria-hidden="true"
                  />
                  {type.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
