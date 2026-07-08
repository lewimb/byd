import { ArrowLeftRight, Milestone, MoveHorizontal, MoveVertical } from "lucide-react";

import type { CarDetail } from "@/lib/types/car-detail";
import Reveal from "./reveal";
import SectionHeading from "./section-heading";

interface DimensionsCardProps {
  car: CarDetail;
}

export default function DimensionsCard({ car }: DimensionsCardProps) {
  const specs = [
    { icon: MoveHorizontal, label: "Panjang", value: car.dimensions.length },
    { icon: ArrowLeftRight, label: "Lebar", value: car.dimensions.width },
    { icon: MoveVertical, label: "Tinggi", value: car.dimensions.height },
    { icon: Milestone, label: "Wheelbase", value: car.dimensions.wheelbase },
  ];

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 bg-ink text-ink-foreground">
      <Reveal>
        <SectionHeading eyebrow="Dimensi" title="Proporsi yang Presisi" tone="dark" />
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-10 sm:mt-12">
        {specs.map(({ icon: Icon, label, value }, index) => (
          <Reveal key={label} delay={index * 0.05}>
            <div className="h-full space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6">
              <Icon className="size-5 text-accent-glow" />
              <div>
                <p className="text-2xl font-bold">{value.toLocaleString("id-ID")} mm</p>
                <p className="text-sm text-ink-muted">{label}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
