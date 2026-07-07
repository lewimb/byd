import FAQ from "../sections/faq";
import Hero from "../sections/hero";
import CompanyHistory from "../sections/history";
import Testimony from "../sections/testimony";
import Profile from "../sections/profile";
import BookingSection from "../sections/booking-section";
import CarTypeSection from "../sections/car-type";
import MapSection from "../sections/map-section";

export default function Dashboard() {
  return (
    <>
      <div className="relative z-10">
        <Hero />
        <CompanyHistory />
        <Profile />
        <CarTypeSection />
        <Testimony />
        <BookingSection />
        <MapSection />
        <FAQ />
      </div>
    </>
  );
}
