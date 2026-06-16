import { MetadataRoute } from "next";
import { DOCTORS } from "@/data/doctors";
import { createAdminClient } from "@/lib/supabase";

const BASE_URL = process.env.SITE_URL ?? "https://prernahospital.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const doctorPages = DOCTORS.map((doctor) => ({
    url: `${BASE_URL}/doctors/${doctor.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  let updatePages: MetadataRoute.Sitemap = [];
  try {
    const admin = createAdminClient();
    if (admin) {
      const { data: updates } = await admin
        .from("updates")
        .select("id, date")
        .order("date", { ascending: false });

      if (updates && Array.isArray(updates)) {
        updatePages = updates.map((update) => ({
          url: `${BASE_URL}/updates/${update.id}`,
          lastModified: update.date ? new Date(update.date) : new Date(),
          changeFrequency: "weekly" as const,
          priority: 0.7,
        }));
      }
    }
  } catch (error) {
    console.error("Failed to fetch updates for sitemap:", error);
  }

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...staticPages,
    ...doctorPages,
    ...updatePages,
  ];
}
