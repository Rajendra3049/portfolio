import type { MetadataRoute } from "next";
import { projects } from "@/content";
import { siteConfig } from "@/content/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = `https://${siteConfig.domain}`;
  const now = new Date();

  return [
    { url: baseUrl, lastModified: now },
    { url: `${baseUrl}/resume`, lastModified: now },
    ...projects.map((project) => ({
      url: `${baseUrl}/work/${project.slug}`,
      lastModified: now,
    })),
  ];
}
