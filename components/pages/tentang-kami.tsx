import CompanyHistory from "@/components/sections/history";
import SalesConsultantSection from "@/components/sections/sales-consultant";
import SectionHeading from "@/components/car-detail/section-heading";

export default function TentangKamiPage() {
  return (
    <article>
      <div className="px-6 sm:px-8 pt-16 sm:pt-20 pb-6">
        <SectionHeading
          eyebrow="Tentang Kami"
          title="BYD Scientia Garden"
          description="Dealer resmi BYD yang melayani Tangerang dan sekitarnya — kenali perjalanan kami dan tim yang siap membantu Anda."
          align="center"
          className="mx-auto"
        />
      </div>
      <CompanyHistory />
      <SalesConsultantSection />
    </article>
  );
}
