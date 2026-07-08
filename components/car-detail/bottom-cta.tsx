import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { CarDetail } from "@/lib/types/car-detail";
import Reveal from "./reveal";

interface BottomCTAProps {
  car: CarDetail;
}

export default function BottomCTA({ car }: BottomCTAProps) {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 sm:py-28 bg-ink text-ink-foreground text-center">
      <Reveal className="mx-auto max-w-2xl space-y-6">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">
          Tertarik dengan {car.name}?
        </h2>
        <p className="text-ink-muted text-base sm:text-lg text-pretty">
          Jadwalkan test drive gratis atau konsultasi langsung dengan tim
          sales kami di showroom Scientia Garden.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="#"
            className={cn(buttonVariants({ size: "lg" }), "text-md py-5.5")}
          >
            Jadwalkan Test Drive
          </Link>
          <Link
            href="#"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "text-md py-5.5 border-white/25 text-ink-foreground hover:bg-white/10 hover:text-ink-foreground",
            )}
          >
            Hubungi Sales
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
