import ConsultantCard from "../components/dashboard/sales-consultant/consultant-card";
import { SALES_CONSULTANTS } from "@/lib/sales-consultants";

export default function SalesConsultantSection() {
  return (
    <section className="px-8 py-14">
      <div className="shell space-y-8">
        <div className="max-w-2xl space-y-2">
          <h3 className="text-xs sm:text-sm font-semibold">TIM SALES</h3>
          <h2 className="text-xl sm:text-2xl font-bold">
            Konsultasikan Kebutuhan Anda dengan Ahlinya
          </h2>
          <p className="text-sm text-muted-foreground">
            Sales consultant bersertifikat BYD siap membantu Anda memilih
            unit dan simulasi pembiayaan yang paling sesuai.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SALES_CONSULTANTS.map((consultant, index) => (
            <ConsultantCard key={consultant.id} consultant={consultant} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
