import { Button } from "../ui/button";

export default function BookingSection() {
  return (
    <section className="px-8 py-18 bg-black text-white flex items-center justify-between">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">
          Siap merasakan BYD secara langsung?
        </h2>
        <p>Jadwalkan test drive gratis di showroom Scientia Garden hari ini.</p>
      </div>
      <Button
        variant="outline"
        className="py-5 text-black hover:bg-black hover:text-white cursor-pointer"
      >
        Booking via WhatsApp
      </Button>
    </section>
  );
}
