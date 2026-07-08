import type { CarDetail } from "@/lib/types/car-detail";
import Reveal from "./reveal";
import SectionHeading from "./section-heading";

interface ColorOptionsProps {
  car: CarDetail;
}

interface ColorGroupProps {
  label: string;
  colors: string[];
}

function ColorGroup({ label, colors }: ColorGroupProps) {
  if (colors.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">
        {label}
      </h3>
      <div className="flex flex-wrap gap-6">
        {colors.map((color) => (
          <div key={color} className="flex w-20 flex-col items-center gap-2 text-center">
            <span className="size-14 rounded-full border border-border bg-gradient-to-br from-secondary via-muted to-border shadow-sm transition-transform hover:scale-105" />
            <span className="text-xs font-medium text-balance">{color}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ColorOptions({ car }: ColorOptionsProps) {
  const { premiumExtendedRange, dynamicStandardRange } = car.colors;
  if (premiumExtendedRange.length === 0 && dynamicStandardRange.length === 0) {
    return null;
  }

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-10">
      <Reveal>
        <SectionHeading eyebrow="Pilihan Warna" title="Ekspresikan Gaya Anda" />
      </Reveal>

      <div className="grid gap-10 sm:grid-cols-2">
        <Reveal delay={0.05}>
          <ColorGroup label="Premium Extended Range" colors={premiumExtendedRange} />
        </Reveal>
        <Reveal delay={0.1}>
          <ColorGroup label="Dynamic Standard Range" colors={dynamicStandardRange} />
        </Reveal>
      </div>
    </section>
  );
}
