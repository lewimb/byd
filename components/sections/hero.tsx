"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

export default function Hero() {
  return (
    <section className="px-8 py-24">
      <div className="grid grid-cols-2 gap-24 max-lg:flex max-lg:flex-col max-md:items-center">
        <div className="space-y-4 max-lg:text-center">
          <Badge variant="outline">Dealer Resmi BYD · Scientia Garden</Badge>

          <h1 className="font-bold text-5xl ">
            <p>Build Your Dreams,</p>
            <p>mulai dari Tangerang.</p>
          </h1>
          <p>
            Showroom resmi BYD di Scientia Garden — jelajahi lini kendaraan
            listrik terbaru, jadwalkan test drive, dan konsultasi langsung
            dengan tim sales kami.
          </p>
          <Button className="text-md py-5.5">Lihat Semua Mobil</Button>
        </div>
        <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-lg bg-[image:var(--background-primary)]">
          <Image
            src="/assets/line-up-byd/line-up-byd.png"
            alt="Lineup kendaraan listrik BYD — M6, Seal, Sealion 7, Atto 3, dan Dolphin"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-contain p-6"
          />
        </div>
      </div>
    </section>
  );
}
