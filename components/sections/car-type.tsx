"use client";
import { useState } from "react";
import { carTypes } from "@/lib/car";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function CarTypeSection() {
  const [activeType, setActiveType] = useState(carTypes[0]?.id);
  const selected = carTypes.find((t) => t.id === activeType) ?? carTypes[0];

  return (
    <section
      id="mobil"
      className="p-6 sm:p-10 lg:p-16 bg-ink text-ink-foreground scroll-mt-28"
    >
      <div className="max-w-2xl mb-8 sm:mb-12">
        <h3 className="text-xs sm:text-sm font-semibold tracking-widest text-accent-glow uppercase">
          Pilih Tipe
        </h3>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2">
          Temukan Tipe yang Tepat untuk Anda
        </h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div className="divide-y divide-white/10">
          {carTypes.map((type) => {
            const isActive = type.id === activeType;
            return (
              <button
                key={type.id}
                onClick={() => setActiveType(type.id)}
                className={`w-full text-left py-5 sm:py-6 flex items-center justify-between cursor-pointer gap-4 group transition-colors ${
                  isActive
                    ? "text-ink-foreground"
                    : "text-ink-muted hover:text-accent-glow"
                }`}
              >
                <div className="space-y-1.5">
                  <p
                    className={`font-semibold text-base sm:text-lg transition-colors ${
                      isActive ? "text-ink-foreground" : ""
                    }`}
                  >
                    {type.name}
                  </p>
                  <p
                    className={`text-sm leading-relaxed max-w-md transition-colors ${
                      isActive ? "text-ink-muted" : "text-ink-muted/60"
                    }`}
                  >
                    {type.detail}
                  </p>
                </div>
                <ChevronRight
                  className={`shrink-0 size-5 transition-all ${
                    isActive
                      ? "opacity-100 translate-x-0 text-accent-glow"
                      : "opacity-0 -translate-x-2 group-hover:opacity-50 group-hover:translate-x-0"
                  }`}
                />
              </button>
            );
          })}
        </div>

        <div className="space-y-5">
          <div className="relative w-full aspect-4/3 text-center rounded-2xl overflow-hidden bg-white/5 border border-white/10">
            {/* {selected?.image ? (
              <Image
                src={selected.image}
                alt={selected.name}
                fill
                className="object-cover transition-opacity duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-neutral-700 text-sm">
                No image available
              </div>
            )} */}
            {selected.name}
          </div>

          <Link
            href={`/cars/${selected.id}`}
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "w-full text-md py-5.5 border-white/25 text-ink-foreground hover:bg-white/10 hover:text-ink-foreground",
            )}
          >
            Lihat Detail {selected.name}
            <ChevronRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
