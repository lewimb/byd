"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";

import SectionHeading from "@/components/car-detail/section-heading";
import Reveal from "@/components/car-detail/reveal";
import { cn } from "@/lib/utils";

interface ShowroomPhoto {
  src: string;
  eyebrow: string;
  title: string;
  /** true = the large featured tile in the grid */
  featured?: boolean;
}

const PHOTOS: ShowroomPhoto[] = [
  {
    src: "/assets/showroom-photo/Tampak Depan Serpong.jpg.jpeg",
    eyebrow: "Eksterior",
    title: "Fasad Showroom",
    featured: true,
  },
  {
    src: "/assets/showroom-photo/JHD01323.jpg",
    eyebrow: "Ruang Pamer",
    title: "Galeri Kendaraan",
  },
  {
    src: "/assets/showroom-photo/JHD01326.jpg",
    eyebrow: "Konsultasi",
    title: "Ruang Konsultasi VIP",
  },
  {
    src: "/assets/showroom-photo/JHD01329.jpg",
    eyebrow: "Bersantai",
    title: "Area Tunggu Pelanggan",
  },
  {
    src: "/assets/showroom-photo/JHD01266.jpg",
    eyebrow: "Purnajual",
    title: "Bengkel Servis Resmi",
  },
  {
    src: "/assets/showroom-photo/JHD01276.jpg",
    eyebrow: "Purnajual",
    title: "Meja Servis",
  },
  {
    src: "/assets/showroom-photo/JHD01320.jpg.jpeg",
    eyebrow: "Fasilitas",
    title: "Stasiun Pengisian Cepat 120kW",
  },
];

function subscribeNoop() {
  return () => {};
}
function getIsClient() {
  return true;
}
function getIsServer() {
  return false;
}

export default function ShowroomShowcase() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const mounted = useSyncExternalStore(subscribeNoop, getIsClient, getIsServer);

  const close = () => setActiveIndex(null);
  const showPrev = () =>
    setActiveIndex((current) =>
      current === null ? null : (current - 1 + PHOTOS.length) % PHOTOS.length,
    );
  const showNext = () =>
    setActiveIndex((current) =>
      current === null ? null : (current + 1) % PHOTOS.length,
    );

  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") showPrev();
      if (event.key === "ArrowRight") showNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex]);

  const active = activeIndex !== null ? PHOTOS[activeIndex] : undefined;

  return (
    <>
      <section
        id="showroom"
        className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-10 scroll-mt-28"
      >
        <Reveal>
          <SectionHeading
            eyebrow="Showroom"
            title="Setiap Sudut Showroom Kami"
            description="Dari ruang pamer hingga bengkel servis — intip fasilitas BYD Scientia Garden sebelum berkunjung langsung."
          />
        </Reveal>

        <Reveal delay={0.05}>
          <div
            className="grid gap-3 sm:gap-4 [grid-auto-flow:dense]"
            style={{
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
              gridAutoRows: "10rem",
            }}
          >
            {PHOTOS.map((photo, index) => (
              <button
                key={photo.src}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Lihat foto ${photo.title} secara penuh`}
                className={cn(
                  "group relative overflow-hidden rounded-2xl bg-muted text-left focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                  photo.featured
                    ? "col-span-4 row-span-2 sm:col-span-2 lg:col-span-2"
                    : "col-span-2 row-span-1 sm:col-span-1",
                )}
              >
                <Image
                  src={photo.src}
                  alt={`${photo.title} — BYD Scientia Garden`}
                  fill
                  loading="lazy"
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0" />

                <span className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <Expand className="size-4" />
                </span>

                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                  <p className="text-[0.65rem] font-semibold tracking-widest text-white/70 uppercase">
                    {photo.eyebrow}
                  </p>
                  <p className="text-sm sm:text-base font-semibold text-white">
                    {photo.title}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </Reveal>
      </section>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {active && activeIndex !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                role="dialog"
                aria-modal="true"
                aria-label={active.title}
                className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 sm:p-8"
                onClick={close}
              >
                <button
                  type="button"
                  onClick={close}
                  aria-label="Tutup"
                  className="absolute top-4 right-4 sm:top-6 sm:right-6 flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  <X className="size-5" />
                </button>

                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    showPrev();
                  }}
                  aria-label="Foto sebelumnya"
                  className="absolute left-2 sm:left-6 flex size-10 sm:size-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  <ChevronLeft className="size-5 sm:size-6" />
                </button>

                <motion.div
                  key={active.src}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="flex w-full max-h-full max-w-4xl flex-col items-center gap-4"
                  onClick={(event) => event.stopPropagation()}
                >
                  <div className="relative aspect-3/2 max-h-[70vh] w-full overflow-hidden rounded-xl">
                    <Image
                      src={active.src}
                      alt={`${active.title} — BYD Scientia Garden`}
                      fill
                      sizes="90vw"
                      className="object-contain"
                      priority
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-semibold tracking-widest text-white/60 uppercase">
                      {active.eyebrow} · {activeIndex + 1}/{PHOTOS.length}
                    </p>
                    <p className="text-base font-semibold text-white">
                      {active.title}
                    </p>
                  </div>
                </motion.div>

                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    showNext();
                  }}
                  aria-label="Foto berikutnya"
                  className="absolute right-2 sm:right-6 flex size-10 sm:size-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  <ChevronRight className="size-5 sm:size-6" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
