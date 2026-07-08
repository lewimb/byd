import { Button } from "../ui/button";

export default function BookingSection() {
  return (
    <section className="px-8 py-18 bg-ink text-ink-foreground flex items-center justify-between">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">
          Siap merasakan BYD secara langsung?
        </h2>
        <p className="text-ink-muted">
          Jadwalkan test drive gratis di showroom Scientia Garden hari ini.
        </p>
      </div>
      <Button
        variant="outline"
        className="py-5 text-ink border-ink-foreground/20 hover:bg-primary hover:text-primary-foreground hover:border-primary cursor-pointer"
      >
        Booking via WhatsApp
      </Button>
    </section>
  );
}
