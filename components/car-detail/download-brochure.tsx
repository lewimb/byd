import { FileText } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { CarDetail } from "@/lib/types/car-detail";
import Reveal from "./reveal";

interface DownloadBrochureProps {
  car: CarDetail;
}

export default function DownloadBrochure({ car }: DownloadBrochureProps) {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <Reveal>
        <div className="mx-auto max-w-2xl space-y-5 rounded-3xl border border-border bg-card p-10 sm:p-16 text-center shadow-lg">
          <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary/10">
            <FileText className="size-7 text-primary" />
          </span>
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold">Unduh Brosur</h2>
            <p className="text-sm sm:text-base text-muted-foreground text-pretty">
              Dapatkan spesifikasi lengkap {car.name} dalam format PDF untuk
              dibaca kapan saja.
            </p>
          </div>
          <Link
            href={car.brochure.pdf}
            className={cn(buttonVariants({ size: "lg" }), "text-md py-5.5")}
          >
            Unduh PDF
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
