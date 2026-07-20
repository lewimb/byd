import type { MetadataRoute } from "next";

import { carDetails } from "@/lib/data/car-details";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/promo`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/tentang-kami`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  const carRoutes: MetadataRoute.Sitemap = carDetails.map((car) => ({
    url: `${SITE_URL}/cars/${car.id}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...carRoutes];
}
