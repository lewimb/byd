import { getFeatureIcon } from "@/lib/car-detail-icons";
import type { CarDetail } from "@/lib/types/car-detail";
import Reveal from "./reveal";
import SectionHeading from "./section-heading";

interface CarHighlightsProps {
  car: CarDetail;
}

export default function CarHighlights({ car }: CarHighlightsProps) {
  if (car.highlights.length === 0) return null;

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 bg-ink text-ink-foreground">
      <Reveal>
        <SectionHeading
          eyebrow="Sorotan Utama"
          title={`Kenapa Memilih ${car.name}`}
          tone="dark"
        />
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-10 sm:mt-12">
        {car.highlights.map((highlight, index) => {
          const Icon = getFeatureIcon(highlight.title);
          return (
            <Reveal key={highlight.title} delay={index * 0.05}>
              <div className="h-full space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-accent-glow/40">
                <span className="flex size-11 items-center justify-center rounded-full bg-white/10">
                  <Icon className="size-5 text-accent-glow" />
                </span>
                <div className="space-y-1.5">
                  <h3 className="font-semibold text-base">{highlight.title}</h3>
                  <p className="text-sm leading-relaxed text-ink-muted">
                    {highlight.description}
                  </p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
