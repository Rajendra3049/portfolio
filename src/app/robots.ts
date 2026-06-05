import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `https://${siteConfig.domain}/sitemap.xml`,
  };
}
