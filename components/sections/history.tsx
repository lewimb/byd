import { TIMELINE } from "@/lib/timeline";

export default function CompanyHistory() {
  return (
    <section
      id="sejarah"
      className="py-28 px-8 max-md:py-24 bg-ink text-ink-foreground scroll-mt-28"
    >
      <div>
        <div className="space-y-1">
          <p className="uppercase font-semibold text-accent-glow">SEJARAH</p>
          <h2 className="text-3xl font-bold">Perjalanan BYD</h2>
        </div>
        <div className="grid grid-cols-4 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-3 max-lg:gap-6 items-center pt-12">
          {TIMELINE.map((item) => (
            <div key={item.year}>
              <p className="font-semibold text-sm">{item.year}</p>
              <p className="text-ink-muted text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
