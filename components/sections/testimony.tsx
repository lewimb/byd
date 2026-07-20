"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { TESTIMONIALS } from "@/lib/testimonies";
import StarIcon from "../components/shared/svg/star";
import { Camera, CircleArrowRight, CircleArrowLeft } from "lucide-react";
import type { Testimonial } from "@/lib/types/testimony";

interface TestimonyPhotoProps {
  testimony: Testimonial;
}

function TestimonyPhoto({ testimony }: TestimonyPhotoProps) {
  if (testimony.photo) {
    return (
      <Image
        src={testimony.photo}
        alt={`${testimony.customer.name} bersama ${testimony.vehicle}`}
        fill
        loading="lazy"
        sizes="(min-width: 1024px) 32rem, 85vw"
        className="object-cover"
      />
    );
  }

  return (
    <div className="flex size-full flex-col items-center justify-center gap-1.5 bg-muted text-muted-foreground">
      <Camera className="size-6" strokeWidth={1.5} />
      <p className="text-xs">Foto pengiriman segera hadir</p>
    </div>
  );
}

export default function Testimony() {
  const stars = [1, 2, 3, 4, 5];
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    updateScrollState();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState);
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector("[data-card]") as HTMLElement | null;
    const cardWidth = card ? card.offsetWidth + 16 : el.clientWidth;
    el.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <section id="testimoni" className="p-4 sm:p-8 space-y-4 scroll-mt-28">
      <div className="shell space-y-4">
      <div className="space-y-2">
        <h3 className="text-xs sm:text-sm font-semibold">TESTIMONI</h3>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <h2 className="text-xl sm:text-2xl font-bold">Kata pelanggan kami</h2>
          <div className="hidden sm:flex items-center gap-3">
            <CircleArrowLeft
              onClick={() => scroll("left")}
              className={`cursor-pointer transition-opacity ${
                canScrollLeft ? "opacity-100" : "opacity-30 pointer-events-none"
              }`}
            />
            <CircleArrowRight
              onClick={() => scroll("right")}
              className={`cursor-pointer transition-opacity ${
                canScrollRight
                  ? "opacity-100"
                  : "opacity-30 pointer-events-none"
              }`}
            />
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {TESTIMONIALS.map((testimony) => (
          <div
            data-card
            className="overflow-hidden rounded-xl shadow-lg border w-[85vw] sm:w-auto sm:min-w-md lg:min-w-lg shrink-0 snap-start"
            key={testimony.id}
          >
            <div className="relative aspect-16/9">
              <TestimonyPhoto testimony={testimony} />
            </div>

            <div className="p-4 space-y-4">
              <div className="flex gap-3">
                {stars.map((star) => (
                  <div key={star}>
                    {star <= testimony.rating ? (
                      <StarIcon className="text-primary size-3" filled={true} />
                    ) : (
                      <StarIcon className="text-border size-3" />
                    )}
                  </div>
                ))}
              </div>
              <p className="text-sm sm:text-base">{testimony.review}</p>
              <div className="space-y-1 sm:space-y-2">
                <p className="font-semibold text-sm sm:text-base">
                  {testimony.customer.name}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {testimony.vehicle}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* mobile scroll hint / progress dots */}
      <div className="flex sm:hidden justify-center gap-1.5 pt-1">
        {TESTIMONIALS.map((_, i) => (
          <div key={i} className="size-1.5 rounded-full bg-border" />
        ))}
      </div>
      </div>
    </section>
  );
}
