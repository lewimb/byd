import ConsultForm from "@/components/components/shared/consult-form";
import { Separator } from "@/components/ui/separator";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ConsultSection() {
  return (
    <section
      id="konsultasi"
      className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start px-6 sm:px-8 py-16 sm:py-20 scroll-mt-28"
    >
      <div className="space-y-3 lg:col-span-2">
        <h3 className="uppercase text-xs sm:text-sm font-semibold tracking-widest text-primary">
          Konsultasi
        </h3>
        <h2 className="text-xl sm:text-2xl font-bold">
          Punya pertanyaan? Konsultasi dengan tim kami
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Isi formulir berikut dan tim sales kami akan menghubungi Anda untuk
          membantu memilih tipe BYD yang tepat, atau menjadwalkan test drive
          langsung di showroom.
        </p>
      </div>

      <div className="lg:col-span-3 rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-6">
        <ConsultForm />

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground">Atau</span>
            <Separator className="flex-1" />
          </div>
          <a
            href="#"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "w-full text-md py-5.5",
            )}
          >
            Booking via WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
