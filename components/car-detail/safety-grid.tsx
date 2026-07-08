import { CheckCircle2 } from "lucide-react";

import type { CarDetail } from "@/lib/types/car-detail";
import Reveal from "./reveal";
import SectionHeading from "./section-heading";

interface SafetyGridProps {
  car: CarDetail;
}

export default function SafetyGrid({ car }: SafetyGridProps) {
  if (car.safetyFeatures.length === 0) return null;

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-10">
      <Reveal>
        <SectionHeading
          eyebrow="Keselamatan"
          title="Perlindungan Menyeluruh di Setiap Perjalanan"
        />
      </Reveal>

      <Reveal delay={0.05}>
        <ul className="grid gap-x-8 gap-y-1 rounded-2xl border border-border p-2 sm:grid-cols-2">
          {car.safetyFeatures.map((feature) => (
            <li
              key={feature}
              className="flex items-center gap-3 rounded-xl px-4 py-3.5 transition-colors hover:bg-muted"
            >
              <CheckCircle2 className="size-5 shrink-0 text-primary" />
              <span className="text-sm font-medium">{feature}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
