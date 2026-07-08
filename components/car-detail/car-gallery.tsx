import Image from "next/image";

import type { CarDetail } from "@/lib/types/car-detail";
import Reveal from "./reveal";
import SectionHeading from "./section-heading";

interface CarGalleryProps {
  car: CarDetail;
}

interface GalleryGridProps {
  images: string[];
  alt: string;
}

function GalleryGrid({ images, alt }: GalleryGridProps) {
  if (images.length === 0) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
      {images.map((src, index) => (
        <div
          key={src}
          className="group relative aspect-4/3 overflow-hidden rounded-2xl bg-muted"
        >
          <Image
            src={src}
            alt={`${alt} ${index + 1}`}
            fill
            loading="lazy"
            sizes="(min-width: 640px) 33vw, 50vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>
      ))}
    </div>
  );
}

export default function CarGallery({ car }: CarGalleryProps) {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-10">
      <Reveal>
        <SectionHeading eyebrow="Galeri" title="Setiap Sudut, Setiap Detail" />
      </Reveal>

      <Reveal delay={0.05} className="relative aspect-21/9 overflow-hidden rounded-3xl bg-muted">
        <Image
          src={car.images.hero}
          alt={`${car.name} tampilan utama`}
          fill
          loading="lazy"
          sizes="100vw"
          className="object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
        />
      </Reveal>

      <div className="grid gap-10 lg:grid-cols-2">
        <Reveal delay={0.1} className="space-y-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">
            Eksterior
          </h3>
          <GalleryGrid images={car.images.exterior} alt={`${car.name} eksterior`} />
        </Reveal>

        <Reveal delay={0.15} className="space-y-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">
            Interior
          </h3>
          <GalleryGrid images={car.images.interior} alt={`${car.name} interior`} />
        </Reveal>
      </div>
    </section>
  );
}
