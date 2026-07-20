"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-(image:--background-primary) px-6 sm:px-8 lg:px-12 pt-16 sm:pt-20 lg:pt-24 pb-10">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 sm:h-36 lg:h-44 bg-[radial-gradient(ellipse_55%_100%_at_50%_100%,var(--accent-glow)_0%,transparent_72%)] opacity-40"
      />

      <div className="shell relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl space-y-4 pb-14 sm:pb-20 lg:pb-28 text-center lg:text-left mx-auto lg:mx-0"
        >
          <Badge
            variant="outline"
            className="border-white/25 text-ink-foreground"
          >
            Dealer Resmi BYD · Scientia Garden
          </Badge>

          <h1 className="font-bold text-4xl sm:text-5xl lg:text-6xl text-ink-foreground text-balance">
            Build Your Dreams,
            <br />
            mulai dari Tangerang.
          </h1>
          <p className="text-ink-muted text-base sm:text-lg text-pretty max-w-xl mx-auto lg:mx-0">
            Showroom resmi BYD di Scientia Garden — jelajahi lini kendaraan
            listrik terbaru, jadwalkan test drive, dan konsultasi langsung
            dengan tim sales kami.
          </p>
          <Button className="text-md py-5.5">Lihat Semua Mobil</Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto -mb-2 sm:-mb-3 lg:-mb-4 max-w-6xl"
        >
          <Image
            src="/assets/line-up-byd/line-up-byd-trimmed.png"
            alt="Lineup kendaraan listrik BYD — M6, Seal, Sealion 7, Atto 3, dan Dolphin"
            width={2934}
            height={629}
            priority
            sizes="100vw"
            loading="eager"
            className="h-auto w-full size-"
          />
        </motion.div>
      </div>
    </section>
  );
}
