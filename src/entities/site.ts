import { z } from "zod";

export const linkSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});

export const siteConfigSchema = z.object({
  name: z.string().min(1),
  domain: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  tagline: z.string().min(1),
  primaryCta: linkSchema,
  secondaryCta: linkSchema,
  navItems: z.array(linkSchema),
  socialLinks: z.array(linkSchema),
});

export type SiteConfig = z.infer<typeof siteConfigSchema>;
