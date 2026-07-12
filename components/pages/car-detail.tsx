import BottomCTA from "@/components/car-detail/bottom-cta";
import CarGallery from "@/components/car-detail/car-gallery";
import CarHero from "@/components/car-detail/car-hero";
import CarHighlights from "@/components/car-detail/car-highlights";
import CarVariants from "@/components/car-detail/car-variants";
import ColorOptions from "@/components/car-detail/color-options";
import DimensionsCard from "@/components/car-detail/dimensions-card";
import FeatureGrid from "@/components/car-detail/feature-grid";
import OtherModels from "@/components/car-detail/other-models";
import SafetyGrid from "@/components/car-detail/safety-grid";
import TechnologyGrid from "@/components/car-detail/technology-grid";
import type { CarDetail } from "@/lib/types/car-detail";

interface CarDetailPageProps {
  car: CarDetail;
}

export default function CarDetailPage({ car }: CarDetailPageProps) {
  return (
    <article>
      <CarHero car={car} />
      <CarGallery car={car} />
      <CarHighlights car={car} />
      <CarVariants car={car} />
      <TechnologyGrid car={car} />
      <SafetyGrid car={car} />
      <FeatureGrid
        eyebrow="Eksterior"
        title="Desain yang Memukau dari Setiap Sudut"
        items={car.exteriorFeatures}
      />
      <FeatureGrid
        eyebrow="Interior"
        title="Kenyamanan Kelas Premium"
        items={car.interiorFeatures}
        className="bg-secondary/30"
      />
      <ColorOptions car={car} />
      <DimensionsCard car={car} />
      <OtherModels car={car} />
      <BottomCTA car={car} />
    </article>
  );
}
