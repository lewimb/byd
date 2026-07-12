import FAQ from "../sections/faq";
import Hero from "../sections/hero";
import Testimony from "../sections/testimony";
import CarTypeSection from "../sections/car-type";
import ConsultSection from "../sections/consult";
import MapSection from "../sections/map-section";
// import FinancingCalculatorSection from "../sections/financing-calculator";
import ShowroomShowcase from "../sections/showroom-showcase";

export default function Dashboard() {
  return (
    <>
      <div className="relative z-10">
        <Hero />
        <CarTypeSection />
        {/* <FinancingCalculatorSection /> */}
        <ShowroomShowcase />
        <Testimony />
        <ConsultSection />
        <MapSection />
        <FAQ />
      </div>
    </>
  );
}
