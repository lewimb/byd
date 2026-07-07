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
        <div>
          {/* <Image
            src="https://mobilbyd.com/wp-content/uploads/2024/04/byd-tangerang.jpg"
            width={100}
            height={100}
            alt="byd-dealer-shop"
            className="size-96 rounded-lg object-cover w-full shrink-0"
          /> */}
          <div className="size-96 rounded-lg w-full shrink-0 bg-gray-700" />
        </div>
      </div>
    </section>
  );
}
