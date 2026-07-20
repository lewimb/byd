import { getFeatureIcon } from "@/lib/car-detail-icons";
import type { CarDetail } from "@/lib/types/car-detail";
import Reveal from "./reveal";
import SectionHeading from "./section-heading";

interface TechnologyGridProps {
  car: CarDetail;
}

export default function TechnologyGrid({ car }: TechnologyGridProps) {
  if (car.technology.length === 0) return null;

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="shell space-y-10">
      <Reveal>
        <SectionHeading eyebrow="Teknologi" title="Terhubung, Cerdas, Intuitif" />
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {car.technology.map((item, index) => {
          const Icon = getFeatureIcon(item);
          return (
            <Reveal key={item} delay={index * 0.04}>
              <div className="group flex items-center gap-4 rounded-2xl border border-border p-5 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent transition-transform group-hover:scale-110">
                  <Icon className="size-5 text-accent-foreground" />
                </span>
                <p className="text-sm font-medium">{item}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
      </div>
    </section>
  );
}
