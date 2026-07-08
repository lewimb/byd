import type { Metadata } from "next";
import { notFound } from "next/navigation";

import CarDetailPage from "@/components/pages/car-detail";
import { carDetails, getCarDetailById } from "@/lib/data/car-details";

interface CarPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return carDetails.map((car) => ({ id: car.id }));
}

export async function generateMetadata({
  params,
}: CarPageProps): Promise<Metadata> {
  const { id } = await params;
  const car = getCarDetailById(id);

  if (!car) {
    return { title: "Mobil Tidak Ditemukan" };
  }

  return {
    title: `${car.name} — BYD Scientia Garden`,
    description: car.tagline,
  };
}

export default async function Page({ params }: CarPageProps) {
  const { id } = await params;
  const car = getCarDetailById(id);

  if (!car) {
    notFound();
  }

  return <CarDetailPage car={car} />;
}
