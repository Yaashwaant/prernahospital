import { MetadataRoute } from "next";
import { DOCTORS } from "@/data/doctors";

const BASE_URL = process.env.SITE_URL ?? "https://prernahospital.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const doctorPages = DOCTORS.map((doctor) => ({
    url: `${BASE_URL}/doctors/${doctor.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...doctorPages,
  ];
}
