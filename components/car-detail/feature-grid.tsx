import { getFeatureIcon } from "@/lib/car-detail-icons";
import { cn } from "@/lib/utils";
import Reveal from "./reveal";
import SectionHeading from "./section-heading";

interface FeatureGridProps {
  eyebrow: string;
  title: string;
  items: string[];
  className?: string;
}

export default function FeatureGrid({
  eyebrow,
  title,
  items,
  className,
}: FeatureGridProps) {
  if (items.length === 0) return null;

  return (
    <section className={cn("px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-10", className)}>
      <Reveal>
        <SectionHeading eyebrow={eyebrow} title={title} />
      </Reveal>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => {
          const Icon = getFeatureIcon(item);
          return (
            <Reveal key={item} delay={index * 0.04}>
              <div className="flex items-center gap-3 rounded-xl border border-border p-4 transition-colors hover:border-primary/40">
                <Icon className="size-4.5 shrink-0 text-primary" />
                <p className="text-sm font-medium">{item}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
