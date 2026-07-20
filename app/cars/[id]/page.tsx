import type { Metadata } from "next";
import { notFound } from "next/navigation";

import CarDetailPage from "@/components/pages/car-detail";
import { carDetails, getCarDetailById } from "@/lib/data/car-details";
import { BUSINESS } from "@/lib/seo";

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

  const title = `${car.name} — Harga & Spesifikasi di Tangerang`;
  const description = `${car.tagline} Cek harga, spesifikasi, dan jadwalkan test drive ${car.name} di dealer resmi BYD Scientia Garden, Tangerang.`;
  const ogImage = car.images.hero || BUSINESS.ogImage;

  return {
    title,
    description,
    keywords: [
      `${car.name} Tangerang`,
      `harga ${car.name}`,
      `test drive ${car.name}`,
      `beli ${car.name} Tangerang`,
      "BYD Tangerang",
    ],
    alternates: {
      canonical: `/cars/${car.id}`,
    },
    openGraph: {
      title,
      description,
      url: `/cars/${car.id}`,
      images: [{ url: ogImage, width: 1200, height: 630, alt: car.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
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
