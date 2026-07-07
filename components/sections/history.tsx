import { TIMELINE } from "@/lib/timeline";

export default function CompanyHistory() {
  return (
    <section className="py-28 px-8 max-md:py-24 bg-black text-white">
      <div>
        <div className="space-y-1">
          <p className="uppercase font-semibold">SEJARAH</p>
          <h2 className="text-3xl font-bold">Perjalanan BYD</h2>
        </div>
        <div className="grid grid-cols-4 max-md:grid-cols-2 max-sm:grid-cols-1 gap-3 max-md:gap-6 items-center pt-12">
          {TIMELINE.map((item) => (
            <div key={item.year}>
              <p className="font-semibold text-sm">{item.year}</p>
              <p className="text-neutral-400 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
