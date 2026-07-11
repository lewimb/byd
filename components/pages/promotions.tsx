import Link from "next/link";
import { CalendarClock, Tag } from "lucide-react";

import SectionHeading from "@/components/car-detail/section-heading";
import AccordionComponent from "@/components/components/shared/accordion";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Promotion } from "@/lib/types/promotion";

interface PromotionsPageProps {
  promotions: Promotion[];
}

export default function PromotionsPage({ promotions }: PromotionsPageProps) {
  return (
    <article className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-10">
      <SectionHeading
        eyebrow="Promo"
        title="Promo BYD Scientia Garden"
        description="Penawaran spesial untuk mempermudah Anda beralih ke kendaraan listrik BYD. Klaim promo sebelum periode berakhir."
        align="center"
        className="mx-auto"
      />

      <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2">
        {promotions.map((promo) => (
          <div
            key={promo.id}
            className="flex flex-col space-y-4 rounded-2xl border border-border p-6"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <h3 className="text-lg font-bold">{promo.title}</h3>
                <p className="text-sm text-muted-foreground">{promo.tagline}</p>
              </div>
              <Badge variant="outline" className="shrink-0 gap-1">
                <CalendarClock className="size-3" />
                {promo.validUntil}
              </Badge>
            </div>

            <div className="flex items-center gap-2.5">
              <Tag className="size-4 shrink-0 text-primary" />
              <p className="text-base font-bold">{promo.discountLabel}</p>
            </div>

            <p className="text-sm text-muted-foreground">{promo.description}</p>

            <p className="text-xs text-muted-foreground">
              Berlaku untuk: {promo.applicableModels.join(", ")}
            </p>

            <AccordionComponent
              items={[
                {
                  value: `${promo.id}-terms`,
                  title: "Syarat & Ketentuan",
                  content: (
                    <ul className="list-disc space-y-1 pl-4">
                      {promo.terms.map((term) => (
                        <li key={term}>{term}</li>
                      ))}
                    </ul>
                  ),
                },
              ]}
            />

            <Link
              href="/#konsultasi"
              className={cn(buttonVariants({ size: "lg" }), "mt-auto w-full text-md py-5.5")}
            >
              Klaim Promo
            </Link>
          </div>
        ))}
      </div>
    </article>
  );
}
