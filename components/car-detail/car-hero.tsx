import Image from "next/image";
import Link from "next/link";
import { BatteryCharging, Gauge, Layers } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { CarDetail } from "@/lib/types/car-detail";
import Reveal from "./reveal";

interface CarHeroProps {
  car: CarDetail;
}

export default function CarHero({ car }: CarHeroProps) {
  const leadVariant = car.variants[0];

  const quickStats = [
    {
      icon: BatteryCharging,
      label: "Baterai",
      value: leadVariant?.battery ?? "—",
    },
    {
      icon: Gauge,
      label: "Drivetrain",
      value: leadVariant?.drivetrain ?? "—",
    },
    {
      icon: Layers,
      label: "Varian",
      value: `${car.variants.length} Pilihan`,
    },
  ];

  return (
    <section className="px-4 sm:px-6 lg:px-8 pt-6">
      <div className="relative overflow-hidden rounded-3xl min-h-[85vh] sm:min-h-[90vh]">
        <Image
          src={car.images.hero}
          alt={`${car.name} — ${car.category}`}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[image:var(--background-primary)] opacity-75" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />

        <div className="relative flex h-full min-h-[85vh] sm:min-h-[90vh] flex-col justify-end gap-8 p-6 sm:p-12 lg:p-16 text-ink-foreground">
          <Reveal>
            <Badge variant="outline" className="border-white/25 text-ink-foreground">
              {car.category}
            </Badge>
          </Reveal>

          <Reveal delay={0.05} className="space-y-3 max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance">
              {car.name}
            </h1>
            <p className="text-base sm:text-lg text-ink-muted max-w-xl text-pretty">
              {car.tagline}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="flex flex-wrap gap-3 sm:gap-4">
              {quickStats.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-md"
                >
                  <Icon className="size-5 text-accent-glow shrink-0" />
                  <div className="leading-tight">
                    <dt className="text-xs text-ink-muted">{label}</dt>
                    <dd className="text-sm font-semibold">{value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.15} className="flex flex-wrap gap-3">
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
                "text-md py-5.5 border-white/25 bg-transparent text-ink-foreground hover:bg-white/10",
              )}
            >
              Hubungi Sales
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
